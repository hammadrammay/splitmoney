const initialstate = {
  items: [],
};

export const itemsreducer = (state = initialstate, action) => {

  switch (action.type) {
    case "addItem":
      return {
        ...state,

        items: [...state.items, action.payload],
      };

    case "delItem":
      return {
        ...state,

        items: state.items.filter(
          (_, index) => index !== action.index
        ),
      };

    case "updatevalue":
      return {
        ...state,

        items: state.items.map((item,index)=>
          
          index===action.index ? {...item,
          ...action.update
          }: item
        ) 

      };


      
    default:
      return state;
  }
};
