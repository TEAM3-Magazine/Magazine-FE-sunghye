import React, { useEffect } from "react";

import Card from "../components/Card";

import { Button, Grid, Image, Text } from "../elements";

import styled from "styled-components";
import { TiPlus } from "react-icons/ti";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getPostAxios } from "../redux/modules/postSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, is_loading } = useSelector((state) => state.post);
  console.log("home data", data);

  useEffect(() => {
    dispatch(getPostAxios());
  }, []);

  const addPost = () => {
    // if (!isLogin) {
    //   alert("로그인 후 작성해주세요");
    //   navigate("/login");
    //   return;
    // }
    navigate("/post");
  };

  return (
    <Grid margin="150px auto">
      <ListBox>
        {data.map((card) => (
          <Card key={card.post_id} card={card} />
        ))}

        <Button
          is_add
          btnColor={({ theme }) => theme.colors.mainColor}
          onClick={addPost}
        >
          <Plus />
        </Button>
      </ListBox>
    </Grid>
  );
};

const ListBox = styled.ul`
  flex-wrap: wrap;
`;

const Plus = styled(TiPlus)`
  font-size: 28px;
`;

export default Home;
