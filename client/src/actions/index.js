import { FETCH_USER, FETCH_SURVEYS } from "./types";
import axios from "axios";
//only one expression
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// handling payments from stripe
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get("/api/current_user").then(res =>
//       dispatch({
//         type: FETCH_USER,
//         payload: res
//       })
//     );
//   };
// };

export const submitNewSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
