# tarot_simple 타로 카드 리딩
바이브코딩을 활용하여 만든 거·현재·미래 3카드 스프레드로 타로 카드를 뽑아보는 간단한 웹 앱입니다.<br>
React + Vite + Tailwind CSS로 만들었습니다.
https://eunyoungsin.github.io/tarot_simple/ 에서 확인 할 수 있습니다.

## 기능

- 클릭 한 번으로 카드 3장(과거/현재/미래)을 랜덤하게 뽑고, 순차적으로 뒤집는 애니메이션 공개
- 정방향/역방향을 무작위로 결정
- 카드를 클릭하면 키워드와 상세 의미(정방향/역방향) 표시
- 메이저 아르카나 22장 + 마이너 아르카나 56장(완드/컵/검/펜타클) 전체 데이터 포함

## 기술 스택

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 6
- [Tailwind CSS](https://tailwindcss.com/) 3

## 시작하기

```bash
npm install
npm run dev
```

개발 서버가 실행되면 브라우저에서 안내된 주소로 접속합니다.

## 빌드

```bash
npm run build   # dist/ 에 정적 파일 생성
npm run preview # 빌드 결과 로컬 미리보기
```

> WSL의 `/mnt/c` (DrvFs)에서는 Node의 `copyFileSync`가 실패할 수 있어, `vite.config.js`에서 `public/` 복사를 read/write 방식으로 직접 처리합니다.

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후 GitHub Pages에 배포합니다. 배포 경로는 `/tarot_simple/`을 기준으로 합니다.

## 프로젝트 구조

```
src/
  App.jsx              앱 진입 레이아웃
  components/
    Spread.jsx          3카드 스프레드 로직(뽑기, 공개, 선택)
    TarotCard.jsx        카드 뒷면/앞면 표시
    CardDetail.jsx       선택한 카드의 키워드·의미 표시
  data/
    cards.json           카드 78장의 이름/키워드/의미 데이터
    suits.js             수트별 메타데이터(라벨, 아이콘, 그라디언트)
public/
  images/                카드 이미지(78장)
```
