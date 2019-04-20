/*
--------------------------------------------------------------
| PLEASE READ IF YOU ARE NEW TO THIS SECTION OF THE CODEBASE |
--------------------------------------------------------------
Be very careful when adding a new step. You could easily break the whole system if you do not update all the steps
affected by the creation of a new one (Usually existing steps after the newly created one)

You will also have to adjust the indexes of all the terms in all the locales files.

So in otherwords don't add new steps unless you are sure you really really need to.
*/

import NavigationService from '../../utils/NavigationService';
export const COMPLETED_KEYS = Object.freeze({
  hasAddedLocation: 'hasAddedLocation',
  hasViewedPin: 'hasViewedPin',
  hasAcceptedInvite: 'hasAcceptedInvite',
});

export const ORDERED_STEPS = [
  'zero',
  'welcomeScreen', // Welcome user to app
  'addLocation', // Tell user how to add location
  'addLocationAction', // Wait for location to be created
  'viewPinCallout', // Tell user to click on pin
  'viewPinCalloutAction', // Wait for user to click pin
  'pinCalloutDescription', // Explain pin callout
  'invitations1', // Inform user that invitation needed to upload
  'invitations2', // Open side drawer
  'invitations3', // Click Accept Invite button
  'invitations4', // Explain how to accept invite using QR scanner
  'invitationsAction', // Wait for user to accept a valid invite
  'invitationAccepted', // Explain what happens now that they have accepted invite
  'endScreen', // Say closing remarks
];

export const STEPS = {
  welcomeScreen: {},
  addLocation: {
    backLogic: (setCompleted) => setCompleted(COMPLETED_KEYS.hasAddedLocation, false),
  },
  addLocationAction: {
    actionLogic: async (props) => {
      const {
        completed: { hasAddedLocation },
        setCompleted,
        setStep,
      } = props;

      if (hasAddedLocation) {
        await setStep(STEPS.viewPinCallout.index);
        setCompleted(COMPLETED_KEYS.hasAddedLocation);
      }
    },
  },
  viewPinCallout: {
    backLogic: (setCompleted) => setCompleted(COMPLETED_KEYS.hasViewedPin, false),
    actionLogic: ({ setStep, completed: { hasViewedPin } }) =>
      hasViewedPin && setStep(STEPS.pinCalloutDescription.index),
  },
  viewPinCalloutAction: {
    actionLogic: ({ setStep, completed: { hasViewedPin } }) =>
      hasViewedPin && setStep(STEPS.pinCalloutDescription.index),
  },
  pinCalloutDescription: {},
  invitations1: {
    actionLogic: async (props) => {
      const {
        regionKey,
        completed: { hasAcceptedInvite },
        setCompleted,
        setStep,
      } = props;

      if (regionKey && !hasAcceptedInvite) {
        setCompleted(COMPLETED_KEYS.hasAcceptedInvite);
        await setStep(STEPS.invitationAccepted.index);
      }
    },
  },
  invitations2: {
    backLogic: () => NavigationService.closeDrawer(),
    buttonLogic: () => NavigationService.openDrawer(),
  },
  invitations3: {
    backLogic: () => NavigationService.goBack(),
    buttonLogic: () => NavigationService.navigate('Invites'),
  },
  invitations4: {},
  invitationsAction: {
    actionLogic: async (props) => {
      const { regionKey, hasAcceptedInvite, setCompleted, setStep } = props;

      if (regionKey && !hasAcceptedInvite) {
        setCompleted(COMPLETED_KEYS.hasAcceptedInvite);
        await setStep(STEPS.invitationAccepted.index);
      }
    },
  },
  invitationAccepted: {},
  endScreen: {},
  end: ORDERED_STEPS.length - 1,
  start: 1,
  zero: {},
};

ORDERED_STEPS.forEach((step, index) => {
  STEPS[step].index = index;
});

export const ACTION_STEPS = [
  // Steps that require user to do something before we show them more info
  STEPS.addLocationAction.index,
  STEPS.viewPinCalloutAction.index,
  STEPS.invitationsAction.index,
];

export const BUTTON_STEPS = [
  // Steps that the user needs to click a certain thing
  STEPS.invitations2.index,
  STEPS.invitations3.index,
];
