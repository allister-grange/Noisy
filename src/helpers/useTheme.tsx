import {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function loadDarkTheme() {
      try {
        const value = await AsyncStorage.getItem('theme');

        if (value !== null) {
          setIsDarkMode(value === 'true');
        }
      } catch (error) {
        console.error('No sounds in storage');
      }
    }

    loadDarkTheme();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      AsyncStorage.setItem('theme', 'true', (err) => {
        if (err) {
          console.error('error in setting theme ' + err);
        }
      });
    } else {
      AsyncStorage.setItem('theme', 'false', (err) => {
        if (err) {
          console.error('error in setting theme ' + err);
        }
      });
    }
  }, [isDarkMode]);

  return {isDarkMode, setIsDarkMode};
};
