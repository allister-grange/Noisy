import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text, Animated, Dimensions, PanResponder, ScrollView } from 'react-native';
import Sound from 'react-native-sound';
import GlobalStyles from '../styles/GlobalStyles';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo'

const VolumeBottomSheet = (props: any) => {

    const { isDarkMode, setIsModalVisible, isVisible } = props;

    const panY = useRef(new Animated.Value(Dimensions.get('screen').height)).current

    // useEffect(() => {
    //     if (
    //         isVisible
    //       ) {
    //         resetPostiionAnimation.start();
    //       }        
    // }, [isVisible]);

    const resetPostiionAnimation = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
    })

    const closeAnimation = Animated.timing(panY, {
        toValue: Dimensions.get('screen').height,
        duration: 500,
        useNativeDriver: true
    });

    const top = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const panResponders = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            // onPanResponderMove: Animated.event([
            //     null, { dy: panY }
            // ]),
            onPanResponderRelease: (e, gs) => {
                if (gs.dy > 0 && gs.vy > 2) {
                    return closeAnimation.start(() => setIsModalVisible(false));
                }
                return resetPostiionAnimation.start();
            },
        })).current;

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
    const iconColor = isDarkMode ? "#202020" : "white";
    const textColor = isDarkMode ? "white" : "black";



    return (
        <Modal
            animated
            animationType="slide"
            visible={isVisible}
            transparent
            onRequestClose={() => setIsModalVisible(false)}>
            <View style={styles.overlay}>
                <Animated.View style={[styles.container, containerBackgroundColor,]}>
                    {/* {props.content} */}
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{alignItems: 'center'}}>
                        {/* <Text style={{ color: textColor, alignSelf: 'center', fontSize: 20 }}>Close Me</Text> */}
                        <Entypo name="cross" size={40} color={textColor} />
                    </TouchableOpacity>
                    {
                        noSoundsPlaying() &&
                        <View style={{justifyContent: 'center', alignItems: 'center', height: '70%'}}>
                            <Text style={{ color: textColor, fontSize: 18 }}>play some sounds!</Text>
                        </View>
                    }
                    <ScrollView>
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
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>

    );
}

export default VolumeBottomSheet

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        paddingTop: 12,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '50%'
    },

});
