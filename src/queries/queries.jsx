import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

export async function storeJsonInCollection(collectionName, jsonData, docName) {
  try {
    // Get a reference to the Firestore database
    const db = getFirestore();
    let collectionRef;
    // Get a reference to the specified collection
    if (docName) {
      collectionRef = doc(db, collectionName, docName);
    } else {
      collectionRef = collection(db, collectionName);
    }

    // Validate that jsonData is an object and not null
    if (typeof jsonData !== "object" || jsonData === null) {
      throw new Error("Invalid data: must be a non-null object");
    }

    // Log the data being added (for debugging)

    // Add the entire JSON data as a new document in the collection
    let docRef;
    if (docName) {
      docRef = await setDoc(collectionRef, jsonData);
      console.log("Document written with ID: ", docRef);
      return docRef;
    } else {
      docRef = await addDoc(collectionRef, jsonData);
      console.log("Document written with ID: ", docRef);
      return docRef;
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function getDataFromCollection(collectionName, id = null) {
  try {
    const db = getFirestore();
    console.log("id", id);
    if (id) {
      // Fetch a single document if id is provided
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.log("No such document!");
        return null;
      }
    } else {
      // Fetch all documents if no id is provided
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return data;
    }
  } catch (error) {
    console.error("Error retrieving data: ", error);
    throw error;
  }
}

export async function uploadDocumentFirebase(file, userId) {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `driving_license/${userId}`);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
}
