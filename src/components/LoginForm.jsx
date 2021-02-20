import { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 
            'Project-ID': '0c6642af-f190-4c7c-a408-35dad4592d3b',
            'User-Name' : username,
            'User-Secret': password 
        };

        try {
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});
            
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            window.localtion.reload();
            setError('');
        } catch(error){
            setError('Username or password not Found m8');
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Stiwys ChatRoom</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Usuario" required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Contraseña" required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Empieza a Chatear</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;