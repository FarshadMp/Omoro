export interface Enquiry {
  id?: number;
  type: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  message?: string;
  productName?: string;
  modelNumber?: string;
  date: string;
  status: "new" | "read";
}

const DB_NAME = "OmoroDB";
const DB_VERSION = 2; // Increment if DB already exists for other things
const STORE_NAME = "enquiries";

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };
  });
};

export const saveEnquiry = async (enquiry: Omit<Enquiry, "id" | "date" | "status">) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    
    const newEnquiry: Enquiry = {
      ...enquiry,
      date: new Date().toISOString(),
      status: "new",
    };

    const request = store.add(newEnquiry);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject("Error saving enquiry");
    };
  });
};

export const getEnquiries = async (): Promise<Enquiry[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      // Sort by date descending
      const enquiries = request.result as Enquiry[];
      enquiries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      resolve(enquiries);
    };

    request.onerror = () => {
      reject("Error fetching enquiries");
    };
  });
};

export const deleteEnquiry = async (id: number) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject("Error deleting enquiry");
    };
  });
};
