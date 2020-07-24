import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {StyleSheet} from 'react-native';

const CATEGORY_URL = '/mock/11/bear/category';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

interface CategoryModelState {
  myCategorys: ICategory[];
  categorys: ICategory[];
}

interface CategoryModel extends Model {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    loadData: Effect;
  };
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState = {
  myCategorys: [
    {
      id: 'home',
      name: '推荐',
    },
    {
      id: 'vip',
      name: 'Vip',
    },
  ],
  categorys: [],
};

const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initialState,
  effects: {
    *loadData(_, {call, put}) {
      // 从storage获取数据
      const myCategorys = yield call(load, {key: 'myCategorys'});
      const categorys = yield call(load, {key: 'categorys'});
      // 发起action，将数据保存到state里面
      if (myCategorys) {
        yield put({
          type: 'setState',
          payload: {
            myCategorys,
            categorys,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categorys,
          },
        });
      }
    },
  },
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'loadData'});
    },
    asyncStorage() {
      storage.sync.categorys = async () => {
        const {data} = await axios.get(CATEGORY_URL);
        return data.data;
      };
      storage.sync.myCategorys = async () => {
        return null;
      };
    },
  },
};

export default categoryModel;
