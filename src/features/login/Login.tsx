import React from "react";
import { useAuth } from "../../components/useAuth";
import LoginForm from "./components/LoginForm";
import { Navigate } from "react-router-dom";

export function Login() {

  if(useAuth()){
    return <Navigate to='/app' replace />;
  }

  return <LoginForm />;
}
