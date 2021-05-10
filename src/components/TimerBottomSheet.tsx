import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const TimerBottomSheet = (props: any) => {
  const {
    isDarkMode,
    setTimerLength,
    timerLength,
    startTimer,
    isTiming,
    resetTimer,
  } = props;

  const containerBackgroundColor = isDarkMode
    ? GlobalStyles.darkThemeModalContainer
    : GlobalStyles.lightThemeModalContainer;
  const textColor = isDarkMode ? 'white' : 'black';
  const borderColor = isDarkMode ? 'white' : 'grey';
  const editable = isTiming ? false : true;

  const onMinuteChange = (time: any) => {
    if (time <= 99) {
      setTimerLength({...timerLength, minutes: time});
    }
  };

  const onSecondChange = (time: any) => {
    if (time <= 99) {
      setTimerLength({...timerLength, seconds: time});
    }
  };

  const onHourChange = (time: any) => {
    if (time <= 99) {
      setTimerLength({...timerLength, hours: time});
    }
  };

  return (
    <SafeAreaView style={[styles.overlay, containerBackgroundColor]}>
      <View style={styles.container}>
        <View style={styles.timerInputsContainer}>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={[
                styles.timerInputs,
                {color: textColor, borderColor: borderColor},
              ]}
              onChangeText={(length) => onHourChange(length)}
              value={timerLength.hours.toString()}
              keyboardType="number-pad"
              placeholder="0h"
              editable={editable}
            />
            <Text style={{color: textColor, fontSize: 12, paddingTop: 3}}>
              hours
            </Text>
          </View>

          <View style={styles.semiColumnContainer}>
            <Text style={[styles.semiColumnText, {color: textColor}]}>:</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <TextInput
              style={[
                styles.timerInputs,
                {color: textColor, borderColor: borderColor},
              ]}
              onChangeText={(length) => onMinuteChange(length)}
              value={timerLength.minutes.toString()}
              keyboardType="number-pad"
              placeholder="0m"
              editable={editable}
            />
            <Text style={{color: textColor, fontSize: 12, paddingTop: 3}}>
              minutes
            </Text>
          </View>

          <View style={styles.semiColumnContainer}>
            <Text style={[styles.semiColumnText, {color: textColor}]}>:</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <TextInput
              style={[
                styles.timerInputs,
                {color: textColor, borderColor: borderColor},
              ]}
              onChangeText={(length) => onSecondChange(length)}
              value={timerLength.seconds.toString()}
              keyboardType="number-pad"
              placeholder="0s"
              scrollEnabled={false}
              editable={editable}
            />
            <Text style={{color: textColor, fontSize: 12, paddingTop: 3}}>
              seconds
            </Text>
          </View>
        </View>

        <View style={styles.timerButtonContainer}>
          {isTiming ? (
            <TouchableOpacity
              style={{width: '15%', height: '100%'}}
              onPress={resetTimer}>
              <Text
                style={[
                  styles.timerText,
                  {color: textColor, borderColor: borderColor},
                ]}>
                stop
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{width: '15%', height: '100%'}}
              onPress={startTimer}>
              <Text
                style={[
                  styles.timerText,
                  {color: textColor, borderColor: borderColor},
                ]}>
                set
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TimerBottomSheet;

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
  },
  timerInputsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 40,
  },
  timerInputs: {
    height: 50,
    width: 65,
    textAlign: 'center',
    borderRadius: 15,
    fontSize: 30,
    marginLeft: 8,
    marginRight: 8,
  },
  timerButtonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  timerText: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 1,
    fontSize: 15,
  },
  semiColumnText: {
    fontSize: 20,
  },
  semiColumnContainer: {
    alignSelf: 'center',
    paddingBottom: 20,
  },
});
