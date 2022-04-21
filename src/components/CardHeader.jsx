import React from "react";
import styled from "styled-components";

import { Button, Grid, Image, Text } from "../elements";

const CardHeader = ({ user_name, created_at }) => {
  return (
    <Grid is_flex padding="16px">
      <Grid is_flex width="auto">
        <Image />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex width="auto">
        <Text>{created_at}</Text>
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

export default CardHeader;
