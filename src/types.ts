import Sound from 'react-native-sound';

export interface Dictionary<T> {
  [Key: string]: T;
}

export type CountDown = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type SoundType = {
  name: string;
  soundObject: Sound;
  wasPlaying: boolean;
  isPlaying: boolean;
};

export type SoundsForStorageType = {
  name: string;
  isPlaying: boolean;
  volume: number;
};
