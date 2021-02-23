import { useState } from 'react';
import {Router, Switch, Link} from 'react-router-dom';
import axios from 'axios';

const projectID = '0c6642af-f190-4c7c-a408-35dad4592d3b';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('Username or password not Found m8');
    }
  };

  const handleClicku = (e) => {
    e.preventDefault();
    if(!localStorage.getItem('username')){
      localStorage.setItem('username', 'banderita');
      window.location.reload();
    }else{
      //localStorage.removeItem('username');
      console.log("I'm logged M8");
    }
  }

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Stiwys ChatRoom</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button" onClick={localStorage.setItem('username', username)}>
              <span>Empieza a chatear</span>
            </button>
          </div>
        </form>
        {/*TODO next event overrides everithing*/}
        <div><a href="/signup" onClick={handleClicku}>Registrar Cuenta</a></div>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;