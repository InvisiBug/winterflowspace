import { GymData } from "@/lib/types/gyms";

const run = async () => {
  const response = await fetch("https://www.puregym.com/gymsandcities/page-data/sq/d/273207268.json", { cache: "no-store" });
  const data: GymData = await response.json();

  const gyms: Data[] = [];

  type Data = {
    name: string;
    id: string;
  };

  // console.log(data.data.allGym.nodes);

  if (!data.data.allGym.nodes) return;

  data.data.allGym.nodes.forEach((gym) => {
    gyms.push({ name: gym.name, id: gym.gymId });
  });

  console.log(gyms);
};

run();
