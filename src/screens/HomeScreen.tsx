import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ToolBar from '../components/ToolBar';
import SoundTile from '../components/SoundTile';
import BottomSheet from '../components/BottomSheet';
import { tileData } from '../helpers/TileData';
import Sound from "react-native-sound";
import VolumeBottomSheet from '../components/VolumeBottomSheet';

export default function HomeScreen() {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
    const [isVolumeModalVisible, setIsVolumeModalVisible] = useState(false);
    const [loadedAudioFiles, setLoadedAudioFiles] = useState(false);
    const [sounds, setSounds] = useState([] as Array<any>);

    interface Dictionary<T> {
        [Key: string]: T;
    }

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
            thunderstorm: require('../../assets/sounds/thunderstorm.mp3'),
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

        // console.log(sound.soundObject);

        sound.soundObject.setVolume(volume)
        
        // let letChangedVolumeObj = sound.soundObject.setVolume(volume);

        // setSounds(prevArray => [...prevArray, letChangedVolumeObj])
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
            return (<SoundTile name={tile.item.name} isDarkMode={isDarkMode}
                darkThemeColor={tile.item.darkThemeColor}
                lightThemeColor={tile.item.lightThemeColor}
                iconName={tile.item.iconName}
                soundObject={sound.soundObject} />)
        }
        else {
            return (<ActivityIndicator />)
        }
    };

    return (
        <SafeAreaView style={[containerTheme, styles.container]}>
            <StatusBar barStyle={statusBarStyle} />

            <View style={{ width: '100%', height: '100%' }}>
                {

                    loadedAudioFiles && <FlatList
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
                    setIsVolumeModalVisible={setIsVolumeModalVisible}
                    setIsTimerModalVisible={setIsTimerModalVisible}
                />
            </View>

            <BottomSheet isDarkMode={isDarkMode}
                isVisible={isTimerModalVisible}
                setIsModalVisible={setIsTimerModalVisible} />
            <VolumeBottomSheet isDarkMode={isDarkMode}
                isVisible={isVolumeModalVisible}
                setIsModalVisible={setIsVolumeModalVisible}
                sounds={sounds} 
                changeVolumeOfSound={changeVolumeOfSound} />
        </SafeAreaView>
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
    },

});
