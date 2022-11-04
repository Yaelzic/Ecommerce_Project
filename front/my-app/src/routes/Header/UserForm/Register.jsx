import React, { useState } from 'react'
import './RegisterStyle.css'
import { doSignupAsync, selectRegister } from '../../Login/loginSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { MDBCheckbox } from 'mdb-react-ui-kit';

/* Register form */

const Register = () => {

  const [newUserName, setNewUserName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [renewPwd, setReNewPwd] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const dispatch = useDispatch();
  const register = useSelector(selectRegister);
  const [errorshowd, seterrorshowd] = useState(false)
  const errorshow = () => { seterrorshowd(!errorshowd) }

  const submitHandler = (e) => {
    e.preventDefault();
    if (newUserName !== '' && newPwd !== '' && newEmail !== '' && renewPwd !== '' && terms && newPwd === renewPwd) {
      dispatch(doSignupAsync({ username: newUserName, email: newEmail, password: newPwd }));
      document.getElementById("refisterForm").reset();
    }
    else if (newPwd !== renewPwd) errorshow()
  };

  return (
    <Modal.Title id="contained-modal-title-vcenter">
      <form id="refisterForm" className={'register'} onSubmit={submitHandler}>
        <h3>Create an account</h3>
        <div className="box">
          <input id="userreg" placeholder='your name' onChange={(e) => setNewUserName(e.target.value)} required />
        </div>
        <div className="box">
          <input id="email" placeholder='your email' onChange={(e) => setNewEmail(e.target.value)} required />
        </div>
        <div className="box">
          <input id="passwordreg" type="password" placeholder='your password' onChange={(e) => setNewPwd(e.target.value)} required />
        </div>
        <div className="box">
          <input id="repassword" type="password" placeholder='Repeat your password' onChange={(e) => setReNewPwd(e.target.value)} required />
        </div>
        <div className='d-flex flex-row justify-content-center mb-4'>
          <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' onChange={(e) => setTerms(e.target.value)} required />
        </div>

        <button className="btn" type='submit'>Register</button>
        <p>{register}</p>
        {errorshowd && <p>Return the password again</p>}
      </form>
    </Modal.Title>
  );
}

export default Register