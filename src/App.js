import { ChatEngine } from 'react-chat-engine';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUpForm';
import './App.css';

const projectID = '0c6642af-f190-4c7c-a408-35dad4592d3b';

const App = () => {
  //if (!localStorage.getItem('username')) return <LoginForm />;
  //if (localStorage.getItem('username') == 'banderita'){return <SignUp />}
  if(!localStorage.getItem('username')){
    return <LoginForm />
  }else if(localStorage.getItem('username') == 'banderita'){
    return <SignUp />
  }
  return (
    <div>
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />

    <BrowserRouter>
      <Switch>
        <Route exact path="/signup"  component={SignUp}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
};

export default App;