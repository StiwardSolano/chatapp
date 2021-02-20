import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
    
    if(!localStorage.getItem('username')) return <LoginForm />
    
    return (
        <ChatEngine
            height="100vh"
            projectID="0c6642af-f190-4c7c-a408-35dad4592d3b"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) =><ChatFeed {... chatAppProps} />}
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
    );
}

export default App;