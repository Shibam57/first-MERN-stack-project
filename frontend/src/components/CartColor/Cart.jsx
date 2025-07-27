import { useState } from "react";

function Cart({
    color,
    setColor
}){
    return(
        <>
            <button className="button outline-none my-1 mx-4 text-white rounded-full shadow-sm" style={{backgroundColor: color}} onClick={()=>setColor(color)}>
                {color}
            </button>
        </>
    )
}

export {Cart}