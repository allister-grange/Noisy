import {useCallback, useEffect, useRef, useState} from 'react';
import {AsyncStorage} from 'react-native';
import MusicControl from 'react-native-music-control';
import {SoundType} from '../types';
import {
  loadSoundFilesFirstTime,
  loadSoundFilesFromFile,
  setUpMusicControls,
} from './musicControl';

export const useSounds = () => {
  const [sounds, setSoundsState] = useState([] as Array<SoundType>);
  const [loadedAudioFiles, setLoadedAudioFiles] = useState(false);
  const soundsRef = useRef([] as Array<SoundType>);

  const setSounds = (soundsToSet: Array<SoundType>) => {
    setSoundsState(soundsToSet);
    soundsRef.current = soundsToSet;
  };

  const pauseAllSounds = useCallback(() => {
    let newSounds = soundsRef.current;

    newSounds.map((sound) => {
      if (sound.isPlaying) {
        sound.soundObject.pause(() => {
          sound.wasPlaying = true;
          sound.isPlaying = false;
        });
      }
    });

    setSounds(newSounds);

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
  }, []);

  const playAllSounds = useCallback(() => {
    let newSounds = soundsRef.current;

    newSounds.map((sound) => {
      if (sound.wasPlaying) {
        sound.soundObject.play();
        sound.wasPlaying = false;
        sound.isPlaying = true;
      }
    });

    setSounds(newSounds);

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
  }, []);

  useEffect(() => {
    async function loadSounds() {
      try {
        setLoadedAudioFiles(false);
        const value = await AsyncStorage.getItem('sounds');

        if (value !== null) {
          if (value.length === 2) {
            const soundsFromFiles = await loadSoundFilesFirstTime();
            setSounds(soundsFromFiles);
            soundsRef.current = soundsFromFiles;
          } else {
            const soundsFromFiles = await loadSoundFilesFromFile(
              JSON.parse(value),
            );
            setSounds(soundsFromFiles);
            soundsRef.current = soundsFromFiles;
          }
        } else {
          const soundsFromFiles = await loadSoundFilesFirstTime();
          setSounds(soundsFromFiles);
          soundsRef.current = soundsFromFiles;
        }
        setUpMusicControls(playAllSounds, pauseAllSounds);
        setLoadedAudioFiles(true);
      } catch (error) {
        console.error('No sounds in storage');
      }
    }

    loadSounds();
  }, [pauseAllSounds, playAllSounds]);

  useEffect(() => {
    const newSoundsForStorage = sounds.map((sound) => {
      return {
        name: sound.name,
        isPlaying: sound.isPlaying,
        volume: sound.soundObject.getVolume(),
      };
    });

    AsyncStorage.setItem(
      'sounds',
      JSON.stringify(newSoundsForStorage),
      (err) => {
        if (err) {
          console.log('an error');
          throw err;
        }
      },
    ).catch((err) => {
      console.log('error is: ' + err);
    });
  }, [sounds]);

  return {loadedAudioFiles, sounds, setSounds};
};
