# 🌀 Something's Drop

[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205.7-3178C6?logo=typescript&logoColor=white)](#)
[![Phaser 3](https://img.shields.io/badge/Engine-Phaser%203.90-8B5CF6)](#)
[![Matter.js](https://img.shields.io/badge/Physics-Matter.js-4B5563)](#)
[![HTML5 Canvas](https://img.shields.io/badge/Rendering-HTML5%20Canvas-E34F26?logo=html5&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-646CFF?logo=vite&logoColor=white)](#)
[![Ollama](https://img.shields.io/badge/Local%20LLM-Ollama%20API-000000?logo=ollama&logoColor=white)](#)
[![Stable Diffusion](https://img.shields.io/badge/Local%20Image-Stable%20Diffusion%20API-FF6F00)](#)
[![IndexedDB](https://img.shields.io/badge/Cache-IndexedDB%20API-10B981)](#)

입력한 단어를 물리 법칙이 적용된 사물로 소환하여 스테이지를 클리어하는 2D 물리 퍼즐 플랫포머 게임입니다.

단어의 의미에 따라 사물의 형태와 크기, 무게, 탄성, 마찰력, 부력 등이 다르게 적용되며, 이를 이용해 다리를 놓거나 버튼을 누르고 장애물을 부수는 등 여러 방식으로 퍼즐을 풀 수 있습니다. 로컬 AI 서버(Ollama + Stable Diffusion)를 연결해 실시간으로 이미지를 생성하거나, 별도의 서버 없이 내장된 벡터 에셋으로 바로 플레이할 수 있습니다.

---

## 스크린샷

| 오프라인 모드 (내장 에셋) | 로컬 Stable Diffusion 연동 모드 |
| :---: | :---: |
| ![오프라인 모드 스크린샷](./docs/screenshots/offline.png) | ![로컬 SD 모드 스크린샷](./docs/screenshots/local-sd.png) |
| 내장된 프로시저럴 벡터 에셋으로 즉시 소환 | 로컬 SD 서버에서 실시간 생성된 이미지로 소환 |

---

## 주요 특징

- **단어 기반 사물 소환**: 한글 또는 영문 단어를 입력하면 해당 사물의 실루엣과 물리 속성(`normal`, `heavy`, `bouncy`, `float`, `slippery`, `sticky`)이 부여된 오브젝트가 포탈에서 소환됩니다.
- **크기 수식어 및 클릭 회수 기믹**:
  - 단어 앞에 `큰`, `거대한` 또는 `작은`, `미니` 등의 접두사를 붙여 사물의 크기와 질량을 조절할 수 있습니다.
  - 이미 소환한 사물을 마우스로 클릭해 제거할 수 있으며, 길을 막은 사물을 회수해 통과하는 퍼즐 기믹에 활용됩니다.
- **이미지 외곽선 기반 물리 충돌체 생성**: 소환된 이미지의 불투명 픽셀 영역에서 외곽선을 추출하고 다각형을 단순화하여 이미지 모양 그대로 Matter.js 물리 충돌체를 생성합니다.
- **4개 챕터, 48개 스테이지**: 초원 실험실, 기어 공방, 하늘 제도, 사이버 연구소의 4개 테마에 걸쳐 틈새 버튼, 균열 블록, 압력 스위치, 상승 기류, 시소 대포, 레이저 센서 등의 기믹이 등장합니다.

---

## 로컬 AI 이미지 생성 및 게임 연동 방식

게임은 네트워크 및 서버 환경에 따라 **오프라인 모드**와 **로컬 AI 연동 모드(LAN AI / Auto)**를 모두 지원합니다.

```text
[단어 입력]
   ├─ (오프라인 / 서버 미연결) ──> 내장 물성 사전(1,400+ 단어) + 프로시저럴 벡터 렌더링 (197종)
   │                                      │
   └─ (로컬 AI 서버 연결 시) ───> 1. 물성 및 영문 프롬프트 추론 (내장 사전 또는 Ollama)
                                  2. 이미지 생성 요청 (Stable Diffusion WebUI API)
                                  3. 배경 투명화 처리 (U2Net 또는 Flood-fill 크로마키)
                                          │
                                          ▼
                   [Marching Squares 외곽선 추출 + Ramer-Douglas-Peucker 단순화]
                                          │
                                          ▼
                         [Matter.js 물리 다각형 바디 생성 및 월드 소환]
```

1. **물성 추론 및 프롬프트 변환 (`AIService`, `WordPhysicsPredictor`)**
   - 사전에 등록된 단어는 즉시 검증된 물리 수치와 영문 프롬프트로 변환됩니다.
   - 사전에 없는 단어가 입력되면 로컬 **Ollama**(`/api/generate`)를 호출하여 단어에 어울리는 물리 파라미터(`scale`, `density`, `friction`, `restitution`, `gravityScale`, `trait`)와 이미지 생성용 영문 프롬프트를 JSON 형태로 받아옵니다.
2. **실시간 이미지 생성 및 배경 제거**
   - 변환된 프롬프트를 로컬 **Stable Diffusion WebUI**(`/sdapi/v1/txt2img`)로 전송해 단색 배경의 2D 아이콘 이미지를 생성합니다.
   - 선택적으로 U2Net 배경 제거 서버를 거치거나, 클라이언트 내장 Flood-fill 알고리즘을 통해 배경을 투명하게 분리합니다.
   - 한 번 생성된 결과물은 브라우저 IndexedDB(`CacheService`)에 캐싱되어 같은 단어를 다시 소환할 때 재사용할 수 있습니다.
3. **실시간 폴리곤 충돌체 변환 (`PolygonPhysicsBuilder`)**
   - 생성된 이미지의 알파 채널을 분석해 `marchingsquares`로 외곽선 버텍스를 추출하고, `simplify-js`로 꼭짓점 수를 최적화한 뒤 Matter.js 물리 바디로 변환하여 게임 월드에 떨어뜨립니다.
4. **자동 폴백 처리**
   - `Auto` 모드에서는 Stable Diffusion 서버가 꺼져 있으면 불필요한 대기 시간 없이 즉시 내장 오프라인 에셋 생성기로 전환됩니다.

---

## 사용 기술 및 라이브러리

- **Language & Build**: TypeScript, Vite
- **Game Engine & Physics**: Phaser 3 (`^3.88.2`), Matter.js (Phaser 내장 물리 엔진)
- **Polygon Extraction**:
  - `marchingsquares` (`^1.3.3`): 이미지 알파 채널 기반 외곽선 경로 추출
  - `simplify-js` (`^1.2.4`): 다각형 버텍스 단순화
- **Local AI Integration (선택 사항)**:
  - Ollama (물성 추론 및 한-영 프롬프트 변환)
  - Stable Diffusion WebUI (`--api` 모드, 실시간 사물 이미지 생성)

---

## 프로젝트 구조

```text
SomethingsDrop/
├── public/
│   └── assets/               # 오디오(BGM, 효과음) 및 정적 리소스
├── src/
│   ├── art/
│   │   ├── GameArtGenerator.ts         # 캐릭터, 지형, 배경 등 게임 기본 텍스처 생성
│   │   └── ProceduralStickerArtist.ts  # 오프라인 모드용 197종 벡터 스티커 렌더러
│   ├── config/
│   │   └── settings.ts                 # AI 서버 주소, 동작 모드, 스테이지 별점 저장소
│   ├── levels/
│   │   ├── LevelTypes.ts               # 스테이지 및 기믹 데이터 타입 정의
│   │   └── stages.ts                   # 4개 챕터 48개 스테이지 맵 구성
│   ├── objects/
│   │   ├── Player.ts                   # 플레이어 이동, 점프 및 애니메이션 제어
│   │   ├── PortalCursor.ts             # 상단 소환 포탈 위치 제어
│   │   └── gimmicks/                   # 스위치, 틈새 버튼, 균열 블록, 바람, 시소, 레이저 등
│   ├── physics/
│   │   ├── PolygonPhysicsBuilder.ts    # 이미지 외곽선 추출 및 Matter.js 바디 생성
│   │   └── SpawnedObject.ts            # 소환된 사물의 물리 특성(Trait) 및 클릭 삭제 처리
│   ├── scenes/
│   │   ├── TitleScene.ts               # 타이틀 화면 및 챕터 진입
│   │   └── GameScene.ts                # 메인 게임 루프, 물리 충돌 및 스테이지 진행
│   ├── services/
│   │   ├── AIService.ts                # Ollama / Stable Diffusion 연동 및 오프라인 폴백
│   │   ├── CacheService.ts             # 생성된 이미지 및 물성 IndexedDB 캐싱
│   │   ├── KoreanFuzzyMatcher.ts       # 한글 자모 분리, 초성 매칭, 크기 접두사 추출
│   │   └── WordPhysicsPredictor.ts     # 내장 단어 사전(1,400+ 단어) 및 물성 추론
│   ├── ui/
│   │   └── HudOverlay.ts               # 상단 HUD, 스테이지 선택 모달, AI 서버 설정 모달
│   ├── index.html
│   ├── index.ts
│   └── reset.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 실행 방법

### 1. 패키지 설치 및 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하면 바로 플레이할 수 있습니다. 별도의 AI 서버 설정 없이도 **Offline / Auto 모드**를 통해 모든 스테이지를 플레이할 수 있습니다.

### 2. 로컬 AI 서버 연결 (선택 사항)

실시간 AI 이미지 생성을 사용하려면 로컬 PC(또는 동일 네트워크 내 PC)에서 아래 서비스를 실행한 뒤, 게임 우측 상단의 **설정(⚙️)** 버튼에서 주소를 입력합니다.

1. **Stable Diffusion WebUI 실행**: 실행 옵션에 `--api --cors-allow-origins=*`를 추가하여 실행 (기본 포트 `7860`)
2. **Ollama 실행**: `OLLAMA_ORIGINS=* ollama serve`로 실행 후 사용할 모델(예: `gemma4:e4b` 등) 준비 (기본 포트 `11434`)
3. 게임 내 설정(⚙️) 모달에서 동작 모드를 `Auto` 또는 `LAN AI`로 선택하고 서버 주소를 저장합니다.

---

## 조작 방법

- `A` / `D` 또는 `←` / `→`: 좌우 이동
- `W` / `Space` / `↑`: 점프
- `마우스 이동`: 상단 소환 포탈 위치 지정
- `Enter`: 단어 입력창 포커스 및 사물 소환
- `소환된 사물 클릭`: 해당 사물 제거
- `F2`: 물리 충돌 다각형(디버그 뷰) 표시 토글

