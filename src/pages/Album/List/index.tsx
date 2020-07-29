import React from 'react';
import {ListRenderItemInfo, Animated, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {ConnectedProps, connect} from 'react-redux';
import {IProgram} from '@/models/album';
import Item from './Item';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {ITabProps} from '../Tab';
// import Animated from 'react-native-reanimated';

const mapStateToprops = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

class List extends React.Component<IProps> {
  onPress = (data: IProgram, index: number) => {
    const {onItemPress} = this.props;
    onItemPress(data, index);
  };
  keyExtractor = (item: IProgram) => item.id;
  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };
  render() {
    const {list, panRef, tapRef, nativeRef, onScrollDrag} = this.props;
    return (
      <NativeViewGestureHandler
        simultaneousHandlers={panRef}
        ref={nativeRef}
        waitFor={tapRef}>
        <Animated.FlatList
          style={styles.container}
          bounces={false}
          data={list}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onScrollBeginDrag={onScrollDrag}
          onScrollEndDrag={onScrollDrag}
        />
      </NativeViewGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
export default connector(List);
