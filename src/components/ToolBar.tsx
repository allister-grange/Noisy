import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ToolBar = (props: any) => {

    const { isDarkMode, setIsDarkMode, 
            openVolumeModal, openTimerModal } = props;
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

            <TouchableOpacity onPress={() => openVolumeModal()}>
                {
                    isDarkMode ?
                        <Feather name="volume-2" size={35} color={iconColor} />
                        :
                        <Feather name="volume-2" size={35} color={iconColor} />
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openTimerModal()}>
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
