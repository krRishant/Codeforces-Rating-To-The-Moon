const axios = require('axios');
const userwithRating = require('usersWithRating');
let rating = {};
rating['newbie'] =1;
rating['pupil'] =2;
rating['specialist'] =3;
rating['expert'] =4;
rating['candidate master'] =5;
rating['master'] =6;
rating['international master'] =7;
rating['grandmaster'] =8;
rating['international grandmaster'] =9;
rating['legendary grandmaster'] =10;

let reverse_rating = {};
reverse_rating[1] ="newbie";
reverse_rating[2] ="pupil";
reverse_rating[3] ="specialist";
reverse_rating[4] ="expert";
reverse_rating[5] ='candidate master';
reverse_rating[6] ='master';
reverse_rating[7] ='international master';
reverse_rating[8] ='grandmaster';
reverse_rating[9] ='international grandmaster';
reverse_rating[10] ='legendary grandmaster';

const getallUser = async () =>{
    
    
    try {
        var response = await axios.get('https://codeforces.com/api/user.info?handles=coder_ravan');
        let user_rank = response.data.result[0].rank;
        console.log(response.data.result[0].rank);
        
    } catch (error) {
        console.log(error.message);
    }
} 

module.exports = getallUser;

