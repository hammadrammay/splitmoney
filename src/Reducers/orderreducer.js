const initialstate = {
  details: [],
};

export const orderreducer = (state = initialstate, action) => {
  switch (action.type) {
    case "orderDetails":
      return {
        ...state,

        details: action.details,
      };
    case "payment":
      return {
        ...state,

        details: {
          ...state.details,
          [action.name]: {
            ...state.details[action.name],
            billpaid: parseFloat(action.bill),
          },
        },
      };

    case "totalpayment":
      const newdetails = {...state.details};

      Object.keys(newdetails).map((member) => {
        if (
          newdetails[member] !== action.name &&
          parseFloat(newdetails[member].billpaid) === 0
        ) {
          const totalbilltobepaid =
            parseFloat((newdetails[member].bill / 100) * action.gst +
            newdetails[member].bill +
            action.charges).toFixed(2)
            
          newdetails[member]={...newdetails[member], billpaid:parseFloat(totalbilltobepaid) } 
        }
      });

      return { ...state, details: newdetails };

    default:
      return state;
  }
};
