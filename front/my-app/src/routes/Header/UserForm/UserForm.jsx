// User Form
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserForm.css';
import 'reactjs-popup/dist/index.css';
import { Modal } from 'react-bootstrap';
import Register from './Register';
import { useSelector, useDispatch } from 'react-redux';
import { doSigninAsync, selectToken, doSignOutAsync, logout, selectLoginErr } from '../../Login/loginSlice'

/* Login form */

export default function UserForm(props) {
  const { active } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [newUserName, setNewUserName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const token = useSelector(selectToken);
  const loginErr = useSelector(selectLoginErr);

  return (

    <div className={`user-form ${active ? 'active' : ''}`}>
      <form>
        <h3>login now</h3>
        <div className="box">
          <input id="userName" onChange={(e) => setNewUserName(e.target.value)} placeholder='your name' />
        </div>
        <div className="box">
          <input id="password" onChange={(e) => setNewPwd(e.target.value)} type="password" placeholder='your password' />
        </div>
        {/*<p>
        forgot your password
        {' '}
        <a href="/">click here</a>
  </p>*/}
        <p>
          don&apos;t have an account
          {' '}

          <a onClick={handleShow}>create now</a>
        </p>
        <button className="btn" type='button' onClick={() => {
          dispatch(doSigninAsync({ username: newUserName, password: newPwd }));
          document.getElementById('userName').value = '';
          document.getElementById('password').value = '';
        }}>
          login now
        </button>
        <button className="btn" type='button' onClick={() => { (dispatch(doSignOutAsync({ token }))); dispatch(logout()); }}>
          log out
        </button>
        {loginErr && <p className='err'>Incorrect username or password</p>}
      </form>
      <Modal show={show} onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter" centered>
        <Register></Register>
      </Modal>
    </div>
  );
}
UserForm.propTypes = {
  active: PropTypes.bool,
}.isRequired;
