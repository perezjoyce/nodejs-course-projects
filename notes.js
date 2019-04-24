const fs = require('fs')
const chalk = require('chalk')

//CHANGE NOTES
const addNote = (title, body) => {
    const notes = loadNotes();

    //find the duplicate object in the notes array
    const duplicateNote = notes.find((note) => note.title === title) 
    
    if (!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        console.log(chalk.bold.green.inverse("New note added!"))
    } else {
        console.log(chalk.bold.red.inverse("Title exists"))
    }
    
    //call saveNotes function to pass in notes array
    saveNotes(notes)
}

//SAVE NOTES
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
}

//LOAD AND PARSE OR READ THE JSON DATA
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json') //file doesn't exist yet
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// ==========================================

const removeNote = (title) => {
    // console.log('remove this ' + title)
    const existingNotes = loadNotes()
    //return notes that do not match the title
    const notesToKeep = existingNotes.filter((existingNote) => existingNote.title !== title)

    if (existingNotes.length > notesToKeep.length) {
        console.log(chalk.bold.green.inverse("Note removed!"))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bold.red.inverse("No note found!"))
    }
}

// ==========================================

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.yellow.inverse("YOUR NOTES"))
    notes.forEach((note)=> console.log(note.title))
}

// ==========================================

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    if(noteToRead) {
        console.log(chalk.yellow.bold.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.bold.inverse("Error encountered. Please try again."))
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}
