# 나를 소개하는 웹페이지 처음부터 만들기

순수 HTML, CSS, JavaScript로 구현한 반응형 개인 포트폴리오 웹사이트입니다.

프레임워크나 UI 라이브러리 없이 HTML 구조, CSS 레이아웃, JavaScript 이벤트와 상태 관리, GitHub API 연동을 직접 구현했습니다.

---

## 1. 프로젝트 소개

이 프로젝트는 개인 정보를 소개하고, 기술 스택과 프로젝트를 보여주며, GitHub 저장소를 API로 불러와 동적으로 표시하는 포트폴리오 사이트입니다.

### 주요 목표
- HTML5 시맨틱 태그를 활용한 웹 페이지 구조 설계
- CSS Grid와 Flexbox를 활용한 반응형 레이아웃 구현
- JavaScript를 활용한 사용자 인터랙션 구현
- `localStorage`를 활용한 다크 모드 상태 저장
- GitHub REST API를 활용한 프로젝트 목록 동적 렌더링
- `IntersectionObserver`를 활용한 스크롤 노출 애니메이션
- 문의 폼 입력값 검증 및 오류 메시지 처리
- GitHub Pages를 활용한 배포

---

## 2. 최종 결과물

### 주요 화면
- Hero
- About Me
- Skills
- Projects
- Contact
- Footer

### 주요 인터랙션
- 반응형 햄버거 메뉴
- 다크 모드 전환 및 설정 저장
- 부드러운 페이지 스크롤
- 스크롤 위치에 따른 네비게이션 스타일 변경
- Scroll Top 버튼
- 스크롤 노출 애니메이션
- GitHub API 프로젝트 목록 출력 (로딩 / 성공 / 오류 / 빈 상태 처리)
- 문의 폼 유효성 검사

---

## 3. 스크린샷

### Desktop
| 라이트 모드 | 다크 모드 |
| :---: | :---: |
| ![데스크톱 라이트 모드](images/desktop_light.png) | ![데스크톱 다크 모드](images/desktop_dark.png) |

### Mobile
| 라이트 모드 | 다크 모드 | 모바일 메뉴 |
| :---: | :---: | :---: |
| ![모바일 라이트 모드](images/mobile_light.png) | ![모바일 다크 모드](images/mobile_dark.png) | ![모바일 메뉴](images/mobile_menu.png) |

---

## 4. 사용 기술

### Frontend
- HTML5
- CSS3 (CSS Grid, Flexbox)
- Vanilla JavaScript (ES6+)

### API
- GitHub REST API

### 개발 도구
- Visual Studio Code
- Live Server
- Google Chrome

### 배포
- GitHub Pages

---

## 5. 주요 기능

### 5.1 반응형 네비게이션
PC와 모바일 환경에 맞춰 네비게이션을 다르게 표시합니다.
- 데스크톱: 가로형 네비게이션
- 모바일: 햄버거 메뉴
- 메뉴 항목 클릭 시 해당 섹션으로 부드럽게 이동하며 모바일 메뉴는 자동으로 닫힙니다.
- 모바일 우선(Mobile-First) 방식으로 작성되었으며, `768px`과 `1024px`을 주요 브레이크포인트로 설정했습니다.

### 5.2 다크 모드
화면의 테마를 라이트 / 다크 모드로 전환할 수 있습니다.

```text
사용자 클릭 → theme 상태 변경 → data-theme 변경 → CSS 변수 변경 → 화면 테마 변경
```

- 선택한 테마는 `localStorage`에 저장되어 재방문 시에도 유지됩니다.
- 초기 로드 시 저장된 테마 값을 우선 적용하며, 없는 경우 기본 테마를 적용합니다.

### 5.3 GitHub API 프로젝트 연동
GitHub REST API를 사용하여 저장소 목록을 동적으로 가져옵니다.

- **API 형식**: `https://api.github.com/users/{본인아이디}/repos`
- **데이터 흐름**:
  ```text
  fetch() → GitHub API 요청 → 응답 확인 → 저장소 데이터 필터링 → 프로젝트 카드 생성 → 화면 출력
  ```
- `async/await` 및 `try/catch`를 사용한 비동기/예외 처리
- Fork 저장소 및 Archived 저장소는 목록에서 제외 필터링 적용

