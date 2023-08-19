const axios = require('axios');
const colors = require('colors');
const usersWithRating = require('../usersWithRating.json');
let rating = {};
rating['newbie'] ="pupil";
rating['pupil'] ="specialist";
rating['specialist'] ="expert";
rating['expert'] ="candidate master";
rating['candidate master'] ="master";
rating['master'] ="international master";
rating['international master'] ="grandmaster";
rating['grandmaster'] ="international grandmaster";
rating['international grandmaster'] ="legendary grandmaster";
rating['legendary grandmaster'] ="you done bro";


const question_list = async(curr_rating) => {

    let next_rating = rating[curr_rating];
    console.log(next_rating);
    const users = usersWithRating[next_rating].map(users => {return users.username});
    

    console.log(users);
    
}

const getallUser = async () =>{
    
    
    
    try {
        var response = await axios.get('https://codeforces.com/api/user.info?handles=coder_ravan');
        let user_rank = response.data.result[0].rank;
        console.log(colors.cyan(response.data.result[0].rank));
        
        question_list("newbie");

        
    } catch (error) {
        console.log(error.message);
    }
} 

module.exports = getallUser;

