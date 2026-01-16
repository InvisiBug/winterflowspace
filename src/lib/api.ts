import { AvailableGyms, GymData } from "@/lib/types/gyms";
import { Schedule } from "@/lib/types/schedule";

export const getSchedule = async (selectedGym: { name: string; id: string }) => {
  const rawGymSchedule = await fetch(`https://businessgateway.puregym.com/api/bookings/v1/timetable/${selectedGym.id}/scheduled-class`, { cache: "no-store" });
  const gymSchedule: Schedule = await rawGymSchedule.json();

  return gymSchedule;
};

export const getAllGyms = async () => {
  //* Get and format the list of available gyms
  const rawAvailableGymsResponse = await fetch("https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json", { cache: "no-store" });
  const formattedAvailableGymResponse: GymData = await rawAvailableGymsResponse.json();

  const availableGyms: AvailableGyms = [];

  //* Format the available gyms data
  formattedAvailableGymResponse.data.allGym.nodes?.forEach((gym) => {
    availableGyms.push({ name: gym.name, id: gym.gymId });
    availableGyms.sort((a, b) => a.name.localeCompare(b.name));
  });

  return availableGyms;
};

export const getTotalUsers = async (token: string, gymId: string) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PureGym/1523 CFNetwork/1312 Darwin/21.0.0",
  };

  headers["Authorization"] = `Bearer ${token}`;

  const gymData = await fetch(`https://capi.puregym.com/api/v2/gymSessions/gym?gymId=${gymId}`, {
    cache: "no-store",
    headers,
  });

  const parsedGymData = await gymData.json();

  const result = parsedGymData.TotalPeopleInGym;

  return result;
};

export const login = async (username: string, password: string) => {
  const data = {
    grant_type: "password",
    username,
    password,
    scope: "pgcapi",
    client_id: "ro.client",
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PureGym/1523 CFNetwork/1312 Darwin/21.0.0",
    Authorization: "",
  };

  try {
    const loginToken = await fetch("https://auth.puregym.com/connect/token", {
      method: "POST",
      cache: "no-store",
      headers,
      body: new URLSearchParams(data).toString(),
    });
    const jsonResponse = await loginToken.json();

    return jsonResponse.access_token;
  } catch {
    return null;
  }
};
