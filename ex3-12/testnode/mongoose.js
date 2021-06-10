const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:Ramji@369@cluster0.nwubd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  name: String,
  telephone: String
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: `Ramji`,
  telephone: 9100226132
})

note.save().then(response => {
  console.log(`notes saved`)
  mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
})