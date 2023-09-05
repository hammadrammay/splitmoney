import { createStore , combineReducers } from "redux";


import { itemsreducer } from "./Reducers/itemsreducer";
import { expensereducer } from "./Reducers/expensereducer";
import { orderreducer } from "./Reducers/orderreducer";
import { listreducer } from "./Reducers/listreducer";

const reducer=combineReducers({list:listreducer
    ,items:itemsreducer , expense:expensereducer,
    order:orderreducer
})
 const Store = createStore(reducer)

export default Store;
