// ==============================
// Mobile Navigation
// event → class state → menu render
// ==============================

// [역할] 모바일 환경에서 햄버거 토글 버튼 DOM 요소를 찾아 참조 변수에 할당합니다.
// [사용 변수] navToggle: 햄버거 버튼 엘리먼트 객체 (<button class="nav-toggle"> 등)
const navToggle = document.querySelector(".nav-toggle");

// [역할] 모바일 화면에서 열고 닫힐 네비게이션 메뉴 목록 컨테이너 DOM 요소를 참조합니다.
// [사용 변수] navMenu: 메뉴 리스트 엘리먼트 객체 (<nav class="nav-menu"> 등)
const navMenu = document.querySelector(".nav-menu");

// [역할] 클릭 시 메뉴를 자동으로 닫아야 하는 모든 링크 요소(메뉴 링크, 히어로 버튼 링크, 로고 링크)를 일괄 선택합니다.
// [사용 변수] navLinks: NodeList 컬렉션 (반복문으로 각각 이벤트 리스너를 등록할 대상)
const navLinks = document.querySelectorAll(
    ".nav-menu a, .hero-buttons a, .logo"
);

// [역할] 열려 있는 모바일 메뉴를 닫고 접근성(ARIA) 속성을 기본 상태로 복구하는 함수를 정의합니다.
// [상태 변화] navMenu와 navToggle의 'active' 클래스 제거, aria-expanded="false"로 변경하여 스크린 리더에 닫힘 상태 알림
const closeMobileMenu = () => {
    // [역할] 메뉴 목록에서 active 클래스를 제거하여 화면에서 숨깁니다.
    // [상태 변화] navMenu 클래스 목록에서 'active' 상태가 제거됨 (CSS에 의해 메뉴가 닫힘)
    navMenu.classList.remove("active");

    // [역할] 햄버거 버튼에서 active 클래스를 제거하여 기본 햄버거 아이콘 형태로 되돌립니다.
    // [상태 변화] navToggle 클래스 목록에서 'active' 상태가 제거됨 (X 아이콘 → 햄버거 아이콘)
    navToggle.classList.remove("active");

    // [역할] 웹 접근성 속성을 '닫힘(false)' 상태로 갱신합니다.
    // [상태 변화] DOM 속성 aria-expanded="false"로 갱신
    navToggle.setAttribute("aria-expanded", "false");

    // [역할] 스크린 리더용 라벨을 "메뉴 열기"로 복원합니다.
    // [상태 변화] DOM 속성 aria-label="메뉴 열기"로 갱신
    navToggle.setAttribute("aria-label", "메뉴 열기");
};

// [역할] 햄버거 토글 버튼 클릭 시 메뉴의 열림/닫힘 상태를 반전시키는 이벤트 리스너를 등록합니다.
navToggle.addEventListener("click", () => {
    // [역할] navMenu의 active 클래스를 토글(있으면 제거, 없으면 추가)하고 그 결과(열림 여부)를 불리언으로 반환받습니다.
    // [사용 변수] isOpen: true(메뉴 열림) 또는 false(메뉴 닫힘)의 불리언 상태값
    // [상태 변화] navMenu의 'active' 클래스 상태가 반전됨
    const isOpen = navMenu.classList.toggle("active");

    // [역할] 메뉴의 열림 상태(isOpen)와 동일하게 토글 버튼의 active 클래스를 동기화합니다.
    // [상태 변화] isOpen이 true면 토글 버튼에 'active' 추가, false면 제거
    navToggle.classList.toggle("active", isOpen);

    // [역할] 접근성 트리(스크린 리더)에 현재 메뉴가 열려 있는지 닫혀 있는지 문자열("true"/"false")로 통보합니다.
    // [상태 변화] DOM 속성 aria-expanded가 "true" 또는 "false"로 갱신됨
    navToggle.setAttribute("aria-expanded", String(isOpen));

    // [역할] 현재 상태에 맞추어 버튼의 대체 텍스트를 "메뉴 닫기" 또는 "메뉴 열기"로 전환합니다.
    // [상태 변화] DOM 속성 aria-label이 현재 열림 여부에 맞게 변경됨
    navToggle.setAttribute(
        "aria-label",
        isOpen ? "메뉴 닫기" : "메뉴 열기"
    );
});


// ==============================
// Theme
// localStorage state → CSS theme render
// ==============================

// [역할] 라이트/다크 테마를 전환하는 토글 버튼 DOM 요소를 선택합니다.
// [사용 변수] themeToggle: 테마 전환 버튼 엘리먼트
const themeToggle = document.querySelector(".theme-toggle");

// [역할] data-theme 속성을 적용할 최상위 <html> 태그 엘리먼트를 참조합니다.
// [사용 변수] html: document.documentElement (CSS 변수가 선언된 루트 요소)
const html = document.documentElement;

// [역할] 사용자가 이전에 방문하여 저장해둔 테마 설정값("light" 또는 "dark")을 로컬 스토리지에서 읽어옵니다.
// [사용 변수] savedTheme: 저장된 테마 문자열("light" | "dark") 또는 저장값이 없을 경우 null
const savedTheme = localStorage.getItem("portfolio-theme");

