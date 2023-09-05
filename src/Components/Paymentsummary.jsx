

import { useDispatch, useSelector } from "react-redux"

const Paymentsummary = () => {
  const order=useSelector((state)=>state.order)
  const dispatch=useDispatch()
  const Details=order.details
  const expense=useSelector((state)=>state.expense)
  const tip=expense.delivery.tip
  const delivery=expense.delivery.deliveryamount
  const gst=expense.GST
 const extracharges=tip+delivery

  const counter=Object.keys(Details).length
  const remaining=Details ? Object.keys(Details).reduce((prev,curr)=> prev+parseFloat(Details[curr].billpaid),0) : 0
 let totalremaining=parseFloat((((expense.NetBill/100)*gst+extracharges + expense.NetBill) - remaining).toFixed(2))
 if(totalremaining <= -1 ){
  totalremaining=0
 }

  
 
    
  const handlebill=(e)=>{
    const name=[e.target.name]
    const bill=parseFloat(e.target.value)
 
    dispatch({type:"payment", name,bill})
 console.log("rem",totalremaining)
 console.log('paid',bill)
    
    if(remaining >= totalremaining){
      const charges=extracharges/counter
      dispatch({type:"totalpayment", name,bill,gst,charges})
    }
    
   }




  

  return (
    <div className="w-full flex justify-center my-7 py-7">
      <div className="flex flex-col items-center justify-around my-7 py-5">
        <h1 className="text-3xl text-black font-bold underline">
          Payment Summary
        </h1>
        <div className="my-7 w-auto">
          <div className="relative w-auto">
            <table className="w-full text-xl text-center text-black-300 bg-white">
              <thead className="">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Member
                  </th>
            
                  <th scope="col" className="px-6 py-3">
                    Bill
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paid
                  </th>
                
                  <th scope="col" className="px-6 py-3">
                    Remaining
                  </th>
                </tr>
              </thead>

              <tbody>

                {Details && Object.keys(Details).map((member)=>(
                    <tr className="bg-white text-lg  mx-auto text-center text-gray-700" key={member}>
                    <th
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap text-xl"
                    >
                      {member}
                    </th>
                    <td className="px-6 py-4"> ${ ((Details[member].bill/100)*gst + extracharges/Object.keys(Details).length +Details[member].bill).toFixed(2) } </td>
                    
                    <td className="px-6 py-4">
                      <input name={member} className="bg-green-100 p-2" type="number" min="0" value={Details[member].billpaid}
                      onChange={handlebill}
                      />
                    </td>
                 
                    <td className={`px-6 py-4 ${(Details[member].bill/100*gst + extracharges/Object.keys(Details).length +Details[member].bill-Details[member].billpaid).toFixed(2) <= 0 ? 'text-green-500' : 'text-red-600'}`}> 
          
                    $ {  (Math.abs((((Details[member].bill/100)*gst)+extracharges/Object.keys(Details).length + Details[member].bill-Details[member].billpaid).toFixed(2)))} </td>
                  </tr>
  

                ))}

            

                <tr className="bg-white text-lg  mx-auto text-center text-black-300">
                  <th
                    scope="row"
                    className="px-6 py-4 whitespace-nowrap text-xl"
                  >
                    Amount:
                  </th>
                  <td className="px-6 py-4"></td>
                  
                  <td className="px-6 py-4"></td>
                  
                  <td className={`px-6 py-4  ${(totalremaining) > 0 ? "text-red-500":"text-green-500"}`}> Remaining: $ { (totalremaining) }</td>
               
                  
            
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Paymentsummary