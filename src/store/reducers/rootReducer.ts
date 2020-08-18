import { combineReducers } from "redux";
import userAndAuthReducer from "./userAndAuthReducer";

const rootReducer = combineReducers({ testReducer: userAndAuthReducer });
export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
