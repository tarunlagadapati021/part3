import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import personService from './person'
import axios from "axios";
import Notification from './Notification';
import cors from "cors"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [message,setMessage] =useState("")
  const [ search, setSearch ] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(response => {setPersons(response)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number:newNumber,
    }
    personService
      .create(personObject)
        .then(response => {setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessage(newName + "Added")
        setTimeout(()=>setMessage(null), 2000)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
		setSearch(event.target.value)
		setShowAll(true)
	}

  const Filter = (query) => {
		const filter_result = persons.filter(person => person.name.toLowerCase().split(" ").join("").indexOf(query.toLowerCase()) !== -1)
		return filter_result
	}

  const displayToShow = showAll
  ? Filter(search)
  : persons

  const handleChange = (name) => {
		const person = persons.find(n => n.name === name) 
		const change = {...person, number:newNumber}
		const id = person.id 
		const result = window.confirm(name + " is already added to Phonebook, replace the old number with a new one?")
		if (result) {
			personService
				.update(id, change)
				.then(response => setPersons(persons.map(person => person.id === id ? response : person)))
		}
	}

  const handleDelete = (id) => {
		axios
			.get(`http://localhost:3001/persons/${id}`)
			.then(response => {
				const result = window.confirm("Do you really want to delete " + response.data.name)
					if (result) {
						axios
							.delete(`http://localhost:3001/persons/${id}`)
							.then(response => console.log(response.data))
					} 
				setTimeout(() => {
					personService
						.getAll()
						.then(response => setPersons(response))
				}, 1000)
			})
	}

  return (
    <div>
      <h1>Phonebook</h1>
      Search by Name: <input value = {search} onChange = {handleSearch}/>
      <Notification message={errorMessage}/>  
      <h2>Add A New Contact</h2>
			<form onSubmit = {addPerson}>
				Name: <input value = {newName} onChange = {handleNameChange}/>
				&nbsp; &nbsp; &nbsp;
				Number: <input value = {newNumber} onChange = {handleNumberChange}/><br/>
				<button type = "submit">ADD</button>
			</form><br/>
      <form onSubmit = {() => handleChange(newName)}>
         <button type = "submit">Change Contact</button>
			</form>
      <h2>Numbers</h2>
			{displayToShow.map(person => {
				return(
					<div key = {person.id}>
						<p>{person.name}: {person.number}</p>
            <button onClick = {() => handleDelete(person.id)}>Delete</button>
					</div>
				)})
			}  
    </div>
  )
}

export default App