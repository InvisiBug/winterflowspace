// "use client";
import React, { FC } from "react";
import { Gym } from "@/lib/types/schedule";
import Experiment from "@/lib/ui/studioFree";

const StudioFree: FC = async () => {
  const response = await fetch("https://businessgateway.puregym.com/api/bookings/v1/timetable/75/scheduled-class", { cache: "no-store" });
  const data: Gym = await response.json();

  // https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json

  return (
    <>
      <Experiment data={data} />
    </>
  );
};

type Props = {
  data: Gym;
};

export default StudioFree;
