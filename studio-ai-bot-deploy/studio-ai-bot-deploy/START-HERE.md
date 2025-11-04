# 🚀 Studio AI Bot - 시작 가이드

## 📦 패키지 내용

이 폴더에는 **즉시 배포 가능한** Studio AI Bot이 들어있습니다.

```
studio-ai-bot-deploy/
├── backend-server-final.js    # 백엔드 API 서버 ⚙️
├── widget-embed.html           # 웹사이트 임베드 코드 🌐
├── package.json                # 의존성 관리 📦
├── .env.example                # 환경 변수 템플릿 🔐
├── DEPLOYMENT-GUIDE.md         # 상세 배포 가이드 📖
├── README.md                   # 프로젝트 개요 📄
└── START-HERE.md               # 이 파일 ⭐
```

---

## ⚡ 3단계 빠른 시작

### 1️⃣ 로컬 테스트 (5분)

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
nano .env
# OPENAI_API_KEY=sk-proj-당신의-API-키-여기

# 3. 서버 실행
npm start

# 4. 테스트
# 브라우저에서 http://localhost:3000/health 접속
```

### 2️⃣ 웹사이트에 봇 추가 (2분)

1. `widget-embed.html` 파일 열기
2. 전체 코드 복사
3. 당신의 웹사이트 HTML 파일 열기
4. `</body>` 태그 **직전에** 붙여넣기
5. 저장 후 웹사이트 새로고침

→ 우측 하단에 챗봇 버튼 생성! 🎉

### 3️⃣ 프로덕션 배포 (1-2시간)

**상세 가이드**: `DEPLOYMENT-GUIDE.md` 파일 참조

요약:
1. AWS EC2 인스턴스 생성
2. 파일 업로드
3. PM2로 서버 실행
4. Nginx + SSL 설정
5. 도메인 연결 (studiojuaibot.com)

---

## 🎯 봇의 기능

### 💼 일반 상담 모드
- 서비스 문의 응답
- 견적 안내
- 포트폴리오 소개
- 빠른 답변 (200-300자)

### 🎯 전문 컨설팅 모드
- AI 마케팅 전략
- 영상 콘텐츠 전략
- 비즈니스 성장 조언
- BEAI 7단계 구조 (깊이 있는 분석)
- 상세 답변 (500-800자)

### 💰 수익 모델
- **무료**: 월 10회
- **프리미엄**: ₩14,900/월 (100회)
- 자동 업셀 유도

---

## 🔧 필수 설정

### OpenAI API 키 발급

1. https://platform.openai.com 접속
2. API Keys → Create new secret key
3. 키 복사 (절대 공유 금지!)
4. `.env` 파일에 입력:
   ```
   OPENAI_API_KEY=sk-proj-당신의키여기
   ```

### 환경 변수 설정 (.env)

```env
# 필수
OPENAI_API_KEY=sk-proj-your-key-here

# 선택 (기본값 있음)
PORT=3000
NODE_ENV=production
CONTACT_EMAIL=studio.ikjoo@gmail.com
BOT_DOMAIN=studiojuaibot.com
```

---

## 🌐 로컬 테스트 vs 프로덕션

### 로컬 테스트 (지금 바로)
```javascript
// widget-embed.html
const CONFIG = {
  API_URL: 'http://localhost:3000/api',  // 로컬
  FREE_LIMIT: 10,
};
```

```bash
npm start
# http://localhost:3000
```

### 프로덕션 배포 (실제 서비스)
```javascript
// widget-embed.html
const CONFIG = {
  API_URL: 'https://studiojuaibot.com/api',  // 실제 도메인
  FREE_LIMIT: 10,
};
```

```bash
# AWS EC2에서
pm2 start backend-server-final.js --name studio-ai-bot
# https://studiojuaibot.com
```

---

## 📊 예상 성과

### 웹사이트 방문자 1,000명/월 기준

| 단계 | 수치 | 전환율 |
|------|------|--------|
| 챗봇 클릭 | 200명 | 20% |
| 대화 시작 | 150명 | 75% |
| 유료 전환 | 15명 | 10% |
| 고가 계약 | 2명 | 1% |

### 월 예상 매출
- 구독 수익: ₩223,500
- 고가 계약: ₩10,000,000
- **총: ₩10,223,500**

---

## ✅ 체크리스트

### 로컬 테스트 완료
- [ ] npm install 실행
- [ ] .env 파일 생성
- [ ] OpenAI API 키 입력
- [ ] npm start 실행
- [ ] http://localhost:3000/health 접속 확인
- [ ] widget-embed.html을 테스트 HTML에 삽입
- [ ] 챗봇 버튼 확인
- [ ] 대화 테스트 (무료 10회)

### 프로덕션 배포 완료
- [ ] AWS EC2 인스턴스 생성
- [ ] 파일 업로드 (scp 또는 git)
- [ ] npm install --production
- [ ] .env 파일 설정
- [ ] PM2로 서버 시작
- [ ] Nginx 설정
- [ ] SSL 인증서 발급
- [ ] 도메인 DNS 연결
- [ ] widget-embed.html API_URL 변경
- [ ] 실제 웹사이트에 봇 삽입
- [ ] 프로덕션 테스트

---

## 🐛 문제 해결

### "서버가 시작되지 않아요"
```bash
# 포트 확인
sudo netstat -tulpn | grep 3000

# 로그 확인
pm2 logs studio-ai-bot

# OpenAI API 키 확인
cat .env
```

### "챗봇이 응답하지 않아요"
1. 브라우저 F12 → Console 탭 확인
2. API URL 확인 (http vs https)
3. CORS 오류 → 백엔드 CORS 설정 확인
4. OpenAI 크레딧 확인

### "SSL 인증서 오류"
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
sudo systemctl restart nginx
```

---

## 📞 지원

**이메일**: studio.ikjoo@gmail.com  
**웹사이트**: @studiojuai.com  
**봇 도메인**: studiojuaibot.com

---

## 🎬 다음 단계

### 지금 바로 (로컬 테스트)
```bash
npm install
cp .env.example .env
nano .env  # API 키 입력
npm start
```

### 오늘 중 (웹사이트 통합)
- widget-embed.html 코드를 웹사이트에 삽입
- 테스트 (무료 10회 작동 확인)

### 이번 주 (프로덕션 배포)
- AWS EC2 설정
- 도메인 연결
- SSL 인증서
- 실제 서비스 시작

---

## 💡 팁

### 수익 최대화
1. **일반 상담**으로 빠른 리드 확보
2. **전문 컨설팅**으로 신뢰 구축
3. 무료 10회 소진 시 자동 업셀
4. 이메일 수집 → 고가 서비스 전환

### 최적화
- 일반 상담: 빠른 응답 (영업 전환)
- 전문 컨설팅: 깊이 있는 조언 (신뢰 구축)
- 대화 6회 이상 시 이메일 상담 유도
- 무료 소진 시 프리미엄 안내

---

## 🎉 준비 완료!

**모든 파일이 준비되었습니다.**

```bash
# 시작하세요!
npm install
npm start
```

**성공을 기원합니다! 🚀**

---

Made with ❤️ by Studio AI
