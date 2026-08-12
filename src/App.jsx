import { useReducer } from 'react'
import './App.css'
import ImagesData from './ImagesData';
import Dice from './Components/Dice'

function App() {
  function diceReducerFn(prevState, action) {
    switch (action.type) {
      case 'rollDice':
        return prevState.map((item) => {
          return item.isHeld ? item : { ...item, value: Math.floor(Math.random() * 6) + 1 }
        });
      case 'resetDice':
        return makeNewArray();
      case 'holdIt':
        return prevState.map((item) => {
          return item.id === action.payload ? { ...item, isHeld: !item.isHeld } : item;
        });
      default:
        return prevState;
    }
  }
  const [diceArray, diceDispatch] = useReducer(diceReducerFn, makeNewArray());
  // const [numarray, setNumarray] = useState(() => makeNewArray());
  const heldBool = diceArray.every((item) => item.isHeld === true);
  const heldVal = diceArray.every((item) => item.value === diceArray[0].value);
  const finalBool = heldBool && heldVal;
  function makeNewArray() {
    const newArray = [];
    for (let i = 1; i <= 10; i++) {
      newArray.push({
        id: i,
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    }
    return newArray;
  }
  // const rollDiceFn = () => {
  //   setNumarray(oldDice =>
  //     oldDice.map((item) => {
  //       return item.isHeld ? item : { ...item, value: Math.floor(Math.random() * 6) + 1 }
  //     })
  //   );
  // }
  // const resetDiceFn = () => {
  //   setNumarray(makeNewArray());
  // }
  // const holditFn = (id) => {
  //   setNumarray((prevState) => {
  //     return prevState.map((item) => {
  //       return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
  //     });
  //   });
  //   // console.log(numarray.filter((item) => item.isHeld === true))
  // }
  return (
    <>
      <div className="tenzies w-full max-w-md bg-gray-300 p-5 grid gap-y-3 shadow-md shadow-gray-800">
        <div className="tenzies__header grid grid-cols-[auto_1fr] items-center align-items-center gap-4">
          <img src={ImagesData['logoSunshine3d']} className='brand-logo max-w-10' alt="" />
          <span className='text-4xl text-left font-bold'>Tenzies</span>
        </div>
        <div className="tenzies__body relative inner-canvas bg-gray-700 p-3 rounded-md grid place-items-center items-center">
          <ul className="w-full list-none space-y-2 gap-4 grid grid-cols-5 place-items-center items-center">
            {
              diceArray.map(({ id, value, isHeld }, index) => <Dice key={index} id={id} value={value} isHeld={isHeld} diceDispatch={diceDispatch} />)
            }

          </ul>
          {
            finalBool &&
            <div className="you__won grid place-items-center text-white">
              <h1 className='text-4xl font-medium'>Congratulations.. <br /> You won the Game!</h1>
            </div>
          }
        </div>
        <div className="tenzies__footer flex items-center justify-between w-3/5">
          <button className='bg-gray-400 font-medium text-white px-4 py-2 rounded-md'
            onClick={() => diceDispatch({ type: 'resetDice', payload: null })}
          >Reset</button>
          <button className='bg-blue-800 text-white px-4 py-2 rounded-md'
            onClick={() => diceDispatch({ type: 'rollDice', payload: null })}
          >Roll Dice</button>
        </div>
      </div>
    </>
  )
}

export default App
