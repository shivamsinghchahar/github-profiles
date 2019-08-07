// just for fun, let's make an alias for document.querySelector:
const get = element => document.querySelector(element);
// we can organize these if we want...
// plus, prepending "ELEMENTS" to the variable name clarifies what they are
const ELEMENTS = {
  SEARCH: get('input[type="submit"]'),
  USERNAME: get('#user-input'),
  AVATAR: get('.avatar img'),
  NAME: get('.avatar p'),
  USR: get('#username'),
  FOLLOW: get('#followers'),
  REPOS: get('#repos'),
  SEARCHBAR: get('.search-profile'),
  CONTAINER: get('.user-container'),
};

// Hide the container class of user
// we should set default styles in the CSS,
// so we don't get a layout flicker when the JS loads

function drawUser(user) {
  ELEMENTS.AVATAR.src = user.avatar_url;
  ELEMENTS.NAME.textContent = user.name;
  ELEMENTS.USR.textContent = user.login;
  ELEMENTS.FOLLOW.textContent = user.followers + ' followers';
  ELEMENTS.REPOS.textContent = user.public_repos + ' repos';

  // instead of directly modifying styles, it's more convenient/flexible to modify classes
  ELEMENTS.CONTAINER.classList.remove('hidden');
}

// group related things together (easier to read)
const url = 'https://api.github.com/users/';
function fetchUser(username) {
  // you can also use the more recent fetch API:
  // (looks like you did that in info.js)
  return fetch(`${url}${username}`);
}

function searchUser(event) {
  if (!ELEMENTS.USERNAME.value) {
    alert("Username can't be empty!!");
  } else {
    fetchUser(ELEMENTS.USERNAME.value)
      .then(res => res.json())
      .then(data => drawUser(data))
      .catch(err => console.error(err));
    fetchUserInfo(ELEMENTS.USERNAME.value);
    ELEMENTS.USERNAME.value = '';
  }
}

ELEMENTS.SEARCH.addEventListener('click', searchUser);
