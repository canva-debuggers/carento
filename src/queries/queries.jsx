import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

export const createUser = async (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user", user);
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const loginUser = async (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const googleUser = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("token", token);
      // The signed-in user info.
      const user = result.user;
      console.log("user", user);
      return user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export async function storeJsonInCollection(collectionName, jsonData) {
  try {
    // Get a reference to the Firestore database
    const db = getFirestore();

    // Get a reference to the specified collection
    const collectionRef = collection(db, collectionName);

    // Validate that jsonData is an object and not null
    if (typeof jsonData !== "object" || jsonData === null) {
      throw new Error("Invalid data: must be a non-null object");
    }

    // Log the data being added (for debugging)

    // Add the entire JSON data as a new document in the collection
    const docRef = await addDoc(collectionRef, jsonData);

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function getAllDataFromCollection(collectionName) {
  try {
    // Get a reference to the Firestore database
    const db = getFirestore();

    // Get a reference to the specified collection
    const collectionRef = collection(db, collectionName);

    // Get all documents from the collection
    const querySnapshot = await getDocs(collectionRef);

    // Array to store the retrieved data
    const data = [];

    // Iterate through the documents and add them to the data array
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return data;
  } catch (error) {
    console.error("Error retrieving documents: ", error);
    throw error;
  }
}
