export interface Booking {
  free: boolean;
  start: string; // HH:MM format
  end: string; // HH:MM format
}

export type Bookings = Booking[][];

export type AvailableGyms = UserSelection[];

export type UserSelection = {
  name: string;
  id: string;
};
