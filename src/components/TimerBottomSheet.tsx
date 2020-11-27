import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const TimerBottomSheet = (props: any) => {

    const { isDarkMode } = props;

    const containerBackgroundColor = isDarkMode ?
        GlobalStyles.darkThemeModalContainer : GlobalStyles.lightThemeModalContainer;
    const iconColor = isDarkMode ? "#202020" : "white";
    const textColor = isDarkMode ? "white" : "black";

    return (
            <View style={styles.overlay}>
                <Animated.View style={[styles.container, containerBackgroundColor, ]}>
                </Animated.View>
            </View>
    );
}

export default TimerBottomSheet

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        paddingTop: 12,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        height: '100%'
    },
});
