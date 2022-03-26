

//this takes a poll data and renders it into a div 
export function renderPoll(poll) {

    const newPollEl = document.createElement('div');
    const newQuestionEl = document.createElement('p');
    const newOptionOneEl = document.createElement('p');
    const newOptionTwoEl = document.createElement('p');
    const newVotesOneEl = document.createElement('p');
    const newVotesTwoEl = document.createElement('p');

    newPollEl.classList.add('poll');
   
    newQuestionEl.textContent = poll.question; //supabase value is on the right
    newOptionOneEl.textContent = poll.option_1;
    newOptionTwoEl.textContent = poll.option_2;
    newVotesOneEl.textContent = poll.vote_1;
    newVotesTwoEl.textContent = poll.vote_2;
    
    newPollEl.append(newQuestionEl, newOptionOneEl, newOptionTwoEl, newVotesOneEl, newVotesTwoEl);

    return newPollEl;
}

