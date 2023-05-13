import {
  createNavigationContainerRef,
  NavigationAction,
  NavigationState,
} from '@react-navigation/native';
import { Route } from '@routes/RouteNames';

export const navigationRef = createNavigationContainerRef();

export const navigate = (scene: Route) =>
  navigationRef.current?.navigate(scene);

export const goBack = () => navigationRef.current?.goBack();

export const dispatchNavigationAction = (action: NavigationAction) =>
  navigationRef.current?.dispatch(action);

export const getActiveRouteName = (state?: NavigationState): string => {
  if (state !== undefined && navigationRef && navigationRef.current !== null) {
    const currentState = state ? state : navigationRef.current.getRootState();
    const route = currentState.routes[currentState.index];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state as NavigationState);
    }

    return route.name;
  }

  return '';
};
