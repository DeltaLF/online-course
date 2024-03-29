import { STUDENT_ACTIONS_TYPES, SpecialOfferType } from "../actions/types";
import { SpecialOfferAction } from "../actions/specialOfferAction";

const specialOfferReducer = (
  state: SpecialOfferType = {},
  action: SpecialOfferAction
) => {
  switch (action.type) {
    case STUDENT_ACTIONS_TYPES.CHECK_NEWSTUDENT:
      // a redundant variable: remainTime is to keep the componentDidMount lifeCycle going
      return {
        firstVisited: action.payload,
        remainTime: parseInt(action.payload) - Date.now(),
      } as SpecialOfferType;
    default:
      return state;
  }
};

export default specialOfferReducer;
