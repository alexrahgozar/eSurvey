import axios from "axios";
import { FETCH_USER } from "./types";

//only one expression
export const fetchUser = () => async dispatch => {
  console.log("here");
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
