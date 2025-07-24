import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Language } from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,useNavigate } from "react-router-dom";
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction'; 
import Profile from "../Header/Profile";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isShowModalProfile,setIsShowModalProfile]=useState(false);
  const isAuthenticated = useSelector(state=>state.user.isAuthenticated);
  const account = useSelector(state=>state.user.account);
 
  const dispatch = useDispatch();
   
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleSignup = () => {
    navigate('/register');
  }
  const handleLogOut = async() =>{
      let res =await logout(account.email,account.refresh_token);
      if(res && res.EC === 0){
        //  clear data redux  
        dispatch(doLogout())
        navigate('/login');
      }   
      else{
        toast.error(res.EM);
      }

  }
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
        <span onClick={() => setCollapsed(!collapsed)} > <FaBars className="leftside" /></span>
          <div className="rightside">
          <Language/>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={()=>{setIsShowModalProfile(true)}} >Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={()=>handleLogOut()}>Log out</NavDropdown.Item>
            </NavDropdown>
          
            <Profile show={isShowModalProfile} setShow={setIsShowModalProfile}/>
          </div>
          
        </div>
     
        <div className="admin-main">
        <PerfectScrollbar>
        <Outlet />
        </PerfectScrollbar>
        </div>
       
      </div>
    
    </div>
  );
};
export default Admin;
