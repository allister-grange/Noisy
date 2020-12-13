import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Slider from '@react-native-community/slider';

const VolumeBottomSheet = (props: any) => {

    const { isDarkMode } = props;

    const noSoundsPlaying = () => {
        let soundPlaying = false;

        props.sounds.map((sound: any) => {
            if (sound.soundObject._playing) {
                soundPlaying = true;
            }
        });

        return !soundPlaying;
    }

    const containerBackgroundColor = isDarkMode ?
        GlobalStyles.darkThemeModalContainer : GlobalStyles.lightThemeModalContainer;
    const textColor = isDarkMode ? "white" : "black";

    return (
        <SafeAreaView style={[styles.overlay, containerBackgroundColor]}>
            <View style={styles.container}>
                {
                    noSoundsPlaying() &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ color: textColor, fontSize: 18 }}>play some sounds!</Text>
                    </View>
                }
                {props.sounds.map((sound: any) => {
                    if (sound.soundObject._playing) {
                        return (
                            <View key={sound.name} style={{
                                width: '100%', flexDirection: 'row',
                                justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <Text style={{ color: textColor, paddingLeft: 10 }}>{sound.name}</Text>
                                <Slider
                                    style={{ width: '70%', height: 40, marginRight: 50 }}
                                    minimumValue={0}
                                    maximumValue={1}
                                    value={sound.soundObject.getVolume()}
                                    minimumTrackTintColor="#000000"
                                    maximumTrackTintColor="#FFFFFF"
                                    onValueChange={(value) => props.changeVolumeOfSound(sound, value)}
                                />
                            </View>
                        )
                    }
                })}
            </View>
        </SafeAreaView>
    );
}

export default VolumeBottomSheet

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    container: {
        paddingTop: 12,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: '100%',
        paddingBottom: 15
    },
});
