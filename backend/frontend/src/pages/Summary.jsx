import React, { useEffect, useRef, useState } from "react";
import html2Canvas from "html2canvas";
import jsPdf from "jspdf";
import axios from "axios";
import moment from "moment";
import Detail_Box from "../components/Detail_Box";

const ExpenseTable = () => {
  const [isPremium, setPremium] = useState(false);
  const [monthlyStats, setMonthlyStats] = useState({});
  const [yearlyStats, setYearlyStats] = useState([]);

  const tableRef1 = useRef();
  const tableRef2 = useRef();

  const downLoad1 = () => {
    const input = tableRef1.current;
    html2Canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`monthly_expenses.pdf`);
    });
  };

  const downLoad2 = () => {
    const input = tableRef2.current;
    html2Canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`yearly_expenses.pdf`);
    });
  };

  const getStats = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5500/expense/getStat", {
        headers: { Authorization: userToken },
      });
      setMonthlyStats(res.data.Montlyexpenses);
      setYearlyStats(res.data.Yearlyexpenses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const premiumUser = localStorage.getItem("premium");
    if (premiumUser) setPremium(true);
    getStats();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={tableRef1}  className="w-[50%] flex   p-2  flex-col items-center justify-center">
        <h2 className="p-2 xs:text-[13px] sm:text-[15px] font-semibold text-center">
          Monthly Expense Summary
        </h2>
        <table  className="w-full flex flex-col items-center justify-center">
          {Object.entries(monthlyStats).map(([month, expenses]) => (
            <div key={month} className="w-full flex flex-col items-center justify-center mb-4">
              <span className="text-center xs:text=[8px] sm:text-[14px] m-1  font-semibold">{month}</span>
              <Detail_Box expenses={expenses} />
            </div>
          ))}
        </table>
        {isPremium && (
          <button
            className="p-[2px] my-2 xs:text-[12px] sm:text-[15px] bg-green-500 text-white"
            onClick={downLoad1}
          >
            Download
          </button>
        )}
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center p-2">
        <h2 className="p-2 xs:text-[13px] sm:text-[15px] font-semibold">
          Yearly Expense Summary
        </h2>
        <table ref={tableRef2} className="w-full border-collapse table-auto">
          <thead className="w-full">
            <tr className="bg-gray-200 w-full">
              <th className="p-2 border text-black bg-cyan-300 text-center xs:text-[13px] sm:text-[15px]">
                Month
              </th>
              <th className="p-2 border text-black bg-cyan-300 text-center xs:text-[13px] sm:text-[15px]">
                Expenses
              </th>
            </tr>
          </thead>
          <tbody>
            {yearlyStats.map((expense) => {
              const monthYear = moment(expense.month, "YYYY-MM");
              const monthName = monthYear.format("MMMM");
              const year = monthYear.format("YYYY");
              return (
                <tr key={expense.month} className="even:bg-gray-100 w-full">
                  <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">
                    {monthName} {year}
                  </td>
                  <td className="p-2 border text-center xs:text-[10px] sm:text-[13px]">
                    {expense.totalAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isPremium && (
          <button
            className="p-[2px] my-2 xs:text-[12px] sm:text-[15px] bg-green-500 text-white"
            onClick={downLoad2}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;
