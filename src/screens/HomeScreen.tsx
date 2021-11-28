import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ToolBar from '../components/ToolBar';

import SoundTile from '../components/SoundTile';
import {tileData, loadAudioFromFile} from '../helpers/TileData';
import Sound from 'react-native-sound';
import VolumeBottomSheet from '../components/VolumeBottomSheet';
import TimerBottomSheet from '../components/TimerBottomSheet';
import {Modalize} from 'react-native-modalize';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import MusicControl, {Command} from 'react-native-music-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../helpers/useTheme';

export default function HomeScreen() {
  const {isDarkMode, setIsDarkMode} = useTheme();
  const [loadedAudioFiles, setLoadedAudioFiles] = useState(false);
  const [sounds, setSounds] = useState([] as Array<SoundType>);
  const [soundsForStorage, setSoundsForStorage] = useState(
    [] as Array<SoundsForStorageType>,
  );
  const [timerLength, setTimerLength] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countDownLength, setCountDownLength] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [intervalVar, setIntervalVar] = useState({} as NodeJS.Timeout);
  const stateRef = useRef([] as Array<SoundType>);

  const timerModalRef = useRef<Modalize>(null);
  const volumeModalRef = useRef<Modalize>(null);

  const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
  const statusBarColor = isDarkMode ? '#252525' : 'white';
  const containerTheme = isDarkMode
    ? GlobalStyles.darkThemeContainer
    : GlobalStyles.lightThemeContainer;

  useEffect(() => {
    async function loadSounds() {
      try {
        const value = await AsyncStorage.getItem('sounds');

        if (value !== null) {
          if (value.length === 2) {
            loadSoundFilesFirstTime();
          } else {
            loadSoundFilesFromFile(JSON.parse(value));
          }
        } else {
          loadSoundFilesFirstTime();
        }
      } catch (error) {
        console.error('No sounds in storage');
      }
    }

    loadSounds();
  }, []);

  useEffect(() => {
    let newSoundsForStorage: Array<SoundsForStorageType> = [];

    sounds.map((sound) => {
      const newSound = {
        name: sound.name,
        isPlaying: sound.isPlaying,
        volume: sound.soundObject.getVolume(),
      } as SoundsForStorageType;
      newSoundsForStorage.push(newSound);
    });

    stateRef.current = sounds;
    setSoundsForStorage(newSoundsForStorage);
  }, [sounds]);

  useEffect(() => {
    if (isDarkMode) {
      AsyncStorage.setItem('theme', 'true', (err) => {
        if (err) {
          console.error('error in setting theme ' + err);
        }
      });
    } else {
      AsyncStorage.setItem('theme', 'false', (err) => {
        if (err) {
          console.error('error in setting theme ' + err);
        }
      });
    }
  }, [isDarkMode]);

  useEffect(() => {
    AsyncStorage.setItem('sounds', JSON.stringify(soundsForStorage), (err) => {
      if (err) {
        console.log('an error');
        throw err;
      }
    }).catch((err) => {
      console.log('error is: ' + err);
    });
  }, [soundsForStorage]);

  useEffect(() => {
    if (isDarkMode) {
      changeNavigationBarColor('#252525', false, false);
    } else {
      changeNavigationBarColor('#ffffff', true, false);
    }

    setTimerLength(formatTimeLeft(countDownLength));

    if (countDownLength > 1 && !isTiming) {
      setIsTiming(true);
      let interval = setInterval(countDown, 1000);
      setIntervalVar(interval);
    } else if (countDownLength == 0 && isTiming) {
      setIsTiming(false);
      clearInterval(intervalVar);
      fadeAllSounds();
    }
  }, [countDownLength, isTiming, isDarkMode]);

  const fadeAllSounds = () =>
    sounds.map((sound: SoundType) => {
      if (sound.isPlaying) {
        triggerFadeOut(sound, 20);
      }
    });

  const pauseAllSounds = () => {
    let newSounds = stateRef.current;

    newSounds.map((sound) => {
      if (sound.isPlaying) {
        sound.soundObject.pause(() => {
          sound.wasPlaying = true;
          sound.isPlaying = false;
        });
      }
    });

    setSounds(newSounds);
  };

  const play = () => {
    let newSounds = stateRef.current;

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
  };

  const pause = () => {
    pauseAllSounds();

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
  };

  const triggerFadeOut = async (sound: SoundType, count: number) => {
    if (count == 0) {
      let newSounds = [...sounds];
      let foundSound = newSounds.find(
        (searchedSound) => searchedSound.name == sound.name,
      );
      foundSound?.soundObject.stop(() => {
        sound.isPlaying = false;
        foundSound?.soundObject.setVolume(0.5);
        setSounds(newSounds);
      });
      return;
    }
    sound.soundObject.setVolume(sound.soundObject.getVolume() / 1.25);
    await delay(100);
    triggerFadeOut(sound, count - 1);
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const resetTimer = () => setCountDownLength(0);

  const startTimer = () => {
    let totalTimeLengthInSeconds: number = 0;

    totalTimeLengthInSeconds += Number(timerLength.seconds);
    totalTimeLengthInSeconds += Number(timerLength.minutes * 60);
    totalTimeLengthInSeconds += Number(timerLength.hours * 3600);

    setCountDownLength(totalTimeLengthInSeconds);
  };

  const openTimerModal = () => {
    timerModalRef.current?.open();
  };

  const openVolumeModal = () => {
    volumeModalRef.current?.open();
  };

  const formatTimeLeft = (timeLeft: number): CountDown => {
    let h = Math.floor(timeLeft / 3600);
    let m = Math.floor((timeLeft % 3600) / 60);
    let s = Math.floor((timeLeft % 3600) % 60);

    return {hours: h, minutes: m, seconds: s};
  };

  const countDown = () =>
    setCountDownLength((countDownLength) => countDownLength - 1);

  const loadSoundFilesFromFile = (
    soundSettingsFromStorage: Array<SoundsForStorageType>,
  ) => {
    setLoadedAudioFiles(false);

    const soundFilesPath: Dictionary<any> = loadAudioFromFile();
    let newSounds: Array<SoundType> = [];

    soundSettingsFromStorage.map((sound: SoundsForStorageType, idx) => {
      let whoosh: Sound = new Sound(soundFilesPath[sound.name], (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        whoosh.setNumberOfLoops(-1);
        whoosh.setVolume(0.5);

        if (sound.isPlaying) {
          whoosh.setVolume(sound.volume);
          whoosh.play();
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

        if (idx == soundSettingsFromStorage.length - 1) {
          setSounds(newSounds);
          setLoadedAudioFiles(true);
          setUpMusicControls();
        }
      });
    });
  };

  const loadSoundFilesFirstTime = async () => {
    setLoadedAudioFiles(false);

    const soundFilesPath: Dictionary<any> = loadAudioFromFile();
    let newSounds: Array<SoundType> = [];

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

        if (idx == tileData.length - 1) {
          setSounds(newSounds);
          setLoadedAudioFiles(true);
          setUpMusicControls();
        }
      });
    });
  };

  const setUpMusicControls = async () => {
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

  const renderTile = (tile: any) => {
    const sound = sounds.find((sound) => sound.name === tile.item.name);

    if (sound) {
      return (
        <SoundTile
          name={tile.item.name}
          isDarkMode={isDarkMode}
          darkThemeColor={tile.item.darkThemeColor}
          lightThemeColor={tile.item.lightThemeColor}
          iconName={tile.item.iconName}
          soundPlaying={sound.isPlaying}
          sounds={sounds}
          setSounds={setSounds}
        />
      );
    } else {
      return <ActivityIndicator />;
    }
  };

  return (
    <>
      <SafeAreaView style={[containerTheme, styles.container]}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarColor} />

        <View style={styles.soundsContainer}>
          {loadedAudioFiles && (
            <FlatList
              scrollEnabled={false}
              data={tileData}
              extraData={sounds}
              renderItem={renderTile}
              keyExtractor={(tile: any) => tile.id}
              numColumns={3}
              contentContainerStyle={{alignItems: 'center'}}
            />
          )}
        </View>

        <View style={styles.toolbar}>
          <ToolBar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            openTimerModal={openTimerModal}
            openVolumeModal={openVolumeModal}
            timerLength={timerLength}
            isTiming={isTiming}
          />
        </View>
      </SafeAreaView>

      <Modalize
        adjustToContentHeight
        ref={timerModalRef}
        modalStyle={containerTheme}>
        <TimerBottomSheet
          isDarkMode={isDarkMode}
          setTimerLength={setTimerLength}
          timerLength={timerLength}
          startTimer={startTimer}
          isTiming={isTiming}
          resetTimer={resetTimer}
        />
      </Modalize>

      <Modalize
        adjustToContentHeight
        ref={volumeModalRef}
        modalStyle={containerTheme}>
        <VolumeBottomSheet
          isDarkMode={isDarkMode}
          sounds={sounds}
          setSounds={setSounds}
        />
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    bottom: '2%',
    width: '99%',
    alignSelf: 'center',
    height: '10%',
    position: 'absolute',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  soundsContainer: {
    flex: 1,
    paddingTop: 20,
  },
});

interface Dictionary<T> {
  [Key: string]: T;
}

type CountDown = {
  hours: number;
  minutes: number;
  seconds: number;
};

type SoundType = {
  name: string;
  soundObject: Sound;
  wasPlaying: boolean;
  isPlaying: boolean;
};

type SoundsForStorageType = {
  name: string;
  isPlaying: boolean;
  volume: number;
};
