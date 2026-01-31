import { AvailableGyms, GymData } from "@/lib/types/gyms";
import { Schedule } from "@/lib/types/schedule";
const env = import.meta.env;

// const API_BASE_URL = "http://Dlocalhost:3000";
const API_BASE_URL = env.VITE_API ?? "";

export const getSchedule = async (selectedGym: { name: string; id: string } | null) => {
  if (!selectedGym) return null;

  const response = await fetch(`${API_BASE_URL}/get-schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gymId: selectedGym.id,
    }),
    cache: "no-store",
  });

  const { schedule } = await response.json();

  return schedule;
};

export const getAllGyms = async () => {
  const response = await fetch(`${API_BASE_URL}/get-gyms`, {
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  const { gyms } = await response.json();

  return gyms;
};

export const getTotalUsers = async (token: string, gymId: string) => {
  const response = await fetch(`${API_BASE_URL}/get-occupants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      gymId,
    }),
    cache: "no-store",
  });

  const { occupants } = await response.json();

  return occupants;
};

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      cache: "no-store",
    });

    const { token } = await response.json();
    console.log("🚀 ~ login ~ token:", token);

    return token;
  } catch {
    return null;
  }
};
