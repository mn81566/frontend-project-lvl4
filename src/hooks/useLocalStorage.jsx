import { useState } from 'react';

export const useLocalStorage = (keyName, defaultValue) => {
  console.log(
    '🚀 ~ file: useLocalStorage.jsx ~ line 4 ~ useLocalStorage ~ defaultValue',
    defaultValue
  );
  console.log(
    '🚀 ~ file: useLocalStorage.jsx ~ line 4 ~ useLocalStorage ~ defaultValue TYPE',
    typeof defaultValue
  );

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      setStoredValue(newValue);
    }
  };

  return [storedValue, setValue];
};
