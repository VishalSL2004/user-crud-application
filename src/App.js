import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const[users, setUsers] = useState([]);

  //READ: Fetch users from API
  useEffect(()=>{
    axios.get("https://fakestoreapi.com/users")
    .then((response) => {
      const data = response.data.map((user) => (
        {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone
      }))
      setUsers(data)
    })
    .catch((err)=>console.log(err))
  },[])



  return (
    <div className='container'>
      <h1>User CRUD Application</h1>

      <form>
        <input
          type='text'
          placeholder='Enter Name'
          value=""
          onChange={()=>{}}
          required
        />
         <input
          type='email'
          placeholder='Enter Email'
          value=""
          onChange={()=>{}}
          required
        />
         <input
          type='number'
          placeholder='Enter Age'
          value=""
          onChange={()=>{}}
          required
        />
        <button type='submit'>
          Add user
        </button>
      </form>

      <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
          
          {users.map((user) => (
            <tr key={user.id}>
            <td>{user.username || "No Name"} </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
