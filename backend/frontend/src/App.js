import { useEffect, useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar";
import SignIn from "./pages/Signin";
import Main from "./pages/Daily";
import SignUp from "./pages/SignUp";
import {Routes,Route} from "react-router-dom"
import Monthly from "./pages/Monthly";
import Yearly from "./pages/Yearly";
import Payment_form from "./components/Payment_form";
import Stats_Page from "./pages/Stats_Page";
import Resend_Form from "./components/Resend_Form ";
import Summary from "./pages/Summary";
import Not_Found from "./pages/Not_Found";
function App() {
  const [isAuth,setIsAuth]=useState(false)
  const [isPremium,setPremium]=useState(false)
  useEffect(()=>{
   const userToken=localStorage.getItem("token")
   if(userToken)setIsAuth(true)
  },[])
  return (
    <div className="flex flex-col min-h-screen hide-scrollbar">
      {isAuth ? (
        <>
          <Navbar isPremium={isPremium} setPremium={setPremium} />
          <div className="flex-grow m-2 w-auto h-full bg-slate-100">
            <Routes>
              <Route path="/daily" element={<Main />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/yearly" element={<Yearly />} />
              <Route path="/premium" element={<Payment_form  isPremium={isPremium} setPremium={setPremium}/> } />
              <Route path="/stats" element={<Stats_Page/>} />
              <Route path="/summary"  element={<Summary/>}  />
               
           <Route path="*" element={<Not_Found/>} />

            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<SignUp setIsAuth={setIsAuth} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot" element={<Resend_Form />} />
         
         <Route path="*" element={<Not_Found/>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
