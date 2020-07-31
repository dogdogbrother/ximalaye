import {Model, Effect, EffectWithType, EffectsCommandMap} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {play, init, pause, getCurrentTime, getDuration} from '@/config/sound';

const SHOW_URL = '/mock/11/bear/show';

export interface PlayerModelState {
  id: string;
  soundUrl: string;
  playState: string;
  currentTime: number;
  duration: number;
}

export interface PlayerModel extends Model {
  namespace: 'player';
  state: PlayerModelState;
  reducers: {
    setState: Reducer<PlayerModelState>;
  };
  effects: {
    fetchShow: Effect;
    play: Effect;
    pause: Effect;
    watcherCurrentTime: EffectWithType;
  };
}

const initialState: PlayerModelState = {
  id: '',
  soundUrl: '',
  playState: '',
  currentTime: 0,
  duration: 0,
};

const delay = (timeOut: number) =>
  new Promise((resolve) => setTimeout(resolve, timeOut));

function* currentTimeFn({call, put}: EffectsCommandMap) {
  while (true) {
    yield call(delay, 1000);
    const currentTime = yield call(getCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime,
      },
    });
  }
}

const playerModel: PlayerModel = {
  namespace: 'player',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchShow({payload}, {call, put}) {
      const {data} = yield call(axios.get, SHOW_URL, {
        params: {id: payload.id},
      });
      yield call(init, data.data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: data.data.id,
          soundUrl: data.data.soundUrl,
          duration: getDuration(),
        },
      });

      yield put({
        type: 'play',
      });
    },
    *play(_, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      yield call(play);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },
    *pause(_, {call, put}) {
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },
    watcherCurrentTime: [
      function* (sagaEffects) {
        const {call, take, race} = sagaEffects;
        while (true) {
          yield take('play');
          yield race([call(currentTimeFn, sagaEffects), take('pause')]);
        }
      },
      {type: 'watcher'},
    ],
  },
};

export default playerModel;
