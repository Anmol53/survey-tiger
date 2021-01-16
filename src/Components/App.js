import logo from "./../images/logo.png";
import "./App.css";
import { Button } from "reactstrap";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import Confirm from "./Confirm";
import Survey from "./Survey";
import TakeSurvey from "./TakeSurvey";
import { useDispatch } from "react-redux";
import { createSurvey } from "./../store/surveySlice";
import { unwrapResult } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectToNewSurvey = () => {
    dispatch(createSurvey())
      .then(unwrapResult)
      .then((newSurveyId) => history.push("/create/" + newSurveyId));
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Switch>
        <Route path="/create/:surveyId">
          <CreateSurvey />
        </Route>
        <Route path="/confirm/:surveyId">
          <Confirm />
        </Route>
        <Route path="/take">
          <TakeSurvey />
        </Route>
        <Route path="/take-survey/:surveyId">
          <Survey />
        </Route>
        <Route path="/survey-success">
          <h2>Survey saved successfully</h2>
          <Button
            className="survey-main-btn"
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </Button>
        </Route>
        <Route path="/">
          <Link to="/create">
            <Button className="survey-main-btn" onClick={redirectToNewSurvey}>
              Create Survey
            </Button>
          </Link>
          <Link to="/take">
            <Button className="survey-main-btn">Take Survey</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
