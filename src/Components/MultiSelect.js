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

export default function MultiSelect() {
  const { surveyId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");

  const addQuestion = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };
  const publish = () => {
    const payload = {
      options,
      question,
      surveyId,
      type: "multiple",
    };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/confirm/" + surveyId);
  };

  const addOne = (idx) => {
    options.splice(idx, 0, "");
    setOptions([...options]);
  };
  const deleteOne = (idx) => {
    options.splice(idx, 1);
    setOptions([...options]);
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
      {options.map((option, idx) => {
        return (
          <InputGroup key={idx} className="ig">
            <Input
              placeholder={`Option ${idx + 1}`}
              value={option}
              onChange={(e) => setOptionValue(e.target.value, idx)}
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={() => addOne(idx + 1)}
                disabled={options.length === 4}
              >
                <strong>+</strong>
              </Button>
              <Button
                onClick={() => deleteOne(idx)}
                disabled={options.length === 1}
              >
                <strong>-</strong>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        );
      })}
      {options.length === 4 && (
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
      )}
    </div>
  );
}