### 5.4 GitHub API 상태 및 오류 시뮬레이션

API 요청 결과에 따라 사용자에게 적절한 피드백을 제공하며, 모든 UI 상태(Loading / Success / Empty / Error)를 직접 검증할 수 있도록 테스트 모드를 제공합니다.

| 상태 | 화면 표시 및 처리 방식 |
| :--- | :--- |
| **Loading** | 스켈레톤 UI 또는 스피너와 함께 "불러오는 중" 안내 표시 |
| **Success** | 필터링된 저장소 목록을 프로젝트 카드로 그리드 출력 |
| **Empty** | 가져온 저장소가 없을 경우 "표시할 프로젝트가 없습니다" 안내 표시 |
| **Error** | 네트워크 실패/Rate Limit 초과 시 안내 메시지 및 **[다시 시도]** 버튼 렌더링 |

#### API 상태별 테스트 방법
평가자 및 개발자가 정상 케이스 외의 UI를 확인할 수 있도록 URL 파라미터 및 콘솔 테스트 인터페이스를 지원합니다.

1. **URL 파라미터 방식**
   - **Error 상태 테스트**: `https://<배포주소>/?test_api=error`
   - **Empty 상태 테스트**: `https://<배포주소>/?test_api=empty`
   - 에러 화면에서 **[다시 시도]** 버튼 클릭 시 정상 API 호출로 복구되는 흐름을 검증할 수 있습니다.

2. **브라우저 개발자 도구(Console) 테스트**
   콘솔창(`F12`)에서 전역 함수를 호출하여 즉시 상태를 전환할 수 있습니다.
   ```javascript
   // Error 상태 및 다시 시도 UI 확인
   __simulateGitHubState('error');

   // Empty 상태 UI 확인
   __simulateGitHubState('empty');

   // 정상 API 상태로 복구
   __simulateGitHubState('reset');

### 5.5 Contact Form
문의 폼 입력값에 대한 유효성 검사를 수행합니다.

- **검증 항목**: 필수 입력 여부(이름, 메시지), 이메일 포맷 형식
- **피드백**: 문제가 있는 경우 해당 입력 필드 주변에 직관적인 에러 메시지를 표시하며, 정상 입력 완료 시 성공 메시지를 노출합니다.

### 5.6 Scroll UI
스크롤 위치에 반응하여 유용한 인터랙션을 제공합니다.
- **Scroll Top 버튼**: 스크롤 `300px` 이상 도달 시 표시 / 클릭 시 최상단 부드러운 스크롤 이동
- **Nav Scroll UI**: 스크롤 `60px` 이상 위치 시 네비게이션 스타일 변경

### 5.7 Scroll Animation
- `IntersectionObserver`를 활용하여 화면 내 섹션 진입 시 페이드인 애니메이션을 적용했습니다.
- 기본 `threshold: 0.2` 설정으로 요소가 20% 이상 노출되었을 때 동작합니다.

---

## 6. 상태 → 렌더링 구조

기능별 상태 흐름 및 화면 반영 구조:

- **Dark Mode**: 사용자 클릭 → `theme` 상태 변경 → `data-theme` 적용 → CSS 변수 반영 → 화면 갱신
- **GitHub API**: API 요청 → `loading` → `success` / `error` / `empty` → 프로젝트 영역 렌더링
- **Contact Form**: 입력 → `input` 이벤트 → 값 검증 → 에러 표시 → `submit` → 성공 메시지 표시

> 💡 **확장 아이디어**: 현재는 기능별 상태 변수로 관리되지만, 상태 복잡도가 증가하면 다음과 같은 중앙 상태 객체(`STATE`) 형태로 통합 확장할 수 있습니다.
> ```javascript
> const STATE = {
>   githubApiState: "idle",
>   repositories: [],
>   theme: "light"
> };
> ```

---

## 7. 요구 사항 검증

| 요구 사항 | 구현 내용 |
| :--- | :--- |
| **시맨틱 HTML** | `header`, `nav`, `main`, `section`, `article`, `footer` 사용 |
| **반응형 디자인** | 모바일 우선 + `768px`, `1024px` 브레이크포인트 |
| **Flexbox** | 네비게이션 및 1차원 UI 요소 정렬 |
| **CSS Grid** | Skills / Projects 카드형 2차원 그리드 레이아웃 (`auto-fit`, `minmax()`) |
| **CSS 변수** | `:root`와 `[data-theme="dark"]`를 통한 테마 시스템 구축 |
| **다크 모드** | JavaScript 상태 제어 + `localStorage` 유지 |
| **네비게이션/스크롤** | 모바일 햄버거 메뉴, `scrollTo()`, Scroll Top 버튼, Nav 스타일 변화 |
| **IntersectionObserver** | 섹션 노출 감지 애니메이션 |
| **GitHub API** | `fetch`, `async/await`, `try/catch`, Loading/Success/Empty/Error 상태 처리 |
| **Form Validation** | 이름, 이메일, 메시지 입력값 검증 및 실시간/제출 피드백 |
| **DOM 및 ES6+** | `querySelector`, `classList`, 구조 분해 할당, 화살표 함수, 고차함수 등 활용 |

### Flexbox vs Grid 선택 기준
- **Flexbox**: 네비게이션, 버튼 그룹 등 1차원 축(가로 또는 세로) 정렬이 필요한 영역
- **CSS Grid**: Skills, Projects 등 카드 컴포넌트가 행과 열을 동시에 형성하는 2차원 레이아웃 영역

---

## 8. 프로젝트 구조

```text
portfolio/
├── index.html
├── README.md
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── common.css
│   ├── components.css
│   ├── responsive.css
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── profile.jpg
    ├── desktop_dark.png
    ├── desktop_light.png
    ├── mobile_dark.png
    ├── mobile_light.png
    └── mobile_menu.png
