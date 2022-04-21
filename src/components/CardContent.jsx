import React from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";

//elements
import { Button, Grid, Image, Text } from "../elements";

const CardContents = ({ contents, image_url }) => {
  return (
    <>
      <Grid padding="16px">
        <Text>{contents}</Text>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={image_url} />
      </Grid>
    </>
  );
};

const ContentText = styled.div`
  display: block;
  width: 100%;
`;

const ContentImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  background-image: cover;
`;
export default CardContents;
