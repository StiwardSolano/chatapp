import {useState} from 'react';
import axios from 'axios';

const projectS = 'fc8f8b22-8f6f-4357-b53d-937c1870a88a';
const projectID = '0c6642af-f190-4c7c-a408-35dad4592d3b';
const chatID = 5661

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [first_name, setName] = useState('');
    const [last_name, setLastname] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            //const authObject = {'Project-ID': projectID, 'User-Name': username, 'User-Secret': password}
            try {
                axios.post('https://api.chatengine.io/projects/people/',
                { 'username': username, 'secret': password, 'first_name': first_name, 'last_name': last_name },
                { headers: { "Private-Key": projectS } }
                )
                .then((response) => console.log("User registered "+response.data.username))//response.data
                .catch((error) => console.log(error))
                try {
                  
                  var data = JSON.stringify({"username":`${username}`});//user to add
                  var config = {
                    method: 'post',
                    url: `https://api.chatengine.io/chats/${chatID}/people/`,
                    headers: { 
                      'Project-ID': `${projectID}`, 
                      'User-Name': 'admin', //chatAdmin
                      'User-Secret': 'admin',//adminPassword,
                      'Content-Type': 'application/json'
                    },
                    data : data
                  };
              
                  await axios(config)
                  .then(function (response) {
                    console.log(JSON.stringify("PersonAdded "+response.data));//response.data
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                  localStorage.removeItem('username');
                  window.location.reload();
                }catch (error){
                  setError("Can't add user");
                }
                setError('');
            } catch (err) {
                setError('Please Check your data');
            }
        }
    }

    return (
        <div className="wrapper">
          <div className="form">
            <h1 className="title">ChatRoom SignUp</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" placeholder="Repeat Password" required />
              <input type="text" value={first_name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Firstname" required />
              <input type="text" value={last_name} onChange={(e) => setLastname(e.target.value)} className="input" placeholder="Lastname" required />
              <div align="center">
                <button type="submit" className="button">
                  <span>Registrar</span>
                </button>
              </div>
            </form>
            <h1>{error}</h1>
          </div>
        </div>
    
      );
}

export default SignUp;