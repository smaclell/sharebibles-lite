import { NavigationActions, DrawerActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function getCurrentRoute() {
  if (!navigator || !navigator.state.nav) return null;

  return navigator.state.nav.routes[navigator.state.nav.index] || null;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

function closeDrawer() {
  navigator.dispatch(DrawerActions.closeDrawer());
}

function openDrawer() {
  navigator.dispatch(DrawerActions.openDrawer());
}

export default {
  closeDrawer,
  goBack,
  openDrawer,
  navigate,
  getCurrentRoute,
  setTopLevelNavigator,
};
