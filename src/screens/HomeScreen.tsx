import React, { useEffect, useState, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, StatusBar, ActivityIndicator, Text } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ToolBar from '../components/ToolBar';
import SoundTile from '../components/SoundTile';
import { tileData } from '../helpers/TileData';
import Sound from "react-native-sound";
import VolumeBottomSheet from '../components/VolumeBottomSheet';
import TimerBottomSheet from '../components/TimerBottomSheet';
import { Modalize } from 'react-native-modalize';

export default function HomeScreen() {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
    const [isVolumeModalVisible, setIsVolumeModalVisible] = useState(false);
    const [loadedAudioFiles, setLoadedAudioFiles] = useState(false);
    const [sounds, setSounds] = useState([] as Array<SoundType>);
    const [timerLength, setTimerLength] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [countDownLength, setCountDownLength] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [intervalVar, setIntervalVar] = useState({} as NodeJS.Timeout);

    const timerModalRef = useRef<Modalize>(null);
    const volumeModalRef = useRef<Modalize>(null);

    type SoundType = {
        name: string,
        soundObject: Sound
    }

    const openTimerModal = () => {
        timerModalRef.current?.open();
    };

    const openVolumeModal = () => {
        volumeModalRef.current?.open();
    };

    useEffect(() => {

        setTimerLength(formatTimeLeft(countDownLength));

        if (countDownLength > 1 && !isCounting) {
            setIsCounting(true);
            let interval = setInterval(countDown, 1000);
            setIntervalVar(interval);
        }
        else if (countDownLength == 0) {
            setIsCounting(false);
            clearInterval(intervalVar);
            stopAllSounds();
        }

    }, [countDownLength, isCounting])

    const stopAllSounds = () => (
        sounds.map((sound: SoundType) => {
            if (sound.soundObject.isPlaying()) {
                triggerFadeOut(sound, 20);
            }
        })
    );

    const triggerFadeOut = async (sound: SoundType, count: number) => {
        if (count == 0) {
            sound.soundObject.stop();
            setSounds(oldSounds => [...oldSounds])
            return;
        }
        sound.soundObject.setVolume(sound.soundObject.getVolume() / 1.25)
        await delay(150);
        triggerFadeOut(sound, count - 1);
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const resetTimer = () => (setCountDownLength(0))

    const startTimer = () => {

        let totalTimeLengthInSeconds: number = 0;

        totalTimeLengthInSeconds += Number(timerLength.seconds)
        totalTimeLengthInSeconds += Number(timerLength.minutes * 60)
        totalTimeLengthInSeconds += Number(timerLength.hours * 3600)

        setCountDownLength(totalTimeLengthInSeconds);
    }

    const formatTimeLeft = (timeLeft: number): CountDown => {

        let h = Math.floor(timeLeft / 3600);
        let m = Math.floor(timeLeft % 3600 / 60);
        let s = Math.floor(timeLeft % 3600 % 60);

        return { hours: h, minutes: m, seconds: s };
    }

    const countDown = () => (setCountDownLength(countDownLength => countDownLength - 1));

    const loadSoundFiles = async () => {
        setLoadedAudioFiles(false);

        const soundFilesPath: Dictionary<any> = {
            campfire: require('../../assets/sounds/campfire.mp3'),
            car: require('../../assets/sounds/car.mp3'),
            crickets: require('../../assets/sounds/crickets.mp3'),
            fan: require('../../assets/sounds/fan.mp3'),
            forest: require('../../assets/sounds/forest.mp3'),
            guitar: require('../../assets/sounds/guitar.mp3'),
            leaf: require('../../assets/sounds/leaf.mp3'),
            office: require('../../assets/sounds/office.mp3'),
            piano: require('../../assets/sounds/piano.mp3'),
            rain: require('../../assets/sounds/rain.mp3'),
            river: require('../../assets/sounds/river.mp3'),
            thunder: require('../../assets/sounds/thunder.mp3'),
            train: require('../../assets/sounds/train.mp3'),
            white: require('../../assets/sounds/white.mp3'),
            wind: require('../../assets/sounds/wind.mp3'),
        };

        tileData.forEach(tile => {

            let whoosh: Sound = new Sound(soundFilesPath[tile.name], (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }

                whoosh.setNumberOfLoops(-1);
                whoosh.setVolume(0.5);
                let newSound = { "name": tile.name, "soundObject": whoosh };

                setSounds(prevArray => [...prevArray, newSound]);
            })

        });

        setLoadedAudioFiles(true);
    };

    const changeVolumeOfSound = (sound: any, volume: number) => {
        sound.soundObject.setVolume(volume)
    }

    useEffect(() => {
        async function asyncFunction() {
            await loadSoundFiles();
        }
        
        asyncFunction();
    }, [])

    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
    const containerTheme = isDarkMode ? GlobalStyles.darkThemeContainer : GlobalStyles.lightThemeContainer;

    const renderTile = (tile: any) => {

        const sound = sounds.find(sound => sound.name === tile.item.name)

        if (sound) {
            return (
                <SoundTile name={tile.item.name} isDarkMode={isDarkMode}
                    darkThemeColor={tile.item.darkThemeColor}
                    lightThemeColor={tile.item.lightThemeColor}
                    iconName={tile.item.iconName}
                    soundObject={sound.soundObject} />
            )
        }
        else {
            return (<ActivityIndicator />)
        }
    };

    return (
        <>
            <SafeAreaView style={[containerTheme, styles.container]}>
                <StatusBar barStyle={statusBarStyle} />

                <View style={{ flex: 1 }}>
                    {
                        loadedAudioFiles &&
                        <FlatList
                            scrollEnabled={false}
                            data={tileData}
                            extraData={sounds}
                            renderItem={renderTile}
                            keyExtractor={(tile: any) => tile.id}
                            numColumns={3}
                            contentContainerStyle={{ alignItems: 'center' }}
                        />
                    }
                </View>

                <View style={styles.toolbar}>
                    <ToolBar
                        isDarkMode={isDarkMode}
                        setIsDarkMode={setIsDarkMode}
                        openTimerModal={openTimerModal}
                        openVolumeModal={openVolumeModal}
                    />
                </View>
            </SafeAreaView>

            <Modalize
                adjustToContentHeight
                ref={timerModalRef}
                modalStyle={containerTheme}>
                <TimerBottomSheet
                    isDarkMode={isDarkMode}
                    isVisible={isTimerModalVisible}
                    setIsModalVisible={setIsTimerModalVisible}
                    setTimerLength={setTimerLength}
                    timerLength={timerLength}
                    startTimer={startTimer}
                    isCounting={isCounting}
                    resetTimer={resetTimer}
                />
            </Modalize>

            <Modalize
                adjustToContentHeight
                ref={volumeModalRef}
                modalStyle={containerTheme}>
                <VolumeBottomSheet
                    isDarkMode={isDarkMode}
                    isVisible={isVolumeModalVisible}
                    setIsModalVisible={setIsVolumeModalVisible}
                    sounds={sounds}
                    changeVolumeOfSound={changeVolumeOfSound}
                />
            </Modalize>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    toolbar: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 12,
        paddingRight: 12,
        bottom: '3%',
        width: '99%',
        alignSelf: 'center',
        height: '10%',
        position: 'absolute'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    }
});

interface Dictionary<T> {
    [Key: string]: T;
}

type CountDown = {
    hours: number,
    minutes: number,
    seconds: number
}