import { AvailableGyms, GymData, Bookings } from "@/lib/types";
const env = import.meta.env;

// const API_BASE_URL = "http://Dlocalhost:3000";
const API_BASE_URL = env.VITE_API ?? "";

export const getBookings = async (selectedGym: { name: string; id: string } | null): Promise<Bookings | null> => {
  if (!selectedGym) return null;

  const response = await fetch(`${API_BASE_URL}/get-bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gymId: selectedGym.id,
    }),
    cache: "no-store",
  });

  const bookings = await response.json();
  console.log("🚀 ~ getBookings ~ bookings:", bookings);

  return bookings;
};

export const getAllGyms = async (): Promise<AvailableGyms | null> => {
  const response = await fetch(`${API_BASE_URL}/get-gyms`, {
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  const { gyms } = await response.json();

  return gyms;
};

export const getOccupants = async (token: string, gymId: string) => {
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

    return token;
  } catch {
    return null;
  }
};
