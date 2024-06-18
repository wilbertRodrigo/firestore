import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

// Initialize the Firebase Admin SDK
admin.initializeApp();

// Initialize CORS middleware with default configuration
const corsHandler = cors({ origin: true });

// Function to get employee data
export const getEmployeesName = functions.https.onRequest((req, res) => {
  // Enable CORS using the `cors` express middleware.
  corsHandler(req, res, () => {
    // Fetch employee data from Firestore
    admin
      .firestore()
      .doc('employees/1')
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        if (data) {
          res.status(200).json(data); // Send the employee data as the response
        } else {
          res.status(404).send('Employee not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Internal Server Error');
      });
  });
});

// Firestore trigger for newly created employees
export const onEmployeeCreated = functions.firestore
  .document('employees/{employeeId}')
  .onCreate((snapshot, context) => {
    // Access the newly created employee document
    const newEmployee = snapshot.data();

    // Employee ID can be accessed via context.params
    const employeeId = context.params.employeeId;

    // Log the name of the new employee and their ID
    console.log(
      `New employee created: ${newEmployee.name} (ID: ${employeeId})`
    );

    // Perform any other logic here, such as sending a welcome email, etc.
    // Ensure to return a promise if performing asynchronous operations
    return Promise.resolve();
  });

// Callable function to create a new user account
export const createAccount = functions.https.onCall((data, context) => {
  // Ensure that the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }

  // Extract user details from data
  const { email, password } = data;
  if (!email || !password) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing email or password'
    );
  }

  // Create the user account
  return admin
    .auth()
    .createUser({ email, password })
    .then((userRecord) => {
      // Log the successful creation of the new user
      console.log('Successfully created new user:', userRecord.uid);
      return { uid: userRecord.uid };
    })
    .catch((error) => {
      console.error('Error creating new user:', error);
      throw new functions.https.HttpsError('unknown', error.message, error);
    });
});
