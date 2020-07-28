import React from 'react';
import {
  Text,
  ListRenderItemInfo,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import {RootState} from '@/models/index';
import {ConnectedProps, connect} from 'react-redux';
import {IProgram} from '@/models/album';
import Item from './Item';

const mapStateToprops = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

// interface IProps extends ModelState {}

class List extends React.Component<ModelState> {
  onPress = (data: IProgram) => {
    alert('节目');
  };
  keyExtractor = (item: IProgram) => item.id;
  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };
  render() {
    const {list} = this.props;
    return (
      <FlatList
        style={styles.container}
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
export default connector(List);
