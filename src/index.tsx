import React from 'react';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import {StatusBar} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import '@/config/http';
import {enableScreens} from 'react-native-screens';

enableScreens();

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <Navigator />
        </RootSiblingParent>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
