import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getUsersApi,
  AddUser,
  setCurrentUser,
  saveMessage,
} from '../../Redux/actions/chatActions';

import Modal from 'react-modal';
import {TiUser} from 'react-icons/ti'
import {TiLocationArrow} from 'react-icons/ti'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 400,
    height: 250,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ChatDashboard = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    getUsersApi(dispatch);
  }, []);

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleSubmit = () => {
    if (userName === '') {
      window.alert('Please Enter Username');
      return;
    }
    const data = {
      id: users.length + 1,
      name: userName,
      messages: [],
    };

    AddUser(dispatch, data);
    setUserName('');
    handleCloseModal();
  };

  const handleSetUser = (id) => {
    setCurrentUser(dispatch, id);
  };

  const handleMessageSubmit = () => {
    if (message === '') {
      window.alert('Please Enter message');
      return;
    }
    saveMessage(dispatch, { message: message });

    setMessage('');
  };

  return (
    <div class="main-container">
    <div class="container">
      <Modal
        isOpen={isShowModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Adding User"
      >
        <div>
          <div class="modal-title">
            <h2> Adding User</h2>
            <button
              type="button"
              onClick={handleCloseModal}
              class="close-button"
            >
              Close
            </button>
          </div>
          <label>Enter User Name : </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            class="add-input"
          />

          <button type="button" onClick={handleSubmit} class="add-submit">
            Submit
          </button>
        </div>
      </Modal>

      <div class="left-panel">
        <div class="top-header">
          <h2 class="title">Users</h2>
          <div class="button">
            <button type="button" onClick={() => handleOpenModal()} class="btn">
              Add User
            </button>
          </div>
        </div>
        {users.map((user) => {
          return (
            <div class="single-user" onClick={() => handleSetUser(user.id)}>
              <div>
                <span>
                  <TiUser style={{fontSize:40},{marginTop:20}} />
                </span>
                {user.name}
              </div>
            </div>
          );
        })}
      </div>

      <div class="chat-room">
        <div class="chat-header">Chat Messages</div>
        <div class="show-messages">
          {user.messages && user.messages.length > 0 ? (
            user.messages.map((msg) => {
              return (
                <div>
                  <div class="messages">{msg.message}</div>
                </div>
              );
            })
          ) : (
            <div class="no-msg">No messages for this user</div>
          )}
        </div>

        <div>
          <div class="seperate-line">New Message</div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            class="message-input"
            placeholder="Typing Something..."
          />
          <button
            type="button"
            onClick={handleMessageSubmit}
            class="submit-message"
          >
            Submit<span><TiLocationArrow style={{fontSize:30},{marginTop:10}}/></span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatDashboard;
