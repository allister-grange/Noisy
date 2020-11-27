import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, TouchableHighlight, TouchableOpacity, View, Text, Animated, Dimensions, PanResponder } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const TimerBottomSheet = (props: any) => {

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
                <Animated.View style={[styles.container, containerBackgroundColor, ]}>
                    {/* {props.content} */}
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                        <Text>Yoza</Text>
                        <Text style={{ color: textColor }}>Close Me</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>

    );
}

export default TimerBottomSheet

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        height: '50%'
    },

});
