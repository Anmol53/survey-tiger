import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { responseSlice } from "../store/responseSlice";
import { useDispatch } from "react-redux";
import "../index.css";

export default function Survey() {
  const [answers, setAnswer] = useState([]);
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const survey = useSelector((globalStore) =>
    globalStore.surveys.find((s) => s.surveyId === surveyId)
  );
  const SubmitSurvey = () => {
    dispatch(responseSlice.actions.userAnswer({ answers, surveyId }));
    history.push("/survey-success/");
  };

  const saveAnswer = (e, idx) => {
    const temp = [...answers];
    const type = survey.questions[idx].type;
    if (temp[idx] === null || temp[idx] === undefined) {
      temp[idx] = {
        type,
        ans: [],
      };
    }
    if (type === "single") {
      temp[idx].ans = [e.target.value];
    } else {
      if (e.target.checked) {
        temp[idx].ans.push(e.target.value);
      } else {
        temp[idx].ans = temp[idx].ans.filter((val) => val !== e.target.value);
      }
    }
    setAnswer(temp);
  };

  return (
    <div className="questions">
      {survey.questions.map((q, idx) => (
        <div
          className="question-section"
          key={idx}
          onChange={(e) => saveAnswer(e, idx)}
        >
          <h4>{`Q${idx + 1}. ${q.question}`}</h4>
          {q.type === "single" ? (
            <>
              <input type="radio" name={idx} value={0} />
              <label>{q.options[0]}</label>
              <input type="radio" name={idx} value={1} />
              <label>{q.options[1]}</label>
            </>
          ) : (
            <>
              <input type="checkbox" name={idx} value={0} />
              <label>{q.options[0]}</label>
              <input type="checkbox" name={idx} value={1} />
              <label>{q.options[1]}</label>
              <input type="checkbox" name={idx} value={2} />
              <label>{q.options[2]}</label>
              <input type="checkbox" name={idx} value={3} />
              <label>{q.options[3]}</label>
            </>
          )}
        </div>
      ))}
      <Button onClick={SubmitSurvey} className="survey-main-btn">
        Submit Survey
      </Button>
    </div>
  );
}
