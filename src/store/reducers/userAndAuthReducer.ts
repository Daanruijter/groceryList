import { TEST_ACTION } from "../actions/userAndAuthTypes";
import { TEST_ACTION2 } from "../actions/userAndAuthTypes";
import { GroceryActionTypes } from "../actions/userAndAuthActionTSTypes";

import { actionInterfaces } from "../actions/actionInterfaces";

const initialState: actionInterfaces = {
  test1: "",
  test2: "",
};

const reducer = (
  state = initialState,
  action: GroceryActionTypes
): actionInterfaces => {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        test1: "",
      };
    case TEST_ACTION2:
      return {
        ...state,
        test2: "",
      };

    default:
      return state;
  }
};
export default reducer;
