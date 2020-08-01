import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToprops = ({album}: RootState) => {
  return {
    introduction: album.introduction,
  };
};

const connector = connect(mapStateToprops);

type ModelState = ConnectedProps<typeof connector>;

class Introduction extends React.Component<ModelState> {
  render() {
    const {introduction} = this.props;
    return (
      <View style={styles.container}>
        <Text>{introduction}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default connector(Introduction);
