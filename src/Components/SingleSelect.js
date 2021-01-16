import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";

export default function SingleSelect() {
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const { surveyId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const addQuestion = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };

  const publish = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "single",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };

  const setOptionValue = (val, idx) => {
    options[idx] = val;
    setOptions([...options]);
  };

  const isQuestionBtnDisable = () => {
    return (
      question.trim().length < 1 ||
      options.filter((opt) => opt.trim().length < 1).length > 0
    );
  };

  return (
    <div className="question-main">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <strong>?</strong>
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Type question here"
          value={question}
          autoFocus
          onChange={(e) => setQuestion(e.target.value)}
        />
      </InputGroup>
      <label className="option-txt">Options</label>
      <InputGroup className="ig">
        <Input
          placeholder="Type option here"
          value={options[0]}
          onChange={(e) => setOptionValue(e.target.value, 0)}
        />
        <InputGroupAddon addonType="append">
          <Button disabled={true}>
            <strong>+</strong>
          </Button>
          <Button disabled={true}>
            <strong>-</strong>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="ig">
        <Input
          placeholder="Type option here"
          value={options[1]}
          onChange={(e) => setOptionValue(e.target.value, 1)}
        />
        <InputGroupAddon addonType="append">
          <Button disabled={true}>
            <strong>+</strong>
          </Button>
          <Button disabled={true}>
            <strong>-</strong>
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <div className="question-btn">
        <Button
          className="survey-main-btn"
          disabled={isQuestionBtnDisable()}
          onClick={addQuestion}
        >
          Add Question
        </Button>
        <Button
          className="survey-main-btn"
          disabled={isQuestionBtnDisable()}
          onClick={publish}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
