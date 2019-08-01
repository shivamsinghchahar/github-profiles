const SEARCH = document.querySelector('input[type="submit"]');
const USERNAME = document.querySelector('#user-input');
const url = 'https://api.github.com/users/';
const AVATAR = document.querySelector('.avatar img');
const NAME = document.querySelector('.avatar p');
const USR = document.querySelector('#username');
const FOLLOW = document.querySelector('#followers');
const REPOS = document.querySelector('#repos');

// Hide the container class of user
const CONTAINER = document.querySelector('.user-container');
CONTAINER.style.visibility = 'hidden';

function drawUser (user) {
    AVATAR.src = user.avatar_url;
    NAME.textContent = user.name;
    USR.textContent = user.login;
    FOLLOW.textContent = user.followers + ' followers';
    REPOS.textContent = user.public_repos + ' repos';

    CONTAINER.style.visibility = 'visible';
}

function fetchUser (username) {
    console.log(url + username);
    
    const XHR = new XMLHttpRequest();
    // Open request for the particular user
    XHR.open("GET", `${url}${username}`);
    
    XHR.onloadstart = () => console.log('Fetching user data...');
    XHR.onload = () => {
        drawUser( JSON.parse(XHR.response) );
    };
    XHR.onloadend = () => console.log('User fetched successfully!!');
    XHR.send();
}

function searchUser (event) {
    if (!USERNAME.value) {
        alert('Username can\'t be empty!!');
    } else {
        console.log(url);
        fetchUser(USERNAME.value);
    }
}

SEARCH.addEventListener('click', searchUser);