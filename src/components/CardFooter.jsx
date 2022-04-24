import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { Button, Grid, Image, Text } from "../elements";
import { FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { likeUpAxios, likeDownAxios } from "../redux/modules/postSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";

const CardFooter = ({ post_like, post_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.user.user_info?.user_id);
  const like_cnt = post_like.length;

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    let findLike = post_like.findIndex((p) => p === user_id);
    return findLike === -1 ? setIsLike(false) : setIsLike(true);
  }, [like_cnt]);

  const likeToggle = () => {
    if (!isLike) {
      dispatch(likeUpAxios({ post_like, post_id, navigate }));
    } else {
      dispatch(likeDownAxios({ post_like, post_id }));
    }
  };

  return (
    <Grid padding="16px" is_flex width="auto">
      <Grid is_flex width="auto">
        <Text margin="0px" bold>
          {like_cnt > 1 ? like_cnt + " likes" : like_cnt + " like"}
        </Text>
      </Grid>

      <Text _onClick={likeToggle}>
        {isLike ? (
          <HeartCheck style={{ color: "#686ef3" }} />
        ) : (
          <HeartIcon style={{ color: "#686ef3" }} />
        )}
      </Text>
    </Grid>
  );
};

const HeartIcon = styled(AiOutlineHeart)`
  font-size: 24px;
  cursor: pointer;
  color: "#686ef3";
`;
const HeartCheck = styled(AiFillHeart)`
  font-size: 24px;
  cursor: pointer;
  background-color: "#686ef3";
`;

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
