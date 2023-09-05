
import Home from "./Pages/Home"
import Ordersummary from "./Pages/Ordersummary"
import Billpayment from "./Pages/Billpayment";
import { Provider } from 'react-redux';
import Store from './Store';
import { Routes,Route } from "react-router";


function App() {
 

  return (
    <>
    <Provider store={Store}>
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/order-summary"  element={<Ordersummary />}/>
        <Route path="/payment"  element={<Billpayment />}/>
      </Routes>  
      </Provider>
    </>
  )
}

export default App
