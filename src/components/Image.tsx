import React from "react";
import styled from "styled-components";
import theme from "../utils/theme";

interface ImageProps {
  thumbnail: string;
  height?: string;
}

const Image = styled.div`
  display: flex;
  flex-shrink: 0;
  width: ${(props: ImageProps) => props.height || 70}px;
  height: ${(props: ImageProps) => props.height || 70}px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("${(props: ImageProps) => props.thumbnail}");
  background-color: ${theme.defaultGray};
  margin-right: 10px;
`;

export default Image;
