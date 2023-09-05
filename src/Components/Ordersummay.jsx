
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Ordersummay = () => {

  const Order=useSelector((state)=>state.order)
  const Details=Order.details

  

 
  const expense = useSelector((state) => state.expense);
  const delivery = expense.delivery.deliveryamount;
  const tip = expense.delivery.tip;
  const GST = expense.GST;


 


  return (
    <div className="w-full justify-center my-7 py-7 ">
      <div className="flex flex-col items-center justify-around my-7 py-5">
        <h1 className="text-3xl text-black font-bold underline">
          Order Summary
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
                    Order Items
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bill
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tip/Delivery
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tax
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Bills
                  </th>
                </tr>
              </thead>

              <tbody>
                {Details &&
                  Object.keys(Details).map((member) => (
                    <tr
                      className="bg-white text-lg  mx-auto text-center text-gray-700"
                      key={member}
                    >
                      <th scope="row" className="px-6 py-4 whitespace-nowrap">
                        {member}
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          {Details[member].order.map((order, i) => (
                            <h1 key={i}>
                              {" "}
                              {order.menu} : ${order.bill}
                            </h1>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">$ {Details[member].bill}</td>
                      <td className="px-6 py-4">
                        $ { ((tip + delivery )/ Object.keys(Details).length).toFixed(2) }
                      </td>
                      <td className="ll px-6 py-4">
                        $ {((Details[member].bill / 100) * GST).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        
                        $ {(Details[member].bill +  (Details[member].bill / 100) * GST + (tip + delivery )/ Object.keys(Details).length).toFixed(2)}
                      </td>
                    </tr>
                  ))}

                <tr className="bg-white text-lg  mx-auto text-center text-black-300">
                  <th
                    scope="row"
                    className="px-6 py-4 whitespace-nowrap text-xl"
                  >
                    Total Bills
                  </th>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 ">
                    ${" "}
                    {((expense.NetBill/100)*expense.GST +
                      expense.delivery.deliveryamount +
                      expense.delivery.tip +
                      expense.NetBill).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full   pt-5 flex justify-center">
          <Link to="/payment">
          <button className="bg-green-700 text-xl text-white px-7 py-4 rounded-lg">
            Pay Bill
          </button> </Link>
        </div>
      </div>
    </div>
  );
};

export default Ordersummay;
