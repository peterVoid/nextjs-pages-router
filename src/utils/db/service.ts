import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import bcrpyt from "bcrypt";
export async function getCar(coll: string) {
  const querySnapShot = await getDocs(collection(db, coll));
  const data = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function getCarWithId(col: string, id: string) {
  const snapshot = await getDoc(doc(db, col, id));
  const result = snapshot.data();
  return result;
}

export const signUp = async (
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );
  const querysnapshot = await getDocs(q);
  const data = querysnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({
      status: false,
      message: "Email already exist",
    });
    return;
  } else {
    userData.password = await bcrpyt.hash(userData.password, 10);
    userData.role = "member";
    addDoc(collection(db, "users"), userData);
    callback({
      status: true,
      message: "Success",
    });
  }
};

export const signIn = async (user: { email: string }) => {
  const q = query(collection(db, "users"), where("email", "==", user.email));
  const querySnapShot = await getDocs(q);
  const data = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
};

export const signInWithGoogle = async (userProfile: any, callback: any) => {
  const q = query(
    collection(db, "users"),
    where("email", "==", userProfile.email)
  );
  const querySnapShot = await getDocs(q);
  const data: any = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    userProfile.role = data[0].role;
    updateDoc(doc(db, "users", data[0].id), userProfile)
      .then(() => {
        callback({
          status: true,
          message: "Success",
          userProfile,
        });
      })
      .catch((err) => {
        callback({
          status: false,
          message: err,
        });
      });
  } else {
    userProfile.role = "member";
    await addDoc(collection(db, "users"), userProfile)
      .then(() => {
        callback({
          status: true,
          message: "Success",
          userProfile,
        });
      })
      .catch((err) => {
        callback({
          status: false,
          message: err,
        });
      });
  }
};
