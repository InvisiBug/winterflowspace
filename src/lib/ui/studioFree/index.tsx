import React, { FC, useState } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import Cookies from "js-cookie";
import styled from "styled-components";
import { sketch } from "./sketch";
import { Gym } from "@/lib/types/schedule";

//! Window issue https://github.com/P5-wrapper/react/issues/47

const Experiment: FC<Props> = ({ data }) => {
  const val = Cookies.get("userGym");

  const parsed = val ? JSON.parse(decodeURIComponent(val)) : null;

  const enrichedData = {
    ...data,
    ...parsed,
  };

  console.log(enrichedData);

  return (
    <Container>
      <ReactP5Wrapper sketch={sketch} sketchProps={enrichedData} />
    </Container>
  );
};

type Props = {
  data: Gym;
};

export default Experiment;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh;/ */
  background-color: #2a2c31;
`;
