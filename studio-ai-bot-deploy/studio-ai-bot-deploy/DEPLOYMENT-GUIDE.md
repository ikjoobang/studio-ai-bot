# 🚀 Studio AI Bot - 배포 가이드

## 📋 목차
1. [로컬 테스트](#로컬-테스트)
2. [AWS EC2 배포](#aws-ec2-배포)
3. [도메인 연결](#도메인-연결)
4. [웹사이트 통합](#웹사이트-통합)
5. [문제 해결](#문제-해결)

---

## 로컬 테스트

### 1단계: 파일 준비
```bash
studio-ai-bot/
├── backend-server-final.js    # 백엔드 서버
├── widget-embed.html           # 웹사이트 임베드 코드
├── package.json                # 의존성 관리
├── .env.example                # 환경 변수 템플릿
└── DEPLOYMENT-GUIDE.md         # 이 파일
```

### 2단계: 환경 설정
```bash
# .env 파일 생성
cp .env.example .env

# .env 파일 수정 (OpenAI API 키 입력)
nano .env
```

`.env` 내용:
```env
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
PORT=3000
NODE_ENV=development
```

### 3단계: 의존성 설치
```bash
npm install
```

### 4단계: 서버 실행
```bash
npm start
```

출력 확인:
```
╔════════════════════════════════════════╗
║     Studio AI Bot Server Running      ║
╚════════════════════════════════════════╝

🚀 Server: http://localhost:3000
📡 API Endpoint: http://localhost:3000/api/chat
💚 Health Check: http://localhost:3000/health
```

### 5단계: 테스트
브라우저에서 `http://localhost:3000/health` 접속
→ `{"status":"ok"}` 응답 확인

---

## AWS EC2 배포

### 1단계: EC2 인스턴스 생성
1. AWS 콘솔 접속
2. EC2 → Launch Instance
3. 설정:
   - **이름**: studio-ai-bot
   - **OS**: Ubuntu 22.04 LTS
   - **인스턴스 타입**: t3.small (또는 t3.medium)
   - **키 페어**: 새로 생성 (다운로드 보관)
   - **보안 그룹**: 
     - SSH (22) - 내 IP
     - HTTP (80) - 0.0.0.0/0
     - HTTPS (443) - 0.0.0.0/0
     - Custom (3000) - 0.0.0.0/0

### 2단계: 서버 접속
```bash
# 키 파일 권한 변경
chmod 400 your-key.pem

# SSH 접속
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 3단계: 서버 환경 설정
```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# Node.js 설치 (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 설치 (프로세스 관리자)
sudo npm install -g pm2

# Git 설치
sudo apt install -y git

# 확인
node --version  # v20.x.x
npm --version   # 10.x.x
pm2 --version   # 5.x.x
```

### 4단계: 프로젝트 업로드
**방법 A: 파일 직접 업로드**
```bash
# 로컬에서 실행
scp -i your-key.pem -r studio-ai-bot ubuntu@your-ec2-ip:~/
```

**방법 B: GitHub 사용 (추천)**
```bash
# GitHub에 코드 push 후
git clone https://github.com/your-username/studio-ai-bot.git
cd studio-ai-bot
```

### 5단계: 서버 설정
```bash
cd ~/studio-ai-bot

# 의존성 설치
npm install --production

# .env 파일 생성
nano .env
```

`.env` 내용 입력:
```env
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
PORT=3000
NODE_ENV=production
CONTACT_EMAIL=studio.ikjoo@gmail.com
BOT_DOMAIN=studiojuaibot.com
```

### 6단계: PM2로 서버 실행
```bash
# 서버 시작
pm2 start backend-server-final.js --name studio-ai-bot

# 자동 재시작 설정
pm2 startup
pm2 save

# 상태 확인
pm2 status
pm2 logs studio-ai-bot
```

### 7단계: Nginx 설치 및 설정
```bash
# Nginx 설치
sudo apt install -y nginx

# 설정 파일 생성
sudo nano /etc/nginx/sites-available/studio-ai-bot
```

Nginx 설정:
```nginx
server {
    listen 80;
    server_name studiojuaibot.com www.studiojuaibot.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/studio-ai-bot /etc/nginx/sites-enabled/

# 기본 설정 제거
sudo rm /etc/nginx/sites-enabled/default

# Nginx 테스트 및 재시작
sudo nginx -t
sudo systemctl restart nginx
```

### 8단계: SSL 인증서 (Let's Encrypt)
```bash
# Certbot 설치
sudo apt install -y certbot python3-certbot-nginx

# SSL 인증서 발급
sudo certbot --nginx -d studiojuaibot.com -d www.studiojuaibot.com

# 이메일 입력: studio.ikjoo@gmail.com
# 약관 동의: Y
# 이메일 수신: N (선택)
# Redirect HTTP to HTTPS: 2 (선택)

# 자동 갱신 확인
sudo certbot renew --dry-run
```

---

## 도메인 연결

### 가비아 DNS 설정
1. 가비아 접속 → My가비아 → 도메인 관리
2. `studiojuaibot.com` 선택 → DNS 정보
3. 레코드 추가:

| 타입 | 호스트 | 값/위치 | TTL |
|------|--------|---------|-----|
| A | @ | EC2-IP-주소 | 600 |
| A | www | EC2-IP-주소 | 600 |
| CNAME | api | studiojuaibot.com | 600 |

4. 저장 후 10-30분 대기 (DNS 전파)

### 확인
```bash
# DNS 전파 확인
nslookup studiojuaibot.com

# 브라우저에서 접속
https://studiojuaibot.com/health
```

---

## 웹사이트 통합

### 1단계: widget-embed.html 코드 수정
```javascript
// CONFIG 부분 수정
const CONFIG = {
  API_URL: 'https://studiojuaibot.com/api',  // ← 실제 도메인으로 변경
  FREE_LIMIT: 10,
};
```

### 2단계: 웹사이트에 삽입
당신의 웹사이트 HTML 파일 열기 → `</body>` 태그 **직전**에 `widget-embed.html` 전체 코드 붙여넣기

```html
<!DOCTYPE html>
<html>
<head>
    <title>Studio AI</title>
</head>
<body>
    <!-- 당신의 웹사이트 콘텐츠 -->
    <h1>Welcome to Studio AI</h1>
    
    <!-- ===== 여기부터 widget-embed.html 코드 붙여넣기 ===== -->
    <div id="studio-ai-widget"></div>
    <style>
    /* 위젯 CSS ... */
    </style>
    <script>
    /* 위젯 JavaScript ... */
    </script>
    <!-- ===== 여기까지 ===== -->
    
</body>
</html>
```

### 3단계: 테스트
1. 웹사이트 접속
2. 우측 하단 챗봇 버튼 확인
3. 클릭 → 메뉴 선택 → 대화 테스트
4. 무료 10회 작동 확인

---

## 문제 해결

### 서버가 실행되지 않을 때
```bash
# 로그 확인
pm2 logs studio-ai-bot

# 서버 재시작
pm2 restart studio-ai-bot

# 포트 사용 확인
sudo netstat -tulpn | grep 3000
```

### OpenAI API 오류
```bash
# API 키 확인
cat .env | grep OPENAI_API_KEY

# OpenAI 대시보드에서 크레딧 확인
# https://platform.openai.com/account/usage
```

### 챗봇이 응답하지 않을 때
1. 브라우저 콘솔 열기 (F12)
2. 오류 메시지 확인
3. API URL이 올바른지 확인
4. CORS 설정 확인

### SSL 인증서 오류
```bash
# 인증서 상태 확인
sudo certbot certificates

# 강제 갱신
sudo certbot renew --force-renewal

# Nginx 재시작
sudo systemctl restart nginx
```

---

## 📊 모니터링

### PM2 모니터링
```bash
# 실시간 모니터링
pm2 monit

# 상태 확인
pm2 status

# 로그 보기
pm2 logs studio-ai-bot --lines 100
```

### 서버 리소스 확인
```bash
# CPU/메모리 사용량
htop

# 디스크 사용량
df -h

# 네트워크 연결
sudo netstat -tulpn
```

---

## 🔄 업데이트

### 코드 업데이트
```bash
cd ~/studio-ai-bot

# 코드 백업
cp backend-server-final.js backend-server-final.js.backup

# 새 코드 업로드 (Git 사용 시)
git pull origin main

# 또는 파일 직접 업로드
# scp -i key.pem backend-server-final.js ubuntu@ip:~/studio-ai-bot/

# 서버 재시작
pm2 restart studio-ai-bot

# 로그 확인
pm2 logs studio-ai-bot
```

---

## 📞 지원

문제가 해결되지 않으면:
- 📧 studio.ikjoo@gmail.com
- 🌐 @studiojuai.com

---

## ✅ 체크리스트

배포 완료 확인:

- [ ] AWS EC2 인스턴스 생성
- [ ] Node.js & PM2 설치
- [ ] 프로젝트 업로드
- [ ] .env 파일 설정
- [ ] PM2로 서버 실행
- [ ] Nginx 설정
- [ ] SSL 인증서 발급
- [ ] 도메인 DNS 연결
- [ ] 웹사이트에 위젯 통합
- [ ] 테스트 (무료 10회 작동)
- [ ] 모니터링 설정

**모두 완료되면 배포 성공! 🎉**