// [역할] 전달받은 테마 문자열에 맞추어 <html> 태그의 data-theme 속성, 토글 버튼 아이콘, 접근성 라벨을 렌더링하는 함수입니다.
// [사용 변수] theme: 적용할 테마 문자열 ("light" | "dark")
const renderTheme = (theme) => {
    // [역할] 현재 적용하려는 테마가 다크 모드인지 확인합니다.
    // [사용 변수] isDark: 다크 모드 여부를 나타내는 불리언 값 (true | false)
    const isDark = theme === "dark";

    // [역할] 루트 <html> 요소에 data-theme 속성을 설정하여 CSS 테마 변수를 일괄 변경합니다.
    // [상태 변화] <html data-theme="dark"> 또는 <html data-theme="light">로 DOM 속성이 변경됨
    html.setAttribute("data-theme", theme);

    // [역할] 버튼 아이콘을 현재 테마의 반대(누르면 변경될 상태를 상징하는 아이콘)로 변경합니다.
    // [상태 변화] 다크 모드일 땐 해(☀️), 라이트 모드일 땐 달(🌙)로 버튼 텍스트 변경
    themeToggle.textContent = isDark ? "☀️" : "🌙";

    // [역할] 스크린 리더용 라벨을 현재 상태에 맞게 갱신합니다.
    // [상태 변화] aria-label 속성이 "라이트 모드로 전환" 또는 "다크 모드로 전환"으로 갱신됨
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "라이트 모드로 전환" : "다크 모드로 전환"
    );
};

// [역할] 로컬 스토리지 값 → HTML 태그의 기존 data-theme 속성 → 기본값 "light" 순서로 우선순위를 두어 초기 테마를 결정합니다.
// [사용 변수] initialTheme: 최종 결정된 초기 테마 문자열 ("light" 또는 "dark")
const initialTheme =
    savedTheme || html.getAttribute("data-theme") || "light";

// [역할] 페이지 로드 시 최초 1회 결정된 테마로 화면을 초기 렌더링합니다.
// [상태 변화] 루트 요소의 data-theme 및 버튼 UI가 초기 테마 상태로 즉시 세팅됨
renderTheme(initialTheme);

// [역할] 테마 전환 버튼 클릭 시 현재 테마를 반전시키고 로컬 스토리지에 영구 저장 후 렌더링을 갱신합니다.
themeToggle.addEventListener("click", () => {
    // [역할] 현재 <html> 요소에 적용되어 있는 테마 속성값을 읽어옵니다.
    // [사용 변수] currentTheme: 현재 테마 문자열 ("dark" 또는 "light")
    const currentTheme = html.getAttribute("data-theme");

    // [역할] 현재 테마의 반대 테마를 계산합니다.
    // [사용 변수] nextTheme: 새로 전환할 다음 테마 문자열 ("light" 또는 "dark")
    const nextTheme =
        currentTheme === "dark" ? "light" : "dark";

    // [역할] 사용자가 선택한 새 테마를 브라우저 로컬 스토리지에 영구 저장하여 새로고침 시에도 유지되도록 합니다.
    // [상태 변화] localStorage['portfolio-theme'] 데이터가 nextTheme 값으로 갱신됨
    localStorage.setItem("portfolio-theme", nextTheme);

    // [역할] 새로 계산된 테마로 화면 UI를 즉시 재렌더링합니다.
    // [상태 변화] HTML 루트의 data-theme 및 버튼 아이콘 갱신
    renderTheme(nextTheme);
});


// ==============================
// Smooth Scroll
// click event → target section scroll
// ==============================

// [역할] 메뉴 링크, 히어로 버튼 등 내부 앵커 링크들을 순회하며 부드러운 스크롤 이동 이벤트를 바인딩합니다.
navLinks.forEach((link) => {
    // [역할] 각각의 링크 요소에 클릭 이벤트 리스너를 등록합니다.
    link.addEventListener("click", (event) => {
        // [역할] 클릭된 링크의 href 속성값(예: "#about", "#projects")을 추출합니다.
        // [사용 변수] targetId: 이동할 앵커 ID 문자열 (예: "#projects") 또는 null
        const targetId = link.getAttribute("href");

        // [역할] href가 비어있거나 내부 앵커 ID(#으로 시작)가 아닌 외부 링크인 경우 커스텀 스크롤 처리를 중단하고 기본 동작을 허용합니다.
        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        // [역할] 추출한 ID 선택자를 통해 실제 이동할 대상 섹션 DOM 엘리먼트를 찾습니다.
        // [사용 변수] targetSection: 화면 내 대상 섹션 엘리먼트 객체 또는 null
        const targetSection = document.querySelector(targetId);

        // [역할] 화면에 일치하는 ID의 섹션이 존재하지 않으면 오류 방지를 위해 함수를 종료합니다.
        if (!targetSection) {
            return;
        }

        // [역할] 브라우저의 기본 급격한 해시 점프(# 이동) 동작을 취소합니다.
        // [상태 변화] 브라우저 URL 해시 갱신 및 즉각 점프 방지
        event.preventDefault();

        // [역할] 대상 섹션의 상단이 뷰포트 맨 위에 오도록 부드러운(smooth) 애니메이션 스크롤을 실행합니다.
        // [상태 변화] 브라우저 뷰포트의 스크롤 위치가 대상 섹션 위치로 부드럽게 이동함
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // [역할] 모바일 환경에서 메뉴 링크를 클릭했을 경우, 이동과 동시에 열려있던 햄버거 메뉴를 자동으로 닫습니다.
        // [상태 변화] 모바일 메뉴 닫힘 및 관련 클래스/ARIA 상태 초기화
        closeMobileMenu();
    });
});


