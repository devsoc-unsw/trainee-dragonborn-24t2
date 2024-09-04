import { collection, doc, documentId, Firestore, query, setDoc, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from "reactfire";
import { Trip, User } from "./types.ts";

/**
 * User helper functions
 */

// Create a new user
export const createUser = async (
  firestore: Firestore,
  user: Omit<User, "trips">,
): Promise<void> => {
  const { username, ...userFields } = user;

  const tripRef = doc(firestore, "Users", username);
  await setDoc(tripRef, {
    ...userFields,
    trips: [],
  });
};

// Get a single user, returns undefined while loading
// Also returns a setUser function to update the user (e.g. add a friend)
export const useUser = (username: string): [
    User | undefined,
  (updated: User) => Promise<void>
] => {
  const firestore = useFirestore();
  const userRef = doc(firestore, "Users", username);
  const { status, data } = useFirestoreDocData(userRef, { idField: "username" });

  const updateTrip = async (updated: User) => setDoc(userRef, updated);

  return [status === "success" ? data as User : undefined, updateTrip];
};

// Get a list of trips (e.g. a user's friends), returns undefined while loading
export const useUsers = (usernames: string[]): User[] | undefined => {
  const firestore = useFirestore();

  const usersRef = query(
    collection(firestore, "Users"),
    where(documentId(), "in", usernames.length ? usernames : ["DUMMY"]),
  );
  const { status, data } = useFirestoreCollectionData(usersRef, { idField: "username" });

  return status === "success" ? data as User[] : undefined;
};

/**
 * Trip helper functions
 */

// Create a trip and return its ID
export const createTrip = async (
  firestore: Firestore,
  creatorUsername: string,
  trip: Omit<Trip, "tripId" | "members" | "todos">
): Promise<string> => {
  const tripId = crypto.randomUUID();

  const tripRef = doc(firestore, "Trips", tripId);
  await setDoc(tripRef, {
    ...trip,
    members: [creatorUsername],
    todos: [],
  });
  return tripId;
};

// Get a single trip, returns undefined while loading
// Also returns a setTrip function to update the trip (e.g. add a to-do)
export const useTrip = (tripId: string): [
    Trip | undefined,
  (updated: Trip) => Promise<void>
] => {
  const firestore = useFirestore();
  const tripRef = doc(firestore, "Trips", tripId);
  const { status, data } = useFirestoreDocData(tripRef, { idField: "tripId" });

  const updateTrip = async (updated: Trip) => setDoc(tripRef, updated);

  return [status === "success" ? data as Trip : undefined, updateTrip];
};

// Get a list of trips (e.g. a user's trips), returns undefined while loading
export const useTrips = (tripIds: string[]): Trip[] | undefined => {
  const firestore = useFirestore();

  const tripsRef = query(
    collection(firestore, "Trips"),
    where(documentId(), "in", tripIds.length ? tripIds : ["DUMMY"]),
  );
  const { status, data } = useFirestoreCollectionData(tripsRef, { idField: "tripId" });

  return status === "success" ? data as Trip[] : undefined;
};
