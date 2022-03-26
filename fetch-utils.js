const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YXF1aGF3cXl0dHhkcmNiaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTE5ODEsImV4cCI6MTk2MzEyNzk4MX0.FnfsYqPR7GPz5COh7itHiDt6as7-F__iU57NyG7IKyE';
const SUPABASE_URL = 'https://zwaquhawqyttxdrcbhxx.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.user(); //what does this line do? 
}
//how does this code talk to supabase?
//what if the user is signing up? there's no data to grab right?


export function checkLoggedIn() {
    if (!client.auth.session()) {
        window.location = '../'; // this means home 
    }
}
// if the person is logged in, redirect them to the home page 



export async function logout() {
    await client.auth.signOut(); //what does this line of code do? how does it talk to supabase?

    return window.location.href = '../'; //return person to home page. im assuming home html
}   

//async?
//await ?

export async function signUp(realEmail, realPassword) { // is realEmail and realPassword boogers? or do they refer to something supabase?
    console.log('before sign up', client.auth.user()); // what does this line of code mean?

    const response = await client.auth.signUp({ //what does client.auth.signUp mean
        email: realEmail, //is the left email referring to column in supabase? and right hand side is booger?
        password: realPassword, //is the purpose of this function to ?
    });
//
     // this should log in information about the user we just signed up, since there will now be a token around
    console.log('after sign up', client.auth.user());  //what does this line do?

    return response.user; // what does this line do// need help understanding dot notation 
}


export async function savePoll(question, option1, option2, vote1, vote2) {
    const response = await client 
        .from ('polls')
        .insert([
            {
                question: question,  
                option_1:option1, // left side referring to column in supabase, right hand side is a booger were passing through?
                option_2:option2,
                vote_1:vote1,
                vote_2:vote2
            },

        ]);
    console.log(option1);
    return response.data; //what does this do? 
}


export async function getPolls() {
    const response = await client
        .from('polls')
        .select(); // () or ("*") mean the exact same thing 
    return response.data;
}