export interface Ride {
  id?: string;
  driver: string;
  client?: string;
  start: Location;
  finish: Location;
  duration: number;
  price: number;
  date: string;
}

export interface Location {
  street: string;
  postalCode: string;
  city: string;
}
