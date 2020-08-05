import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const USER_URL = '/mock/11/bear/login';

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserModelState {
  user?: IUser;
}

export interface UserModel extends Model {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    setState: Reducer<UserModelState>;
  };
}

const initalState = {
  user: undefined,
};

const userModel: UserModel = {
  namespace: 'user',
  state: initalState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, USER_URL, payload);
      if (status === 100) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
      } else {
        console.log(msg);
      }
    },
    *logout(_, {ptu}) {
      yield ptu({
        type: 'setState',
        payload: {
          user: undefined,
        },
      });
    },
  },
};

export default userModel;
