import React from "react";
import styled, { css } from "styled-components";

import { Button, Grid, Image, Text } from "../elements";
import { FaHeart } from "react-icons/fa";

const CardFooter = ({ post_like }) => {
  const like_cnt = post_like.length;

  return (
    <Grid padding="16px" is_flex width="auto">
      <Grid is_flex width="auto">
        <Text margin="0px" bold>
          좋아요 {like_cnt}개
        </Text>
      </Grid>

      {/* <LikeBtn id="like-button" className={onLike && "like"}> */}
      <LikeBtn id="like-button">
        <FaHeart />
      </LikeBtn>
    </Grid>
  );
};

const LikeBtn = styled.span`
  color: grey;
  cursor: pointer;
  transition: all 120ms ease-in;
  &:hover {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  &.like {
    /* color: ${({ theme }) => theme.colors.mainColor}; */
  }
`;

export default CardFooter;
