
import { useState,useCallback,useEffect,useRef } from 'react';


function App() {
  const [length,setLength] = useState(8);

  const [numberAllowed,setNumberAllowed] = useState(false);

  const [charAllowed,setCharAllowed] = useState(false)

const[password,setPassword]=useState("")

// USE-REF
const passwordRef =useRef(null)

const passwordGenerator = useCallback(() =>{

let pass ="";
let str = "ABCDEFCmmffrfm";
if(numberAllowed){
str+="0123456789";
}
if(charAllowed){
  str+="@#$%^&&"
}


for(let i=1;i<=length;i++){
let char = Math.floor(Math.random()*str.length + 1);

pass+= str.charAt(char);
}
setPassword(pass);


},[length,numberAllowed,charAllowed,setPassword])

const copyPasswoRdToClipboard = useCallback(() =>{
  window.navigator.clipboard.writeText(password)
},
[password])

// USE-CALLBACK - > it is used for optimisation of the dependencis function, keeping the function in the cache memory
  


useEffect(() =>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])


  return (
   <>


 <div className = "w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
  <h1 className='text-white text-center my-3'>

Password Generator

  </h1>
  <div className = 'className=" flex shadow rounded-lg overflow-hidden mb-4"'>
    <input 
    type="text" 
    value = {password}
    className = "outline-none w-full py-2 px-3"
    placeholder="password"
    readonly
    ref={passwordRef}
    />
    <button onClick={copyPasswoRdToClipboard}>
      copy
    </button>

  </div>

  <div className='flex text-sm gap-x-2' >
    <div className = 'flex items-center gap-x-1'>
<input type="range"
min={6}
max={100}
value={length}
className = 'cursor-pointer'
onChange = {(e) =>{
setLength(e.target.value)
}}
/>

<label>
Length:{length}
</label>

    </div>
    <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={numberAllowed}
      id="numberInput"
      onChange={() => {
        setNumberAllowed((prev)=>!prev);
      }}
      />
      <label htmlFor="numberInput">Numbers</label>
    </div>

    <div className="flex items-center gap-x-1">
      <input
      type="checkbox"
      defaultChecked={charAllowed}
      id="characterInput"
      onChange={() => {
        setCharAllowed((prev)=>!prev);
      }}
      />
      <label htmlFor="characterInput">Characters</label>
    </div>

  </div>
 </div>
   </> 
   
  );
}



export default App;
