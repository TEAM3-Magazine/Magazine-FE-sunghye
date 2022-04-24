import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, preview_img } = props;
  const styles = {
    src: src,
    size: size,
    preview_img: preview_img,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  // return (
  //   <React.Fragment>
  //     <ImageDefault {...styles}></ImageDefault>
  //   </React.Fragment>
  // );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://firebasestorage.googleapis.com/v0/b/react-deep-99.appspot.com/o/images%2FGfqOcoismnVlroqVfxomqd5Sgvo2_1650078478923?alt=media&token=20c3ff5e-6f0f-405d-bff5-4427148ebba4",
  size: 36,
  preview_img: false,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background: url("${(props) => props.src}") 0 -120px;

  ${(props) =>
    props.preview_img
      ? `  background-position:  0;`
      : `  background-position: 0 -120px;`}

  background-size: cover;
  background-repeat: no-repeat;
`;

const ImageDefault = styled.div`
  // 변수 생성
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  // 변수 생성
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
