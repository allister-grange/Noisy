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

  return {isDarkMode, setIsDarkMode};
};
