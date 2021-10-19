import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import mushroom from "./mushroom/reducer";
import observations from "./observations/reducer";
export default combineReducers({
  appState,
  user,
  mushroom,
  observations,
});
