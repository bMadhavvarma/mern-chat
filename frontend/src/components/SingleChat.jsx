import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleChat = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/${id}`)
      .then((res) => res.json())
      .then((data) => setChat(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!chat) return <p>Loading....</p>;

  return (
    <div>
      <h2>{chat.chatName}</h2>
      <p>Group Chat: {chat.isGroupChat ? 'Yes' : 'No'}</p>
      <p>Users: {chat.users.map((user) => user.name).join(', ')}</p>
    </div>
  );
};

export default SingleChat;
