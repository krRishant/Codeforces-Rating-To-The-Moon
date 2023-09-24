const express = require('express')
const getallUsers = require('./api/api');

const app = express();

const PORT = 8000;
async function getQuestions() {
    
    await getallUsers();
    setTimeout (() => {

        console.log("after 5 minutes");
        getQuestions();
    },5*60*1000);
}

getQuestions();



app.get('/',(req,res)=>{
    res.send("Nilesh is Land ");
})

app.get('/nilesh', (req,res)=>{
    res.send ("Nilesh suck my dick !!");
})


app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
});
