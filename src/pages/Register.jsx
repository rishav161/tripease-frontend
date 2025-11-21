import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import '../styles/login.css'

import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, credentials);
      
      if (res.data.success) {
        setMessage(res.data.message);
        setShowOTP(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        ...credentials,
        otp
      });

      if (res.data.success) {
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${BASE_URL}/auth/resend-otp`, {
        email: credentials.email
      });

      if (res.data.success) {
        setMessage(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
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
                <img src={registerImg} alt="" />
                <div className="login__img__content">
                  <h3>Join TravelWorld</h3>
                  <p>Start your journey with us and explore the world's most beautiful destinations.</p>
                </div>
              </div>
              <div className='login__form'>
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>{showOTP ? 'Verify OTP' : 'Register'}</h2>

                {!showOTP ? (
                  <Form onSubmit={handleRegister}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder='Username'
                        required
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                      />
                    </FormGroup>
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
                    {message && <p className="success__msg">{message}</p>}
                    <Button
                      className='btn secondary__btn auth__btn'
                      type='submit'
                      disabled={loading}
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                  </Form>
                ) : (
                  <Form onSubmit={handleVerifyOTP}>
                    <p className="otp__info">Enter the 6-digit OTP sent to {credentials.email}</p>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder='Enter OTP'
                        required
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                      />
                    </FormGroup>
                    {error && <p className="error__msg">{error}</p>}
                    {message && <p className="success__msg">{message}</p>}
                    <Button
                      className='btn secondary__btn auth__btn'
                      type='submit'
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                    <p className="resend__otp">
                      Didn't receive OTP?{' '}
                      <span onClick={handleResendOTP} style={{ cursor: 'pointer', color: '#ff7e01' }}>
                        Resend
                      </span>
                    </p>
                  </Form>
                )}

                <p>Already Have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} centered>
        <ModalHeader>Registration Successful!</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <i className="ri-checkbox-circle-line" style={{ fontSize: '4rem', color: '#28a745' }}></i>
            <h5 className="mt-3">Account Created Successfully!</h5>
            <p>You can now login with your credentials.</p>
          </div>
        </ModalBody>
      </Modal>
    </section>
  )
}

export default Register