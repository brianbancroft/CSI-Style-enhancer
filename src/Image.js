import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import image from "./fonz.jpeg";

const ImageContainer = styled("div")`
  width: 400px;
  height: 600px;
  border: 1px solid #555;

  background-image: url('${image}');
  background-repeat: no-repeat;
  background-size: contain;

  filter: ${props => `blur(${props.blurPx}px)`}
`;

const Image = ({ enhanceLevel }) => {
  const blurPx = enhanceLevel >= 5 ? 0 : 20 - 4 * enhanceLevel;

  return <ImageContainer blurPx={blurPx} />;
};

Image.propTypes = {
  enhanceLevel: PropTypes.number.isRequired
};

export default Image;
