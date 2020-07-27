import React from 'react';
import {View, Text, ListRenderItemInfo, FlatList} from 'react-native';
import {RootState} from '@/models/index';
import {ConnectedProps, connect} from 'react-redux';
import {IProgram} from '@/models/album';

const mapStateToprops = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

// interface IProps extends ModelState {}

class List extends React.Component<ModelState> {
  keyExtractor = (item: IProgram) => item.id;
  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Text>{item.title}</Text>;
  };
  render() {
    const {list} = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}
export default connector(List);
