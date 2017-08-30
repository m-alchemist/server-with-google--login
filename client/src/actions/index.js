import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current-user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/payment", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const submitSurvey = (values, history) => async dispatch => {
  console.log(values);
  const res = await axios.post("/api/surveys", values);
  await dispatch({ type: FETCH_USER, payload: res.data });
  history.push("/surveys");
};
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  await dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
