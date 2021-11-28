import {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {SoundType} from '../types';
import {
  loadSoundFilesFirstTime,
  loadSoundFilesFromFile,
  setUpMusicControls,
} from './musicControl';

export const useSounds = (play: () => void, pause: () => void) => {
  const [sounds, setSounds] = useState([] as Array<SoundType>);
  const [loadedAudioFiles, setLoadedAudioFiles] = useState(false);

  useEffect(() => {
    async function loadSounds() {
      try {
        setLoadedAudioFiles(false);
        const value = await AsyncStorage.getItem('sounds');

        console.log(value?.length);

        if (value !== null) {
          if (value.length === 2) {
            setSounds(await loadSoundFilesFirstTime());
          } else {
            setSounds(await loadSoundFilesFromFile(JSON.parse(value)));
          }
        } else {
          setSounds(await loadSoundFilesFirstTime());
        }
        setUpMusicControls(play, pause);
        setLoadedAudioFiles(true);
      } catch (error) {
        console.error('No sounds in storage');
      }
    }

    loadSounds();
  }, [pause, play]);

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
