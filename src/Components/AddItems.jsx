import { useState } from "react";
import Addmenu from "./Addmenu";
import Addmembers from "./Addmembers";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";

const AddItems = ({ index }) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items);
  const [menudropdown, setmenudropdown] = useState(false);
  const [memberdropdown, setmemberdropdown] = useState(false);
  const list = useSelector((state) => state.list);
  const memberlist =list.members
  const menulist=list.menu
  const [showaddmenu,setshowaddmenu]=useState(false)
  const [showaddmember,setshowaddmember]=useState(false)
  const currItem = item.items[index];

  const handledelete = () => {
    dispatch({ type: "delItem", index });
  };

  const handledata = (e) => {
    const update = {
      [e.target.name]: e.target.value,
    };
    dispatch({
      type: "updatevalue",

      index,
      update,
    });
    setmenudropdown(() => false);
    setmemberdropdown(()=>false)
  };

  const handledropdown = (menu, name) => {
    handledata({ target: { name: name, value: menu } });
    
  };

  return (
    <div className={`flex flex-col md:flex-row wrap p-3 ${showaddmenu ? 'opacity-5':""}`}>
      <div className="flex flex-col px-3 ">
        <label className="-mb-2 z-[1] text-gray-500 mx-2 w-fit px-2 bg-white  ">
          Menu Items *
        </label>

        <input
          required
          name="menu"
          id={`menu`}
          className="rounded-lg py-1 px-3 border-2 sm:w-[200px] cursor-pointer w-full"
          value={currItem.menu}
          onChange={handledata}
          onClick={() => {
            setmenudropdown(()=>true);

           
          }}

          readOnly
          
        />

        {menudropdown && (
          <div className={`flex flex-col items-start justify-between cursor-pointer text-gray-400 border-2 bg-white absolute z-20 w-[200px] mt-[50px] ${menudropdown ? '' : 'hidden' }`}
          onMouseLeave={()=>setmenudropdown(()=>false)}
          >
            {menulist.map((menu, i) => (
              <div
                key={i}
                name="menu"
                className="text-xl p-2 hover:text-green-400"
                onClick={() => handledropdown(menu, "menu")}
              >
                {menu}{" "}
              </div>
            ))}
            <button className="text-sm underline p-2 text-blue-400" onClick={()=>setshowaddmenu(true)}>
              Add Menu
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col px-3 ">
        <label className="-mb-2 z-[1] text-gray-500 mx-2 w-fit px-2 bg-white  ">
          Amount *
        </label>
        <input
          required
          name="amount"
          type="number"
          id={`amount`}
          className="rounded-lg py-1 px-3 border-2 sm:w-[200px] w-full"
          value={currItem.amount}
          onChange={handledata}
        />
      </div>

      <div className="flex flex-col px-3 relative">
        <label className="-mb-2 z-[1] text-gray-500 mx-2 w-fit px-2 bg-white  ">
          Member Name *
        </label>
        <input
          required
          name="member"
          id={`member`}
          className="rounded-lg py-1 px-3 border-2 sm:w-[200px] w-full cursor-pointer"
          value={currItem.member}
          onChange={handledata}
          onClick={() => {
            setmemberdropdown(true);
          }}
        readOnly
        />

        {memberdropdown && (
          <div className={`flex flex-col items-start justify-between  text-gray-400 border-2 bg-white absolute z-20 cursor-pointer w-[200px] mt-[50px] ${memberdropdown ? '' : 'hidden' }`}
          onMouseLeave={()=>setmemberdropdown(false)}
          
          >
            {memberlist.map((member, i) => (
              <div
                key={i}
                name="member"
                className="text-xl p-2 hover:text-green-400"
                onClick={() => handledropdown(member, "member")}
              >
              {member}
              </div>
            ))}
           <button className="text-sm underline p-2 text-blue-400" onClick={()=>setshowaddmember(true)}>
              Add Member
            </button>
          </div>
        )}
      </div>

      <div className="my-5 px-3">
        <button onClick={handledelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      {showaddmember && createPortal(<Addmembers setshowaddmember={setshowaddmember}/> , document.getElementById('addmember'))}
      {showaddmenu && createPortal(<Addmenu setshowaddmenu={setshowaddmenu}/> , document.getElementById('addmenu'))}
    </div>
  );
};

export default AddItems;
