// Vercel Serverless Function
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, mode, history } = req.body;

    if (!message || !mode) {
      return res.status(400).json({ error: '메시지와 모드가 필요합니다.' });
    }

    let systemPrompt = '';
    let temperature = 0.7;
    let maxTokens = 500;

    if (mode === 'inquiry') {
      systemPrompt = `당신은 Studio AI의 고객 상담 담당자입니다.

제공 서비스:
1. AI 영상 제작 (B2B, LinkedIn, YouTube)
2. AI 마케팅 자동화 (30개 봇)
3. 통합 컨설팅

연락처: studio.ikjoo@gmail.com
웹사이트: @studiojuai.com

답변 스타일: 친절, 간결 (200-300자), 구체적 예시`;
      
      temperature = 0.7;
      maxTokens = 400;
      
    } else if (mode === 'consulting') {
      systemPrompt = `당신은 Studio AI의 수석 컨설턴트입니다.

전문 분야: AI 마케팅, 영상 전략, 비즈니스 성장

BEAI 7단계 구조:
❶ 문제 재해석 → ❷ 표준 해법 → ❸ 한계 인식 → ❹ 역발상 → ❺ 사례 → ❻ 통합 전략 → ❼ 실행 유도

답변 스타일: 깊이 있는 분석 (500-800자), 통찰력, 실행 가능`;
      
      temperature = 0.8;
      maxTokens = 1000;
    }

    const messages = [{ role: 'system', content: systemPrompt }];

    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      recentHistory.forEach(msg => {
        if (msg.sender === 'user') {
          messages.push({ role: 'user', content: msg.text });
        } else if (msg.sender === 'bot') {
          const cleanText = msg.text.replace(/<[^>]*>/g, '');
          messages.push({ role: 'assistant', content: cleanText });
        }
      });
    }

    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: temperature,
      max_tokens: maxTokens,
    });

    const reply = completion.choices[0].message.content;
    const formattedReply = reply.replace(/\n/g, '<br>');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return res.status(200).json({
      reply: formattedReply,
      mode: mode,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({
        error: 'OpenAI API 할당량이 초과되었습니다.'
      });
    }

    return res.status(500).json({
      error: '서버 오류가 발생했습니다.'
    });
  }
};
