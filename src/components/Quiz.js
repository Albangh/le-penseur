import React, { useCallback, useRef, useState } from "react";
import dataQuiz from "../data/quiz.json";
import ReactCanvasConfetti from "react-canvas-confetti";
import { NavLink } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDescription, setQuizDescription] = useState("");
  const [btnQuiz, setBtnQuiz] = useState(true);

  const correctionQuestion = (e) => {
    e.preventDefault();
    if (dataQuiz[currentQuestion].answer === e.target.id) {
      setQuizAnswer(true);
      setQuizDescription(dataQuiz[currentQuestion].description);
      setBtnQuiz(false);
      setScore(score + 1);
      fire();
    } else {
      setQuizAnswer(false);
      setQuizDescription(dataQuiz[currentQuestion].description);
      setBtnQuiz(false);
    }
  };

  const nextQuestionQuiz = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < dataQuiz.length) {
      setCurrentQuestion(nextQuestion);
      setQuizDescription("");
      setBtnQuiz(true);
      setQuizAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  //animation win

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  return (
    <div className="desktop">
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <div className="header">
        <img src="./images/icon.svg" alt="logo" />
        <h1>
          Le <br /> Penseur
        </h1>
      </div>
      <div className="card">
        <img
          className="paperclip"
          src="./images/paperclip.png"
          alt="paperclip"
        />
        {showScore ? (
          <p className="score">
            Votre score {score} / {dataQuiz.length}{" "}
          </p>
        ) : null}
        <div
          className={
            dataQuiz[currentQuestion].category === "Géographie"
              ? "geography"
              : "category" && dataQuiz[currentQuestion].category === "Animaux"
              ? "animal"
              : "category" && dataQuiz[currentQuestion].category === "Histoire"
              ? "history"
              : "category" &&
                dataQuiz[currentQuestion].category === "Art et Culture"
              ? "art"
              : "category" && dataQuiz[currentQuestion].category === "Sciences"
              ? "sport"
              : "category"
          }
        >
          <span>{dataQuiz[currentQuestion].category}</span>
        </div>

        <p>{dataQuiz[currentQuestion].question}</p>

        {quizAnswer === true ? (
          <div className="good-answer">
            <span>Bravo !</span>
          </div>
        ) : null}

        {quizAnswer === false ? (
          <div className="loose-answer">
            <span>Perdu !</span>
          </div>
        ) : null}

        <div className="quiz-description">{quizDescription}</div>

        <div className="btn-answer">
          {btnQuiz === true && showScore === false ? (
            <>
              <button
                onClick={correctionQuestion}
                id="true"
                className="btn-quiz true"
              >
                Vrai
              </button>
              <button
                onClick={correctionQuestion}
                id="false"
                className="btn-quiz false"
              >
                Faux
              </button>
            </>
          ) : (
            <>
              {showScore === true ? (
                <NavLink to="/">
                  <button onClick={nextQuestionQuiz} className="btn-quiz next">
                    Accueil
                  </button>
                </NavLink>
              ) : (
                <button onClick={nextQuestionQuiz} className="btn-quiz next">
                  Suivant
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="footer">
        <p>2022 - alban</p>
      </div>
    </div>
  );
};

export default Quiz;
