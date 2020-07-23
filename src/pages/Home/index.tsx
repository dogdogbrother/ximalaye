import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel from './Carousel';
import Guess from './Guess';
import {
  FlatList,
  ListRenderItemInfo,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';
const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchChannels'],
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Home extends React.PureComponent<IProps, IState> {
  state = {
    refreshing: false,
  };
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
    dispatch({
      type: 'home/fetchChannels',
    });
  }
  onPress = (data: IChannel) => {
    console.log(data);
  };
  keyExtractor = (item: IChannel) => {
    return item.id;
  };
  // 加载更多
  onEndReached = () => {
    const {dispatch, loading, hasMore} = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  };
  // 下拉刷新
  onRefresh = () => {
    // ..
    this.setState({
      refreshing: true,
    });
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannels',
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };
  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };
  get header() {
    return (
      <View>
        <Carousel />
        <Guess />
      </View>
    );
  }
  get footer() {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>---没有更多---</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>---正在加载中---</Text>
        </View>
      );
    }
  }
  get empty() {
    const {loading} = this.props;
    if (loading) {
      return;
    }

    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  }
  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
export default connector(Home);
