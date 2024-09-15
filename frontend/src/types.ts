import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  name: string;
  // password: string;
  trips: string[]; // list of trip ids
  profileimg: string;
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
  image: string;
  itinerary: DaySchedule[]; // for the itinerary page
}

export type Activity = {
  tripId: string;
  activityId: string;
  name: string;
  date: Timestamp;
  starttime: Timestamp;
  endtime: Timestamp;
};

export type DaySchedule = {
  date: Timestamp;
  dayEvents: Activity[];
}

// export type DayEvent = {
//   name: String;
//   from: Timestamp;
//   to: Timestamp;
// }