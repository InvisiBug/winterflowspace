import { Gym } from "@/lib/types/schedule";
import { GymData } from "@/lib/types/gyms";

const requestData = async () => {
  const gymId = 75;

  const response = await fetch(`https://businessgateway.puregym.com/api/bookings/v1/timetable/${gymId}/scheduled-class`, { cache: "no-store" });
  const data: Gym = await response.json();

  // * An Api call for a list of available locations => https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json

  const gymsResponse = await fetch("https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json", { cache: "no-store" });
  const gymData: GymData = await gymsResponse.json();

  const gyms: Data[] = [];

  type Data = {
    name: string;
    id: string;
  };

  return gymData;
};

export default requestData;
