import React, {useState} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button} from 'reactstrap';

import { useNavigate } from "react-router-dom";

const Booking = ({ tour,avgRating }) => 
  {

    const{ price, reviews}=tour;

    const navigate=useNavigate()

    const [credentials, setCredentials] = useState({ userId: '01', userEmail: 'example@gmail.com', fullName: '', phone: '', guestSize: 1, bookAt: '' });


    const handelChange = e =>{
      setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    };

    const serviceFee=5000;
    const totalAmount=Number(price) * Number(credentials.guestSize)+Number(serviceFee);

    //Send data to the server
    const handelClick = e=>{
      e.preventDefault();
      // console.log(credentials);
      navigate("/thank-you")
    };
  
    
    
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/*================ booking form ==============*/}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handelClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handelChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handelChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handelChange}
            />
            <input
              type="number"
              placeholder=""
              id="guestSize"
              required
              onChange={handelChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/*===============booking end==============*/}

      {/* ==========booking bottom============ */}
      <div className='booking__bottom'>
        <ListGroup>
            <ListGroupItem className='border-0 px-0'>
            <h5>₹{price}<i className="ri-close-line"></i> 1 person</h5>
            <span>₹{price}</span>
            </ListGroupItem>
            <ListGroupItem className='border-0 px-0'>
              <h5>Service Charge</h5>
            <span>₹5000</span>
            </ListGroupItem>
            <ListGroupItem className='border-0 px-0 total'>
              <h5>Total</h5>
              <span>₹{totalAmount}</span>
            </ListGroupItem>
        </ListGroup>
        <Button className='btn primary__btn w-100 mt-4' onClick={handelClick}>Book Now</Button>
      </div>
    </div>
  );
}

export default Booking