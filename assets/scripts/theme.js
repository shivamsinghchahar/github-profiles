const THEME = document.querySelector('.theme');
const THEME_BUTTON = document.querySelector('.theme-button');
const LOGO = document.querySelector('.logo');
const FORM = document.querySelector('form');
const INFO = document.querySelector('.info ul');

let dark = JSON.parse(localStorage.getItem('dark')) || true;

function defaultTheme() {
    if(dark) {
        THEME.innerHTML = '<small>&#x1f315;</small>';
        document.body.style.background = '#051014';
        LOGO.style.color = 'white';
        INFO.style.color = 'white';
    } else {
        THEME.innerHTML = '<i class="fas fa-sun"></i>';
        document.body.style.background = '#CDDDDD';
        LOGO.style.color = '#051014';
        INFO.style.color = '#0D0A0B';
    }
};
defaultTheme();

function updateLocal (value) {
    dark = !dark;
    localStorage.setItem('dark', `${value}`);
}

function switchTheme () {
    updateLocal(dark);
    if(dark) {
        THEME.innerHTML = '<small>&#x1f315;</small>';
        document.body.style.background = '#051014';
        LOGO.style.color = 'white';
        INFO.style.color = 'white';
    } else {
        THEME.innerHTML = '<i class="fas fa-sun"></i>';
        document.body.style.background = '#CDDDDD';
        LOGO.style.color = '#051014';
        INFO.style.color = '#0D0A0B';
    }
};

THEME_BUTTON.addEventListener('click', switchTheme);