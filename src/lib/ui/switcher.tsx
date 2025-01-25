"use client";
import React, { FC } from "react";
import { Gym } from "@/lib/types/schedule";
import deviceDimensions from "@/lib/hooks/useDeviceDimensions";
import Experiment from "@/lib/ui/studioFree";
import { MobileView } from "@/lib/ui/views";

const Switcher: FC<Props> = ({ data }) => {
  const { width, height } = deviceDimensions();

  if (!width) return;
  if (!height) return;

  // console.log(data);

  return (
    <>
      {width < 768 ? <MobileView data={data} /> : <Experiment data={data} />}
      {/* <div>{`Width ${width} Height ${height}`}</div> */}
      {/* <pre>{data}</pre> */}
      {/* <Experiment data={data} /> */}
    </>
  );
};

type Props = {
  data: Gym;
};

export default Switcher;
