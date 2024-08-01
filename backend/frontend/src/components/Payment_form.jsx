import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Payment_form = ({setPremium}) => {
    const [formData,setFormdata]=useState({
        txnid:"",
        amount: '100',
        productinfo: 'Premium',
        firstname: '',
        email: '',
        phone: ''
    })
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch("http://localhost:5500/payu",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({...formData,txnid:'unique_transaction_id_' + new Date().getTime() })
            })
            const payUdata=await response.json()
            const payUResponse = await axios.post('http://localhost:5500/payu_response', payUdata);
            console.log("status",payUResponse.status)
            if(payUResponse.status===200){
              const userToken=localStorage.getItem("token")
              const res=await axios.post("http://localhost:5500/premium/add",{},{headers:{"Authorization":userToken}})
              if(res.status===202){
                alert("You are a premium user now")
                setPremium(true)
                localStorage.setItem("premium",true)
                navigate("/daily")
              }
              else alert("Try again")
            }
           else alert(`${payUResponse.data.message}`);

            
            

            
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6  shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Pay with PayU</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm  mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={formData.amount}

            readOnly
            className="w-full px-3 py-2 border border-gray-300  shadow-sm outline-none"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="productinfo">
            Product Info
          </label>
          <input
            type="text"
            id="productinfo"
            name="productinfo"
            placeholder="Product Info"
            value={formData.productinfo}
            readOnly

            className="w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="firstname">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300  shadow-sm outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300  shadow-sm outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300  outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 "
        >
          Pay with PayU
        </button>
      </form>
    </div>
  )
}

export default Payment_form
