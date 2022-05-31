import React, { useState } from "react";
import { isEmpty } from "./utils/utils";
import useMountRequest from "./hooks/useMountRequest";
import { requestPost } from "./request/requestPost";

const App = () => {
  const [data, loadingData] = useMountRequest(requestPost);
  const [index, setIndex] = useState(1);

  const generate = () => {
    const index = Math.floor(Math.random() * data.length);
    setIndex(index);
  };

  return (
    <div className="desktop">
      <div className="header">
        <img src="./images/icon.svg" alt="logo" />
        <h1>
          Le <br /> Penseur
        </h1>
      </div>
      {loadingData ? (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : (
        !isEmpty(data) && (
          <div className="card">
            <img
              className="paperclip"
              src="./images/paperclip.png"
              alt="paperclip"
            />
            <div
              className={
                data[index].category === "Géographie"
                  ? "geography"
                  : "category" && data[index].category === "Animaux"
                  ? "animal"
                  : "category" && data[index].category === "Histoire"
                  ? "history"
                  : "category" && data[index].category === "Art et Culture"
                  ? "art"
                  : "category" && data[index].category === "Sport"
                  ? "sport"
                  : "category" && data[index].category === "Histoire"
                  ? "history"
                  : "category" && data[index].category === "Art et Culture"
                  ? "art"
                  : "category" && data[index].category === "Insolite"
                  ? "funny"
                  : "category" && data[index].category === "Nourriture"
                  ? "food"
                  : "category"
              }
            >
              <span>{data[index] && data[index].category}</span>
            </div>

            <p>{data[index] && data[index].content}</p>
          </div>
        )
      )}

      <button onClick={generate} className="btn-quiz">. . .</button>

      <div className="footer">
        <p>2022 - alban</p>
      </div>
    </div>
  );
};

export default App;
