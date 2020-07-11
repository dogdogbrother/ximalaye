import React from 'react';
import Navigator from './src/index';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <Navigator />
    </>
  );
};

export default App;