// ==============================
// Scroll UI
// scroll position → header/top-button render
// ==============================

// [역할] 스크롤 위치에 따라 스타일(배경/그림자)을 변경할 상단 헤더 요소를 선택합니다.
// [사용 변수] header: 헤더 엘리먼트 객체 (<header class="header">)
const header = document.querySelector(".header");

// [역할] 일정 거리 이상 스크롤 시 화면에 표시할 맨 위로 가기(Top) 버튼 요소를 선택합니다.
// [사용 변수] scrollTopButton: 맨 위로 가기 버튼 엘리먼트 (<button id="scroll-top">)
const scrollTopButton = document.querySelector("#scroll-top");

// [역할] Top 버튼이 화면에 나타나기 시작하는 스크롤 Y축 기준점(픽셀)을 상수로 정의합니다.
// [사용 변수] scrollThreshold: 300 (상수)
const scrollThreshold = 300;

// [역할] 헤더에 스크롤 스타일(배경색, 보더 등)이 적용되는 스크롤 Y축 기준점(픽셀)을 상수로 정의합니다.
// [사용 변수] headerThreshold: 60 (상수)
const headerThreshold = 60;

// [역할] 현재 스크롤 위치를 감지하여 헤더와 Scroll Top 버튼의 노출/스타일 상태 클래스를 갱신하는 함수입니다.
const renderScrollUi = () => {
    // [역할] 현재 브라우저 창의 수직 스크롤 위치(Y축 픽셀값)를 가져옵니다.
    // [사용 변수] scrollY: 현재 스크롤 Y 좌표 숫자
    const scrollY = window.scrollY;

    // [역할] 스크롤이 60px 이상이면 헤더에 'scrolled' 클래스를 추가하고, 미만이면 제거합니다.
    // [상태 변화] header.classList의 'scrolled' 상태가 스크롤 위치에 따라 실시간 동기화됨
    header.classList.toggle(
        "scrolled",
        scrollY >= headerThreshold
    );

    // [역할] 스크롤이 300px 이상이면 Top 버튼에 'show' 클래스를 추가하고, 미만이면 숨깁니다.
    // [상태 변화] scrollTopButton.classList의 'show' 상태가 스크롤 위치에 따라 실시간 동기화됨
    scrollTopButton.classList.toggle(
        "show",
        scrollY >= scrollThreshold
    );
};

// [역할] 윈도우 스크롤 이벤트 발생 시 renderScrollUi를 호출하도록 리스너를 등록합니다.
// [최적화] passive: true 옵션으로 스크롤 성능을 향상시키고 메인 스레드 지연을 방지합니다.
window.addEventListener(
    "scroll",
    renderScrollUi,
    { passive: true }
);

// [역할] Scroll Top 버튼 클릭 시 최상단(Y=0)으로 부드럽게 스크롤하는 이벤트를 등록합니다.
scrollTopButton.addEventListener("click", () => {
    // [역할] 화면을 최상단으로 부드럽게 스크롤 이동시킵니다.
    // [상태 변화] 뷰포트 Y축 스크롤 위치가 0으로 부드럽게 이동함
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// [역할] 페이지가 새로고침되거나 처음 열렸을 때 현재 스크롤 위치를 즉시 반영하여 헤더와 버튼 상태를 맞춥니다.
// [상태 변화] 초기 스크롤 위치에 따른 헤더/버튼 클래스 즉각 세팅
renderScrollUi();


// ==============================
// Reveal Animation
// observer state → visible class render
// ==============================

// [역할] 스크롤을 내릴 때 화면에 페이드인/슬라이드인 애니메이션으로 나타날 대상 엘리먼트들을 일괄 선택합니다.
// [사용 변수] revealTargets: NodeList 컬렉션 (섹션 타이틀, 소개 내용, 스킬 카드, 프로젝트 컨테이너 등)
const revealTargets = document.querySelectorAll(
    ".section-title, " +
    ".about-content, " +
    ".skill-card, " +
    ".projects .container, " +
    ".contact .container"
);

// [역할] 대상 요소가 화면(뷰포트)에 진입했는지를 감지하는 IntersectionObserver 인스턴스를 생성합니다.
// [사용 변수] revealObserver: 교차 관찰자 객체
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        // [역할] 감시 중인 대상 요소들의 교차 상태 변화 목록을 순회합니다.
        // [사용 변수] entries: 감시 대상 요소들의 교차 정보 배열
        entries.forEach((entry) => {
            // [역할] 요소가 화면 뷰포트 기준 20%(threshold: 0.2) 이상 보이지 않는 상태라면 동작을 건너뜁니다.
            if (!entry.isIntersecting) {
                return;
            }

            // [역할] 화면에 진입한 요소에 'is-visible' 클래스를 부여하여 CSS 애니메이션을 시작합니다.
            // [상태 변화] 대상 DOM 요소에 'is-visible' 클래스 추가됨 (불투명도 100%, 원래 위치로 이동 등)
            entry.target.classList.add("is-visible");

            // [역할] 이미 한 번 애니메이션이 트리거된 요소는 관찰 대상에서 제외하여 불필요한 연산과 중복 실행을 방지합니다.
            // [상태 변화] 해당 DOM 요소의 교차 감시가 종료됨
            observer.unobserve(entry.target);
        });
    },
    {
        // [역할] 요소의 높이 중 20%가 화면에 보일 때 콜백을 트리거하도록 임계값을 설정합니다.
        threshold: 0.2
    }
);

