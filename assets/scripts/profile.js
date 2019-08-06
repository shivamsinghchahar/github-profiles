const SEARCH = document.querySelector('input[type="submit"]');
const USERNAME = document.querySelector('#user-input');
const url = 'https://api.github.com/users/';
const AVATAR = document.querySelector('.avatar img');
const NAME = document.querySelector('.avatar p');
const USR = document.querySelector('#username');
const FOLLOW = document.querySelector('#followers');
const REPOS = document.querySelector('#repos');
const SEARCHBAR = document.querySelector('.search-profile');
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
    return new Promise(
        (resolve, reject) => {
            const XHR = new XMLHttpRequest();

            XHR.open("GET", `${url}${username}`);

            XHR.onload = () => resolve( new Response (XHR.response) );
            XHR.onerror = () => reject( new Error('Error occured') );

            XHR.send();
        }
    );
}

function searchUser (event) {
    if (!USERNAME.value) {
        alert('Username can\'t be empty!!');
    } else {
        fetchUser(USERNAME.value)
        .then( res => res.json() )
        .then( data => drawUser(data))
        .catch( err => console.error(err) );
        fetchUserInfo(USERNAME.value);
        USERNAME.value = '';
    }
}

SEARCH.addEventListener('click', searchUser);