import { Timestamp } from "firebase/firestore";

export type User = {
  username: string;
  name: string;
  email: string;
  password: string;
  trips: string[]; // list of trip ids
}

export type Trip = {
  tripId: string;
  name: string;
  destination: string;
  from: Timestamp;
  to: Timestamp;
  members: string[]; // list of usernames
  todos: string[];
  itinerary: DaySchedule[]; // for the itinerary page
}

export type DaySchedule = {
  date: Timestamp;
  dayEvents: DayEvent[];
}

export type DayEvent = {
  name: String;
  from: Timestamp;
  to: Timestamp;
}