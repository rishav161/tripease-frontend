import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import '../styles/login.css'

import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setError('');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials, {
        withCredentials: true
      });

      if (res.data.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });
        navigate('/');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className='login__img'>
                <img src={loginImg} alt="" />
                <div className="login__img__content">
                  <h3>Welcome to TravelWorld</h3>
                  <p>Discover amazing destinations and create unforgettable memories with our curated tour packages.</p>
                </div>
              </div>
              <div className='login__form'>
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder='Email'
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder='Password'
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  {error && <p className="error__msg">{error}</p>}
                  <Button
                    className='btn secondary__btn auth__btn'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>
                <p>Don't Have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login