import React, { useState } from "react";
import { useSelector } from "react-redux";

// elements & component
import Card from "../components/Card";
import { Grid, Text, Image } from "../elements";

// mui
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const MyAccount = () => {
  const { user_info } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post.data);
  const { user_name } = user_info;

  const [isMyPostsActived, setIsMyPostsActived] = useState(true);

  const btnToggle = (e) => {
    if (e.currentTarget.id === "your_posts") {
      setIsMyPostsActived(true);
    } else {
      setIsMyPostsActived(false);
    }
  };

  return (
    <React.Fragment>
      <Grid margin="150px 0 0 0">
        <Text size="24px" margin="1rem 0" bold>
          Good day, {user_name} 🐥
        </Text>

        <Div>
          <Image size="80" />
          <ElContainer>
            <El>
              <Text bold size="14">
                288
              </Text>
              <Text>Posts</Text>
            </El>
            <El>
              <Text bold size="14">
                650
              </Text>
              <Text>Followrs</Text>
            </El>
            <El>
              <Text bold size="14">
                558
              </Text>
              <Text>Following</Text>
            </El>
          </ElContainer>
        </Div>

        <Stack spacing={2} direction="row" margin="3rem 0 0 0" padding="0">
          <Button
            style={{
              backgroundColor: isMyPostsActived ? "#686ef3" : "#fff",
              color: isMyPostsActived ? "white" : "#686ef3",
              border: isMyPostsActived ? "none" : ".6px solid #686ef3",
            }}
            id="your_posts"
            variant="contained"
            onClick={btnToggle}
          >
            My posts
          </Button>
          <Button
            style={{
              backgroundColor: !isMyPostsActived ? "#686ef3" : "#fff",
              color: !isMyPostsActived ? "white" : "#686ef3",
              border: !isMyPostsActived ? "none" : ".6px solid #686ef3",
            }}
            id="like_posts"
            variant="outlined"
            onClick={btnToggle}
          >
            like posts
          </Button>
        </Stack>

        {isMyPostsActived ? (
          <Grid padding="2rem 0">
            <Cards>
              {posts
                .filter((post) => post?.user_id === user_info.user_id)
                .map((post) => {
                  return <Card key={post.post_id} card={post} />;
                })}
            </Cards>
          </Grid>
        ) : (
          <Grid padding="2rem 0">
            <Cards>
              {posts
                .filter((post) => post?.post_like?.includes(user_info.user_id))
                .map((post) => {
                  return <Card key={post.post_id} card={post} />;
                })}
            </Cards>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

const Cards = styled.div`
  gap: 20px;
  width: 100%;
  padding: 20px 0;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ElContainer = styled.div`
  margin: 0;
  display: flex;

  gap: 2rem;
  justify-content: space-between;
`;
const El = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default MyAccount;
