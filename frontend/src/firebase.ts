import { collection, doc, documentId, Firestore, query, setDoc, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData, useUser as _useAuthUser, useStorage } from "reactfire";
import { Activity, Trip, User } from "./types.ts";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * User helper functions
 */

// Create a new user
export const createUser = async (
  firestore: Firestore,
  user: Omit<User, "trips">,
  uid: string,
): Promise<void> => {
  const userRef = doc(firestore, "Users", uid); // reference with uid
  await setDoc(userRef, {
    ...user,
    trips: [],
  });
};

// Get a single user, returns undefined while loading
// Also returns a setUser function to update the user (e.g. add a friend)
export const useUser = (uid: string): [
    User | undefined,
  (updated: User) => Promise<void>
] => {
  const firestore = useFirestore();
  const userRef = doc(firestore, "Users", uid);
  const { status, data } = useFirestoreDocData(userRef);

  const updateUser = async (updated: User) => setDoc(userRef, updated);

  return [status === "success" ? data as User : undefined, updateUser];
};

// get list of users, returns undefined when loadig
export const useAllUsers = (): User[] | undefined => {
  const firestore = useFirestore();
  const usersRef = collection(firestore, "Users"); // user collection
  const { status, data } = useFirestoreCollectionData(usersRef, { idField: "uid" });
  return status === "success" ? (data as User[]) : undefined;
};

// Get a list of trips (e.g. a user's friends), returns undefined while loading
export const useUsers = (usernames: string[]): User[] | undefined => {
  const firestore = useFirestore();

  const usersRef = query(
    collection(firestore, "Users"),
    where(documentId(), "in", usernames.length ? usernames : ["DUMMY"]),
  );
  const { status, data } = useFirestoreCollectionData(usersRef, { idField: "email" });

  return status === "success" ? data as User[] : undefined;
};

/**
 * Trip helper functions
 */

// Create a trip and return its ID
export const createTrip = async (
  firestore: Firestore,
  creatorId: string,
  trip: Omit<Trip, "tripId" | "members" | "todos" | "activities" | "packing">
): Promise<string> => {
  const tripId = crypto.randomUUID();

  const tripRef = doc(firestore, "Trips", tripId);
  await setDoc(tripRef, {
    ...trip,
    members: [creatorId],
    todos: [],
    activities: [],
    packing: []
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


/** create activity */
export const createActivity = async (
  firestore: Firestore,
  tripId: string,
  activity: Omit<Activity, "activityId" | "tripId">
): Promise<string> => {
  const activityId = crypto.randomUUID();

  const activityRef = doc(firestore, "Activities", activityId);

  await setDoc(activityRef, {
    tripId,
    activityId,
    ...activity,
  });

  return activityId;
};


// get and activiyt, and edit it
export const useActivity = (activityId: string): [
    Activity | undefined,
  (updated: Omit<Activity, "activityId">) => Promise<void>
] => {
  const firestore = useFirestore();
  const activityRef = doc(firestore, "Activities", activityId);
  const { status, data } = useFirestoreDocData(activityRef);

  const updateActivity = async (updated: Omit<Activity, "activityId">) => {
    await setDoc(activityRef, {
      activityId,
      ...updated
    });
  };

  return [status === "success" ? data as Activity : undefined, updateActivity];
};

export const useAuthUser = () => {
  const { data } = _useAuthUser();
  return useUser(data!.uid);
}

export const uploadImage = async (file: File): Promise<string> => {
  const storage = useStorage();
  const storageRef = ref(storage, `trip_images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};