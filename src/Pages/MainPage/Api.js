import { auth, db } from "../../DataBase/firebase";
import {
    collection,
    addDoc,
    setDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    limit,
    query,
    orderBy,
    arrayUnion,
} from "firebase/firestore";

const createGroup = async (formData) => {
    try {
        const groupNameList = {
            groupName: formData.name,
        }
        const contentDocRef = collection(db, "group_name");
        const docRef = await addDoc(contentDocRef, groupNameList);
        return {
            status: true,
            message: "Group Created Successfully"
        }
    } catch (e) {
        return {
            status: true,
            message: e.message,
        }
    }
};

