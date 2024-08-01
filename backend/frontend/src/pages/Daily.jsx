import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import "./styles/Calendar.css";
import Daily_card from "../components/Daily_card";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Calender from "../components/Calender";
import moment from "moment";

const Income = () => {
  const [addExp, setaddExp] = useState(false);
  const [isExp, setIsExp] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().utc().toDate());
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalAmt,setTotalAmt]=useState(0)
  
  const [itemsPerPage,setItemsPerPage]=useState(5)
  

  const handleExpense = async () => {
    try {
      if (title === "" || amount === "") {
        alert("All Fields are Mandatory");
        return;
      }
      setaddExp(false);
      const userToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5500/expense/add",
        {
          category: category,
          amount: amount,
          title: title,
          description: details,
          date: selectedDate,
        },
        { headers: { Authorization: userToken } }
      );
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5500/expense/delete/${id}`,
        {},
        {
          headers: { Authorization: userToken },
        }
      );
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemsCount=(e)=>{
    const items=parseInt(e.target.value)
    setItemsPerPage(parseInt(items))
    console.log("value is ",items)
   
    
    setCurrPage(1)
  }

  const fetchExpenses = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5500/expense/all",
        {
          date: selectedDate,
          limit: itemsPerPage,
          page: currPage,
        },
        {
          headers: { Authorization: userToken },
        }
      );
      if (res.data?.expenses) {
        setData(res.data.expenses);
      }
      setTotalpages(Math.ceil(res.data.total / itemsPerPage));
      if(res?.data?.totalAmount)setTotalAmt(res.data.totalAmount)
      else setTotalAmt(0)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("perpage")
    localStorage.setItem("perpage",itemsPerPage)
    fetchExpenses();
    console.log("The current date is ", selectedDate);
  }, [selectedDate, currPage,itemsPerPage]);

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-2 justify-center items-center hide-scrollbar">
      {/*showCal?<Calender onClick={()=>setShowCal(!showCal)}/>:<span className="text-black p-2" onClick={()=>setShowCal(!showCal)}>Choose Date</span>*/}
      <div className="flex justify-between items-center p-2 w-full">
        <div className="flex justify-center items-center w-[90%]">
        <Calender
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        </div>
        
        <div class="xs:p-1 sm:p-4 flex items-center gap-2 justify-between">
          <span className="text-[12px]">Rows Per Page</span>
          <select class="bg-white border border-gray-300 text-gray-700 py-1 px-1  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 xs:text-[12px] sm:text-[16px]" onChange={handleItemsCount}>
            <option value="5" >5</option>
            <option value="10" >10</option>
            <option value="15" >15</option>
            <option value="20"  >20</option>
            <option value="25" >25</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4 py-4 gap-4">
        <div className="w-full flex justify-between bg-slate-300">
          <span className="m-1 text-black xs:text-[14px] sm:text-[18px]">
            Total Expense:
          </span>
          <span className="m-1 text-black xs:text-[14px] text-[18px]">
            ${totalAmt}
          </span>
        </div>
        {data &&
          data?.map((expense) => {
            return (
              <div className="w-full flex justify-between ">
                <Daily_card
                  title={expense.title}
                  description={expense.description}
                />

                <div className="flex gap-5 items-center">
                  <span className="mx-2 text-black xs:text-[12px] sm:text-[15px]">
                    ${expense.amount}
                  </span>
                  <DeleteOutlineIcon
                    fontSize="5"
                    style={{ marginLeft: "8px", marginRight: "8px" }}
                    onClick={() => handleDelete(expense.id)}
                  />
                </div>
              </div>
            );
          })}
        {}
      </div>
      {addExp && (
        <div className="hide-scrollbar max-w-[90%] md:w-[50%] lg:w-[30%] rounded-lg shadow-lg bg-white p-6 mx-auto  relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setaddExp(false)}
          >
            &times;
          </button>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-around p-3 border-b">
              <div>
                <span
                  className={`px-3 py-1 border-b-2 ${
                    isExp
                      ? "border-cyan-500 text-cyan-500"
                      : "border-transparent text-gray-500"
                  } cursor-pointer`}
                  onClick={() => setIsExp(true)}
                >
                  Expense
                </span>
              </div>
              <div>
                <span
                  className={`px-3 py-1 border-b-2 ${
                    !isExp
                      ? "border-cyan-500 text-cyan-500"
                      : "border-transparent text-gray-500"
                  } cursor-pointer`}
                  onClick={() => setIsExp(false)}
                >
                  Income
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-4">
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">Title</span>
                <input
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">
                  Details
                </span>
                <input
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">
                  Amount
                </span>
                <input
                  type="number"
                  min="0"
                  step={1}
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <span className="w-[25%] text-[14px] text-gray-700">
                  Category
                </span>
                <select
                  className="flex-1 outline-none p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                </select>
              </div>
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-cyan-500 text-white px-4 py-2 rounded-md"
                onClick={handleExpense}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {!addExp && (
        <button
          className="w-fit h-fit bg-cyan-300 flex items-center justify-center xs:p-[2px]  sm:p-[3px] text-white xs:text-[12px] sm:text-[14px]"
          onClick={() => setaddExp(true)}
        >
          Add Expense
        </button>
      )}
      <div className="w-full flex justify-between items-center">
        <button
          className={`m-5 p-[4px] text-[14px] rounded-sm ${
            currPage > 1 ? "bg-black" : "bg-slate-400"
          }  text-white`}
          onClick={() => {
            if (currPage > 1) {
              setCurrPage(currPage - 1);
            }
          }}
        >
          Prev
        </button>
        <button
          className={`m-5 p-[4px] text-[14px] rounded-sm ${
            currPage < totalPages ? "bg-black" : "bg-slate-400"
          } text-white`}
          onClick={() => {
            if (currPage < totalPages) {
              setCurrPage(currPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Income;
