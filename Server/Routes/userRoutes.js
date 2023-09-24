const express = require('express');

const router = express.Router();
const axios = require('axios');

let rating = {};
rating['newbie'] = "pupil";
rating['pupil'] = "specialist";
rating['specialist'] = "expert";
rating['expert'] = "candidate master";
rating['candidate master'] = "master";
rating['master'] = "international master";
rating['international master'] = "grandmaster";
rating['grandmaster'] = "international grandmaster";
rating['international grandmaster'] = "legendary grandmaster";
rating['legendary grandmaster'] = "you done bro";


async function getUserRating(user){
    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${user}`);
        let user_rank = response.data.result[0].rank;
         
        return rating[user_rank];

        
    } catch (error) {
        console.log(error.message);
    }
} 

router.get('/', async (req,res) =>{
    try {
            
        let upgrade = await getUserRating(req.name);
        if(upgrade === "you done bro") res.send("you done bro");
        const question_list = require(`../questions/${upgrade}`);
        res.send(question_list);
        res.end();
    } catch (error) {
        res.send(error.message);
    }
})


module.exports = router;