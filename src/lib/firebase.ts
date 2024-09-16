import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { pageInitaileContent } from "./constants";
const firebaseConfig = {
  apiKey: "AIzaSyDO1uSD0u7K_c5oG9CLzeyggrYf9wCE3B4",
  authDomain: "sitegen-c6d29.firebaseapp.com",
  projectId: "sitegen-c6d29",
  storageBucket: "sitegen-c6d29.appspot.com",
  messagingSenderId: "742827025387",
  appId: "1:742827025387:web:5352e4239748843eadafae",
  measurementId: "G-61X5H6DHDF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const createWebsite = async (userId, websiteName, desc, domain, websiteImg, setProgress) => {
  try {
    const websitesCollection = collection(db, "websites");

    // Step 1: Upload the image to Firebase Storage
    let imageUrl = "";

    if (websiteImg) {
      const imageRef = ref(storage, `websites/${userId}/${websiteImg[0].name}`);
      const uploadTask = uploadBytesResumable(imageRef, websiteImg[0]);

      // Return a promise that resolves when the upload and Firestore addDoc are done
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Calculate progress percentage
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress); // Update progress state to show on the UI
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error during upload:", error);
            reject("Image upload failed");
          },
          async () => {
            // Get the download URL after the upload completes
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

            // Step 2: Add website data, including the image URL, to Firestore
            await addDoc(websitesCollection, {
              name: websiteName,
              userId,
              desc,
              domain,
              imageUrl, // Store the image URL in Firestore
            });

            resolve("Website created successfully"); // Resolve after completion
          }
        );
      });
    } else {
      // No image case: Add the website data without an image
      await addDoc(websitesCollection, {
        name: websiteName,
        userId,
        desc,
        domain,
        imageUrl: "", // No image URL
      });

      return "Website created successfully without image"; // Return a success response
    }
  } catch (error) {
    console.error("Error creating website:", error);
    return "Error creating website"; // Return an error response
  }
};

export const fetchUserWebsites = async (userId) => {
  try {
    // Reference to the websites collection
    const websitesRef = collection(db, "websites");

    // Create a query to get websites where the userId matches
    const q = query(websitesRef, where("userId", "==", userId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Parse the query result into an array of website data
    const websites = [];
    querySnapshot.forEach((doc) => {
      websites.push({ id: doc.id, ...doc.data() });
    });

    return websites;
  } catch (error) {
    console.error("Error fetching user websites:", error);
    throw new Error("Failed to fetch websites");
  }
};

export const fetchWebsiteByDomain = async (domain) => {
  try {
    // Reference to the websites collection
    const websitesRef = collection(db, "websites");

    // Query to get the website where domain matches
    const q = query(websitesRef, where("domain", "==", domain));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const website = querySnapshot.docs[0].data();
      return website;
    } else {
      console.error("No such website found");
    }
  } catch (error) {
    console.error("Error fetching website:", error);
    throw new Error("Failed to fetch website");
  }
};

export const fetchWebsiteById = async (websiteId) => {
  try {
    const websiteRef = doc(db, "websites", websiteId);
    const docSnap = await getDoc(websiteRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Website not found");
    }
  } catch (error) {
    console.error("Error fetching website:", error);
    throw new Error("Failed to fetch website");
  }
};

export const fetchPagesForWebsite = async (websiteId) => {
  try {
    const pagesRef = collection(db, `websites/${websiteId}/pages`);
    const querySnapshot = await getDocs(pagesRef);

    const pages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return pages;
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw new Error("Failed to fetch pages");
  }
};

export const createPage = async (title: string, desc: string, websiteId: string, imageUrl: string = "") => {
  if (!title || !websiteId) {
    throw new Error("All fields (title, content, websiteId) are required.");
  }

  const defaultContent = JSON.stringify(pageInitaileContent);

  const finalContent = "" || defaultContent;

  try {
    const pagesRef = collection(db, "websites", websiteId, "pages");

    // Use title as the document ID
    const pageDocRef = doc(pagesRef, title);

    // Set the document with the given ID
    await setDoc(pageDocRef, {
      title,
      content: finalContent,
      websiteId,
      imageUrl, // Store image URL
      createdAt: new Date(),
      desc,
    });

    return pageDocRef.id;
  } catch (error) {
    console.error("Error creating page:", error);
    throw new Error("Failed to create page.");
  }
};

export const uploadImageToStorage = async (
  file: File, 
  onProgress: (progress: number) => void
): Promise<string> => {
  const storageRef = ref(storage, `pages/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress); // Call the progress callback
      },
      (error) => {
        reject(error); // Handle upload error
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL); // Resolve the download URL after upload completes
      }
    );
  });
};


export const getPageByDomain = async (domain: string, path: string) => {
  if (!domain || !path) {
    throw new Error("Both domain and path are required.");
  }

  try {
    // Reference to the websites collection
    const websitesRef = collection(db, "websites");

    // Query to find the website by domain
    const websiteQuery = query(websitesRef, where("domain", "==", domain));

    // Execute the query to get the website
    const websiteSnapshot = await getDocs(websiteQuery);

    // Check if the website exists
    if (websiteSnapshot.empty) {
      throw new Error("Website not found.");
    }

    // Assuming there is only one website with the given domain, extract the website ID
    const websiteDoc = websiteSnapshot.docs[0];
    const websiteId = websiteDoc.id;

    // Now reference the pages subcollection for the found website
    const pageRef = doc(db, "websites", websiteId, "pages", path);

    // Fetch the page document using the page ID (path)
    const pageSnapshot = await getDoc(pageRef);

    // Check if the page exists
    if (!pageSnapshot.exists()) {
      throw new Error("Page not found.");
    }

    // Return the page data
    return { id: pageSnapshot.id, ...pageSnapshot.data(), websiteId };
  } catch (error) {
    console.error("Error getting page:", error);
    throw new Error("Failed to fetch the page.");
  }
};

export const getPage = async (websiteId, pageId) => {
  if (!websiteId || !pageId) {
    throw new Error("Both websiteId and pageId are required.");
  }

  try {
    // Reference to the specific page document
    const pageRef = doc(db, "websites", websiteId, "pages", pageId);

    // Fetch the document
    const pageSnapshot = await getDoc(pageRef);

    // Check if the document exists
    if (!pageSnapshot.exists()) {
      throw new Error("Page not found.");
    }

    // Return the page data
    return { id: pageSnapshot.id, ...pageSnapshot.data() };
  } catch (error) {
    console.error("Error getting page:", error);
    throw new Error("Failed to fetch the page.");
  }
};

export const upsertWebsitePage = async (
  websiteId: string,
  pageId: string,
  elements: any
) => {
  try {
    // Ensure elements is valid
    if (!elements || !Array.isArray(elements)) {
      throw new Error("Invalid elements data. It must be an array.");
    }

    // Prepare the page data, stringify the elements for content
    const pageData = {
      content: JSON.stringify(elements),
    };

    // Reference to the specific website page
    const websitePageRef = doc(db, "websites", websiteId, "pages", pageId);

    // Check if the page document exists
    const docSnapshot = await getDoc(websitePageRef);

    if (docSnapshot.exists()) {
      // If the document exists, update it
      await setDoc(websitePageRef, pageData, { merge: true });
      console.log("Website page updated successfully");
    } else {
      // If the document doesn't exist, create a new one
      await setDoc(websitePageRef, pageData);
      console.log("Website page created successfully");
    }
  } catch (error) {
    console.error("Error upserting website page:", error);
  }
  return pageId;
};
