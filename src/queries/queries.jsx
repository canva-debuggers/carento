import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as geofirestore from "geofirestore";
import { GeoPoint } from "firebase/firestore";

// Add this function to initialize Firebase
export const initializeFirebase = (config) => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyCwQVoooq1uWnmqyPF5CMeD5wstA085t34",
      authDomain: "car-rental-bk.firebaseapp.com",
      projectId: "car-rental-bk",
      storageBucket: "car-rental-bk.appspot.com",
      messagingSenderId: "146726723723",
      appId: "1:146726723723:web:29edc53de4c45bba5d748e",
      measurementId: "G-TGCY6HENYQ",
    });
  }
};

initializeFirebase();

// Make sure to call initializeFirebase with your config before using any other functions

function convertToGeoPoints(payload) {
  if (typeof payload !== "object" || payload === null) {
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => convertToGeoPoints(item));
  }

  const result = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "object" && value !== null) {
      if ("lat" in value && "lng" in value && Object.keys(value).length === 2) {
        // Convert to GeoPoint if object has only lat and lng
        result[key] = new GeoPoint(value.lat, value.lng);
      } else {
        // Recursively process nested objects
        result[key] = convertToGeoPoints(value);
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

export const createUser = async (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      throw error;
    });
};

export const loginUser = async (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      throw error;
    });
};

export const googleUser = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      console.log("token", token);
      const user = result.user;
      console.log("user", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.error(errorCode, errorMessage, email, credential);
      throw error;
    });
};

export async function storeJsonInCollection(collectionName, jsonData, docName) {
  try {
    const db = firebase.firestore();
    let collectionRef;

    if (docName) {
      collectionRef = db.collection(collectionName).doc(docName);
    } else {
      collectionRef = db.collection(collectionName);
    }

    if (typeof jsonData !== "object" || jsonData === null) {
      throw new Error("Invalid data: must be a non-null object");
    }

    let docRef;
    if (docName) {
      await collectionRef.set(jsonData);
      docRef = collectionRef;
    } else {
      docRef = await collectionRef.add(jsonData);
    }

    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function getDataFromCollection(collectionName, id = null) {
  try {
    const db = firebase.firestore();
    console.log("id", id);

    if (id) {
      const docRef = db.collection(collectionName).doc(id);
      const doc = await docRef.get();

      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
        };
      } else {
        console.log("No such document!");
        return null;
      }
    } else {
      const collectionRef = db.collection(collectionName);
      const snapshot = await collectionRef.get();
      const data = [];

      snapshot.forEach((doc) => {
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

export async function getDataFromCollectionByGeo(collectionName, center) {
  const radius = 5000000; // in kilometers

  try {
    const db = firebase.firestore();
    const geoDB = geofirestore.initializeApp(db);

    const geocollection = geoDB.collection(collectionName, "location");

    const query = geocollection.near({
      center: center,
      radius: radius,
    });
    const data = [];

    const snapshot = await query.get();
    console.log("center", snapshot);

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return data;
  } catch (error) {
    console.error("Error retrieving data: ", error);
    throw error;
  }
}

export async function getDataFromCollectionaddGeo(collectionName, jsonData) {
  const radius = 5000000; // in kilometers

  try {
    const db = firebase.firestore();
    const geoDB = geofirestore.initializeApp(db);

    const geocollection = geoDB.collection(collectionName);
    const modifiedPayload = convertToGeoPoints(jsonData);
    var data;
    if (modifiedPayload) {
      data = await geocollection.add(modifiedPayload);
    }

    return data;
  } catch (error) {
    console.error("Error retrieving data: ", error);
  }
}

export async function uploadDocumentFirebase(file, userId) {
  try {
    const storage = firebase.storage();
    const storageRef = storage.ref(`driving_license/${userId}`);

    const snapshot = await storageRef.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
}
