const fs =  require("fs")

const getnotes = function(){
    return 'Your notes ...'
}


const addnotes = function(title,body){
    const notes = loadNotes()

}


const loadNotes = function () {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)

    }catch(e){
        return []
    }
    

}

module.exports ={
    getnotes: getnotes,
    addnotes: addnotes
}