```

### CSS 모듈 분리
`style.css`에서 다음과 같이 모듈화된 CSS를 순서대로 임포트합니다.

```css
@import url("reset.css");
@import url("variables.css");
@import url("common.css");
@import url("components.css");
@import url("responsive.css");
```

---

## 9. JavaScript 구성

`index.html`에서 스크립트는 `defer` 속성을 통해 DOM 파싱 완료 후 실행되도록 선언합니다.

```html
<script src="js/main.js" defer></script>
```

**main.js 실행 흐름**:
```text
Mobile Navigation → Theme → Smooth Scroll → Scroll UI → IntersectionObserver → GitHub API → Contact Form Validation
```

---

## 10. 로컬 실행 방법

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/SJendministrator/codysseyB_1.git
   ```
2. 프로젝트 폴더를 Visual Studio Code로 엽니다.
3. `index.html` 파일을 마우스 우클릭 후 **"Open with Live Server"** 를 실행합니다.
4. 브라우저에서 포트폴리오 화면을 확인합니다.

---

## 11. 주요 기준값

| 기능 | 기준값 |
| :--- | :--- |
| Scroll Top 버튼 표시 | `300px` 이상 스크롤 |
| Navigation 배경 스타일 변경 | `60px` 이상 스크롤 |
| IntersectionObserver Threshold | `0.2` (요소의 20% 노출 시) |
| Projects 카드 최소 너비 | `280px` (`minmax(280px, 1fr)`) |
| Skills 카드 최소 너비 | `200px` (`minmax(200px, 1fr)`) |
| 1차 반응형 Breakpoint | `768px` |
| 2차 반응형 Breakpoint | `1024px` |

---

## 12. 제한 사항

- GitHub API는 비인증(Unauthenticated) 방식으로 요청하므로 시간당 호출 횟수 제한(Rate Limit)이 존재합니다.
- Contact Form은 클라이언트 측 유효성 검사 위주로 구현되어 있으며, 외부 메일 전송 API(예: EmailJS 등)와는 직접 연동되어 있지 않습니다.
- 본 사이트는 순수 정적 웹페이지로 GitHub Pages를 통해 호스팅됩니다.

---

## 13. 배포 및 저장소

- **GitHub Repository**: [https://github.com/SJendministrator/codysseyB_1](https://github.com/SJendministrator/codysseyB_1)
- **Live Demo (GitHub Pages)**: [https://SJendministrator.github.io/codysseyB_1/](https://SJendministrator.github.io/codysseyB_1/)


