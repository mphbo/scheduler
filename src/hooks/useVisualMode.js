import { useState } from 'react';

export const useVisualMode = (initial) => {
  
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      console.log('replace');
    } 
    else {
      setHistory(prev => [...prev, newMode]);
      console.log(history);
    }
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev, mode])
      setMode(history[history.length - 2]);

    }
  }

  return {
    mode,
    transition,
    back
  }
}