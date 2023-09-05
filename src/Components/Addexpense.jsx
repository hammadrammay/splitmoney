import { useDispatch, useSelector } from "react-redux";
import AddItems from "./AddItems";
import Orderdetails from "./Orderdetails";
import { useState } from "react";
import ExpenseCalcuation from "./ExpenseCalcuation";
import ReactDOM from "react-dom";

const Addexpense = () => {
  const { items } = useSelector((state) => state.items);
  const [showexpense, setshowexpense] = useState(false);
  const [showorderdetails, setshoworderdetails] = useState(false);
  const values = useSelector((state) => state.items);
  const data = values.items;
  const [netamount, setnetamount] = useState(0);

  const dispatch = useDispatch();

  const handleitems = () => {
    dispatch({
      type: "addItem",
      payload: { menu: "", amount: "", member: "" },
    });
  };

  const getdata = (data) => {
    const memberdetail = [];

    data.forEach((item) => {
      const member = item.member.trim().toUpperCase();
      const menu = item.menu.trim().toUpperCase();
      const amount = parseFloat(item.amount);
      if (member in memberdetail) {
        memberdetail[member].order.push({ menu, bill: amount });
        memberdetail[member].bill += amount;
      } else {
        memberdetail[member] = {
          order: [{ menu, bill: amount }],
          bill: amount,
          billpaid: 0,
        };
      }
    });

    return memberdetail;
  };

  const calculatenetamount = (data) => {
    let res = 0;
    data.forEach((item) => {
      res += parseFloat(item.amount);
    });

    return res;
  };

  const handledata = () => {
    const details = getdata(data);
    dispatch({ type: "orderDetails", details });
    setshoworderdetails(true);
    const res = calculatenetamount(data);
    setnetamount(res);
  };

  return (
    <>
      <div
        className={`flex justify-center w-full sm:p-2 md:p-5 flex-col items-center ${
          showexpense ? "opacity-[50%]" : "opacity-[100%]"
        }`}
      >
        <div className="flex flex-col items-center m-3  w-auto  border  shadow p-7">
          {items.map((_, index) => (
            <AddItems key={index} index={index} />
          ))}

          <div className="px-7 pb-5">
            <button
              className="bg-blue-700 text-white p-2 rounded-3xl"
              onClick={handleitems}
            >
              <span className="text-lg pl-1"> + </span>
              <span className="text-sm px-1">ADD ITEM </span>
            </button>
          </div>

          <div className="border-t border-black-400"></div>

          <div className="my-1 flex sm:flex-row flex-col justify-around w-auto">
            <div className="my-1 mx-2 ">           
             <button
              className="bg-blue-700 text-white p-2 rounded"
              onClick={handledata}
            >
              ADD EXPENSE
            </button>
            </div>

            <div className="my-1 mx-2">
              {showorderdetails && `Total Amount :  $${netamount}`}
            </div>

            <div className="my-1 mx-2">
              <button
                className="bg-blue-700 text-white p-2 rounded"
                onClick={() => setshowexpense(!showexpense)}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>

        {showexpense &&
          ReactDOM.createPortal(
            <ExpenseCalcuation />,
            document.getElementById("expense")
          )}
      </div>
      <div
        className={`mt-3 ${showexpense ? "opacity-[50%]" : "opacity-[100%]"}`}
      >
        {" "}
        {showorderdetails && <Orderdetails />}
      </div>
    </>
  );
};

export default Addexpense;
