// "use client";
import React, { FC } from "react";
import { Gym } from "@/lib/types/schedule";
import { GymData } from "@/lib/types/gyms";
import Experiment from "@/lib/ui/studioFree";
import Switcher from "@/lib/ui/switcher";

const StudioFree: FC = async () => {
  const gymId = 75;

  const response = await fetch(`https://businessgateway.puregym.com/api/bookings/v1/timetable/${gymId}/scheduled-class`, { cache: "no-store" });
  const data: Gym = await response.json();

  // * An Api call for a list of available locations => https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json

  // const gymsResponse = await fetch("https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json", { cache: "no-store" });
  // const gymData: GymData = await gymsResponse.json();

  // const gyms: Data[] = [];

  type Data = {
    name: string;
    id: string;
  };

  // if (!gymData.data.allGym.nodes) return;

  // gymData.data.allGym.nodes.forEach((gym) => {
  //   gyms.push({ name: gym.name, id: gym.gymId });
  // });
  // console.log("🚀 ~ gymData.data.allGym.nodes.forEach ~ gyms:", gyms);

  return (
    <>
      <Switcher data={data} />

      {/* <Experiment data={data} /> */}
    </>
  );
};

type Props = {
  data: Gym;
};

export default StudioFree;
