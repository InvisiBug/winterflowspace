import React, { FC, useState } from "react";
import { Schedule } from "@/lib/types/schedule";

import MobileView from "@/lib/ui/views";
import { AvailableGyms } from "../types/gyms";
import { HamburgerButton, HamburgerMenu } from "@/lib/ui/hamburger";

const Switcher: FC<Props> = ({ data, availableGyms, peopleInGym }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  return (
    <>
      <HamburgerButton setIsHamburgerMenuOpen={setIsHamburgerMenuOpen} isHamburgerMenuOpen={isHamburgerMenuOpen} />
      <HamburgerMenu isHamburgerMenuOpen={isHamburgerMenuOpen} gymIds={availableGyms} />
      {data && <MobileView data={data} peopleInGym={peopleInGym} />}
    </>
  );
};

type Props = {
  data: Schedule | null;
  availableGyms: AvailableGyms | null;
  peopleInGym?: number;
};

export default Switcher;
