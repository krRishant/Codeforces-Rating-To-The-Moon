const axios = require('axios');
const colors = require('colors');
const usersWithRating = require('../usersWithRating.json');
const fs = require('fs');

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


const question_list = async (curr_rating) => {

    let next_rating = rating[curr_rating];
    console.log(next_rating);
    const users = usersWithRating[next_rating].map(users => { return users.username });
    let currentTime = Math.round(new Date().getTime() / 1000);

    // Create an object to store the frequency of solved problems
    let pFreq = new Map([]);

    // Get the first user

    let user = "Rishant_07";
    console.log(user);

    // Get the submission history of the  first 10 users

    axios
        .get(`https://codeforces.com/api/user.status?handle=${user}`)
        .then((response) => {
            let data = response.data;
            // console.log(data.result[0]);
            // Filter the submissions to include only those made in the last 6 months and with a verdict of "OK"
            let solvedSubmissions = data.result.filter(
                (submission) =>
                    submission.verdict === "OK" &&
                    submission.creationTimeSeconds >= currentTime - 1 * 30 * 24 * 60 * 60
            );
            // Extract the problem IDs and tags as array of objects from the filtered submissions
            solvedSubmissions.forEach(
                (submission) => {
                    if(pFreq.has(submission.problem.contestId + submission.problem.index)){
                        let curr_obj = pFreq.get(submission.problem.contestId + submission.problem.index);
                        let updated_obj = {
                            frequency: curr_obj.frequency+1,
                            tags: curr_obj.tags
                        }
                        pFreq.set(submission.problem.contestId + submission.problem.index,updated_obj);
                    }else {
                        pFreq.set(submission.problem.contestId + submission.problem.index,{
                            frequency: 1,
                            tags:submission.problem.tags
                        });    
                    }
                }
            );
            
            console.log("Map", pFreq);
            // console.log(solvedProblems);
            // Update the frequency of solved problems as  problemId : { frequency:   ,  tags: []}


            // sort the updatedSolvedProblems array by frequency in descending order
            // const sortedSolvedProblems = solvedProblems.sort((a, b) => b.frequency - a.frequency);

            // console.log("solved problem",sortedSolvedProblems);
        })
        .catch((error) => {
            // Handle error
            console.log(error);
        });



};


const getallUser = async () => {



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

