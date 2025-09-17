"use client";
import React, { FC, useState } from "react";
import { Gym } from "@/lib/types/schedule";
import deviceDimensions from "@/lib/hooks/useDeviceDimensions";
import Experiment from "@/lib/ui/studioFree";
import { MobileView, MobileViewV2 } from "@/lib/ui/views";
import { AvailableGyms } from "../types/gyms";
import { HamburgerButton, HamburgerMenu } from "@/lib/ui/hamburger";

const Switcher: FC<Props> = ({ data, availableGyms }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const { width, height } = deviceDimensions();

  if (!width) return;
  if (!height) return;

  return (
    <>
      <HamburgerButton setIsHamburgerMenuOpen={setIsHamburgerMenuOpen} isHamburgerMenuOpen={isHamburgerMenuOpen} />
      <HamburgerMenu isHamburgerMenuOpen={isHamburgerMenuOpen} gymIds={availableGyms} />
      {/* {width < 768 ? <MobileView data={data} /> : <Experiment data={data} />} */}
      {width < 768 ? <MobileViewV2 data={data} /> : <Experiment data={data} />}
    </>
  );
};

type Props = {
  data: Gym;
  availableGyms: AvailableGyms;
};

export default Switcher;
