import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlice";

export default function Confirm() {
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const survey = useSelector((globalStore) =>
    globalStore.surveys.find((s) => s.surveyId === surveyId)
  );

  const publishSurvey = () => {
    dispatch(surveySlice.actions.markPublished({ surveyId }));
    history.push("/");
  };

  return (
    <div className="questions">
      {survey.questions.map((q, idx) => (
        <div className="question-section">
          <h4>{`Q${idx + 1}. ${q.question}`}</h4>
          {q.type === "single" ? (
            <>
              <input type="radio" />
              <label>{q.options[0]}</label>
              <input type="radio" />
              <label>{q.options[1]}</label>
            </>
          ) : (
            <>
              <input type="checkbox" />
              <label>{q.options[0]}</label>
              <input type="checkbox" />
              <label>{q.options[1]}</label>
              <input type="checkbox" />
              <label>{q.options[2]}</label>
              <input type="checkbox" />
              <label>{q.options[3]}</label>
            </>
          )}
          <hr />
        </div>
      ))}
      <Button className="survey-main-btn" onClick={publishSurvey}>
        Confirm Survey
      </Button>
    </div>
  );
}
