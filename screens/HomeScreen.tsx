import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ToolBar from '../components/ToolBar';
import SoundTile from '../components/SoundTile';
import BottomSheet from '../components/BottomSheet';
import { tileData } from '../helpers/TileData';
import { Audio } from 'expo-av';
import { AVPlaybackSource } from 'expo-av/build/AV';

export default function HomeScreen() {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
    const [isVolumeModalVisible, setIsVolumeModalVisible] = useState(false);
    const [loadedAudioFiles, setLoadedAudioFiles] = useState(false);
    const [soundFiles, setSoundFiles] = useState({} as Dictionary<Audio.Sound>);

    interface Dictionary<T> {
        [Key: string]: T;
    }

    const loadSoundFiles = async () => {
        setLoadedAudioFiles(false);
        
        const soundFilesPath: Dictionary<AVPlaybackSource>  = {
            campfire: require('./../../assets/sounds/campfire.mp3'),
            car: require('./../../assets/sounds/car.mp3'),
            crickets: require('./../../assets/sounds/crickets.mp3'),
            fan: require('./../../assets/sounds/fan.mp3'),
            forest: require('./../../assets/sounds/forest.mp3'),
            guitar: require('./../../assets/sounds/guitar.mp3'),
            leaf: require('./../../assets/sounds/leaf.mp3'),
            office: require('./../../assets/sounds/office.mp3'),
            piano: require('./../../assets/sounds/piano.mp3'),
            rain: require('./../../assets/sounds/rain.mp3'),
            river: require('./../../assets/sounds/river.mp3'),
            thunderstorm: require('./../../assets/sounds/thunderstorm.mp3'),
            train: require('./../../assets/sounds/train.mp3'),
            white: require('./../../assets/sounds/white.mp3'),
            wind: require('./../../assets/sounds/wind.mp3'),
        };

        let loadedSoundFiles: Dictionary<Audio.Sound> = {};

        await Promise.all (tileData.map(async (tile) => {
            
            const soundObject = new Audio.Sound();
            const loadedSoundFile = soundFilesPath[tile.name]
            await soundObject.loadAsync(loadedSoundFile);
            
            loadedSoundFiles[tile.name] = soundObject
        }));
                
        setSoundFiles(loadedSoundFiles);
        setLoadedAudioFiles(true);
    };

    useEffect(() => {
        loadSoundFiles();
    }, [])

    const statusBarStyle = isDarkMode ? 'light' : 'dark';
    const containerTheme = isDarkMode ? GlobalStyles.darkThemeContainer : GlobalStyles.lightThemeContainer;

    const renderTile = (tile: any) => {
    
        const soundObject = soundFiles[tile.item.name]
        
        return (<SoundTile name={tile.item.name} isDarkMode={isDarkMode}
            darkThemeColor={tile.item.darkThemeColor}
            lightThemeColor={tile.item.lightThemeColor}
            iconName={tile.item.iconName}
            soundObject={soundObject} />)
    };

    return (
        <SafeAreaView style={[containerTheme, styles.container]}>
            <StatusBar style={statusBarStyle} />

            <View style={{ width: '100%', height: '100%' }}>
                {
                
                loadedAudioFiles && <FlatList
                    scrollEnabled={false}
                    data={tileData}
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
            <BottomSheet isDarkMode={isDarkMode}
                isVisible={isVolumeModalVisible}
                setIsModalVisible={setIsVolumeModalVisible} />
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
