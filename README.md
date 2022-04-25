# Magazine Site - 항해 99 2-3주차 과제 📖

## Magazine Site 📖

  <br/>

> 4.15-4.18 => Firebase CRUD 구현 : [Magazine Site with Firebase](https://github.com/AlgoRoots/React-deep-99) > <br/>
> 4.19-4.25 => Backend API 연결 - AXIOS, REDUX TOOLKIT

<br/>
<div align="center" display="flex">
<img width="200" alt="kmoney-math-game-bg" src="https://user-images.githubusercontent.com/88864019/165020412-cf63a452-8116-4c36-9d76-a9675b55a564.png">
<img width="202" alt="kmoney-math-game-bg" src="https://user-images.githubusercontent.com/88864019/165020559-f536a23d-4535-4ba8-9286-3499c30beaec.png">
</div>
<br/><br/>

# Introduction 🙌

> firebase service를 통해 구현했던 매거진 사이트를 백엔드에서 받아온 API로 붙여보는 시간을 가졌습니다.
> 이번 시간에는 axios와 Redux toolkit을 공부하여 적용시켰습니다.

<br/><br/>

# SKill 🛠️

- React, Redux Toolkit
- Promise based HTTP client : Axios
- Storage Service : AWS S3 bucket

<br/><br/>

# 구현 기능 💻

<br/>

- [x] 회원가입 & 로그인 페이지

  - 이메일 형식 체크, 비밀번호 체크할 것

- [x] 메인 페이지

  - 이메일 형식 체크, 비밀번호 체크할 것
  - 게시글 목록 노출
    - 무한 스크롤
    - 게시글 하나는 작성자, 작성 시간, 이미지 미리보기, 텍스트 내용으로 구성
    - 게시글 하나를 클릭 시, 게시글 상세 페이지로 이동
    - 게시글 중 좋아요버튼(분홍색 하트 버튼)을 누르면 [좋아요]를 +1한다. 다시 누르면 분홍색 하트가 회색 하트가 되고 좋아요가 -1개 된다.

- [x] 글 작성 페이지

  - **텍스트, 이미지 중 입력 안된 게 있다면 게시글 작성 버튼 비활성화**
  - 작성 완료 시 메인 페이지로 이동
    <br/><br/>

- [x] 추가한 부분 🐥🐣

- infinity scroll, lazy loading, suspense 적용

- My Account page

  - 내 계정 정보
  - 내가 좋아한 Posts와 내가 쓴 Posts를 버튼을 만들어 구성
    <details>
    <summary> 코드 보기 </summary>

    ```js
    const MyAccount = () => {
      ...
      const [isMyPostsActived, setIsMyPostsActived] = useState(true);

      const btnToggle = (e) => {
        if (e.currentTarget.id === "your_posts") {
          setIsMyPostsActived(true);
        } else {
          setIsMyPostsActived(false);
        }
      };

      return (
        <React.Fragment>
         ...

            {isMyPostsActived ? (
              <Grid padding="2rem 0">
                <Cards>
                  {posts
                    .filter((post) => post?.user_id === user_info.user_id)
                    .map((post) => {
                      return <Card key={post.post_id} card={post} />;
                    })}
                </Cards>
              </Grid>
            ) : (
              <Grid padding="2rem 0">
                <Cards>
                  {posts
                    .filter((post) =>
                      post?.post_like?.includes(user_info.user_id)
                    )
                    .map((post) => {
                      return <Card key={post.post_id} card={post} />;
                    })}
                </Cards>
              </Grid>
            )}
        ...
      );
    };
    ```

  </details>

<br/>

- date-fns 적용 (eg. 1 day ago...)

  - date-fns기능 적용해 TimeAgo component 생성
    <details>
     <summary> 적용 모습 보기</summary>
     
     <img width="300" alt="kmoney-math-game-bg" src="https://user-images.githubusercontent.com/88864019/165021166-a36445bf-fead-46c3-8b9c-c7a0f8a0669c.png">

     </details>

<br/>

- Router 이동시 scroll to top 적용

  - 페이지 전환시 현재 있는 scroll위치가 그대로 반영이 되는 문제점 발견

    > scrollToTop component 생성해 index.js 에 적용시켜 해결

<br/><br/>

# 나는 무엇을 배웠나 📖

<br/>

API 통신

> 백엔드에서 API통신을 axios를 사용하여 진행하였습니다. 백엔드에서 로그인할 때 token만 주어서 userinfo를 받아오는 api로 userinfo를 로그인과 동시에 세션스토리지에 담아야 하는 상황이 생겼습니다. 하지만 로그인 후 새로고침을 해야지만 userinfo가 세션 스토리지에 담기는 문제점이있었고, 이 때 비동기통신의 흐름을 깊게 고민해보며
>
> '로그인할 때 getuser 비동기 함수를 실행하면 되지 않을까?'라는 생각이들었고, 로그인으로 get요청을 할 때 프로미스가 반환되기 직전 get user을 실행시키게끔 바꾸었습니다. 이로서 로그인 요청시 user정보를 세션스토리지에 저장하고 리덕스 user info state도 업데이트하여 문제를 해결했습니다.

<br/>

Redux toolkit

> 실전 프로젝트를 대비해 Redux toolkit으로 새로 진행해 보았습니다. 리덕스도 완전히 이해하지 못한 상황에서 적용시키려다보니 여러 난관이 있었습니다. 실전 프로젝트를 대비해 상태흐름에 대해 더 공부할 필요가 느껴졌던 주차였습니다.

<br/>

과제 이외에 한 것들

> My page를 만들고 좋아요한 포스트와, 작성한 포스트를 어떻게 가져올지 고민했던 과정이 재밌게 느껴졌습니다. 단순 배열 메소드를 사용하여 데이터를 뽑아온 것 뿐이었지만, 알고리즘을 자바스크립트로 공부하지 않았다면 응용하지 못했을 것이라 생각이 들었던 경험이었습니다.
> <br />

> 기존에는 시간을 생성한 시간을 직관적으로 보여주는 것이 이질감이 느껴져서 포스트 한지 얼마나 지났는지 보여주는 기능이 있는 dns fns 를 설치하고 적용해보았습니다.
