import { SHOPCART_ACTIONS_TYPES ,} from "../actions/types";
import { shopCartActions } from "../actions/shopCartAction";

const shopCartReducer = (state = [], action:shopCartActions) => {
  switch (action.type) {

    case SHOPCART_ACTIONS_TYPES.FETCH_SHOPCART:
      return action.payload;
    case SHOPCART_ACTIONS_TYPES.ADD_SHOPCART:
      if (state === null) {
        state = [];
      }
      return [...state, action.payload];
    case SHOPCART_ACTIONS_TYPES.DELETE_SHOPCART:
      // implement filter in action
      return action.payload;

    default:
      return state;
  }
};
export default shopCartReducer;
