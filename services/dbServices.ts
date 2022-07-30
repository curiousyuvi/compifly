import { FirebaseError } from "firebase/app";
import { doc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { UserDoc } from "../interfaces/UserDoc";

const getUserDoc = async (uid: string) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const friendColRef = collection(db, "users", uid, "friends");

        const userDocSnapshot = await getDoc(userDocRef);
        const friendColSnapshot = await getDocs(friendColRef);

        const userDoc: UserDoc = {
            name: userDocSnapshot.data()?.name,
            photoURL: userDocSnapshot.data()?.photoURL,
            username: userDocSnapshot.data()?.username,
            codechefHandle: userDocSnapshot.data()?.codechefHandle,
            codeforcesHandle: userDocSnapshot.data()?.codeforcesHandle,
            friends: friendColSnapshot.docs.map((doc) => {
                return doc.id;
            }),
        };

        return userDoc;
    } catch (error: any | FirebaseError) {
        console.error(error)
        return null;
    }
};

const getDocumentIDFromUsername = async (username: string) => {
    try {
        const usersColRef = collection(db, "users");

        // Create a query against the collection.
        const q = query(usersColRef, where("username", "==", username));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            return querySnapshot.docs[0].id;
        } else return null;
    } catch (error: any | FirebaseError) {
        console.error(error)
        return null;
    }
};

export { getDocumentIDFromUsername, getUserDoc }

