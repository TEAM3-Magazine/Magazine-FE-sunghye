import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

const Card = memo(({ card }) => {
  const {
    post_id,
    user_id,
    user_name,
    contents,
    image_url,
    created_at,
    post_like,
  } = card;

  return (
    <CardBox>
      <CardHeader card={card} />
      <CardContent contents={contents} image_url={image_url} />
      <CardFooter post_like={post_like} post_id={post_id} />
    </CardBox>
  );
});

const CardBox = styled.article`
  ${({ bookmark, theme }) => {
    const { colors, device } = theme;
    return css`
      margin: "auto";
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: calc(100%-0.6em);
      margin-bottom: 20px;
      border-radius: 6px;
      background-color: ${colors.white};
      transition: 300ms eash-in-out;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      overflow: hidden;

      ${device.tablet} {
        width: calc((100% - 20px) / 1);
      }

      ${device.desktop} {
        width: calc((100% - (20px * 2)) / 3);
      }

      &:hover {
        top: -2px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
      }
    `;
  }}
`;

export default Card;
