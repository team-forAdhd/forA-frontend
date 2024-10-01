# CodeDescription

지금까지 작업했던 항목을 설명하는 문서입니다.

## 로그인

```
LoginScreen.tsx
loginApi.ts
getUserProfileApi.ts
```

1. `LoginScreen.tsx`에서 email, password 입력
2. email, password를 `loginApi` 전달
3. loginApi에서 accessToken 리턴, `getUserProfileApi` 전달
4. getuserApi가 accessToken, userId, nickname, profileImageUrl 리턴, `userStore`에 저장

## 회원가입

1. EmailDuplicateCheck.tsx : 이메일 중복 확인

    - `checkExistingMemberApi` : email 값 받아 중복 확인
    - `sendAuthApi` : 인증번호 발송 요청

2. AuthCheck.tsx : 인증번호 확인

    - `checkAuthApi` : 인증번호 확인
    - `sendAuthApi` : 인증번호 발송 요청(재)

3. SetPassword.tsx : 비밀번호 설정
4. SetProfile.tsx : 프로필 설정
5. JoinLast.tsx : 마지막 페이지- 본인/자녀/주변이 ADHD?

6. JoinDone.tsx : 회원가입 완료, 홈으로 이동
    - 1~5동안 유저 정보를 `profileStore`에 저장
    - `sendUserInfoApi` : `profileStore`에 저장한 값 서버 전송

## 게시글

### 게시글 페이지 이동

`postId` 를 매개로 페이지 이동

### 게시글 홈(메인)

```
Home.tsx
PostListItem.tsx
getPostsApi.ts
getMainRealtimeApi
getMainCategoryApi

```

1. `getMainRealtimeApi`, `getMainCategoryApi` -> `PostListItem` 컴포넌트 렌더링

-   실시간: `getMainRealtimeApi`
-   카테고리별(10대, 20대, 30대, 학부모): `getMainCategoryApi`

2. `PostListItem` 컴포넌트 클릭 -> `PostDetail`로 이동

### 게시글 디테일(content, 댓글)

```
PostDetail.tsx
getPostsDetailApi.ts
getCommentsApi.ts

postLikedApi.ts
deletePostApi.ts
handleScrapApi.ts

sendCommentApi.ts
```

1. prop으로 받아온 medId를 `getPostsDetailsApi`, `getCommentApi`에 전달 -> 게시글 정보, Comment 컴포넌트 렌더링
   a. userStorer.userId와 post의 userId 대조 -> 일치 시 수정/삭제 버튼 노출.
    - 수정 시 `EditPost` 화면으로 이동.
    - 삭제 시 `SimepleModal` 팝업
        - 'yes' 선택 시 `deletePostApi` 호출
2. `postLikedApi`, `deletePostApi`, `handleScrapApi` 로 좋아요, 삭제, 스크랩 관리
3. `sendCommentApi`: postId, content, isAnonymous 전달

```
Comment.tsx
deleteCommentApi.ts: deleteCommentApi, deleteReplyApi
commentLikedApi.ts
toggleCommentLike

// common
AlertModal.tsx : 메세지 팝업 모달
SimpleModal.tsx : yes/no 선택 모달

```

3. Comment

-   `deleteCommentApi`, `deleteReplyApi` -> `AlertModal`에서 'yes' 클릭 시 호출. 댓글/답글 삭제 관리.
-   `toggleCommentLike` -> 댓글 좋아요 관리.

### 게시글 작성

```
NewPost.tsx
sendNewPostApi.ts

// common
AlerModal
```

`sendNewPostApi`로 state 전달

### 게시글 수정

```
EditPost.tsx
getPostDetaiApi.ts
updatePostApi.ts
```

`getPostsDetail`로 useState 기본값 설정

수정내역은 `endEditPostApi`로 전달

## 약탭

### 약탭 화면 이동

`medId`: 약 디테일, 약 리뷰
`reviewId`: 리뷰 수정/삭제

### 약텝 메인

```

```

### 약탭 정보 (탭1)

```

```

### 약탭 리뷰 (탭2)

```

```

### 약탭 리뷰 작성

```

```

### 약탭 리뷰 수정

```

```

## 이미지 업로드

```
uploadImageApi.ts

EditPost.tsx
NewPost.tsxm
MedNewReview.tsx
JoinDone.tsx
```

1. 각 화면에서 사진 업로드 -> `uploadImageApi` 호출
2. `uploadImageApi`가 image 주소 리턴
3. image주소를 각 화면의 state에 저장
4. 각 화면 api로 서버 전달

## 미완료 작업 (약탭 api 연결)

1. 검색

-   약탭 전체 검색
-   약탭 모양별 검색

2. 리뷰 작성(수정) 검색 모달
