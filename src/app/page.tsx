// "use client";
import React, { FC } from "react";
import { cookies } from "next/headers";
import { Gym } from "@/lib/types/schedule";
import Switcher from "@/lib/ui/switcher";
import { AvailableGyms, GymData } from "@/lib/types/gyms";

const StudioFree: FC = async () => {
  //* Get and format the list of available gyms
  const rawAvailableGymsResponse = await fetch("https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json", { cache: "no-store" });
  const formattedAvailableGymResponse: GymData = await rawAvailableGymsResponse.json();

  const availableGyms: AvailableGyms = [];

  // Format the available gyms data
  formattedAvailableGymResponse.data.allGym.nodes?.forEach((gym) => {
    availableGyms.push({ name: gym.name, id: gym.gymId });
    availableGyms.sort((a, b) => a.name.localeCompare(b.name));
  });

  //* Get the user's gym from cookies or default to a specific gym
  const cookieStore = await cookies();
  const usersGym = cookieStore.get("userGym");
  let rawGymSchedule;

  if (!usersGym) {
    console.log("No userGym cookie found, setting default gym.");
    rawGymSchedule = await fetch(`https://businessgateway.puregym.com/api/bookings/v1/timetable/${75}/scheduled-class`, { cache: "no-store" });
  } else {
    const parsed = JSON.parse(decodeURIComponent(usersGym.value));
    rawGymSchedule = await fetch(`https://businessgateway.puregym.com/api/bookings/v1/timetable/${parsed.id}/scheduled-class`, { cache: "no-store" });
  }

  const parsedGymSchedule: Gym = await rawGymSchedule.json();

  console.log("🚀 ~ StudioFree ~ parsedGymSchedule:", parsedGymSchedule);

  return (
    <>
      <Switcher data={parsedGymSchedule} availableGyms={availableGyms} />
    </>
  );
};

export default StudioFree;
