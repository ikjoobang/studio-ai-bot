// Vercel Serverless Function - Studio AI Bot Chat API
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [], mode = 'inquiry' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // BEAI 7단계 프롬프트 (전문 컨설팅 모드)
    const beaiSystemPrompt = `당신은 Studio IK의 전문 AI 컨설턴트입니다. BEAI 7단계 구조로 답변합니다:

❶ 문제 재해석: 사용자 질문의 본질 파악
❷ 표준 해법: 일반적 솔루션 제시
❸ 한계 인식: 표준 해법의 문제점 지적
�④ 역발상 전략: 창의적 대안 제시
❺ 사례 연결: 실제 성공 사례 공유
❻ 통합 전략: 심리-구조-관계-실행 4축 통합
❼ 실행 유도: 구체적 다음 단계 제안

프랙탈적 사고로 깊이 있는 조언을 제공하세요.`;

    // 일반 상담 프롬프트
    const inquirySystemPrompt = `당신은 Studio IK의 친절한 AI 어시스턴트입니다.

주요 업무:
- 서비스 소개 (AI 솔루션, 챗봇 개발, 컨설팅)
- 견적 문의 안내 (studio.ikjoo@gmail.com)
- 간단한 질문 답변

친절하고 전문적인 톤으로 답변하세요.`;

    const systemPrompt = mode === 'consulting' ? beaiSystemPrompt : inquirySystemPrompt;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: mode === 'consulting' ? 0.8 : 0.7,
      max_tokens: mode === 'consulting' ? 1500 : 800,
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({
      reply,
      mode,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
