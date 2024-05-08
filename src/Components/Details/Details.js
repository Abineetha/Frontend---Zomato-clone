// import React from 'react'
import Carousal from './Carousal'
import MyTabs from './MyTabs'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import Modal from 'react-modal';
import { Payment } from '../Payment/Payment';
// import Header from '../Header/Header'

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#71bfba',
      textAlign: 'center',
      borderRadius: '10px 10px 10px 10px'
  }
};

export default function Details() {
  const [restaurant, setRestaurant]= useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState({});
  const [paymentModal, setPaymentModal] = useState(false)
  const parsed = queryString.parse(window.location.search);
  const id = parsed.restaurant;

  useEffect(()=>{
    axios.get(`http://localhost:8900/restById/${id}`)
    .then((res)=>{
      setRestaurant(res.data);
    }).catch(err=>err)
    // console.log(restaurant);

    axios.get(`http://localhost:8900/getMenu/${restaurant.name}`)
    .then((res)=>{
      setMenu(res.data);
    }).catch(err=>err)
    console.log(menu);
  }, [restaurant.name, id])

  const menuOpen = () => {
    setMenuIsOpen(true);
    axios.get(`http://localhost:8900/getMenu/${restaurant.name}`)
        .then((res) => {
            setMenu(res.data);
        }).catch(err=>err)
        // console.log(menu);
}

const closeModal = ()=>{
  setMenuIsOpen(false);
}

const handleIncrement = (selectItem, index) => {

  if (selectItem) {
      setCount((pre) => {
          const newCount = { ...pre, [index]: (pre[index] || 0) + 1 };
          setQuantity(pre => parseFloat(pre + selectItem.price))
          return newCount
      })
  }
};

const handleDecrement = (selectItem, index) => {

  if (selectItem && quantity > 0 && count[index] > 0) {

      setCount(pre => {
          const newCount = { ...pre, [index]: pre[index] - 1 };
          setQuantity(pre => pre - selectItem.price);
          return newCount
      })
  }
};

const paymentIsOpen = () => {
  setMenuIsOpen(false);
  setPaymentModal(true);
}

const cashOnDelivery = () => {
  setMenuIsOpen(false);
  alert("Order Accepted.. wait for few minutes...")
}

  return (
    <div className='details'>
      
        <Carousal/>
        <br/>
        <h1  style={{color:"rgb(26, 26, 83)"}}>
          <b>{`${restaurant.name}`}</b>
        </h1>
        <button className="btn btn-outline-danger" style={{float:"right"}} onClick={menuOpen}>Place Online Order</button>
        <br/>
        <MyTabs/>

        <Modal isOpen={menuIsOpen} style={customStyles}>
          
                {menu.map(e => {

                    return <div>
                     
                        <h1 style={{ color: 'rgb(128, 0, 0)' }} className='fw-bold float-end mb-4'>{e.name}</h1><br/>
                        <h5 className='float-start fw-bold mt-4'>MENU ITEMS</h5>
                        <br/><br/>
                        <hr className='foods my-2' />
                        <br/>

                        <div style={{  width: '100%', borderRadius: '8px' }}><br/>
                            <div >
                                {e.items.map((a, index) =>
                                (
                                    <span className='d-flex justify-content-between p-1' key={index}>
                                        <p  style={{ color:"#000000" }}>
                                             <h2  className='fw-bold fst-italic'>{a.name}</h2> 
                                            <p style={{ color: '#ffffff' , fontSize:"17px"}}>{a.desc}</p>  
                                        </p>
                                        <div className='d-flex justify-content-evenly ' style={{ width: '180px', height:"40px", border: 'none' }}>
                                            <button className='btn btn-outline-primary fs-5' onClick={() => handleDecrement(a, index)}><b>-</b></button>
                                            <button className='fw-bold fs-6 text-center btn btn-success'>{count[index] || 0}</button>
                                            <button className='btn btn-outline-primary fs-5 fw-bold' onClick={() => handleIncrement(a, index)}>+</button>
                                        </div>
                                        <h4 className='px-1 fs-5 fw-bold' style={{ color: '#000000' }}>&#8377; {a.price}</h4>
                                    </span>
                                )
                                )}
                            </div>
                        </div>
                        <hr />
                        <h2 style={{ color: 'black', marginLeft: "40%" }} className='px-3 py-1 fw-bold'>SubTotal: &#8377; {quantity || e.amount}</h2>
                        <div className='d-flex justify-content-end my-4 '>
                            <button className='btn btn-dark fs-5 mx-4  fw-bold' onClick={paymentIsOpen}>Pay Online</button>
                            <button className='btn btn-danger fs-5 fw-bold mx-2' onClick={cashOnDelivery} >Cash On Delivery</button>
                        </div>
                        {/* <br/> */}
                        <button className='btn btn-outline-dark' onClick={closeModal}><b>Close</b></button>
                    </div>
                }
                )}
            </Modal>

            <Modal isOpen={paymentModal} style={customStyles}>
                <Payment amount={quantity} id={id} />
            </Modal>
    </div>
  )
}
