import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [persons, setPersons] = useState([])

  const addNote = (event) => {
    event.preventDefault()
    const personObject = {
      name: event.target.n1.value, 
      number: event.target.p1.value,
    }
    axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      console.log("posted")
      //setPersons(persons.concat(personObject))
      axios
      .get('http://localhost:3001/persons')
      .then(res_in => {
        console.log('getting after addition')
        setPersons(res_in.data)
        console.log(res_in.data)
      })
    })
    event.target.n1.value = ''
    event.target.p1.value = ''
  }

  const deleteNote = (event) => {
    event.preventDefault()
    const id1 = event.target.id1.value
    const url = 'http://localhost:3001/persons/' + id1
    axios
    .delete(url)
    .then(response => {
      console.log("deleted")
      axios
      .get('http://localhost:3001/persons')
      .then(res_in => {
        console.log('getting after deletion')
        setPersons(res_in.data)
        console.log(res_in.data)
      })
    })
    event.target.id1.value = ''
  }

  const putNote = (event) => {
    event.preventDefault()
    const name = event.target.n1.value
    const phone = event.target.p1.value
    const node = persons.find (n => n.name === name)
    const modifiedNode = { ...node, number: phone }
    const id1 = node.id;
    const url = 'http://localhost:3001/persons/' + id1
    axios
    .put(url, modifiedNode)
    .then(response => {
      console.log("modified")
      axios
      .get('http://localhost:3001/persons')
      .then(res_in => {
        console.log('getting after modification')
        setPersons(res_in.data)
        console.log(res_in.data)
      })
    })
    event.target.n1.value = ''
    event.target.p1.value = ''
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])

  if (persons.length === 0)
  {
    return (
      <div className="App">
        No Data Available
      </div>
    );
  }
  else 
  {
      return (
      <div>
        
        List of Loaded Content <br />
        <ul>
        {persons.map ((element) => {
          return <li> Name  = {element.name}, Phone = {element.number} </li>
        })}
        </ul>
        <div>
        
        <h4> To add new data, submit the values </h4>
        <form onSubmit={addNote}>
          Name: <input type = "text" name = "n1"/> <br />
          Phone: <input type = "text" name = "p1"/> <br />
          <input type = "submit" value = "save"/> <br />
        </form>
        
        <h4> To delete new data, submit the value </h4>
        <form onSubmit={deleteNote}>
          ID: <input type = "text" name = "id1"/> <br />
          <input type = "submit" value = "delete"/> <br />
        </form>
        
        <h4> To modify the data (phone number), submit the values </h4>
        <form onSubmit={putNote}>
          Name: <input type = "text" name = "n1"/> <br />
          Phone: <input type = "text" name = "p1"/> <br />
          <input type = "submit" value = "modify"/> <br />
        </form>

        </div>
      </div>
    );
  }
}

export default App;