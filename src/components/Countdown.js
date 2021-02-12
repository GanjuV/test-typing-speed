import React, { useEffect, useState } from "react";

function Countdown({ initSec, callback }) {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(initSec);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      callback();
      return;
    }
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return <div>{timeLeft}</div>;
}

export default Countdown;
