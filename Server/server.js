const express = require('express')

const app = express();

const PORT = 8000;

app.get('/',(req,res)=>{
    res.send("Nilesh is Land ");
})

app.get('/nilesh', (req,res)=>{
    res.send ("Nilesh suck my dick !!");
})


app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
});
