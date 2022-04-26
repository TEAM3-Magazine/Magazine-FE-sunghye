import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// slices
import { addPostAxios, updatePostAxios } from "../redux/modules/postSlice";
// elements
import { Grid, Text, Image } from "../elements";
// styled
import styled from "styled-components";
import Button from "@mui/material/Button";
// image
import { setPreview } from "../redux/modules/imageSlice";

const CardForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // 포스트 편집 위해 필요한 ref
  const param = useParams();
  const is_edit = param?.post_id ? true : false;
  const contentRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    if (is_edit) {
      dispatch(setPreview(location.state.card?.image_url));
      contentRef.current.value = location.state.card?.contents;
    }
    return () => {
      dispatch(setPreview(null));
    };
  }, []);

  // 업로드 이미지 미리 보기
  const preview = useSelector((state) => state.image.preview);

  const selectPhoto = (e) => {
    const fileReader = new FileReader();
    const file = fileRef.current.files[0];

    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => {
      dispatch(setPreview(fileReader.result));
    };
  };

  // 포스트 작성 or 편집 함수
  const addNewPost = (e) => {
    e.preventDefault();

    const content = contentRef.current.value;
    if (content === "" || !preview) {
      alert("please attach the image and fill in the context");
      return;
    }

    const newPost = {
      contents: content,
      image_url: null,
    };

    !is_edit
      ? dispatch(addPostAxios({ postData: newPost, navigate }))
      : dispatch(
          updatePostAxios({
            postData: {
              contents: content,
              image_url: location.state.card?.image_url,
            },
            post_id: param.post_id,
            navigate,
          })
        );
  };

  return (
    <>
      <form onSubmit={addNewPost}>
        <Grid margin="150px 0 0 0">
          <Text margin="16px 0px" size="28px" bold>
            {is_edit ? "Edit Post" : "Create Post"}
          </Text>
          <Grid padding="16px 0px">
            <input ref={fileRef} onChange={selectPhoto} type="file" />
          </Grid>
        </Grid>

        <Grid>
          <Text margin="16px 0px" size="20px" bold>
            Preview
          </Text>
          <Image
            shape="rectangle"
            preview_img
            src={preview ?? "http://via.placeholder.com/400x300"}
          />
        </Grid>

        <Grid padding="16px">
          <TextBox
            ref={contentRef}
            name="content"
            cols="30"
            rows="10"
            placeholder="Write a contents"
            autoFocus
          ></TextBox>
        </Grid>

        <Grid padding="16px">
          {is_edit ? (
            <Button
              type="submit"
              style={{
                backgroundColor: "#686ef3",
                width: "100%",
              }}
              variant="contained"
            >
              Edit Post
            </Button>
          ) : (
            <Button
              type="submit"
              style={{
                backgroundColor: "#686ef3",
                width: "100%",
              }}
              variant="contained"
            >
              Post
            </Button>
          )}
        </Grid>
      </form>
    </>
  );
};

const TextBox = styled.textarea`
  display: block;
  width: 100%;
`;
export default CardForm;
