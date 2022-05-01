import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login'
import Chat from './components/Chat'

function App() {
  const [login, setLogin] = useState(false)
  const [ws, setWs] = useState(null)
  const [text, setText] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    const isLogin = sessionStorage.getItem('token')
    if (isLogin !== 'undefined' && isLogin) {
      setLogin(true)
    }
  }, [])
  useEffect(() => {
    console.log(ws)
    if (ws) {
      console.log('success')
      ws.on(`${user.chat_room_id}_Message`, message => {
        setText(old => [...old, message])
      })
    }
  }, [ws])
  console.log(text)
  return (
    <div>
      {!login? <Login login={setLogin} websocket={setWs} userinfo={setUser}/>: <Chat ws={ws} getText={text} userinfo={user}/>}
    </div>
    
  );
}

export default App;
