import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// slice
import { deletePostAxios } from "../redux/modules/postSlice";

// react = icons
import styled, { css } from "styled-components";
import { TiTimes } from "react-icons/ti";
import { AiTwotoneEdit } from "react-icons/ai";

// elements
import { Grid, Image, Text } from "../elements";

// timeago function
import TimeAgo from "../elements/TimeAgo";

const CardHeader = ({ card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post_id = card.post_id;
  const post_author = card.user_id;
  const user_id = useSelector((state) => state.user.user_info.user_id);

  // 포스트 삭제
  const handleDelete = () => {
    console.log("first");
    dispatch(deletePostAxios({ post_author, post_id, navigate }));
  };

  const handleEdit = () => {
    if (card.user_id !== user_id) {
      return alert("You don't have any right to edit the post");
    } else {
      navigate(`/edit/${card.post_id}`, { state: { card } });
    }
  };
  return (
    <Grid is_flex padding="16px">
      <Grid is_flex width="auto">
        <Image />
        <Text bold>{card.user_name}</Text>
      </Grid>
      <Grid is_flex width="auto">
        <TimeAgo timestamp={card.created_at} />
        <button onClick={handleEdit}>
          <Edit />
        </button>
        <button>
          <Delete onClick={handleDelete} />
        </button>
      </Grid>
    </Grid>
  );
};

CardHeader.defaultProps = {
  user_name: "algoroot",
  profile_img:
    "https://firebasestorage.googleapis.com/v0/b/react-deep-99.appspot.com/o/images%2FGfqOcoismnVlroqVfxomqd5Sgvo2_1650078478923?alt=media&token=20c3ff5e-6f0f-405d-bff5-4427148ebba4",

  created_at: "2022-04-12 10:00:00",
};

const Icons = css`
  width: 0.9em;
  vertical-align: middle;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.colors.mediumGrey};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
`;

const Edit = styled(AiTwotoneEdit)`
  ${Icons}
`;
const Delete = styled(TiTimes)`
  ${Icons}
`;

export default CardHeader;
