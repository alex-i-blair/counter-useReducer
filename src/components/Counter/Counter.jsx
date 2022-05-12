import { useReducer } from 'react';
import styles from './Counter.css';

const { yellow, green, red } = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const initialState = { count: 0, color: yellow };
const reducer = (state, action) => {
  function handleColor(newCount) {
    if (newCount === 0) return yellow;
    if (newCount < 0) return red;
    if (newCount > 0) return green;
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        color: handleColor(state.count + 1),
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
        color: handleColor(state.count - 1),
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error('reducer failed to increment state of count');
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

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: state.color }}>{state.count}</h1>
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
