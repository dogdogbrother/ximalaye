import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

// 轮播图
const CAROUSEL_URL = '/mock/11/bear/carousel';

// 猜你喜欢
const GUESS_URL = '/mock/11/bear/guess';

// 首页列表
const CHANNEL_URL = '/mock/11/bear/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGUESS {
  id: string;
  title: string;
  image: string;
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

interface HomeState {
  carousels: ICarousel[];
  guess: IGUESS[];
  channels: IChannel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
    fetchChannels: Effect;
  };
}
const initialState: HomeState = {
  carousels: [],
  guess: [],
  channels: [],
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data.data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data.data,
        },
      });
    },
    *fetchChannels(_, {call, put}) {
      const {data} = yield call(axios.get, CHANNEL_URL);
      yield put({
        type: 'setState',
        payload: {
          channels: data.data.results,
        },
      });
    },
  },
};
export default homeModel;
