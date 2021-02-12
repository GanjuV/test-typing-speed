import React, { useEffect, useState } from "react";
import { GAME_ID_KEY } from "../../constants";
import { Channel } from "../../pubsub";
import { store } from "../../storage";
import { msToTime } from "../../utils/utils";

import "./result.css";

function Result() {
  const [userName, setUserName] = useState(null);
  const [time, setTime] = useState(0);
  useEffect(() => {
    Channel.subscribe((isCompleted) => {
      if (isCompleted) {
        setAttrValue();
      }
    });

    setAttrValue();

    return () => {};
  }, []);

  const setAttrValue = () => {
    store.getItem(GAME_ID_KEY, (err, value) => {
      const { winner } = value;
      console.log(winner);
      if (winner) {
        setUserName(winner.userName);
        setTime(winner.time);
      }
    });
  };
  return (
    <div className="app-center">
      {userName && time !== 0 ? (
        <div className="ui internally grid">
          <div className="row">
            <div className="three wide column"></div>
            <div className="ten wide column">
              <p>Congratulations Winner !!</p>
            </div>
            <div className="three wide column"></div>
          </div>
          <div className="row">
            <div className="three wide column"></div>
            <div className="ten wide column">
              <p>User: {userName}</p>
              <p>Time: {msToTime(time) || 0}</p>
            </div>
            <div className="three wide column"></div>
          </div>
        </div>
      ) : (
        <div className="ui active centered inline loader"></div>
      )}
    </div>
  );
}

export default Result;
