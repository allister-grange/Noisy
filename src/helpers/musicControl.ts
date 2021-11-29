import {Platform} from 'react-native';
import MusicControl, {Command} from 'react-native-music-control';
import Sound from 'react-native-sound';
import {Dictionary, SoundsForStorageType, SoundType} from '../types';
import {loadAudioFromFile, tileData} from './TileData';

export const setUpMusicControls = async (
  play: () => void,
  pause: () => void,
) => {
  if (Platform.OS === 'ios') {
    MusicControl.handleAudioInterruptions(true);
  }

  MusicControl.enableBackgroundMode(true);

  MusicControl.on(Command.play, play);
  MusicControl.on(Command.pause, pause);

  MusicControl.enableControl('play', true);
  MusicControl.enableControl('pause', true);

  MusicControl.setNowPlaying({
    title: 'noisy',
    artwork: require('./../../assets/1024.png'),
    artist: 'noisy',
  });

  MusicControl.updatePlayback({
    state: MusicControl.STATE_PLAYING,
  });
};

export const loadSoundFilesFromFile = async (
  soundSettingsFromStorage: Array<SoundsForStorageType>,
): Promise<SoundType[]> => {
  const soundFilesPath: Dictionary<any> = loadAudioFromFile();
  let newSounds: Array<SoundType> = [];

  soundSettingsFromStorage.forEach((sound) => console.log(sound));

  const soundDataLoading = new Promise((resolve) => {
    soundSettingsFromStorage.forEach((sound: SoundsForStorageType, idx) => {
      let whoosh: Sound = new Sound(soundFilesPath[sound.name], (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        whoosh.setNumberOfLoops(-1);
        whoosh.setVolume(0.5);

        if (sound.isPlaying) {
          whoosh.setVolume(sound.volume);
          whoosh.play((success: any) => {
            if (!success) {
              console.log('Sound did not play');
            }
          });
          let newSound = {
            name: sound.name,
            soundObject: whoosh,
            wasPlaying: true,
            isPlaying: true,
          };
          newSounds.push(newSound);
        } else {
          let newSound = {
            name: sound.name,
            soundObject: whoosh,
            wasPlaying: false,
            isPlaying: false,
          };
          newSounds.push(newSound);
        }

        if (idx === soundSettingsFromStorage.length - 1) {
          resolve(newSounds);
        }
      });
    });
  });

  return await soundDataLoading.then((res: any) => {
    return res;
  });
};

export const loadSoundFilesFirstTime = async (): Promise<SoundType[]> => {
  const soundFilesPath: Dictionary<any> = loadAudioFromFile();
  let newSounds: Array<SoundType> = [];

  const soundDataLoading = new Promise((resolve) => {
    tileData.forEach((tile, idx) => {
      let whoosh: Sound = new Sound(soundFilesPath[tile.name], (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        whoosh.setNumberOfLoops(-1);
        whoosh.setVolume(0.5);
        let newSound = {
          name: tile.name,
          soundObject: whoosh,
          wasPlaying: false,
          isPlaying: false,
        };

        newSounds.push(newSound);

        if (idx === tileData.length - 1) {
          resolve(newSounds);
        }
      });
    });
  });

  return await soundDataLoading.then((res: any) => {
    return res;
  });
};
