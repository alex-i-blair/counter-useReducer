import { useEffect, useReducer } from 'react';
import styles from './Counter.css';

const { yellow, green, red } = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const initialState = { counter: 0, color: yellow };
const reducer = (state, action) => {
  console.log('state, action', state, action);
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'COLOR_ZERO':
      return { ...state, color: yellow };
    case 'COLOR_POSITIVE':
      return { ...state, color: green };
    case 'COLOR_NEGATIVE':
      return { ...state, color: red };
    case 'RESET':
      return initialState;
    default:
      throw new Error('reducer failed to increment state of counter');
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };
  const handleColor = () => {
    state.counter === 0 && dispatch({ type: 'COLOR_ZERO' });
    state.counter > 0 && dispatch({ type: 'COLOR_POSITIVE' });
    state.counter < 0 && dispatch({ type: 'COLOR_NEGATIVE' });
  };

  useEffect(() => {
    handleColor();
  }, [state.counter]);

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: state.color }}>{state.counter}</h1>
      <div>
        <button
          type="button"
          onClick={handleIncrement}
          aria-label="increment"
          style={{ backgroundColor: green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          aria-label="decrement"
          style={{ backgroundColor: red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={reset}
          style={{ backgroundColor: yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
