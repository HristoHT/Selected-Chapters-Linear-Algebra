import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Message from './components/Message'
import SendIcon from '@material-ui/icons/Send';
import socketIOClient from "socket.io-client";
import cryptWord from './utils/Enigma';

import './css/App.css';

const ENDPOINT = "/"; /* "http://localhost:8080"; */

function App() {
  const [settings, setSettings] = useState({ shift1: 0, shift2: 0, shift3: 0, offset: 1 });
  const [messagesList, setMessagesList] = useState([]);
  const [user, setUesr] = useState(require('crypto').randomBytes(10).toString('hex'));
  const possitions = new Array(26).fill(0).map((el, i) => i);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('send-messages', (messages) => {
      console.log(messages);
      setMessagesList(messages);
    })
  }, [])

  const changeOptions = (e) => {
    let key = e.target.name,
      value = (Number(e.target.value) || 0);
    setSettings({ ...settings, [key]: value });
  }

  const sendMyMessage = (e) => {
    let message = document.getElementById('message-holder').value;
    if (!message) return;
    document.getElementById('message-holder').value = '';
    socket.emit('new-message', { plainText: cryptWord(message, settings), sendedBy: user })
  }

  return (
    <div className="row">
      <div className="col s6 offset-s1" id="Chat-wrapper">
        <div className="col s8 offset-s2 card" id="Chat-panel">
          {messagesList.map((el, i) =>
            <div style={{ margin: '0.5rem' }}><Message key={i} plainText={el.plainText} my={el.sendedBy == user ? true : false} settings={settings} /></div>
          )}
        </div>
        <div className="col s10 offset-s1 card input-field valign-wrapper" id="Chat-input">
          <SendIcon onClick={sendMyMessage} className="pointer-cursor" />
          <TextField id="message-holder" className="text-field" />
        </div>
      </div>
      <div className="col s3">
        <div className="col s12" id="Settings-wrapper">
          <div className="row col s12">
            <h5>Позиция на роторите:</h5>
            <div className="Settings-group col s12">
              <span>Ротор 1:</span>
              <Select name="shift1" value={settings.shift1} onChange={changeOptions} >
                {possitions.map(el => <MenuItem value={el}>{el}</MenuItem>)}
              </Select>
            </div>
            <div className="Settings-group col s12">
              <span>Ротор 2:</span>
              <Select name="shift2" value={settings.shift2} onChange={changeOptions} >
                {possitions.map(el => <MenuItem value={el}>{el}</MenuItem>)}
              </Select>
            </div>
            <div className="Settings-group col s12">
              <span>Ротор 3:</span>
              <Select name="shift3" value={settings.shift3} onChange={changeOptions} >
                {possitions.map(el => <MenuItem value={el}>{el}</MenuItem>)}
              </Select>
            </div>
          </div>
          <div className="row col s12">
            <h5>Азбука:</h5>
            <div className="Settings-group col s12">
              <span>Започва от позиция:</span>
              <Select name="offset" value={settings.offset} onChange={changeOptions} >
                {possitions.map(el => <MenuItem value={el}>{el}</MenuItem>)}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
