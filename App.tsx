import React from 'react';
import InitialNavigation from './src/navigation/InitialNavigation';
import { BlogsProvider } from './src/context/ContextProvider';

const App = () => {
  return (
    <BlogsProvider>
      <InitialNavigation />
    </BlogsProvider>
  );
};

export default App;
