import React from 'react';
import { StyleSheet, View, Animated, TextInput, SafeAreaView, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const TimerBottomSheet = (props: any) => {

    const { isDarkMode, setTimerLength, timerLength } = props;

    const containerBackgroundColor = isDarkMode ?
        GlobalStyles.darkThemeModalContainer : GlobalStyles.lightThemeModalContainer;
    const textColor = isDarkMode ? "white" : "black";
    const borderColor = isDarkMode ? "white" : "grey";


    const onMinuteChange = (time: number) => {
        if (time <= 59 && time >= 0)
        setTimerLength({ ...timerLength, minutes: time })
    }

    const onSecondChange = (time: number) => {
        if (time <= 59 && time >= 0)
        setTimerLength({ ...timerLength, seconds: time })
    }

    const onHourChange = (time: number) => {
        if (time <= 99 && time >= 0)
            setTimerLength({ ...timerLength, hours: time })
    }

    return (
        <SafeAreaView style={[styles.overlay, containerBackgroundColor]}>
            <View style={styles.container}>
                <View style={styles.timerInputsContainer}>

                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={[styles.timerInputs, { color: textColor, borderColor: borderColor }]}
                            onChangeText={length => onHourChange(parseInt(length))}
                            value={timerLength.hours.toString()}
                            keyboardType='number-pad'
                            placeholder="0h"
                        />
                        <Text style={{color: textColor, fontSize: 12, paddingTop: 3}}>hours</Text>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={[styles.semiColumnText, { color: textColor }]}>:</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={[styles.timerInputs, { color: textColor, borderColor: borderColor }]}
                            onChangeText={length => onMinuteChange(parseInt(length))}
                            value={timerLength.minutes.toString()}
                            keyboardType='number-pad'
                            placeholder="0m"
                        />
                        <Text style={{color: textColor, fontSize: 12, paddingTop: 3}}>minutes</Text>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={[styles.semiColumnText, { color: textColor }]}>:</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={[styles.timerInputs, { color: textColor, borderColor: borderColor }]}
                            onChangeText={length => onSecondChange(parseInt(length))}
                            value={timerLength.seconds.toString()}
                            keyboardType='number-pad'
                            placeholder="0s"
                        />
                        <Text style={{color: textColor, fontSize: 12, paddingTop: 3}}>seconds</Text>
                    </View>

                </View>

                <View style={styles.timerButtonContainer}>
                    <TouchableOpacity style={{ width: '15%', height: '100%' }}>
                        <Text style={[styles.timerText, { color: textColor, borderColor: borderColor }]}>Set</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default TimerBottomSheet

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
    },
    container: {
        paddingTop: 12,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: '100%',
    },
    timerInputsContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingTop: 40
    },
    timerInputs: {
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        width: 65,
        textAlign: 'center',
        borderRadius: 15,
        fontSize: 18,
        marginLeft: 8,
        marginRight: 8
    },
    timerButtonContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 1
    },
    semiColumnText: {
        fontSize: 18,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end', 
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
