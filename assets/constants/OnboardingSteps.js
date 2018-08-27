/*
--------------------------------------------------------------
| PLEASE READ IF YOU ARE NEW TO THIS SECTION OF THE CODEBASE |
--------------------------------------------------------------
Be very careful when adding a new step. You could easily break the whole system if you do not update all the steps
affected by the creation of a new one (Usually existing steps after the newly created one)

You will also have to adjust the indexes of all the terms in all the locales files.

So in otherwords don't add new steps unless you are sure you really really need to.
*/

export const STEPS = {
  start: 1, // Start index
  end: 13, // End index

  welcomeScreen: 1, // Welcome user to app
  addLocation: 2, // Tell user how to add location
  addLocationAction: 3, // Wait for location to be created
  viewPinCallout: 4, // Tell user to click on pin
  viewPinCalloutAction: 5, // Wait for user to click pin
  pinCalloutDescription: 6, // Explain pin callout
  invitations1: 7, // Inform user that invitation needed to upload
  invitations2: 8, // Open side drawer
  invitations3: 9, // Click Accept Invite button
  invitations4: 10, // Explain how to accept invite using QR scanner
  invitationsAction: 11, // Wait for user to accept a valid invite
  invitationAccepted: 12, // Explain what happens now that they have accepted invite
  endScreen: 13, // Say closing remarks
};

export const ACTION_STEPS = [ // Steps that require user to do something before we show them more info
  STEPS.addLocationAction,
  STEPS.viewPinCalloutAction,
  STEPS.invitationsAction,
];

export const BUTTON_STEPS = [ // Steps that the user needs to click a certain thing
  STEPS.invitations2,
  STEPS.invitations3,
];
