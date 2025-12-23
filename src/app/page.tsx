// "use client";
import React, { FC } from "react";
import { cookies } from "next/headers";
import { Gym } from "@/lib/types/schedule";
import Switcher from "@/lib/ui/switcher";
import { AvailableGyms, GymData } from "@/lib/types/gyms";
import LandingPage from "@/lib/ui/LandingPage";
import { getTotalUsers } from "@/lib/api";

const StudioFree: FC = async () => {
  //* Get and format the list of available gyms
  const rawAvailableGymsResponse = await fetch("https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json", { cache: "no-store" });
  const formattedAvailableGymResponse: GymData = await rawAvailableGymsResponse.json();

  const availableGyms: AvailableGyms = [];

  //* Format the available gyms data
  formattedAvailableGymResponse.data.allGym.nodes?.forEach((gym) => {
    availableGyms.push({ name: gym.name, id: gym.gymId });
    availableGyms.sort((a, b) => a.name.localeCompare(b.name));
  });

  //* Get the user's gym from cookies
  const cookieStore = await cookies();
  const usersGym = cookieStore.get("userGym");

  // If no gym is selected, show the landing page
  if (!usersGym) {
    return <LandingPage availableGyms={availableGyms} />;
  }

  //* If gym is selected, fetch data and show switcher
  const parsed = JSON.parse(decodeURIComponent(usersGym.value));
  const rawGymSchedule = await fetch(`https://businessgateway.puregym.com/api/bookings/v1/timetable/${parsed.id}/scheduled-class`, { cache: "no-store" });
  const parsedGymSchedule: Gym = await rawGymSchedule.json();

  const credentialsCookie = cookieStore.get("credentials");
  // let username = "";
  // let password = "";

  // let totalUsers = undefined;

  // if (credentialsCookie) {
  //   const { username: savedUsername, pin: savedPin } = JSON.parse(decodeURIComponent(credentialsCookie.value));
  //   username = savedUsername;
  //   password = savedPin;
  //   // totalUsers = (await getTotalUsers(username, password, parsed.id)) || 0;
  //   totalUsers = (await getTotalUsers(username, password, parsed.id)) || 0;
  // }

  return (
    <>
      <Switcher data={parsedGymSchedule} availableGyms={availableGyms} peopleInGym={200} />
    </>
  );
};

export default StudioFree;