// [역할] 애니메이션 대상 요소들에 초기 CSS 트랜지션용 클래스('reveal')를 부여하고 관찰 대상에 등록합니다.
revealTargets.forEach((target) => {
    // [역할] 초기에 투명하거나 아래로 살짝 내려가 있도록 'reveal' 베이스 클래스를 부여합니다.
    // [상태 변화] target 엘리먼트에 'reveal' 클래스 추가됨
    target.classList.add("reveal");

    // [역할] IntersectionObserver가 해당 요소를 감시하기 시작하도록 등록합니다.
    revealObserver.observe(target);
});


// ==============================
// GitHub Projects
// request state → project UI render
// ==============================

// [역할] GitHub API를 조회할 본인의 GitHub 사용자명을 상수로 정의합니다.
// [사용 변수] githubUsername: 문자열 "SJendministrator"
const githubUsername = "SJendministrator";

// [역할] 최근 수정순(sort=updated)으로 최대 100개(per_page=100)의 저장소를 조회할 API 엔드포인트 URL을 생성합니다.
// [사용 변수] apiUrl: GitHub REST API 호출 경로 문자열
const apiUrl =
    `https://api.github.com/users/${githubUsername}/repos` +
    "?sort=updated&per_page=100";

// [역할] 로딩, 성공 개수, 에러 메시지 등 API 상태 텍스트를 출력할 상태 영역 DOM 요소를 참조합니다.
// [사용 변수] projectStatus: 상태 메시지 표시 엘리먼트 (<div class="project-status">)
const projectStatus =
    document.querySelector(".project-status");

// [역할] GitHub 프로젝트 카드들이 렌더링되어 들어갈 그리드 컨테이너 DOM 요소를 참조합니다.
// [사용 변수] projectList: 프로젝트 카드 목록 컨테이너 (<div class="project-list">)
const projectList =
    document.querySelector(".project-list");

// [역할] API 호출 실패 시 에러 화면에서 노출할 '다시 시도' 버튼 요소를 참조합니다.
// [사용 변수] retryButton: 재시도 버튼 엘리먼트 (<button class="retry-button">)
const retryButton =
    document.querySelector(".retry-button");

// [역할] 현재 GitHub API 연동 상태를 추적하는 내부 전역 상태 변수입니다.
// [사용 변수] githubApiState: "idle" | "loading" | "success" | "error"
let githubApiState = "idle";

// [역할] API 호출 중 에러 발생 시 가장 최근의 에러 객체를 보관하는 변수(디버그 및 로깅용)입니다.
// [사용 변수] lastGithubApiError: Error 객체 또는 null
let lastGithubApiError = null;


// ==============================
// GitHub API Safety
// GitHub text → escaped HTML
// ==============================

// [역할] GitHub API에서 받아온 문자열에 악의적인 스크립트(XSS)가 포함되지 않도록 특수문자를 HTML 엔티티로 치환하는 보안 함수입니다.
// [사용 변수] value: 소독할 원본 문자열
const escapeHtml = (value = "") => {
    // [역할] &, <, >, ', " 문자를 정규식으로 찾아 안전한 엔티티 코드(&amp;, &lt; 등)로 변환한 문자열을 반환합니다.
    return String(value).replace(
        /[&<>'"]/g,
        (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            "\"": "&quot;"
        })[character]
    );
};

// [역할] 전달받은 URL이 실제 안전한 GitHub 도메인인지 검증하여 오픈 리다이렉트나 잘못된 스키마를 방지하는 보안 함수입니다.
// [사용 변수] url: 저장소 웹페이지 URL 문자열
const getSafeRepositoryUrl = (url) => {
    // [역할] URL이 "https://github.com/"으로 올바르게 시작하면 원본 URL을, 그렇지 않으면 기본 GitHub 메인 주소를 반환합니다.
    return url?.startsWith("https://github.com/")
        ? url
        : "https://github.com/";
};


// ==============================
// GitHub Project Render
// state → UI
// ==============================

