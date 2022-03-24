// import functions and grab DOM elements

// let state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state

import { signUp } from './fetch-utils.js';

const signUpForm = document.querySelector('#sign-up');
//why isn't this line getElementbyID since its an id in html? 


  // - Once the user hits submit on the form . . .
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  // - get the username and password from the form (`new FormData(form)`)

    const data = new FormData(signUpForm);
    const email = data.get('email');
    const password = data.get('password'); //why is email and password in quotations? where is it pulling from?
    // - "log in the user"
    await signUp(email, password); //email and password are boogers but need to take 2 arguments?
    // - redirect the user to the protected page with their data
    window.location.href = './polls';
});