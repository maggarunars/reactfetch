import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { GenPic,AdviceType } from './types';
import './generate.css'




const Generate = ()=>{
    const [isLoading, setIsLoading]  = useState(false) 
    const [data, setData] = useState(null) as [GenPic|null, Dispatch<SetStateAction<null>>]
    const [advice, setAdvice] = useState(null) as [AdviceType|null, Dispatch<SetStateAction<null>>];
    useEffect (()=>{
        const fetchAdvice = async ()=>{
            const response = await fetch('https://api.adviceslip.com/advice')
            const adviceData = await response.json()
            .catch()
            setAdvice(adviceData)
            console.log (advice)
        }
        fetchAdvice()

    },[])
    

    const handleClick= ()=>{
        const fetchData = async ()=>{
            setIsLoading(true)
            const response = await fetch(`https://main--papaya-cranachan-0dd5ad.netlify.app/.netlify/functions/create-pic?prompt=${advice?.slip.advice}`)
            const pic = await response.json() 
            .catch()
            setData(pic)
            setIsLoading(false)
            console.log (data)
        }
        fetchData()
   
     
    }

   console.log(data)
   
return(
    <div className="advice">
        <p>{advice?.slip.advice}</p>
        {isLoading&&<div className="loadingspinner"><div></div><div></div><div></div><div></div></div>}
        {data&&<img className="img"src={data?.[0].url || "...is loading"} alt="" />}
        <div>
            <button className="button" onClick={handleClick}>Generate image for advice</button>
        </div>
    </div>
)

   }
  
   export default Generate