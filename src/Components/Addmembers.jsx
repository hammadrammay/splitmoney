import { useDispatch } from "react-redux";

const Addmembers = ({setshowaddmember}) => {
  const dispatch = useDispatch();



  const handleinput = () => {
    const data = document.getElementById('menu').value
    dispatch({ type: "addmembers", data });
    setshowaddmember(false)
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20 cursor-pointer"
   
    >
      <div className="w-400 bg-white flex flex-col items-center p-5 text-gray-500 bg-silver-400 my-7 h-700 border-2 ">
        <h1 className="font-bold text-xl my-2">Add Member</h1>
        <input
          placeholder="Enter the menu"
          name="menu"
          className="border-2 px-2 my-3"
          id="menu"
        />
        <button className="bg-blue-700  px-7 rounded text-white py-2 m-2" onClick={handleinput}> ADD</button>
      </div>
    </div>
  );
};

export default Addmembers;