// [역할] API 상태("loading" | "error" | "success")와 저장소 데이터 배열을 전달받아 프로젝트 섹션 UI를 전면 갱신합니다.
// [사용 변수] state: 현재 상태 문자열, repositories: 렌더링할 저장소 객체 배열
const renderProjects = (
    state,
    repositories = []
) => {
    // [역할] 전달받은 상태를 내부 상태 변수 githubApiState에 동기화합니다.
    // [상태 변화] githubApiState가 전달된 state 값으로 갱신됨
    githubApiState = state;

    // [역할] 새로운 상태를 렌더링하기 전에 기존에 출력되어 있던 프로젝트 카드 목록을 완전히 초기화(비움)합니다.
    // [상태 변화] projectList 엘리먼트 내부 HTML이 빈 문자열로 초기화됨
    projectList.innerHTML = "";

    // [역할] 현재 상태가 'error'일 때만 다시 시도 버튼을 노출하고, 그 외(loading, success) 상태에는 버튼을 숨깁니다.
    // [상태 변화] retryButton의 hidden 속성이 true 또는 false로 토글됨
    retryButton.hidden = state !== "error";


    // Loading 상태 분기 처리
    if (state === "loading") {
        // [역할] 로딩 스피너 아이콘과 함께 안내 문구를 표시합니다.
        // [상태 변화] projectStatus에 로딩 스피너 및 로딩 텍스트 HTML 주입
        projectStatus.innerHTML =
            '<span class="loading-spinner" aria-hidden="true"></span>' +
            " 프로젝트를 불러오는 중...";

        // [역할] 로딩 중에는 카드를 그리지 않으므로 조기 종료합니다.
        return;
    }


    // Error 상태 분기 처리
    if (state === "error") {
        // [역할] 네트워크 실패 또는 API 제한 초과 시 사용자에게 안내 메시지를 표시합니다.
        // [상태 변화] projectStatus 텍스트가 오류 안내 문구로 갱신됨
        projectStatus.textContent =
            "프로젝트를 불러올 수 없습니다. " +
            "잠시 후 다시 시도해 주세요.";

        // [역할] 오류 상태에서는 카드를 그리지 않으므로 조기 종료합니다.
        return;
    }


    // Empty 상태 분기 처리 (저장소가 0개인 경우)
    if (repositories.length === 0) {
        // [역할] 성공적으로 호출했으나 표시할 저장소가 없을 때 빈 상태 메시지를 표시합니다.
        // [상태 변화] projectStatus 텍스트가 빈 상태 안내 문구로 갱신됨
        projectStatus.textContent =
            "표시할 프로젝트가 없습니다.";

        // [역할] 표시할 카드가 없으므로 조기 종료합니다.
        return;
    }


    // Success 상태 분기 처리 (저장소가 1개 이상 존재하는 경우)
    // [역할] 현재 표시 중인 프로젝트의 총 개수를 안내 텍스트로 출력합니다.
    // [상태 변화] projectStatus 텍스트가 "N개의 프로젝트를 표시하고 있습니다."로 변경됨
    projectStatus.textContent =
        `${repositories.length}개의 프로젝트를 표시하고 있습니다.`;

    // [역할] 저장소 배열을 순회하며 HTML 카드 템플릿 문자열로 변환한 후 한 번에 DOM에 삽입합니다.
    // [상태 변화] projectList 내부가 개별 프로젝트 카드(<article class="project-card">)들로 채워짐
    projectList.innerHTML = repositories
        .map((repository) => {
            // [역할] 저장소 객체에서 필요한 프로퍼티들을 구조 분해 할당합니다.
            // [사용 변수] name, description, language, url, stars
            const {
                name,
                description,
                language,
                html_url: url,
                stargazers_count: stars
            } = repository;

            // [역할] 설명이 비어있을 경우 기본 대체 문구를 설정하고, XSS 방지를 위해 HTML 특수문자를 이스케이프 처리합니다.
            // [사용 변수] safeDescription: 안전하게 소독된 설명 문자열
            const safeDescription = escapeHtml(
                description ||
                "프로젝트 설명이 아직 등록되지 않았습니다."
            );

            // [역할] 사용 언어가 null일 경우 'Code'로 대체하고 안전하게 이스케이프 처리합니다.
            // [사용 변수] languageLabel: 소독된 언어 표시 문자열
            const languageLabel = escapeHtml(
                language || "Code"
            );

            // [역할] 저장소 이름(리포지토리명)을 안전하게 이스케이프 처리합니다.
            // [사용 변수] repositoryName: 소독된 이름 문자열
            const repositoryName = escapeHtml(name);

            // [역할] 링크 주소가 정상적인 GitHub 주소인지 검증합니다.
            // [사용 변수] projectUrl: 검증 완료된 이동 URL 문자열
            const projectUrl =
                getSafeRepositoryUrl(url);

            // [역할] 개별 프로젝트 카드 마크업을 템플릿 리터럴로 생성하여 반환합니다.
            return `
                <article class="project-card">
                    <div class="project-card__meta">
                        <span>${languageLabel}</span>
                        <span aria-label="스타 ${stars}개">
                            ★ ${stars}
                        </span>
                    </div>

                    <h3>${repositoryName}</h3>

                    <p>${safeDescription}</p>

                    <a
                        class="project-link"
                        href="${projectUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub에서 보기
                        <span aria-hidden="true">↗</span>
                    </a>
                </article>
            `;
        })
        .join(""); // [역할] 생성된 배열의 HTML 문자열들을 하나의 거대한 문자열로 결합합니다.
};


// ==============================
// GitHub API Request
// async / await → loading / success / error
// ==============================

