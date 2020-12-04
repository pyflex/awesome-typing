import React, { useState, useEffect, useRef } from "react";

import generate from "../utils/words";
import { checkChars, wordsWithClass } from "../utils/checkChars.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Badge,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

import { englishEasy } from "utils/word-list";

// own components
import Leaderboard from "../components/Leaderboard";
import PerformanceChart from "../components/PerformanceChart";
import TypingInfoCard from "../components/TypingInfoCard";
import TypingCharts from "../components/TypingCharts";

const initialWords = generate(30, englishEasy);
const wordWithClassname = wordsWithClass(initialWords);

const TypingPractice = () => {
  // using inputRefs instead? : https://medium.com/tech-tajawal/controlled-and-uncontrolled-components-in-react-6d5f260b46dd
  const [inputText, setInputText] = useState("");
  const [wordClass, setWordClass] = useState(wordWithClassname);
  const [typingData, setTypingData] = useState({
    wordsTyped: 0,
    incorrectWords: 0,
    correctWords: 0,
    incorrectCharsTyped: 0,
    correctCharsTyped: 0,
  });
  const [sessionOver, setSessionOver] = useState(false);
  const [typingText, setTypingText] = useState(initialWords);
  const [wpm, setWpm] = useState("Calculating...");
  const [accuracy, setAccuracy] = useState("Calculating...");

  const inputRef = useRef(null);

  // leverage useEffect to get callback from state --> when state inputText is changed, it will trigger the useEffect to run
  useEffect(() => {
    if (typeof typingText[typingData.wordsTyped] !== "undefined") {
      const data = checkChars(
        inputText,
        typingText[typingData.wordsTyped],
        typingData,
        wordClass
      );

      if (data === null) {
        setInputText("");
      } else {
        setWpm(data.wpm);
        setAccuracy(data.accuracy);

        // handle the state changes here
        setTypingData(data.typeData);
        setWordClass(data.wordWithClass);

        if (data.completed) {
          setInputText("");
        }

        if (data.typingCompleted) {
          // we need to pause the game where it is, but not reset it. That is up to the user to decide.
          // create a useeffect that runs when sessionoverchanges
          setSessionOver(true);
        }
      }
    }

    // eslint-disable-next-line
  }, [inputText]);

  // important functions for the game
  const resetGame = () => {
    // also need to save the data etc.
    const newWords = generate(30, englishEasy);
    const newWordsWithClass = wordsWithClass(newWords);
    setInputText("");
    setTypingData({
      wordsTyped: 0,
      incorrectWords: 0,
      correctWords: 0,
      incorrectCharsTyped: 0,
      correctCharsTyped: 0,
    });
    setWordClass(newWordsWithClass);
    setTypingText(newWords);
    setSessionOver(false);
    // inputRef.current.focus();
  };

  const handleInputChange = (value) => {
    if (sessionOver !== true) {
      setInputText(value);
    }
  };

  const handleStartOver = () => {
    resetGame();
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="10" md="12 ml-auto mr-auto">
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Accuracy</h5>
                    <CardTitle tag="h2">{accuracy}%</CardTitle>
                  </Col>
                  <Col className="text-right" sm="6">
                    <h5 className="card-category">WPM</h5>
                    <CardTitle tag="h2">{wpm}</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {typingText.map((word, index) => {
                  return (
                    <Badge color={wordClass[index]}>
                      <p
                        style={{
                          color: "white",
                          textTransform: "none",
                          marginBottom: "0px",
                        }}
                        key={index}
                        wordnr={index}
                        className={`h2`}
                      >
                        {word}
                      </p>
                    </Badge>
                  );
                  // end component 1
                })}
              </CardBody>
            </Card>
          </Col>

          {/* input form start */}
          <Col xs="12">
            <Row className="justify-content-center">
              <Col lg="9" md="11" sm="10">
                <FormGroup>
                  <Input
                    value={inputText}
                    type="textarea"
                    name="text"
                    id="input"
                    style={{ fontSize: "28px", fontWeight: "bold" }}
                    ref={inputRef}
                    autoFocus
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg="1" md="1" sm="1">
                <Button
                  className="btn-round btn-icon"
                  color="primary"
                  onClick={() => handleStartOver()}
                  size="lg"
                >
                  <i
                    className="tim-icons icon-refresh-02"
                    style={{ fontSize: "20px" }}
                  />
                </Button>
              </Col>
            </Row>
          </Col>

          {/* input form end */}

          <TypingInfoCard
            cardName="Correct words"
            cardData={typingData.correctWords}
            colorType="success"
            iconName="icon-check-2"
          />
          <TypingInfoCard
            cardName="Correct characters"
            cardData={typingData.correctCharsTyped}
            colorType="success"
            iconName="icon-user-run"
          />
          <TypingInfoCard
            cardName="Incorrect words"
            cardData={typingData.incorrectWords}
            colorType="danger"
            iconName="icon-simple-remove"
          />
          <TypingInfoCard
            cardName="Incorrect characters"
            cardData={typingData.incorrectCharsTyped}
            colorType="danger"
            iconName="icon-alert-circle-exc"
          />

          {/* main performance chart start */}
          <PerformanceChart />
          {/* main performance chart ends here */}

          {/* 3 charts start here */}
          <TypingCharts
            title="WPM over time"
            numbers="697,215"
            chartExample={chartExample2}
            isLine={true}
          />
          <TypingCharts
            title="WPM over time"
            numbers="697,215"
            chartExample={chartExample3}
            isLine={false}
          />
          <TypingCharts
            title="WPM over time"
            numbers="697,215"
            chartExample={chartExample4}
            isLine={true}
          />

          {/* 3 charts ends here */}
          <Leaderboard />
        </Row>
      </div>
    </>
  );
};

export default TypingPractice;
