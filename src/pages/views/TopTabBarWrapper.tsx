import React from 'react';
import {
  MaterialTopTabBarProps,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import {View, StyleSheet, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({home}: RootState) => {
  console.log(home.activeCarouselIndex);
  return {
    linearColors: home.carousels.length
      ? home.carousels[home.activeCarouselIndex].colors
      : undefined,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  get linearGradient() {
    const {linearColors = ['#ccc', '#e2e2e2']} = this.props;
    return <LinearGradient colors={linearColors} style={styles.gradient} />;
  }
  render() {
    const {props} = this;
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topTabBarView}>
          <MaterialTopTabBar {...props} style={styles.tabbar} />
          <Touchable style={styles.categoryBtn}>
            <Text>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  tabbar: {
    elevation: 0,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#333',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
});

export default connector(TopTabBarWrapper);
