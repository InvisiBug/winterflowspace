import React, { FC, useState } from "react";
import MobileView from "@/lib/ui/views";
import { AvailableGyms } from "../types/gyms";
import { HamburgerButton, HamburgerMenu } from "@/lib/ui/hamburger";
import { Bookings } from "../types";

const Switcher: FC<Props> = ({ bookings, availableGyms, peopleInGym }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  return (
    <>
      <HamburgerButton setIsHamburgerMenuOpen={setIsHamburgerMenuOpen} isHamburgerMenuOpen={isHamburgerMenuOpen} />
      <HamburgerMenu isHamburgerMenuOpen={isHamburgerMenuOpen} gymIds={availableGyms} />
      {bookings && <MobileView bookings={bookings} peopleInGym={peopleInGym} />}
    </>
  );
};

type Props = {
  availableGyms: AvailableGyms | null;
  peopleInGym?: number;
  bookings: Bookings;
};

export default Switcher;
