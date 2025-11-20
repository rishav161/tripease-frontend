import React, { useState } from 'react'
import { Container,Row,Col,Form,FormGroup,Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css'

import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Register = () => {
  const [credentials, setCredentials] = useState({ 
  userName:undefined,
  email:undefined,
  password:undefined  
   });

  const handelChange = e =>{
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  };

  const handelClick = e=>{
    e.prevetDefault();
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className='login__img'>
                <img src={registerImg} alt="" />
              </div>
              <div className='login__form'>
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handelClick}>
                  <FormGroup>
                    <input type="text" name="" placeholder='Username' required id="username" onChange={handelChange}/>
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' 
                    required id="password" onChange={handelChange}/>
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                </Form>
                <p>Already Have an account ?<Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register