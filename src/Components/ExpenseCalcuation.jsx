import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ExpenseCalcuation = () => {
  const [menuitemsarray, setmenuitemsarray] = useState([]);
  const values = useSelector((state) => state.items);
  const data = values.items;
  const expense = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  

  const handleGST = (e) => {
    const GST = parseFloat(e.target.value);
    dispatch({ type: "GSTValue", GST });
  };

  const handledelivery = (e) => {
    const updatevalue = {
      [e.target.name]: parseFloat(e.target.value),
    };
    dispatch({ type: "addDeliveryChrages", updatevalue });
  };

  const getmenucountandtotal = (data) => {
    const menucount = {};
    let totalamount = 0;
    data.forEach((item) => {
      const { menu, amount } = item;
      const trimmedmenu = menu.trim().toUpperCase();

      if (trimmedmenu in menucount) {
        menucount[trimmedmenu]++;
      } else {
        menucount[trimmedmenu] = 1;
      }
      totalamount += parseFloat(amount);
    });

    return [menucount, totalamount];
  };



  useEffect(() => {
    const getexpense = getmenucountandtotal(data);

    const menuitems = getexpense[0];
    const NetBill=parseFloat(getexpense[1]);
    dispatch({type:'NetBill',NetBill});

    const menuitemsArray = Object.keys(menuitems).map((menu) => ({
      name: menu,
      count: menuitems[menu],
    }));
    setmenuitemsarray(() => menuitemsArray);
  
  }, [data,dispatch]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20">
      <div className="w-400 bg-white flex flex-col items-center p-5 text-gray-500 my-7 h-700 border-2 ">
        <h1 className="font-bold text-xl">Extra Charges</h1>

        {menuitemsarray &&
          menuitemsarray.map((item, i) => (
            <div className="flex w-[300px] justify-between mt-5" key={i}>
              <h1>{item.name}</h1>
              <h1>{item.count} </h1>
            </div>
          ))}

        <div className="m-5 flex ">
          <div className="flex flex-col">
            <label className="-mb-1 z-[1] text-gray-500 mx-2 w-fit px-2   bg-white rounded-lg">
              Delivery
            </label>
            <input
              name="deliveryamount"
              className="w-[150px] mx-2 text-xl px-2 border bg-green-100"
              type="number"
              value={expense.delivery.deliveryamount}
              onChange={handledelivery}
            />
          </div>
          <div className="flex flex-col">
            <label className="-mb-1 z-[1] text-gray-500 mx-2 w-fit px-2 bg-white  rounded-lg ">
              Tip
            </label>
            <input
              name="tip"
              className="w-[150px] mx-2 text-xl px-2 border bg-green-100"
              type="number"
              value={expense.delivery.tip}
              onChange={handledelivery}
            />
          </div>
        </div>

        <div className="flex flex-col items-start w-full px-2">
          <div className="">
            <h1>GST (TAX)</h1>
          </div>
          <div className="flex m-1">
            <div className="px-2">
              <input type="radio" name="gst" value="16" onChange={handleGST} />
              <label> 16% </label>
            </div>

            <div className="px-2">
              <input type="radio" name="gst" value="5" onChange={handleGST} />
              <label> 5% </label>
            </div>
            <div className="px-2">
              <input type="radio" name="gst" value="0" onChange={handleGST} />
              <label> none </label>
            </div>
          </div>
        </div>

        <div className="w-full  m-3 pt-5">
          <button className="bg-blue-700 w-full text-xl text-white p-1">
            Total
          </button>
        </div>

        <div className="flex w-[300px] justify-between my-2">
          <h1>Net Total</h1>
          <h1>$ {(expense.NetBill).toFixed(2)} </h1>
        </div>

        <div className="flex w-[300px] justify-between my-2">
          <h1>Extra Chrages</h1>
          <h1> $ {(expense.NetBill/100*expense.GST + expense.delivery.deliveryamount + expense.delivery.tip).toFixed(2)} </h1>
        </div>

        <div className="border-t my-2 border-black-200 border-2 w-[300px]"></div>

        <div className="flex w-[300px] justify-between my-2">
          <h1> Grand Total</h1>
          <h1>$ { (expense.NetBill/100*expense.GST + expense.delivery.deliveryamount + expense.delivery.tip + expense.NetBill).toFixed(2)}  </h1>
        </div>

        <div className="w-full flex justify-center mt-3 pt-5">
          <Link to="/order-summary">
          <button className=" text-xl text-green-700 border rounded-2 border-green-700 p-1 px-7">
            Generate Bill Summary
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCalcuation;
