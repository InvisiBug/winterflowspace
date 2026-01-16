"use client";
import React, { FC, useState } from "react";
import { Schedule } from "@/lib/types/schedule";
import deviceDimensions from "@/lib/hooks/useDeviceDimensions";
import MobileView from "@/lib/ui/views";
import { AvailableGyms } from "../types/gyms";
import { HamburgerButton, HamburgerMenu } from "@/lib/ui/hamburger";

const Switcher: FC<Props> = ({ data, availableGyms, peopleInGym }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const { width, height } = deviceDimensions();

  if (!width) return;
  if (!height) return;

  return (
    <>
      <HamburgerButton setIsHamburgerMenuOpen={setIsHamburgerMenuOpen} isHamburgerMenuOpen={isHamburgerMenuOpen} />
      <HamburgerMenu isHamburgerMenuOpen={isHamburgerMenuOpen} gymIds={availableGyms} />
      <MobileView data={data} peopleInGym={peopleInGym} />
    </>
  );
};

type Props = {
  data: Schedule;
  availableGyms: AvailableGyms;
  peopleInGym?: number;
};

export default Switcher;
