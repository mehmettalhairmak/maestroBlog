import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { RootStackParams } from './NavigationParams';

const Stack = createNativeStackNavigator<RootStackParams>();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{ title: 'Maestro Blogs' }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: 'Maestro' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
