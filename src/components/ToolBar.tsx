import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ToolBar = (props: any) => {

    const { isDarkMode, setIsDarkMode, timerLength,
        openVolumeModal, openTimerModal, isTiming } = props;
    const iconColor = isDarkMode ? "white" : "black";

    return (
        <View style={styles.container}>
            <View style={styles.iconColumn}>
                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
                    {
                        isDarkMode ?
                            <Feather name="sun" size={35} color={iconColor} />
                            :
                            <Feather name="moon" size={35} color={iconColor} />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.iconColumn}>
                <TouchableOpacity onPress={() => openVolumeModal()}>
                    {
                        isDarkMode ?
                            <Feather name="volume-2" size={35} color={iconColor} />
                            :
                            <Feather name="volume-2" size={35} color={iconColor} />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.iconColumn}>
                <TouchableOpacity onPress={() => openTimerModal()}>
                    {isTiming ?
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: iconColor, fontSize: 16 }}>
                                {timerLength.hours + ':' + timerLength.minutes + ':' + timerLength.seconds}
                            </Text>
                        </View>
                        :
                        <Ionicons name="ios-timer" size={35} color={iconColor} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ToolBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconColumn: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
