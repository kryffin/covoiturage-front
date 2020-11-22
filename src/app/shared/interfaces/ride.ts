export interface Ride {
  id?: string;
  driver: string;
  clients?: string[];
  start: Location;
  finish: Location;
  duration: number;
  price: number;
  stops?: Location[];
  nbSeats: number;
  date: string;
}

export interface Location {
  street: string;
  postalCode: string;
  city: string;
}
