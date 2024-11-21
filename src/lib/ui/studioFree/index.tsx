"use client";
import React, { FC } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import styled from "styled-components";
import { sketch } from "./sketch";
import { Gym } from "@/lib/types/schedule";

const Experiment: FC<Props> = ({ data }) => {
  return (
    <Container>
      <ReactP5Wrapper sketch={sketch} sketchProps={data} />
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
