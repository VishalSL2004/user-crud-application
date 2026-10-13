import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const[users, setUsers] = useState([]);
  
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[phone, setPhone] = useState("");

  const[editId,setEditId] = useState(null);
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

  //CREATE AND UPDATE
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: name,
      email: email,
      phone: phone
    }

    if(editId !== null){
      //UPDATE

      await axios.put(`https://fakestoreapi.com/users/${editId}`, user);
      // setUsers(users.map((u) => u.id === editId ? {...user, id: editId} : u));
    }
    else{
      //CREATE
      //GET, PUT, POST, DELETE
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        user
      );
      setUsers([
        ...users,
        {...user, id: response.data.id}
      ])
    }

    setName("")
    setEmail("")
    setPhone("")

  }

  const handleDelete = async (id) => {
    await axios.delete(`https://fakestoreapi.com/users/${id}`)
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleEdit = (user) => {
    setName(user.username)
    setEmail(user.email)
    setPhone(user.phone)
    setEditId(user.id)
  }

  return (
    <div className='container'>
      <h1>User CRUD Application</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
         <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
         <input
          type='text'
          placeholder='Enter Phone'
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          required
        />
        <button type='submit' className={editId !== null ? "" : "adduser-btn"}>
          {editId !== null ? "Update User" : "Add User"}
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
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button className='delete-btn' onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
