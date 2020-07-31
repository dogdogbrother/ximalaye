import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

const init = (url: string) => {
  console.log(url);

  return new Promise((resolve, reject) => {
    sound = new Sound(url, '', (error) => {
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
      });
    } else {
      reject();
    }
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

// 获取音频时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  }
  return 0;
};

export {init, play, pause, getCurrentTime, getDuration};
