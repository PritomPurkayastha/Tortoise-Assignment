import React, { useEffect } from "react";

export default function Timer({seconds, setSeconds, miliSeconds, setMiliSeconds, timerOn}) {
  
    useEffect(() => {
        let interval = null;
        if (timerOn) {
          //! Timer starts
          interval = setInterval(() => {
            setMiliSeconds((prev) => prev + 1);
          }, 1);
        } else {
          //!Timer stops
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [timerOn]);
    
      useEffect(() => {
        //! Checking if the miliSecond count is over 1000 after 5 seconds penalty
        if (miliSeconds > 1000) {
          setSeconds(seconds + 1);
          setMiliSeconds(miliSeconds - 1000);
        }
    
        //! If the miliSecond count reaches 1000 incrementing seconds by 1 and reseting miliSeconds to 0
        if (miliSeconds === 1000) {
          setSeconds(seconds + 1);
          setMiliSeconds(0);
        }
      }, [miliSeconds]);
  

  
    return (
      <div>
        Timer : {seconds}.
        {miliSeconds < 10
          ? "00" + miliSeconds
          : miliSeconds < 100
          ? "0" + miliSeconds
          : miliSeconds}
      </div>
    );
}
