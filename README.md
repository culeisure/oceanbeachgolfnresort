# 이스트원 골프&리조트 - 회원 모집 랜딩 (오션비치 콘도회원권)

내러티브: **이스트원 전면**, 오션비치는 "만드는 회사(검증된 운영사)" 신뢰 백킹.
판매 상품 자체는 오션비치 콘도회원권이며, 이스트원 개장 시 준회원(VIP+ 정회원) 대우가 연결 고리.

SMS 발송용 모바일 랜딩페이지. 일라이트 랜딩과 동일한 구조(GitHub Pages 정적 배포).

## 배포

```
GitHub: culeisure/oceanbeachgolfnresort (public)
URL:    https://culeisure.github.io/oceanbeachgolfnresort/
```

1. GitHub에 `oceanbeachgolfnresort` 저장소 생성 (public)
2. 이 폴더 전체 push → Settings > Pages > Deploy from branch (main / root)
3. `.nojekyll` 포함되어 있음 (Jekyll 빌드 우회)

저장소 이름을 다르게 하면 `index.html`의 `og:url`, `og:image` 절대경로 2곳 수정 필요.

## 콘텐츠 기준

- **상품 데이터**: 「콘도회원권 신규 모집 계획_대행사용_0711.pptx」 기준
- **이스트원 사업 개요·비주얼**: 「오션비치 브로슈어 가로ver.pdf」 기준 (본사 공식 자료)
- 이미지 전량 브로슈어 PDF에서 원본 추출 후 웹용 최적화 (총 ~2.9MB, lazy load)

## 수정 포인트

- 상담 전화/문자: `index.html`에서 `01046549644` 일괄 치환 (헤더 · CTA · 하단바 · 푸터)
- 무료수신거부: 푸터 `080-877-5688`
- GA4 연결: `script.js`의 gtag 주석 해제

## 컴플라이언스 (대행계약 필수)

- **본 랜딩과 문자 시안은 발송 전 ㈜오션비치 본사 사전승인 필수** (대행계약 영업활동 준수사항)
- 이스트원 관련 내용은 전부 "예정" 표기 + 변경 가능 고지 문구 포함되어 있음 - 임의 수정 금지
- 승인되지 않은 할인·혜택 추가 기재 금지
- 검색엔진 차단 처리됨 (noindex 메타 + robots.txt) - SMS 수신자 전용
