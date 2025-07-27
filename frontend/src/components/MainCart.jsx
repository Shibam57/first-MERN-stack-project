import React from "react";
import { Cart } from "./CartColor/Cart";
import { useState } from "react";

function MainCart(){

    const [color, setColor] = useState("black");

    // const handlerRandomColor=()=>{
    //     const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
    //     setColor(randomColor)
    // }

    const handleUserColorChange=(e)=>{
        setColor(e.target.value)
    }

    return (
        <div className="fulldiv w-full h-screen animate-none duration-4000" style={{backgroundColor: color}}>
            <div className="div">
                <div className="colorDiv absolute flex flex-wrap justify-center bottom-[50px] left-0 right-0 border-4 border-red-600 bg-amber-800 rounded-full">
                    <Cart color="#ff0000" setColor={setColor} />
                    <Cart color="#0000ff" setColor={setColor} />
                    <Cart color="#00ff00" setColor={setColor} />
                    <Cart color="#ffff00" setColor={setColor} />
                    {/* <button className=" text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition" style={{backgroundColor: {color}}} onClick={handlerRandomColor}>
                        {color}
                    </button> */}

                    <div className=" text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition">
                        {color}
                    </div>

                    <input type="color" value={color} onChange={handleUserColorChange} className="w-10 h-10 rounded-full border-none cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export {MainCart}