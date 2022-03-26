import { checkLoggedIn, logout, getPolls, savePoll } from '../fetch-utils.js';
//pulling checkLoggedin function

//this page is making the poll page  interactive

import { renderPoll } from '../render-utils.js';
//calling render function

checkLoggedIn();
//what does this line of code do? 

//now were going to pull the DOM from html

const questionEl = document.querySelector('.question'); //refers to question input in poll
const logoutEl = document.querySelector('#logout'); // an id cant we use get element.by id

//current poll elements 
const defaultQuestionEl = document.querySelector('.current-poll-question'); //class //default question in current poll div 
const optionOneTitle = document.querySelector('.option-one-title'); // class // option 1 title current poll div 
const optionOneButton = document.querySelector('.option-one-button'); // class // option 1 vote button current poll 
const optionOneVotesEl = document.querySelector('.option-one-votes'); //class // option 1 votes div current poll
const optionTwoTitle = document.querySelector('.option-two-title'); //class //option 2 title in current poll
const optionTwoVotesEl = document.querySelector('.option-two-votes'); //class // # of votes div current poll
const optionTwoButton = document.querySelector('.option-two-button'); //class //option 2 vote button current poll
const finishButtonEl = document.querySelector('.finish-button'); //class current poll div 
const optionTwoDownVote = document.querySelector('.option-two-decrement-button');  //class current poll div 
const optionOneDownVote = document.querySelector('.option-one-decrement-button'); //class current poll div 

const pollFormEl = document.querySelector('#poll-form'); //id // poll for on left side of site 

const pastPollsEl = document.querySelector('.past-polls-container'); //poll container at the bottom


// state 
let pollObject = { 
    question: '',
    option1Title : '',
    option1Votes : 0,
    option2Title :'',
    option2Votes : 0,
};


window.addEventListener('load', async () => {    
    await displayPolls(); 
// - on load, 
//   - go fetch all this user's past polls 
//   - display them
});

logoutEl.addEventListener('click', async () => {
    await logout(); 
    //when this runs, then we run logout function
});


// - On submit add question and options
//this is the form on the right, when we click on add questions and options 
pollFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollFormEl);
    //were getting data from form 

    //now we are grabbing the state and equaling it to the data in the form  
    pollObject.question = data.get('question'); //were setting the question key in the state equal to the user question input
    pollObject.option1Title = data.get('option-one');
    pollObject.option1Votes = data.get('option-one-votes');
    pollObject.option2Title = data.get('option-two');
    pollObject.option2Votes = data.get('option-two-votes');

    //then we will equal the DOM elements to the data that the person entered in the form!

    defaultQuestionEl.textContent = pollObject.question;
    optionOneTitle.textContent = pollObject.option1Title;
    optionOneVotesEl.textContent = pollObject.option1Votes;
    optionTwoTitle.textContent = pollObject.option2Title;
    optionTwoVotesEl.textContent = pollObject.option2Votes;

    pollFormEl.reset();
    //clearing out the poll form! :) 

});

//now we need to enable buttons to increase 
// - On click vote
//   - increment the state of the vote for that option,
//   - then display the change

optionOneButton.addEventListener('click', () => {
    pollObject.option1Votes++; //updating the state's values 

    optionOneVotesEl.textContent = pollObject.option1Votes;
    //then we will update the Dom/html element with the value in line 84
});


optionTwoButton.addEventListener('click', () => {
    pollObject.option2Votes++; //updating the state's values 

    optionTwoVotesEl.textContent = pollObject.option2Votes;
     //then we will update the Dom/html element with the value in line 84
});


optionOneDownVote.addEventListener('click', () => {
    pollObject.option1Votes--;

    optionOneVotesEl.textContent = pollObject.option1Votes;
    
});

optionTwoDownVote.addEventListener('click', () => {
    pollObject.option2Votes--;

    optionTwoVotesEl.textContent = pollObject.option2Votes;

});




//now lets create a finish poll button! :) 

finishButtonEl.addEventListener('click', async () => {
//this button should take info from the current poll render it and then 
//and then lets move the current poll into past polls!
console.log(pollObject.question, pollObject.option1Title, pollObject.option1Votes, pollObject.option2Title, pollObject.option2Votes);
//   - Take the current poll state and add it to past polls IN SUPABASE!!!
    await savePoll(pollObject.question, pollObject.option1Title, pollObject.option1Votes, pollObject.option2Title, pollObject.option2Votes);

//   - Re-fetch the polls from supabase and redisplay the list (clear the list in the DOM, render, and append)
    displayPolls();
    // reset the state to empty and call display current poll function to reset everything 
});


async function displayPolls() {
    const polls = await getPolls();

    pastPollsEl.textContent = '';
    for (let poll of polls) { //is polls referring to poll name in supabase 
        const newPollEl = renderPoll(poll);

        pastPollsEl.append(newPollEl);
    }

}


