import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from './BottomTabs';
// import Detail from '@/pages/Detail';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import {Platform, StyleSheet, StatusBar, Animated} from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator();

function getAlbumOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: route.params.opacity,
    },
    headerBackground: () => {
      return (
        <Animated.View
          style={[styles.headerBackground, {opacity: route.params.opacity}]}
        />
      );
    },
  };
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight,
              },
            }),
            headerBackTitleVisible: false,
            headerTintColor: '#333',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            options={{headerTitle: '首页'}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{headerTitle: '分类'}}
            name="Category"
            component={Category}
          />
          <Stack.Screen
            options={getAlbumOptions}
            name="Album"
            component={Album}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigator;
