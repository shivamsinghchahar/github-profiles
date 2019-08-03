const THEME = document.querySelector('.theme');
const THEME_BUTTON = document.querySelector('.theme-button');
const LOGO = document.querySelector('.logo');
const FORM = document.querySelector('form');
const INFO = document.querySelector('.info ul');
const USR_LIST = document.querySelectorAll('.user-repos li');


let dark = JSON.parse(localStorage.getItem('dark'));

function defaultTheme() {
    if(dark) {
        THEME.innerHTML = '<small>&#x1f315;</small>';
        document.body.style.background = '#051014';
        LOGO.style.color = 'white';
        INFO.style.color = 'white';
        USR_LIST.forEach( tag => tag.style.color = 'white');
    } else {
        THEME.innerHTML = '<i class="fas fa-sun"></i>';
        document.body.style.background = '#CDDDDD';
        LOGO.style.color = '#051014';
        INFO.style.color = '#0D0A0B';
        USR_LIST.forEach( tag => tag.style.color = '#051014');
    }
};


function updateLocal (value) {
    localStorage.setItem('dark', `${value}`);
}

function switchTheme () {
    dark = !dark;
    updateLocal(dark);
    defaultTheme();
};

THEME_BUTTON.addEventListener('click', switchTheme);
defaultTheme();