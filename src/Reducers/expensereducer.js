const initialstate = {
  delivery: { deliveryamount: 0, tip: 0 },
  GST: 0,
  NetBill: 0,
};

export const expensereducer = (state = initialstate, action) => {
  switch (action.type) {
    case "addDeliveryChrages":
      return {
        ...state,

        delivery: { ...state.delivery, ...action.updatevalue },
      };

    case "GSTValue":
      return {
        ...state,
        GST: action.GST,
      };

    case "NetBill":
      return {
        ...state,
        NetBill: action.NetBill,
      };
    default:
      return state;
  }
};
