const REPO_INFO = document.querySelectorAll('.repo-title');
const STARS = document.querySelectorAll('.star-count');
const FORKS = document.querySelectorAll('.fork-count');
const DES = document.querySelectorAll('.repo-description');
// https://api.github.com/users/chaharshivam/subscriptions
function fetchUserInfo (username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then( res => res.json() )
    .then( res => topFour(res) );
}

function drawInfo (data) {
    REPO_INFO.forEach( (tag, idx) => tag.textContent = data[idx].name);
    STARS.forEach( (tag, idx) => tag.textContent = data[idx].stargazers_count);
    FORKS.forEach( (tag, idx) => tag.textContent = data[idx].forks);
    DES.forEach( (tag, idx) => tag.textContent = data[idx].description);
}

function topFour (data) {
    let TOP = [];

    data.sort( (b, a) => (a.forks + a.stargazers_count) - (b.forks + b.stargazers_count) );

    for (let i = 0; i < 4; ++i) {
        TOP.push({...data[i]});
    }
    drawInfo(TOP);
}
