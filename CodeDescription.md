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
MedicineScreen.tsx
MedicineListItem.tsx
medListApi.ts : getMedListApi, getMedListByIngredientApi

// 약탭 common
BottomSheet.ts

```

1. `getMedListApi`로 기본 약 정보 호출 -> `MedicineListItem`에 전달, 화면 렌더링
2. `MedicineScreen`에 `rangeList` 정의

-   정의한 rangeList(정렬 옵션, ex 가나다순, 성분순 ...) `BottomSheet`에 전달
-   정렬 옵션 클릭 시 `BottomSheet` 호출
    -   BottomSheet에서 선택한 state를 `sortMedList`에 전달
-   `sortMedList()`
    -   rangeList대로 medList 정렬, `MedicineListItem` 정렬에 사용

3. `MedicineListItem`

-   클릭 시 medId를 매개로 `MedDetail` 이동

4. 성분별 모아보기 토글

-   `getMedListByIngredientApi` 로 성분별 약 정보 호출 -> `MedicineListItem`에 전달, 화면 렌더링

### 약탭 정보 (탭1)

```
MedDetail.tsx
MedReview 컴포넌트
medListApi.ts : getSingleMedInfoApi
```

1. medId를 매개로 `getSingleMedInfoApi` 호출 -> medicine 정보 받아오기 (itemName, itemEngName ...)

---

-   주기능: 6개 버튼에 대한 동적 이동

```
    // 항목별 이동을 위한 동적 로직
    const handleScrollToSection = (section: string) => {
        setActiveButton(section)
        const targetSection = section === 'all' ? 'effect' : section
        const position = sectionPositions.current[targetSection]
        if (position !== undefined) {
            scrollViewRef.current?.scrollTo({ y: position, animated: true })
        }
    }

    const handleLayout = (section: string) => (event: LayoutChangeEvent) => {
        const { y } = event.nativeEvent.layout
        sectionPositions.current[section] = y
    }
```

-   주기능: 버튼에 대한 약 내용 렌더링

    -   `medDetail.json`에 저장된 값 불러오기
    -   `useTranslation` 사용
    -   같은 정보를 가진 약품이 있어, medId를 묶어 같은 정보를 출력하도록 설정 (`getTranslationKey`)
        -   `getTranslationKey`의 매개
            -   medId
            -   medDetail.json의 타입

```
 const getTranslationKey = (id: number, type: string) => {
        if (type === 'usage') {
            if ([11, 12].includes(id)) return '도모.usage'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.usage'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.usage'
            if ([24, 25, 26, 1].includes(id)) return '메디.usage'
            if (id === 2) return '켑베.usage'
            if ([4, 29, 30].includes(id)) return '콘서.usage'
            if (id === 31) return '페니.usage'
            if ([32, 33].includes(id)) return '페로.usage'
        } else if (type === 'effect') {
            if ([11, 12].includes(id)) return '도모.effect'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.effect'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.effect'
            if ([24, 25, 26, 1].includes(id)) return '메디.effect'
            if (id === 2) return '켑베.effect'
            if ([4, 29, 30].includes(id)) return '콘서.effect'
            if (id === 31) return '페니.effect'
            if ([32, 33].includes(id)) return '페로.effect'
        } else if (type === 'precaution') {
            if ([11, 12].includes(id)) return '도모.precaution'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.precaution'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.precaution'
            if ([24, 25, 26, 1].includes(id)) return '메디.precaution'
            if (id === 2) return '켑베.precaution'
            if ([4, 29, 30].includes(id)) return '콘서.precaution'
            if (id === 31) return '페니.precaution'
            if ([32, 33].includes(id)) return '페로.precaution'
        } else if (type === 'med-info') {
            if ([11, 12].includes(id)) return '도모.med-info'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.med-info'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.med-info'
            if ([24, 25, 26, 1].includes(id)) return '메디.med-info'
            if (id === 2) return '켑베.med-info'
            if ([4, 29, 30].includes(id)) return '콘서.med-info'
            if (id === 31) return '페니.med-info'
            if ([32, 33].includes(id)) return '페로.med-info'
        } else if (type === 'company') {
            if ([11, 12].includes(id)) return '도모.company'
            if ([6, 13, 14, 15, 16, 17, 3, 5, 8, 9, 23, 24].includes(id))
                return '아토.company'
            if ([18, 19, 29, 21, 7].includes(id)) return '아트.company'
            if ([24, 25, 26, 1].includes(id)) return '메디.company'
            if (id === 2) return '켑베.company'
            if ([4, 29, 30].includes(id)) return '콘서.company'
            if (id === 31) return '페니.company'
            if ([32, 33].includes(id)) return '페로.company'
        }
        return '' // 기본값
    }