// [역할] GitHub API에 비동기 HTTP GET 요청을 보내 데이터를 가져오고 상태에 따라 렌더링 함수를 호출합니다.
// [사용 변수] requestUrl: 호출할 API 주소 (기본값: apiUrl)
const fetchRepositories = async (
    requestUrl = apiUrl
) => {
    // [역할] API 요청이 시작되었음을 UI에 알리기 위해 로딩 상태를 즉시 렌더링합니다.
    // [상태 변화] githubApiState = "loading", 화면에 로딩 스피너 표시
    renderProjects("loading");

    // [역할] 이전 요청에서 발생했을 수 있는 오류 기록을 초기화합니다.
    // [상태 변화] lastGithubApiError 변수가 null로 초기화됨
    lastGithubApiError = null;

    try {
        // [역할] fetch API를 사용해 비동기로 GitHub REST API 서버에 데이터를 요청합니다.
        // [사용 변수] response: HTTP 응답 객체 (Response)
        const response = await fetch(
            requestUrl,
            {
                headers: {
                    // [역할] GitHub 공식 권장 버전의 JSON 응답 헤더를 명시합니다.
                    Accept:
                        "application/vnd.github+json"
                }
            }
        );

        // [역할] HTTP 상태 코드가 200~299 범위가 아닐 경우(예: 403 Rate Limit, 404 Not Found) 에러를 강제 발생시킵니다.
        if (!response.ok) {
            throw new Error(
                `GitHub API request failed: ${response.status}`
            );
        }

        // [역할] 응답 본문을 JSON 파싱하여 자바스크립트 객체/배열로 변환합니다.
        // [사용 변수] repositories: GitHub 저장소 정보가 담긴 원본 데이터 배열
        const repositories =
            await response.json();

        // [역할] 단순 포크(fork)해온 저장소나 보관 처리(archived)된 저장소를 필터링하여 순수 공개 프로젝트만 선별합니다.
        // [사용 변수] publicRepositories: 필터링을 거친 최종 표시용 저장소 배열
        const publicRepositories =
            repositories.filter(
                ({ fork, archived }) =>
                    !fork && !archived
            );

        // [역할] 필터링된 저장소 목록을 전달하여 성공(success) 화면을 렌더링합니다.
        // [상태 변화] githubApiState = "success", 화면에 프로젝트 카드 렌더링 완료
        renderProjects(
            "success",
            publicRepositories
        );

    } catch (error) {
        // [역할] 발생한 에러 객체를 보관하여 디버그 객체에서 에러 원인을 추적할 수 있도록 합니다.
        // [상태 변화] lastGithubApiError에 Error 객체 저장
        lastGithubApiError = error;

        // [역할] 개발자가 브라우저 콘솔에서 에러 원인을 상세히 확인할 수 있도록 에러를 콘솔에 출력합니다.
        console.error(error);

        // [역할] 화면에 실패(error) 안내와 '다시 시도' 버튼을 렌더링합니다.
        // [상태 변화] githubApiState = "error", 에러 메시지 및 retryButton 표시
        renderProjects("error");
    }
};

// [역할] 오류 화면에서 '다시 시도' 버튼을 클릭하면 API를 재요청하도록 이벤트 리스너를 등록합니다.
// [상태 변화] 클릭 시 fetchRepositories()가 재호출되어 loading → success/error 사이클이 다시 실행됨
retryButton.addEventListener(
    "click",
    fetchRepositories
);


// ==============================
// Browser Console Debug
// 개발용 GitHub API 상태 확인
// ==============================

// [역할] 실제 API 호출 없이 콘솔에서 '성공(Success)' UI를 테스트하기 위한 모의(Mock) 저장소 데이터 객체입니다.
// [사용 변수] debugRepository: 샘플 저장소 정보 객체
const debugRepository = {
    name: "github-api-debug-success",
    description:
        "브라우저 콘솔에서 GitHub API 성공 상태를 확인하기 위한 샘플 저장소입니다.",
    language: "JavaScript",
    html_url: "https://github.com/",
    stargazers_count: 1
};

// [역할] 브라우저 개발자 도구(F12 콘솔)에서 강제로 상태를 변경해 볼 수 있도록 전역 객체(window)에 디버그 툴을 등록합니다.
// [보안] Object.freeze를 사용하여 디버그 객체의 무단 덮어쓰기나 수정을 방지합니다.
window.portfolioDebug = Object.freeze({
    github: Object.freeze({

        // [역할] 현재 API 연동 상태값과 마지막으로 발생한 에러 메시지를 반환합니다.
        // [사용처] 콘솔에서 portfolioDebug.github.status() 실행 시 확인 가능
        status: () => ({
            state: githubApiState,
            lastError:
                lastGithubApiError?.message ?? null
        }),

        // [역할] 실제 GitHub API를 처음부터 다시 호출합니다.
        // [사용처] 콘솔에서 portfolioDebug.github.reload() 실행
        reload: () => {
            fetchRepositories();
        },

        // [역할] API 호출 없이 가상의 성공 데이터를 바탕으로 강제 '성공' 화면을 렌더링합니다.
        // [상태 변화] githubApiState = "success", debugRepository 카드가 화면에 즉시 렌더링됨
        simulateSuccess: () => {
            lastGithubApiError = null;

            renderProjects(
                "success",
                [debugRepository]
            );
        },

        // [역할] 저장소가 0개인 상황(빈 목록)을 강제로 화면에 시뮬레이션합니다.
        // [상태 변화] githubApiState = "success", 화면에 "표시할 프로젝트가 없습니다." 문구 출력
        simulateEmpty: () => {
            lastGithubApiError = null;

            renderProjects(
                "success",
                []
            );
        },

        // [역할] 존재하지 않는 계정 URL로 고의 요청하여 실제 404 HTTP 오류 상태 및 재시도 버튼 동작을 검증합니다.
        // [상태 변화] fetch 실패 → githubApiState = "error", 화면에 에러 안내 및 다시 시도 버튼 노출
        requestNotFound: () => {
            fetchRepositories(
                "https://api.github.com/users/" +
                "this-user-does-not-exist-portfolio-debug/repos"
            );
        }
    })
});


