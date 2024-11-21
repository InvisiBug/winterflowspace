"use client";
import React, { FC } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from "./sketch";
import { Gym } from "./types";

const Experiment: FC<Props> = ({ data }) => {
  return <ReactP5Wrapper sketch={sketch} sketchProps={data} />;
};

type Props = {
  data: Gym;
};

export default Experiment;
