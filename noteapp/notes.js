const fs =  require("fs")

const getnotes = function(){
    return 'Your notes ...'
}


const addnotes = function(title,body){
    const notes = loadNotes()

    notes.push({
        title: title,
        body: body
    })
    console.log(notes)
    savenotes(notes)
}

const savenotes = function(notes){
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json',data)
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