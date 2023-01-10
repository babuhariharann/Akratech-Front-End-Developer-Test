import React, { useState, useEffect } from 'react';
import './App.css';
import { CircularProgress, } from '@material-ui/core';



function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);


 
  useEffect(() => { 

    // Fetch 50 random users from the API

 fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
      .then(data => {
        const newUsers = data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          uuid:`${user.login.uuid}`,
          
          picture: user.picture.large,
        }));
        setLoading(false)
        setUsers(newUsers);

        localStorage.setItem('User-Details', JSON.stringify(newUsers));
        
        
      });
  }, []);

  //remove the users

  const handleDelete=(uuid)=>{
    // console.log(uuid)
    const filteredUser = users.filter((user)=>{
      return user.uuid !== uuid;
    })
    setUsers(filteredUser)
  }

  

  return (
    <>
      {loading ? (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress style={{ color: 'red' }} />
        </div>
      ) : (
        <div className='container'>
          <div className='header-container'>
            <button>Refresh</button>
            <span>No of Users: {users.length}</span>
          </div>

          <div className='card-container'>
            {users.map((user, index) => (
              <div key={index}>
                <img src={user.picture} alt={user.name} />
                <p>{user.name}</p>
                <button className='btn' onClick={() => handleDelete(user.uuid)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
);
}

export default App;


















