export interface Booking {
  free: boolean;
  start: string; // HH:MM format
  end: string; // HH:MM format
}

export type Bookings = Booking[][];

export type AvailableGyms = UserGymSelection[];

export type UserGymSelection = {
  name: string;
  id: string;
};

export interface GetBookingResponse {
  status: string;
  bookings: Bookings;
}

export interface GetGymsResponse {
  status: string;
  gyms: AvailableGyms;
}

export interface GetOccupantsResponse {
  status: string;
  occupants: number;
}

export interface LoginResponse {
  status: string;
  token: string;
}
