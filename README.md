# 2020 네이버 캠퍼스 핵데이

## 주제 13. 네이버 웹툰 썸네일 저작 도구
* 우수 참가자는 2020년 하계 인턴십 면접 기회가 부여됩니다.
* 프로젝트를 진행하면서 네이버 밴드를 통해 커뮤니케이션을 할 예정이니 밴드에 참여 부탁드립니다.
  * https://band.us/n/a1ab36v92dR1u

### 프로젝트 주제 설명
* 사용자가 컨텐츠를 선택할 때 중요하게 생각하는 요소 중 하나로 썸네일을 꼽을 수 있습니다. 네이버 웹툰의 다양한 작품에 특색있는 썸네일을 제공할 수 있다면 사용자들이 자신의 취향에 맞는 작품을 더 많이 선택할 수 있지 않을까요? 이 프로젝트는 네이버 웹툰 작품을 더욱 돋보이게 할 썸네일을 제작할 수 있는 저작도구를 만드는 프로젝트 입니다.

### 개발 요구사항(결과물 구현 시 필수 )   
- 썸네일은 2가지 타입으로 만들 수 있습니다.(가로형, 세로형)   
  - [x] 가로형 세로형에 맞게 canvas 크기 변경   
- 이미지를 업로드 레이어를 구성할 수 있습니다.   
  - [x] 이미지를 업로드 하여 canvas에 띄우기   
- 레이어에 리사이즈, 위치 변경, 로테이션 등의 기능을 넣어 자유롭게 편집할 수 있습니다.   
  - [x] 이미지 리사이즈 버튼 클릭시 직(정)사각형 crop area 생성   
  - [x] 각 모서리에서 드래그 시 crop area의 크기 변경    
  - [x] crop area를 드래그 할 시 위치 변경    
  - [x] 이미지 왼쪽 방향, 오른쪽 방향 90도 로테이션    
- 3개 이상의 웹폰트를 이용해 원하는 위치에 텍스트를 넣을 수 있습니다.
  - [x] 텍스트 버튼 클릭 시 textarea 생성   
  - [x] textarea 드래그 시 위치 변경   
  - [x] 3개 이상의 웹폰트 적용 가능   
- 편집을 완료한 이미지를 병합하여 다운로드 할 수 있습니다.    
  - [x] 변경된 이미지와 텍스트를 병합하여 다운로드   


### 개발 요구사항(결과물 구현 시 선택)   
- 이미지 최적화
- 이미지 및 폰트에 효과 및 필터 추가
  - [x] 이미지에 흑백, 세피아 등 필터 추가    
  - [ ] 폰트 색상 변경   
- 서버사이드에 저장 후 API를 통해 접근 가능
  - [x] firebase/cloudinary 버킷에 이미지 저장

### commit message   
`<type>: <subject>`   
`<subject>`에 무엇이 달라졌는지 간단히 쓰기   
`<type>`에 들어가는 것   
- feat (새로운 기능)   
- fix (버그 수정)   
- docs (설명 추가 & 변경)   
- style (formatting, missing semi colons 등 코드 스타일 변경)   
- refactor (코드 구조 변경)    
- test (테스트 코드 추가 & 변경)   
- chore (개발 환경 변경)     
*angularJS commit convention 참고했습니다*    

### pull request
- 각자 개인 브랜치(feature-...)에서 develop으로 pull request 날리기
- 코드리뷰 후 2명 이상 동의하면 merge    
- 다른 사람이 수정해야될 사항이나 오류나는 부분 이슈에 남기기   
*참고: [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)*

### Job Role
* 필수사항: Front-End 개발
* 선택사항: Back-End 개발 혹은 서버리스 구성 (firebase, cloudinary 사용 추천)

### Technology(플랫폼)
* 필수사항: HTML/CSS/JavaScript(TypeScript)
* 필수사항: HTTP/API 통신
* 필수사항: git
* 선택사항: 모던 Front-End 프레임워크 (react, angular, vue, svelte 등)
* 선택사항: UI 프레임워크 (부트 스트랩, 머티리얼 UI 등)
* 선택사항: RestAPI, GraphQL 등 API 아키텍쳐
* 선택사항: firebase, cloudinary 등과 같은 서버리스 서비스 사용

### 개발언어
* HTML/CSS/JavaScript
* 기타 필요한 언어 사용 가능

### 기타 사항
* 요구사항 외 개발언어, 프레임워크, 라이브러리 자유롭게 사용 가능
* 요구사항 외 아이디어 자유롭게 구현 가능
