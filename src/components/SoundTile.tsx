import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SoundTile = (props: any) => {
    const { isDarkMode, lightThemeColor, darkThemeColor, iconName, soundObject } = props;

    const scale = useRef(new Animated.Value(1)).current;
    const [isPlaying, setIsPlaying] = useState(false);

    const containerBackgroundColor = isDarkMode ? darkThemeColor : lightThemeColor;
    const iconColor = isDarkMode ? "#202020" : "white";

    useEffect(() => {

        if(!soundObject.isPlaying()){                        
            setIsPlaying(false);
        }
                
    }, [props])

    const spring = () => {
        Animated.sequence([
            Animated.spring(scale, { toValue: 1.1, speed: 200, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, speed: 200, useNativeDriver: true }),
        ]).start(() => {
            if (isPlaying) {
                pauseSound();
            }
            else {
                playSound();
            }

            setIsPlaying(!isPlaying);
        });
    };

    const materialCommunityIcons = ['waves', 'fan', 'equalizer', 'piano']
    const ionIcons = ['ios-thunderstorm', 'md-train', 'ios-water', 'ios-rainy', 'ios-bonfire', 'ios-moon']
    const fontAwesome5 = ['car', 'train', 'tree', 'kiwi-bird', 'coffee', 'wind', 'leaf', 'guitar']

    const playSound = async () => {
        try {
            await soundObject.play();
            soundObject.setCategory('Playback');
        } catch (error) {
            console.error(error);
        }
    }

    const pauseSound = async () => {
        try {
            await soundObject.pause();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                spring();
                playSound();
            }
            }>
            <Animated.View style={{ transform: [{ scale }] }}>
                <View style={[isPlaying && styles.isPlaying,
                isPlaying && isDarkMode && { borderColor: 'white' },
                { backgroundColor: containerBackgroundColor },
                styles.container]}>

                    {ionIcons.includes(iconName) && <Ionicons name={iconName} size={55} color={iconColor} />}
                    {materialCommunityIcons.includes(iconName) && <MaterialCommunityIcons name={iconName} size={55} color={iconColor} />}
                    {fontAwesome5.includes(iconName) && <FontAwesome5 name={iconName} size={40} color={iconColor} />}

                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}

export default SoundTile

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 3.75,
        height: Dimensions.get('window').height / 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
    },
    isPlaying: {
        borderColor: 'grey',
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    }
});
