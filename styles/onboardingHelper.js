import Expo from 'expo';
import { Platform } from 'react-native';

export function step8Top() {
  return Platform.OS === 'ios' ?
    Expo.Constants.statusBarHeight + 5 :
    Expo.Constants.statusBarHeight + 10;
}

export function step9Top() {
  return Platform.OS === 'ios' ?
    Expo.Constants.statusBarHeight + 100 :
    Expo.Constants.statusBarHeight + 115;
}
