
const initialstate={ 
    

   menu:[
    'Biryani',
    'Pizza',
    'Berger',
    'Fries',
    'ColdDrink',
    'Sandwich'
   ],

   members:[

   
    'Ali',
    'Imran',
    'Josh',
    'John',
    'Adil'

   ]
   }


export const listreducer=(state=initialstate , action)=>{

    switch (action.type) {
     
        case 'addmenu':
          return {
            ...state,
           
            menu: [...state.menu,action.data]
          };
        case 'addmembers':
          return {
            ...state,
          
            members : [...state.members,action.data]
          };
    
        default:
          return state;
      }
}

