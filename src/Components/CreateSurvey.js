import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MultiSelect from "./MultiSelect";
import SingleSelect from "./SingleSelect";

export default function CreateSurvey() {
  const { surveyId } = useParams();
  const query = useLocation().search;
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Select Question Type");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (query === "?clear=true") {
      setDropdownText("Select Question Type");
      history.push("/create/" + surveyId);
    }
  }, [query, history, surveyId]);

  return (
    <>
      <span>
        <strong>Survey ID: </strong> {surveyId}
      </span>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown">
        <DropdownToggle caret>{dropdownText}</DropdownToggle>
        <DropdownMenu className="dropdown-menu">
          <DropdownItem onClick={() => setDropdownText("Single Select")}>
            Single Select
          </DropdownItem>
          <DropdownItem onClick={() => setDropdownText("Multi-Select")}>
            Multi-Select
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {dropdownText === "Single Select" && <SingleSelect />}
      {dropdownText === "Multi-Select" && <MultiSelect />}
    </>
  );
}
