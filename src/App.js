import axios from "axios";
import React, { useEffect, useState } from "react";
import { isEmpty } from "./utils/utils";

const App = () => {
  const [data, setData] = useState();
  const [index, setIndex] = useState(1);

  const generate = () => {
    const index = Math.floor(Math.random() * data.length);
    setIndex(index);
  };

  useEffect(() => {
    function fetchData() {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}`,
      })
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  return (
    <div className="desktop">
      <div className="header">
        <img src="./images/icon.svg" alt="logo" />
        <h1>
          Le <br /> Penseur
        </h1>
      </div>
      {!isEmpty(data) && (
        <div className="card">
          <img className="paperclip" src="./images/paperclip.png" alt="paperclip" />
          <div className={data[index].category === "Géographie" ? "geography" : "category" && data[index].category === "Animaux" ? "animal" : "category" && data[index].category === "Histoire" ? "history" : "category" && data[index].category === "Art et Culture" ? "art" : "category"  && data[index].category === "Sport" ? "sport" : "category" && data[index].category === "Histoire" ? "history" : "category" && data[index].category === "Art et Culture" ? "art" : "category"  && data[index].category === "Insolite" ? "funny" : "category" && data[index].category === "Nourriture" ? "food" : "category"} >
            <span>{data[index] && data[index].category}</span>
          </div>

          <p>{data[index] && data[index].content}</p>
          <button className="btn-push" onClick={generate}><img src="./images/arrow.svg" alt="arrow" /></button>
        </div>
      )}

      <div className="footer">
        <p>2022 - alban</p>
      </div>
    </div>
  );
};

export default App;
