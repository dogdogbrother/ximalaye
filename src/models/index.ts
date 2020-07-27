import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';
import category from './category';
import album from './album';

const models = [home, category, album];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  loading: DvaLoadingState;
};

export default models;
