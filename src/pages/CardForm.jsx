import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";

const CardForm = () => {
  const preview = "http://via.placeholder.com/400x300";

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="16px 0px" size="36px" bold>
          {/* {is_edit ? "게시글 수정" : "게시글 작성"} */}
          "게시글 작성 "
        </Text>
        <Grid is_flex>
          {/* Upload :  이미지 파일 따로 가공해 받아옴 */}
          {/* <Upload /> */}upload
        </Grid>
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
        <Image
          shape="rectangle"
          preview_img
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
      </Grid>

      <Grid padding="16px">
        <Input
          value={"contents"}
          // _onChange={"changeContents"}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        <Button> 게시글 작성</Button>
        {/* {is_edit ? (
        <Button text="게시글 수정" _onClick={editPost}></Button>
      ) : (
        <Button text="게시글 작성" _onClick={addPost}></Button>
      )} */}
      </Grid>
    </React.Fragment>
  );
};

export default CardForm;
