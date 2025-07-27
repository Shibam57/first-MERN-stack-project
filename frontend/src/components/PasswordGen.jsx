import React, { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react'

function PasswordGen() {

    const copyRef= useRef(null)

    const [length, setLength] = useState(8)
    const [numberPass, setNumberPass] = useState(false)
    const [spacalCar, setSpacalCar] = useState(false)
    const [password, setPassword] = useState("")
    const [copyText, setCopyText] = useState('copy')

    const passwordGenerator=useCallback(()=>{
        let password=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numberPass) str+="0123456789"
        if(spacalCar) str+="~!@#$%^&*(){}[]/"

        for(let i=0;i<=length;i++){
            let char=Math.floor(Math.random()*str.length+1)
            password+=str.charAt(char)
        }

        setPassword(password)

    },[length, numberPass, spacalCar])

    const handleCopy=()=>{
        copyRef.current.select()
        // document.execCommand("copy")
        window.navigator.clipboard.writeText(password)
        setCopyText('Copied');
        setTimeout(()=>{
            setCopyText('copy')
        },2000)
        alert("Password copied!")
    }

    useEffect(()=>{
        passwordGenerator()
    },[length, numberPass, spacalCar, passwordGenerator])

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover">
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-5 my-8 bg-gray-700 text-red-800'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" ref={copyRef} value={password} className='outline-none w-full bg-white py-1 px-2' placeholder='Password' readOnly />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 hover:bg-blue-500' onClick={handleCopy}>{copyText}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
                <input value={length} type="range" min={8} max={50} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)} />
                <label className='text-white'>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input type="checkbox" id="numberInput" onChange={()=>setNumberPass((prev)=>!prev)} />
                <label className='text-white' htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input type="checkbox" id="charInput" onChange={()=>setSpacalCar((prev)=>!prev)} />
                <label className='text-white' htmlFor='charInput'>Characters</label>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PasswordGen