// ==============================
// Contact Form
// input state → validation → message render
// ==============================

// [역할] 문의 폼 <form> DOM 엘리먼트를 참조합니다.
// [사용 변수] contactForm: 문의 폼 엘리먼트 객체 (<form id="contact-form">)
const contactForm =
    document.querySelector("#contact-form");

// [역할] 폼 제출 결과(성공 알림 또는 최종 오류 메시지)를 출력할 영역 DOM 요소를 참조합니다.
// [사용 변수] formSuccess: 결과 메시지 출력 엘리먼트 (<div id="form-success">)
const formSuccess =
    document.querySelector("#form-success");

// [역할] 폼 내부의 검증 대상인 모든 input과 textarea 엘리먼트를 NodeList에서 표준 자바스크립트 배열로 변환하여 보관합니다.
// [사용 변수] fields: 입력 필드 DOM 요소들의 배열 (이름, 이메일, 메시지 등)
const fields = [
    ...contactForm.querySelectorAll(
        "input, textarea"
    )
];


// [역할] 올바른 이메일 형식인지 정밀 검증하기 위한 표준 ASCII 기반 이메일 정규표현식 상수입니다.
// [사용 변수] emailPattern: RegExp 객체
const emailPattern =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;


// ==============================
// Field Validation
// input → validation state → error UI
// ==============================

// [역할] 단일 입력 필드의 입력값을 검증하고, 유효하지 않으면 필드 밑에 에러 메시지를 표시하며 결과를 불리언으로 반환합니다.
// [사용 변수] field: 검증 대상 input 또는 textarea 엘리먼트
const validateField = (field) => {
    // [역할] 현재 입력 필드를 감싸고 있는 부모 컨테이너(.form-group)를 탐색합니다.
    // [사용 변수] fieldGroup: 부모 래퍼 엘리먼트
    const fieldGroup =
        field.closest(".form-group");

    // [역할] 해당 입력 필드 전용 에러 메시지를 띄울 형제 엘리먼트를 선택합니다.
    // [사용 변수] errorMessage: 에러 문구 표시용 엘리먼트 (<span class="error-message">)
    const errorMessage =
        fieldGroup.querySelector(
            ".error-message"
        );

    // [역할] 검증 실패 시 사용자에게 보여줄 안내 문구를 보관할 로컬 변수를 선언합니다.
    // [사용 변수] message: 빈 문자열("")이면 정상, 내용이 있으면 오류 상태를 의미
    let message = "";

    // [역할] 사용자가 입력한 값에서 앞뒤 공백을 제거한 순수 텍스트를 추출합니다.
    // [사용 변수] value: 양 끝 공백이 제거된 입력 문자열
    const value =
        field.value.trim();


    // 1. 필수 입력값 검증 (빈 문자열 체크)
    if (!value) {
        // [역할] 필드 앞의 라벨 텍스트(예: "이름", "이메일")를 읽어와 맞춤형 필수 입력 오류 문구를 생성합니다.
        // [상태 변화] message 변수에 오류 안내 문구가 할당됨
        message =
            `${field.previousElementSibling.textContent.trim()}` +
            "을(를) 입력해 주세요.";
    }


    // 2. 이메일 전용 정규식 형식 검증
    else if (
        field.type === "email" &&
        !emailPattern.test(value)
    ) {
        // [역할] type="email"인 필드가 비어있지 않지만 이메일 정규표현식과 일치하지 않는 경우 오류 문구를 설정합니다.
        // [상태 변화] message 변수에 이메일 형식 오류 문구가 할당됨
        message =
            "올바른 이메일 형식을 입력해 주세요.";
    }


    // [역할] 에러 메시지 유무(Boolean(message))에 따라 테두리를 붉게 만드는 'is-invalid' 클래스를 토글합니다.
    // [상태 변화] field 요소의 classList에 'is-invalid'가 추가되거나 제거됨
    field.classList.toggle(
        "is-invalid",
        Boolean(message)
    );

    // [역할] 스크린 리더 등 보조 기기에 현재 입력 필드가 유효하지 않음을 aria-invalid 속성으로 전달합니다.
    // [상태 변화] field의 aria-invalid 속성이 "true" 또는 "false"로 갱신됨
    field.setAttribute(
        "aria-invalid",
        String(Boolean(message))
    );

    // [역할] 오류 메시지 엘리먼트에 에러 안내 문구를 삽입합니다. (정상이면 빈 문자열이 들어가 메시지가 지워짐)
    // [상태 변화] errorMessage.textContent에 오류 문구 출력 또는 빈 문자열로 지워짐
    errorMessage.textContent =
        message;

    // [역할] 에러 메시지가 없으면 true(검증 통과), 에러 메시지가 있으면 false(검증 실패)를 반환합니다.
    return !message;
};


