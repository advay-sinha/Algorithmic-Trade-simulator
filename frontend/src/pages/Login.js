import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { firstName, lastName, phone });
      setIsOtpSent(true);
      alert('OTP sent successfully');
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { firstName, lastName, phone, otp });
      alert('OTP verified successfully');
      navigate('/dashboard'); // Redirect to dashboard after verification
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>

      {isOtpSent && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default Login;