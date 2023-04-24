import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './StackNavigation';

const InitialNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default InitialNavigation;
