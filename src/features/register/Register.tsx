import { Button, Card, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { info } from "../../common/common";
import { useAuth } from "../../components/useAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState({ error: false, msg: "" });
  const [success, setSuccess] = useState({ success: false, msg: "" });
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  if (useAuth()) {
    return <Navigate to='/' replace />;
  }

  const SendOtpButton = () => {
    return (
      <Button loading={otpLoading} onClick={handleSendOtp} disabled={!disable}>
        {otpLoading ? "sending..." : "Send otp"}
      </Button>
    );
  };

  const RegisterButton = () => {
    return (
      <Button
        disabled={disable}
        loading={registerLoading ? true : false}
        onClick={handleRegister}
      >
        {registerLoading ? "loading" : "Sign Up"}
      </Button>
    );
  };

  const handleRegister = () => {
    if (otp === "") {
      messageApi.open({
        type: "error",
        content: "Invalid Credentials!",
      });
      return;
    }
    setRegisterLoading(true);
    const url = info.base_url + "api/auth/register";
    axios
      .post(url, { otp, email, password })
      .then((response) => {
        messageApi.open({
          type: "success",
          content: "Sign Up Done!",
        });
        messageApi.open({
          type: "success",
          content: "Hey, Login Now",
        });
        setRegisterLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "wrong otp!",
        });
        setRegisterLoading(false);
      });
  };

  const handleSendOtp = () => {
    if (email === "" || password === "") {
      messageApi.open({
        type: "error",
        content: "Invalid Credentials!",
      });

      return;
    }

    setOtpLoading(true);
    const url = info.base_url + "api/auth/verification";
    axios
      .post(url, { email, password })
      .then((response) => {
        setOtpLoading(false);
        setError({ error: false, msg: "" });
        setOtpLoading(false);
        messageApi.open({
          type: "success",
          content: response.data,
        });
        setSuccess({ success: true, msg: response.data });
        setDisable(false);
      })
      .catch((error) => {
        setOtpLoading(false);
        setError({ error: true, msg: error.response.data.msg });
        setSuccess({ success: false, msg: "" });
        messageApi.open({
          type: "warning",
          content: error.response.data.msg,
        });
      });
  };

  return (
    <div className='m-0 p-0 d-flex justify-content-center mt-5'>
      <Card className='shadow-lg' style={{ width: "400px" }}>
        <h4 className='text-center my-2 text-info'>Sign Up</h4>
        Email:
        <Input
          type={"text"}
          disabled={!disable}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          name='email'
        />{" "}
        <br></br>
        <br></br>Password:
        <Input
          disabled={!disable}
          type={"text"}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name='password'
        />{" "}
        <div className='d-flex justify-content-center my-2'>
          <SendOtpButton />
        </div>
        Otp:
        <Input
          disabled={disable}
          type={"text"}
          onChange={({ target }) => setOtp(target.value)}
          name='otp'
        />{" "}
        <div className='d-flex justify-content-center my-1'>
          <RegisterButton />
        </div>
        <br></br>
        <div> {error.error ? "Error " + error.msg : ""} </div>
        <div> {success.success ? "Success " + success.msg : ""} </div>
      </Card>
      {contextHolder}
    </div>
  );
};

export default Register;
