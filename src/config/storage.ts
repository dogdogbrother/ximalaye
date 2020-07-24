import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  size: 1000, // 最大容量
  storageBackend: AsyncStorage, // 数据引擎
  defaultExpires: 1000 * 3600 * 24 * 7, // 设置为null的话就是永远都不过期、
  enableCache: true,
  sync: {},
});

const load = (params: LoadParams) => {
  return storage.load(params);
};

export {load};

export default storage;
