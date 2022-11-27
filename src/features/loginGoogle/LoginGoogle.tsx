import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { Routes, Route, useParams,useLocation } from 'react-router-dom';
import { info } from "../../common/common";
export function LoginGoogle() {
  let { access_token } = useParams();
  
  
  
  useEffect(()=>{
     const access_token2:any = access_token;
     window.localStorage.setItem(info.access_token,access_token2)
     window.location.replace('http://localhost:3000/app')
  })

  return <></>

}
