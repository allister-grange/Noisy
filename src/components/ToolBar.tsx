import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ToolBar = (props: any) => {

    const { isDarkMode, setIsDarkMode, 
            setIsVolumeModalVisible, setIsTimerModalVisible } = props;
    const iconColor = isDarkMode ? "white" : "black";

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
                {
                    isDarkMode ?
                        <Feather name="sun" size={35} color={iconColor} />
                        :
                        <Feather name="moon" size={35} color={iconColor} />
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsVolumeModalVisible(true)}>
                {
                    isDarkMode ?
                        <Feather name="volume-2" size={35} color={iconColor} />
                        :
                        <Feather name="volume-2" size={35} color={iconColor} />
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsTimerModalVisible(true)}>
                <Ionicons name="ios-timer" size={35} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}

export default ToolBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});
