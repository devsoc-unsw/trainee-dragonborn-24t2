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
}