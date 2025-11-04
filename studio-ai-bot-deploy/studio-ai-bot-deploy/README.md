# 🤖 Studio AI Bot

AI 기반 상담 & 컨설팅 챗봇 플랫폼

---

## 🎯 개요

Studio AI Bot은 웹사이트에 임베드할 수 있는 지능형 챗봇입니다.

### 2가지 모드 제공

#### 💼 일반 상담
- 빠른 서비스 문의
- 견적 요청
- 포트폴리오 안내
- 즉시 응답

#### 🎯 전문 컨설팅
- AI 마케팅 전략
- 영상 콘텐츠 전략
- 비즈니스 성장 조언
- BEAI 7단계 구조 기반
- 깊이 있는 분석

---

## 📦 주요 기능

✅ **무료 체험**: 월 10회 무료 사용  
✅ **2가지 모드**: 일반 상담 + 전문 컨설팅  
✅ **실시간 응답**: OpenAI GPT-4o-mini 기반  
✅ **모바일 최적화**: 반응형 디자인  
✅ **사용량 추적**: 로컬 스토리지 기반  
✅ **유료 전환**: 자동 업셀 유도  

---

## 🚀 빠른 시작

### 1. 파일 다운로드
```bash
git clone https://github.com/your-repo/studio-ai-bot.git
cd studio-ai-bot
```

### 2. 환경 설정
```bash
# .env 파일 생성
cp .env.example .env

# OpenAI API 키 입력
nano .env
```

### 3. 서버 실행
```bash
npm install
npm start
```

### 4. 웹사이트 통합
`widget-embed.html` 코드를 당신의 웹사이트 `</body>` 직전에 붙여넣기

---

## 📁 파일 구조

```
studio-ai-bot/
├── backend-server-final.js    # 백엔드 API 서버
├── widget-embed.html           # 웹사이트 임베드 코드
├── package.json                # 의존성 관리
├── .env.example                # 환경 변수 템플릿
├── DEPLOYMENT-GUIDE.md         # 상세 배포 가이드
└── README.md                   # 이 파일
```

---

## 🔧 기술 스택

- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-4o-mini
- **Frontend**: Vanilla JavaScript
- **Deployment**: AWS EC2, Nginx, PM2
- **SSL**: Let's Encrypt

---

## 💰 수익 모델

### 무료 플랜
- 월 10회 무료 사용
- 2가지 모드 모두 이용

### 프리미엄 플랜 (₩14,900/월)
- 월 100회 상담
- 우선 응답
- 이메일 맞춤 컨설팅

---

## 📊 예상 성과

### 웹사이트 방문자 1,000명 기준
- 챗봇 사용: 200명 (20%)
- 유료 전환: 15명 (10%)
- 고가 서비스 전환: 2명

### 월 매출
- 구독: ₩223,500
- 고가 계약: ₩10,000,000
- **총: ₩10,223,500**

---

## 🌐 배포

### 로컬 테스트
```bash
npm start
# http://localhost:3000
```

### 프로덕션 배포
상세 가이드: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

1. AWS EC2 인스턴스 생성
2. 도메인 연결 (studiojuaibot.com)
3. SSL 인증서 설치
4. PM2로 서버 실행
5. Nginx 리버스 프록시 설정

---

## 🔐 환경 변수

`.env` 파일에 다음 설정 필요:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=3000
NODE_ENV=production
CONTACT_EMAIL=studio.ikjoo@gmail.com
BOT_DOMAIN=studiojuaibot.com
```

---

## 📝 API 문서

### POST /api/chat

채팅 메시지 전송

**Request Body:**
```json
{
  "message": "영상 제작 비용이 궁금해요",
  "mode": "inquiry",
  "history": [
    {"text": "안녕하세요", "sender": "bot"},
    {"text": "안녕하세요", "sender": "user"}
  ]
}
```

**Response:**
```json
{
  "reply": "영상 제작 비용은...",
  "mode": "inquiry",
  "timestamp": "2025-11-04T12:00:00.000Z"
}
```

### GET /health

서버 상태 확인

**Response:**
```json
{
  "status": "ok",
  "service": "Studio AI Bot",
  "timestamp": "2025-11-04T12:00:00.000Z"
}
```

---

## 🎨 커스터마이징

### 색상 변경
`widget-embed.html`의 CSS에서:
```css
#chat-button {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### 무료 횟수 변경
```javascript
const CONFIG = {
  FREE_LIMIT: 10,  // 원하는 숫자로 변경
};
```

### 연락처 변경
`backend-server-final.js`에서:
```javascript
📧 연락처:
- 이메일: your-email@domain.com
```

---

## 🐛 문제 해결

### 챗봇이 응답하지 않을 때
1. 브라우저 콘솔 확인 (F12)
2. API URL 확인
3. OpenAI API 키 확인

### 서버 오류
```bash
pm2 logs studio-ai-bot
pm2 restart studio-ai-bot
```

자세한 해결 방법: [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

---

## 📞 지원

**이메일**: studio.ikjoo@gmail.com  
**웹사이트**: @studiojuai.com  
**도메인**: studiojuaibot.com

---

## 📄 라이선스

MIT License

---

## 🙏 감사의 말

- OpenAI for GPT-4o-mini
- BEAI 7단계 구조 프레임워크
- 모든 오픈소스 기여자들

---

## 🎉 시작하기

```bash
# 1. 클론
git clone https://github.com/your-repo/studio-ai-bot.git

# 2. 설치
cd studio-ai-bot
npm install

# 3. 환경 설정
cp .env.example .env
nano .env  # API 키 입력

# 4. 실행
npm start

# 5. 테스트
# http://localhost:3000/health
```

**배포 준비 완료! 🚀**

---

Made with ❤️ by Studio AI
