import { useState, useEffect } from "react";

export default function Timer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log("Timer")
        // Multiple timers will be created as remainingTime is updated
        // and the component gets reexecuted, need useEffect
        const timer = setTimeout(onTimeout, timeout)
        
        return () => {
            clearTimeout(timer)
        }
    }, [onTimeout])

    useEffect(() => {            
        console.log("Interval")

        // An infinite loop, need useEffect
        const interval = setInterval(() => {
            setRemainingTime(prev => prev - 100)
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, [])
    
    return <progress id="question-time" value={remainingTime} max={timeout}/>
}