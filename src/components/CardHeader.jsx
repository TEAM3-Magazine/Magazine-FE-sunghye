import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// react = icons
import { BsFillBookmarkFill } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import { AiTwotoneEdit } from "react-icons/ai";

import { Button, Grid, Image, Text } from "../elements";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAxios } from "../redux/modules/postSlice";
import TimeAgo from "../elements/TimeAgo";

const CardHeader = ({ card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.user.user_info.user_id);
  const post_id = card.post_id;
  const post_author = card.user_id;

  const handleDelete = () => {
    console.log("first");
    dispatch(deletePostAxios({ post_author, post_id, navigate }));
  };

  return (
    <Grid is_flex padding="16px">
      <Grid is_flex width="auto">
        <Image />
        <Text bold>{card.user_name}</Text>
      </Grid>
      <Grid is_flex width="auto">
        {/* <Text>{card.created_at}</Text> */}
        <TimeAgo timestamp={card.created_at} />

        <Link to={`/edit/${card.post_id}`} state={{ card }}>
          <button>
            <Edit />
          </button>
        </Link>
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
