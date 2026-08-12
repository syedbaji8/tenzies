import React from "react";

export default function Dice({value, isHeld, id, diceDispatch}){
    return (
        <li 
        className={`cursor-pointer px-4 py-2 rounded-lg ${isHeld ? 'bg-green-700 text-white is-held':'bg-gray-100 active'}`}
        onClick={() => diceDispatch({type: 'holdIt', payload: id})}
        >
            {value}
        </li>
    )
}