```

### 약탭 리뷰 (탭2)

```
MedReview.tsx
MedReviewApi.ts : getMedReviewApi, medReviewHelpApi
MedReviewListItem.tsx

// 약탭 common
BottomSheet.tsx

```

1. medDetail에서 받아온 medId로 `getMedReviewApi` 호출 -> review 데이터 반환
2. `MedReviewListItem`에 review데이터 전달, 리뷰 리스트 렌더링

-   `MedReviewListItem`

    -   `medReviewHelpApi`로 helpCount 전송

---

-   `activeTab`state로 정보탭, 리뷰탭 전환

```
    const [activeTab, setActiveTab] = useState('정보')

```

-   정렬 옵션 클릭 시 `BottomSheet`: MedList 내부에 `rangeList` 정의

    -   정의한 rangeList(정렬 옵션, ex 가나다순, 성분순 ...) `BottomSheet`에 전달
    -   정렬 옵션 클릭 시 `BottomSheet` 호출
        -   BottomSheet에서 선택한 state를 `sortedReviews`에 전달
    -   `sortedReviews()`
        -   rangeList대로 review 정렬, `MedReviewListItem` 정렬에 사용

-   기능: 평균 별점, 별점 분포 계산

    -   평균 점수 계산: api에서 내려주고 있으므로, 시간 될 때 빼시면 됩니다.

```
// 평균 점수 계산
    const calcAverageRate = (reviews: any[]) => {
        const totalRating = reviews.reduce(
            (sum, review) => sum + review.grade,
            0,
        )
        const average = totalRating / reviews.length
        setAverateRate(average)
    }

    // 점수 분포 계산
    const calcRateDistribution = (reviews: any[]) => {
        const distribution = [0, 0, 0, 0, 0]
        reviews.forEach((review) => {
            const ratingIndex = Math.floor(review.grade) - 1
            if (ratingIndex >= 0 && ratingIndex < 5) {
                distribution[ratingIndex]++
            }
        })
        setRatingDistribution(distribution)
    }
```

### 약탭 리뷰 작성

```
MedNewReview.tsx
medReviewApi.ts: getSingleMedInfoApi, sendMedReviewApi

// 함께 복용하는 약 정보 저장
medStore.ts

// 함께 복용하는 약 검색 모달
MedSelectModal.tsx
ModalMedListItem.tsx


// 약탭 common
BottomSheet.tsx


```

1. MedDetails에서 받은 medId로 `getSingleMedInfoApi` 호출 -> data에 약 기본정보 저장
2. <Rating /> 컴포넌트로 별점 구현
3. `MedSelectModal`

-   선택한 `ModalMedListItem의` id, itemName을 medStore에 저장 -> `MedNewReview`에서 사용
-   `ModalMedListItem`
    -   MedicineListItem.tsx 변형 -> 선택 값만 넘기도록.

4. 버튼 클릭시 `sendMedReviewApi` 호출 -> 데이터 서버 전달

### 약탭 리뷰 수정

```
EditMedReview.tsx

medReviewApi.ts: sendMedReviewApi, getMedReviewApi

// 리뷰 작성 부분과 동일
medStore
MedSelectModal
```

1. `getMedReviewApi`로 useState 기본값 설정
2. `sendMedReviewApi`로 정보 전달

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

## 미완료 작업 (약탭)

1. 검색

-   약탭 전체 검색
-   약탭 모양별 검색

2. 리뷰 작성(수정) 검색 모달
