import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, initialValue) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      const value = window?.localStorage?.getItem(storageKey);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value;
      window?.localStorage?.setItem(storageKey, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onStorageAddition = (e) => {
      const { key, newValue } = e;
      if (key === storageKey) {
        setState(JSON.parse(newValue));
      }
    };
    window.addEventListener("storage", onStorageAddition);
    return () => window.removeEventListener("storage", onStorageAddition);
  });

  return [state, setValue];
};

export default useLocalStorage;
