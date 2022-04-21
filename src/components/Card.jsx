import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

const Card = memo(({ card }) => {
  // const isLogin = useSelector((state) => state.user.is_login);
  // const param = useParams();
  // const isDetail = param.postId ? true : false;

  const {
    post_id,
    user_id,
    user_name,
    contents,
    image_url,
    created_at,
    post_like,
  } = card;

  const navigate = useNavigate();

  // const goToDetail = (e) => {
  //   !isDetail && isLogin && navigate(`/post/${boardId}`);
  // };

  return (
    // <CardBox onClick={goToDetail} className={isDetail ? "detail" : "main"}>
    <CardBox>
      <CardHeader user_name={user_name} created_at={created_at} />
      <CardContent contents={contents} image_url={image_url} />
      <CardFooter post_like={post_like} />
    </CardBox>
  );
});

const CardBox = styled.article`
  ${({ bookmark, theme }) => {
    const { colors } = theme;
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      /* margin: 0.5em 0.3em;
      padding: 1em; */
      width: calc(100%-0.6em);

      margin-bottom: 20px;

      border-radius: 6px;
      background-color: ${colors.white};
      transition: 300ms eash-in-out;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      &:hover {
        top: -2px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
      }
    `;
  }}
`;

export default Card;
