# 📋 Todo App — CI/CD 스터디

> Git Flow 브랜치 전략과 GitHub Actions 기반 CI/CD 파이프라인을 구축한 Todo 애플리케이션

[![CI](https://github.com/sjjeong9/todo-app/actions/workflows/ci.yml/badge.svg)](https://github.com/sjjeong9/todo-app/actions/workflows/ci.yml)
[![CD](https://github.com/sjjeong9/todo-app/actions/workflows/cd.yml/badge.svg)](https://github.com/sjjeong9/todo-app/actions/workflows/cd.yml)

---

## 🛠 기술 스택

| 영역       | 기술             |
| ---------- | ---------------- |
| 프론트엔드 | React 18, Vite   |
| 백엔드     | Node.js, Express |
| CI/CD      | GitHub Actions   |
| 배포       | Railway          |
| 버전 관리  | Git, GitHub      |

---

## 🌿 브랜치 전략 (Git Flow)

```
main         ← 프로덕션 브랜치 (PR merge만 가능)
develop      ← 통합 브랜치 (PR merge만 가능)
feature/*    ← 기능 개발 브랜치
```

### Branch Protection Rule

- `main`, `develop` 브랜치 직접 push 차단
- PR을 통해서만 merge 가능
- CI 통과 후 merge 가능 (main 기준)

---

## ⚙️ CI/CD 파이프라인

### CI — Pull Request 시 자동 실행

```
feature/* → develop PR 오픈
    └─ ESLint 코드 검사
    └─ Vite Build 확인
```

`/.github/workflows/ci.yml`

- 트리거: `develop`, `main` 브랜치로 향하는 PR
- 실행 환경: `ubuntu-latest`, Node.js 18
- 검사 항목: ESLint, Build

### CD — main merge 시 자동 배포

```
develop → main merge
    └─ Railway CLI로 자동 배포
```

`/.github/workflows/cd.yml`

- 트리거: `main` 브랜치 push
- Railway Project Token을 GitHub Secret으로 관리
- `railway up --detach` 로 무중단 배포

---

## 📁 프로젝트 구조

```
todo-app/
├── .github/
│   └── workflows/
│       ├── ci.yml        # PR 시 Lint + Build 검사
│       └── cd.yml        # main merge 시 Railway 배포
├── client/               # React + Vite 프론트엔드
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .eslintrc.json
│   └── vite.config.js
├── server/               # Node.js + Express 백엔드
│   └── index.js          # Todo CRUD API + /health 엔드포인트
├── railway.toml          # Railway 배포 설정
└── README.md
```

---

## 🔌 API 명세

| Method | URL          | 설명           |
| ------ | ------------ | -------------- |
| GET    | `/todos`     | 전체 Todo 조회 |
| POST   | `/todos`     | Todo 생성      |
| PATCH  | `/todos/:id` | 완료 상태 토글 |
| DELETE | `/todos/:id` | Todo 삭제      |
| GET    | `/health`    | 서버 상태 확인 |

---

## 💻 로컬 실행

```bash
# 백엔드
cd server
npm install
node index.js        # http://localhost:4000

# 프론트엔드 (별도 터미널)
cd client
npm install
npm run dev          # http://localhost:5173
```

---

## 🔐 환경 변수

| 변수            | 설명              | 기본값                 |
| --------------- | ----------------- | ---------------------- |
| `PORT`          | 서버 포트         | `4000`                 |
| `RAILWAY_TOKEN` | Railway 배포 토큰 | GitHub Secret으로 관리 |
