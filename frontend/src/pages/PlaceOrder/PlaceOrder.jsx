import React, { useContext ,useEffect,useState} from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setData] = useState(
    {
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    }
  )


  const onChangeHandeler =(event)=>{
    const name=event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  useEffect(()=>{
    console.log(data);
  },[data])

  const placeOrder =async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo =item
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address : data,
      items:orderItems,
      amount:getTotalCartAmount()+2, 
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const{session_url}=response.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  }
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input required  name='firstName' onChange={onChangeHandeler} value={data.firstName} type="text" placeholder="First Name"></input>
          <input required  name='lastName' onChange={onChangeHandeler} value={data.lastName}type="text" placeholder="Last Name"></input>
        </div>

        <div className="multi-field">
          <input required  name='email' onChange={onChangeHandeler} value={data.email} type="text" placeholder="Email adress"></input>
          <input required name='street' onChange={onChangeHandeler} value={data.street} type="text" placeholder="Street"></input>
        </div>

        <div className="multi-field">
          <input  required name='city' onChange={onChangeHandeler} value={data.city} type="text" placeholder="city"></input>
          <input  required name='state' onChange={onChangeHandeler} value={data.state} type="text" placeholder="Street"></input>
        </div>

        <div className="multi-field">
          <input required name='zipcode' onChange={onChangeHandeler} value={data.zipcode} type="text" placeholder="Zip code"></input>
          <input  required name='country' onChange={onChangeHandeler} value={data.country} type="text" placeholder="Country"></input>
        </div>
        <input  required name='phone' onChange={onChangeHandeler} value={data.phone} type="text" placeholder="Phone"></input>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
            <hr />
          </div>
          <button type="submit">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
