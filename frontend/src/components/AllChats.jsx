import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllChats = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Chats</h2>
      {chats.map((chat) => (
        <div key={chat._id}>
          <Link to={`/api/${chat._id}`}>
            <h3>{chat.chatName}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllChats;
