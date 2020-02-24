const fs = require("chalk")
const yargs = require("yargs")
const notes = require("./notes.js")


yargs.version('1.1.0')

// Create Command

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
       // addnotes(argv.title,argv.body)
       console.log('New Note',argv)
       console.log(argv.title)
    }
})

// Read Command
yargs.command({
    command: 'read',
    describe: 'read note',
    handler: function(){
        console.log("Reading a note")
    }
})

// Delete
yargs.command({
    command: 'delet',
    describe: 'delete note',
    handler: function(){
        console.log("Delete a note")
    }
})


