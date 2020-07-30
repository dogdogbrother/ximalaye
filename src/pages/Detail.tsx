import React from 'react';
import {View, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigator/index';
interface IProps {
  route: RouteProp<RootStackParamList, 'Detail'>;
}
class Detail extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>Detail</Text>
      </View>
    );
  }
}
export default Detail;
