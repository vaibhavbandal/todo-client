import { useNavigate } from "react-router-dom";
import { info } from "../../common/common";


export function Homepage() {

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem(info.access_token)
    navigate('/');
  }

  return (
    <>
      <h2>You are Authorized</h2>
      <button onClick={logout} >Logout</button>
    </>
  );
}
