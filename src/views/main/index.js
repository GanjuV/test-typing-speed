import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { store } from "../../storage";

import { GAME_ID_KEY, sampleData } from "../../constants";
import { msToTime } from "../../utils/utils";
import "./main.css";
import { Channel } from "../../pubsub";

function Main() {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [typeText, setTypeText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [start, setStart] = useState(new Date().getTime());

  const history = useHistory();
  let isWinnerFound = false;
  useEffect(() => {
    // Get type text
    getText();

    // Store the updated value in storage
    store.getItem(GAME_ID_KEY, (err, value) => {
      const { participants } = value;
      const userName = `User ${participants.length + 1}`;
      setUserName(userName);
      value.participants.push({
        userName: userName,
        time: 0,
      });
      store.setItem(GAME_ID_KEY, value);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Return if text not typed
    if (inputError || typeText.length === 0 || timeText !== "") return;
    const end = new Date().getTime();
    const finalTime = end - start;
    setTimeText(msToTime(finalTime));

    // Set time in storage
    store.getItem(GAME_ID_KEY, (err, value) => {
      let { participants } = value;
      const arry = participants.map((obj) => {
        if (obj.userName === userName) {
          obj.time = finalTime;
        }
        return obj;
      });

      value.participants = [...arry];
      store.setItem(GAME_ID_KEY, value);
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTypeText(value);
    if (value.length === 0) {
      setInputError(false);
      return;
    }
    text.split("").forEach((char, index) => {
      let typedChar = value[index];

      // characters not currently typed
      if (typedChar === null || typedChar === undefined) {
        // setInputError(false);
      } else if (typedChar === char) {
        setInputError(false);
      } else {
        setInputError(true);
      }
    });
  };

  const getText = () => {
    const dataLen = sampleData.length;
    const text = sampleData[Math.floor(Math.random() * dataLen)];
    setText(text);
  };

  const handleFinishClk = () => {
    store.getItem(GAME_ID_KEY, (err, data) => {
      let { participants } = data;
      let countCompleteUser = 0;
      const userTotal = participants.length;
      participants.forEach(({ time }) => {
        if (time) {
          countCompleteUser++;
        }
      });

      // Checking if the participants has completed the challange
      if (userTotal === countCompleteUser) {
        // set winner
        let maxTime = 0;
        let user = "";
        participants.forEach(({ time, userName }) => {
          if (time > maxTime) {
            maxTime = time;
            user = userName;
          }
        });
        console.log({
          userName: user,
          time: maxTime,
        });
        data.winner = {
          userName: user,
          time: maxTime,
        };
        store.setItem(GAME_ID_KEY, data);
        Channel.publish({ complete: true });
      }
    });

    history.push("/result");
  };

  return (
    <div className="align-center ui internally grid">
      <div className="row">
        <div className="three wide column">{userName}</div>
        <div className="ten wide column">
          <p>{text}</p>
        </div>
        <div className="three wide column"></div>
      </div>
      <div className="row">
        <div className="three wide column"></div>
        <div className="ten wide column ui form error">
          <form onSubmit={handleSubmit}>
            <div className="ui massive input input-width field">
              <input
                autoFocus
                onChange={handleInputChange}
                type="text"
                placeholder="Type text"
                value={typeText}
              />
            </div>
            {inputError && (
              <div className="ui error message">
                <div className="header">Error</div>
                <p>Text is incorrect please check the text again</p>
              </div>
            )}
          </form>
        </div>
        <div className="three wide column"></div>
      </div>
      <div className="row">
        <div className="three wide column"></div>
        {timeText !== "" && (
          <>
            <div className="ten wide column">
              <div className="ui label">
                Your time is
                <div className="detail">{timeText}</div>
              </div>
            </div>
            <button
              onClick={handleFinishClk}
              className="ui primary basic button"
            >
              Finish
            </button>
          </>
        )}

        <div className="three wide column"></div>
      </div>
    </div>
  );
}
export default Main;
