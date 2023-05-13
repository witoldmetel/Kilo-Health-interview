import React, { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getActiveRouteName, navigationRef } from '@utils/navigation';
import { NavigationContainer, NavigationState } from '@react-navigation/native';

import { QuestionsScreen } from '../screens/QuestionsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Route } from './RouteNames';

const disabledAndroidBackScreens: string[] = [Route.Demo];

let currentRouteName = 'unknown';
let previousRouteName = 'unknown';

export const getCurrentRouteName = () => currentRouteName;
export const getPreviousRouteName = () => previousRouteName;

const Navigator = () => {
  const onMount = () => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBack);

    return () => onUnmount();
  };

  const onUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', onAndroidBack);
  };

  useEffect(onMount, []);

  const onAndroidBack = () => {
    const scene = currentRouteName;
    const enableBack = disabledAndroidBackScreens.indexOf(scene) !== -1;

    return enableBack;
  };

  const onRouteChange = useCallback((state: NavigationState | undefined) => {
    if (state) {
      previousRouteName = currentRouteName;
      currentRouteName = getActiveRouteName(state);
    }
  }, []);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onRouteChange}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name={Route.Home} component={HomeScreen} />
        <Stack.Screen name={Route.Questions} component={QuestionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
