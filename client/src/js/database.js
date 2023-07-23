import { openDB } from 'idb';

// Initialize the database
// Creates 'jate' object store if it doesn't exist
const initdb = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
}

// Adds content to the 'jate' object store
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  await store.add(content);
  console.log('Content added to database');
};

// Gets all content from the 'jate' object store
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const allContent = await store.getAll();
  return allContent;
};

initdb();
