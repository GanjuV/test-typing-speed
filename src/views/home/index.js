import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Countdown from "../../components/Countdown";
import "./home.css";

function Home() {
  const [showTimer, setShowTimer] = useState(false);
  const history = useHistory();

  return (
    <div>
      {showTimer ? (
        <div className="counter-center">
          <Countdown initSec={3} callback={() => history.push("/main")} />
        </div>
      ) : (
        <button
          onClick={() => setShowTimer(true)}
          className="center ui primary basic button massive"
        >
          Play
        </button>
      )}
    </div>
  );
}

export default Home;
