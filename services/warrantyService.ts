import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export const addWarranty = async (data: any) => {
  return await addDoc(collection(db, "warranties"), data);
};

export const getUserWarranties = async (userId: string) => {
  const q = query(
    collection(db, "warranties"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getWarrantyById = async (id: string) => {
  const ref = doc(db, "warranties", id);
  const snap = await getDoc(ref);

  return { id: snap.id, ...snap.data() };
};

export const deleteWarranty = async (id: string) => {
  return await deleteDoc(doc(db, "warranties", id));
};

export const updateWarranty = async (id: string, data: any) => {
  return await updateDoc(doc(db, "warranties", id), data);
};
