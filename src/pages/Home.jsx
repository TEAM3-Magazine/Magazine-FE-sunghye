import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import Card from "../components/Card";
import { Button, Grid, Spinner } from "../elements";

import styled from "styled-components";
import { TiPlus } from "react-icons/ti";

// redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.post);

  // const isLogin = useSelector((state) => state.user.is_login);
  const hasToken = sessionStorage.getItem("token") ? true : false;

  // 무한스크롤
  const [counter, setCounter] = useState(3);
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.documentElement;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setCounter(counter + 3);
    }
  }, 200);
  const handleScroll = useCallback(_handleScroll, [counter]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  // 포스트 작성
  const addPost = () => {
    if (!hasToken) {
      alert("you need to sign in first.");
      navigate("/signin");
      return;
    }
    navigate("/post");
  };

  return (
    <Grid margin="150px auto">
      <ListBox>
        {data?.slice(0, counter).map((card) => (
          <Card key={card.post_id} card={card} />
        ))}
        {data.length > counter ? <Spinner /> : null}
        <Button
          is_add
          btnColor={({ theme }) => theme.colors.mainColor}
          _onClick={addPost}
        >
          <Plus />
        </Button>
      </ListBox>
    </Grid>
  );
};

const ListBox = styled.div``;

const Plus = styled(TiPlus)`
  font-size: 28px;
`;

export default Home;
