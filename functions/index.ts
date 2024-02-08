// functions/index.ts
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

// Example Firebase Function
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase Functions!");
});
