import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Home from '@/pages/Home';
import HomeTabs from './HomeTabs';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {RootStackNavigation, RootStackParamList} from './index';
import {RouteProp, TabNavigationState} from '@react-navigation/native';
import Icon from '@/assets/iconfont/index';
// import {View} from 'react-native';
import Play from '@/pages/views/Play';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Play: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账户';
    default:
      return '首页';
  }
}

class BottomTabs extends React.Component<IProps> {
  componentDidMount() {
    this.setOptions();
  }
  componentDidUpdate() {
    this.setOptions();
  }
  setOptions = () => {
    const {navigation, route} = this.props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'HomeTabs';
    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: getHeaderTitle(routeName),
      });
    }
  };
  render() {
    return (
      // <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f87442',
        }}>
        <Tab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <Icon name="iconhome-fill" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({color, size}) => (
              <Icon name="iconhome-fill" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Play"
          component={Play}
          options={({navigation}) => ({
            tabBarButton: () => {
              return <Play onPress={() => navigation.navigate('Detail')} />;
            },
          })}
        />
        <Tab.Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({color, size}) => (
              <Icon name="iconhome-fill" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <Icon name="iconhome-fill" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      // </NavigationContainer>
    );
  }
}

export default BottomTabs;
