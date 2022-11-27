import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { info } from "../../../common/common";
import { Button, Card, Input,message } from "antd";
const googlePNG = require('../../../assets/google.png')

const LoginForm:React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage()

  const handleChange = ({ target }: { target: any }) => {
    setUser((pre) => {
      return { ...pre, [target.name]: target.value };
    });
  };


  const handleLogin = () => {
    if (user.password === "" || user.username === "") {
      messageApi.open({
        type: 'error',
        content: 'Wow, No email or No Password!',
      });
      return;
    }

    
    setLoading(true);
    const url = info.base_url + "api/auth/login";
    axios
      .post(url, user)
      .then((response) => {
        setLoading(false);
        localStorage.setItem(info.access_token, response.data.access_token);
        navigate("/app");
      })
      .catch((error) => {
        setLoading(false);
        messageApi.open({
          type: 'error',
          content: 'Invalid Credentials!',
        });
      });
  };

  return (
    <div className='m-0 p-0 d-flex justify-content-center mt-5 '>
      <Card className="shadow-lg" style={{ width: "400px" }}>
        <h4 className='text-center'>Sign in to MyTodo</h4>
        <div className='m-2 mt-4'>
          Email: <Input type={"text"} onChange={handleChange} name='username' />
        </div>
        <div className='m-2 mt-4'>
          Password:{" "}
          <Input type={"password"} onChange={handleChange} name='password' />
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <Button onClick={handleLogin} loading={loading ? true : false}>
            {loading ? "validating" : "login"}
          </Button>
        </div>
        <div className="text-center my-1">or</div>
        <div className="d-flex justify-content-around m-1 my-3" >
            <a className="text-decoration-none w-100" href='https://mytodo-server-production.up.railway.app/api/auth/google/login'>
          <Button className="w-100" >
              <img alt="" src={googlePNG} className='mx-1' width={'15px'} />
              Sign in with Google
          </Button>
            </a>
        </div>

          <p className="d-flex justify-content-center" >Don't have an account? Sign up</p>
        <div className="d-flex justify-content-around m-1" >
            <Link  className="text-decoration-none w-100" to={"/register"}>
              <Button className="w-100">
              Sign Up
              </Button>
            </Link>
        </div>
        <div className="d-flex justify-content-around m-1 my-2" >
            <Link  className="text-decoration-none w-100" to={"/register"}>
              <Button className="w-100">
              Forgot Password
              </Button>
            </Link>
        </div>
       
      </Card>
      {contextHolder}
    </div>
  );
};

export default LoginForm;
