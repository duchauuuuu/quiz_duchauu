
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,useNavigate } from "react-router-dom";
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { Language } from './Language';
import  Profile  from './Profile';
import { useState } from 'react';
const Header= () => {
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
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">Quiz Đức Hậu</Navbar.Brand> */}
        <NavLink to="/" className='navbar-brand'>Quiz Đức Hậu</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavLink to="/" className='nav-link'>Home</NavLink>
          <NavLink to="/users" className='nav-link'>Users</NavLink>
          <NavLink to="/admins" className='nav-link'>Admins</NavLink>
            
          </Nav>
          <Nav>
          {isAuthenticated === false ?   
          <>
          <button className='btn-login' onClick={()=>handleLogin()}>Log in</button>
          <button className='btn-signup' onClick={()=>handleSignup()}>Sign up</button>
        
          </> :
          <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{setIsShowModalProfile(true)}} >Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleLogOut()}>Log out</NavDropdown.Item>
            </NavDropdown>
          }
        <Language/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Profile show={isShowModalProfile} setShow={setIsShowModalProfile}/>
</>
  );
}

export default Header;