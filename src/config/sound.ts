import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

const init = (url: string) => {
  return new Promise((resolve, reject) => {
    sound = new Sound(url, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const play = () => {
  return new Promise((resolve, reject) => {
    if (sound) {
      sound.play((success) => {
        if (success) {
          resolve();
        } else {
          reject();
        }
        // 释放资源
        sound.release();
      });
    }
    reject();
  });
};

// 暂停
const pause = () => {
  return new Promise((resolve) => {
    if (sound) {
      sound.pause(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

// 获取当前播放时间
const getCurrentTime = () => {
  return new Promise((resolve) => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};
