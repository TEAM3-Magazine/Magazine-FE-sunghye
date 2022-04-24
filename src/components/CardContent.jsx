import React from "react";
import styled from "styled-components";

//elements
import { Grid, Image, Text } from "../elements";

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
export default CardContents;