// ==============================
// Input Event
// ==============================

// [역할] 각 입력 필드에 실시간 입력(input) 이벤트를 등록하여 사용자가 타이핑하는 즉시 실시간 검증이 이루어지도록 합니다.
fields.forEach((field) => {
    // [역할] 키보드 입력, 붙여넣기 등으로 입력 필드의 값이 변경될 때마다 실행됩니다.
    field.addEventListener(
        "input",
        () => {
            // [역할] 현재 입력된 값을 즉시 검증하여 에러 메시지를 띄우거나 지웁니다.
            // [상태 변화] 에러 조건 해소 시 'is-invalid' 클래스 제거 및 에러 문구 삭제
            validateField(field);

            // [역할] 입력값을 수정하는 동안에는 이전에 출력되어 있던 하단 전송 성공/실패 완료 문구를 화면에서 지웁니다.
            // [상태 변화] formSuccess.textContent가 빈 문자열로 리셋됨
            formSuccess.textContent = "";
        }
    );
});


// ==============================
// Submit Event
// ==============================

// [역할] 폼 제출(전송 버튼 클릭 또는 Enter 입력) 시 실행되는 submit 이벤트 리스너를 등록합니다.
contactForm.addEventListener(
    "submit",
    (event) => {
        // [역할] 폼 제출 시 브라우저가 새로고침되거나 다른 페이지로 이동하는 기본 폼 전송 동작을 방지합니다.
        event.preventDefault();

        // [역할] 모든 필드를 순회하며 각각 검증(validateField)을 실행하고, 모든 필드가 true인지 판별합니다.
        // [사용 변수] isFormValid: 모든 필드가 정상이면 true, 하나라도 에러가 있으면 false
        const isFormValid =
            fields
                .map(validateField)
                .every(Boolean);


        // 검증 실패(오류가 1개 이상 존재) 분기 처리
        if (!isFormValid) {
            // [역할] 하단 결과창에 입력값을 확인하라는 경고 문구를 출력합니다.
            // [상태 변화] formSuccess 텍스트가 오류 메시지로 변경됨
            formSuccess.textContent =
                "입력 내용을 확인해 주세요.";

            // [역할] 성공 스타일(녹색 글씨/배경 등) 클래스를 제거합니다.
            // [상태 변화] formSuccess 요소에서 'is-success' 클래스가 제거됨
            formSuccess.classList.remove(
                "is-success"
            );

            // [역할] 폼 제출 처리를 중단하고 종료합니다.
            return;
        }


        // 검증 성공(모든 필드가 유효함) 분기 처리
        // [역할] form.elements 컬렉션에서 name="name" 속성을 가진 사용자 이름 입력 필드 엘리먼트를 추출합니다.
        // [사용 변수] name: 이름 input 엘리먼트 객체
        const { name } =
            contactForm.elements;

        // [역할] 작성자의 이름을 포함한 완료 환영 메시지를 결과창에 출력합니다.
        // [상태 변화] formSuccess.textContent에 성공 문구 주입
        formSuccess.textContent =
            `${name.value.trim()}님, ` +
            "메시지가 준비되었습니다. ";

        // [역할] 완료 메시지에 성공 스타일을 적용하기 위해 'is-success' 클래스를 부여합니다.
        // [상태 변화] formSuccess 요소에 'is-success' 클래스 추가됨
        formSuccess.classList.add(
            "is-success"
        );

        // [역할] 폼 안의 모든 입력 필드 값(value)을 초기 빈 값으로 깨끗하게 비웁니다.
        // [상태 변화] 모든 input, textarea 내용이 리셋됨
        contactForm.reset();

        // [역할] 제출 완료 후 각 필드에 남아있을 수 있는 오류 관련 속성과 클래스를 초기 상태로 완전히 복구합니다.
        fields.forEach((field) => {
            // [역할] 접근성 에러 상태를 'false'로 명시적 초기화합니다.
            // [상태 변화] aria-invalid 속성이 "false"로 세팅됨
            field.setAttribute(
                "aria-invalid",
                "false"
            );

            // [역할] 혹시 남아있을 수 있는 오류 테두리 스타일 클래스를 제거합니다.
            // [상태 변화] is-invalid 클래스 제거됨
            field.classList.remove(
                "is-invalid"
            );
        });
    }
);


// ==============================
// Initial GitHub Request
// ==============================

// [역할] 스크립트가 로드되자마자 GitHub 저장소 목록을 조회하는 메인 함수를 최초 1회 실행합니다.
// [상태 변화] githubApiState가 "idle" → "loading"으로 전환되며 GitHub REST API 비동기 통신이 시작됨
fetchRepositories();