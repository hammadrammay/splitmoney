import { useSelector } from "react-redux";

const Orderdetails = () => {
  const order = useSelector((state) => state.order);
  const Details = order.details;

  return (
    <>
      <div className="flex flex-wrap justify-center ">
        {Object.keys(Details).map((member) => (
          <div className="flex flex-col items-center m-2 border w-[200px]" key={member}>
            <div className="mt-2 p-2">{member}</div>
            <div className="border-t my-2 border-black-200 border-2 w-[100%]"></div>
            {Details[member].order.map((item, i) => (
              <div
                className="flex p-3 flex-row justify-between w-[100%] text-gray-700"
                key={i}
              >
                <div>$ {item.menu}</div>
                <div>$ {item.bill}</div>
              </div>
            ))}
            <div className="border-t my-2 border-black-200 border-2 w-[100%]"></div>
            <div className="flex p-3 flex-row justify-between w-[100%]">
              <div>Total Bill</div>
              <div>$ {Details[member].bill}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orderdetails;
