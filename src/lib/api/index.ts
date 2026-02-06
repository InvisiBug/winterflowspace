import { GetBookingResponse, GetGymsResponse, GetOccupantsResponse, LoginResponse, UserGymSelection } from "@/lib/types";

const env = import.meta.env;
const API_BASE_URL = env.VITE_API ?? "";

export const getBookings = async (selectedGym: UserGymSelection) => {
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

  // Stupid status comes back from the api call, deferencing the bookings so that its dropped
  const { bookings }: GetBookingResponse = await response.json();

  return bookings;
};

export const getAllGyms = async () => {
  const response = await fetch(`${API_BASE_URL}/get-gyms`, {
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  const { gyms }: GetGymsResponse = await response.json();

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

  const { occupants }: GetOccupantsResponse = await response.json();

  return occupants;
};

export const login = async (username: string, password: string) => {
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

  const { token }: LoginResponse = await response.json();

  return token;
};
