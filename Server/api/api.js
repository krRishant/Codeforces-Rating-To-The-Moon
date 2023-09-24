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

let rating_list = [
     'pupil', 'specialist',
    'expert', 'candidate master','master',
    'international master', 'grandmaster', 'international grandmaster',
    'legendary grandmaster'

]

const question_list = async (curr_rating) => {

    const users = usersWithRating[curr_rating].map(users => { return users.username });
    let currentTime = Math.round(new Date().getTime() / 1000);

    // Create an object to store the frequency of solved problems
    let pFreq = new Map([]);

    // Get the submission history of the  first 10 users
    async function getSubmissionHistory(user) {
        try {
            const response = await axios.get(`https://codeforces.com/api/user.status?handle=${user}`);
            let data = response.data;
            // console.log(data.result[0]);
            // Filter the submissions to include only those made in the last 6 months and with a verdict of "OK"
            let solvedSubmissions = data.result.filter(
                (submission) =>
                    submission.verdict === "OK" &&
                    submission.creationTimeSeconds >= currentTime - 6 * 30 * 24 * 60 * 60
            );
            // Extract the problem IDs and tags as array of objects from the filtered submissions
            solvedSubmissions.forEach(
                (submission) => {
                    if (pFreq.has(submission.problem.contestId + submission.problem.index)) {
                        let curr_obj = pFreq.get(submission.problem.contestId + submission.problem.index);
                        let updated_obj = {
                            frequency: curr_obj.frequency + 1,
                            tags: curr_obj.tags
                        }
                        pFreq.set(submission.problem.contestId + submission.problem.index, updated_obj);
                    } else {
                        pFreq.set(submission.problem.contestId + submission.problem.index, {
                            frequency: 1,
                            tags: submission.problem.tags
                        });
                    }
                }
            );


        } catch (error) {
            // Handle error
            console.log(error);
        }
    };
    for (var i = 0; i < Math.min(users.length, 1); i++) {
        let user = users[i];
        await getSubmissionHistory(user);
    }
    // console.log("myMap",pFreq);
    let solvedProblems = [];
    for (let [key, value] of pFreq) {
        solvedProblems.push({
            problemId: key,
            frequency: value.frequency,
            tags: value.tags

        })
        // console.log(key + " = " + value);
    }
    // sort on the basis of frequency 
    const sortedSolvedProblems = solvedProblems.sort((a, b) => b.frequency - a.frequency);


    console.log("findal solvedProblemsay, ", sortedSolvedProblems);


    const jsonData = {
        [curr_rating]: sortedSolvedProblems
    }
    const jsonString = JSON.stringify(jsonData,null,2);

    fs.writeFileSync(`./questions/${curr_rating}.json`,jsonString);


};


const getallUser = async () => {



    try {
        var response = await axios.get('https://codeforces.com/api/user.info?handles=coder_ravan');
        let user_rank = response.data.result[0].rank;
        console.log(colors.cyan(user_rank));
        // console.log(rating_list);
        question_list('pupil');
        // for (let key in rating_list) {
        //     // console.log(colors.blue(rating_list[key]));
        //     question_list(rating_list[key]);
        // }


    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getallUser;

