import React from 'react';
// import {View, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';

interface IRoute {
  key: string;
  title: string;
}

class Tab extends React.Component {
  state = {
    routes: [
      {key: 'introduction', title: '简介'},
      {key: 'albums', title: '节目'},
    ],
    index: 1,
  };
  onIndexChange = (index: number) => {
    this.setState({
      index,
    });
  };
  renderScene = ({route}: {route: IRoute}) => {
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <List />;
    }
    return;
  };
  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
      />
    );
  }
}

export default Tab;
