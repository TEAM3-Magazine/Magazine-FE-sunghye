import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// slices
import { likeUpAxios, likeDownAxios } from "../redux/modules/postSlice";

// styled, elements
import styled from "styled-components";
import { Grid, Text } from "../elements";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

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

export default CardFooter;
