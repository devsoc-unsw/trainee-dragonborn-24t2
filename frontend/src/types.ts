import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  name: string;
  // password: string;
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
  activities: string[]
  packing: {
    title: string;
    items: { text: string; checked: boolean }[];
  }[]
  imgUrl: string;
}

export type Activity = {
  tripId: string;
  activityId: string;
  name: string;
  date: Timestamp;
  starttime: Timestamp;
  endtime: Timestamp;
};