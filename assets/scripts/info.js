// https://api.github.com/users/chaharshivam/subscriptions
function fetchUserInfo(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => topFour(res))
    .catch(err => console.log(err));
}

// if the other function is simple enough, and since these are doing one thing, we might consider joining them into one function
function drawInfo(data) {
  let userInfo = ``;
  // rather than modifying elements on the page, it's cleaner to just create them!
  // here's a new length 4 empty array just to make a nice forEach loop.
  const NUM_INFO_ITEMS = 4;
  new Array(NUM_INFO_ITEMS).fill('').forEach((_, idx) => {
    // we can use "destructuring" to grab the data we need
    const { name, stargazers_count, forks, description } = data[idx];
    // info item template (backticks `` are called 'template literals' since they're great for templating)
    const infoItem = `
        <li>
            <h3 class="repo-title">${name}</h3>
            <span class="forks">
                <i class="fas fa-code-branch"></i>
                <span class="fork-count">${forks}</span>
            </span>
            <span class="stars">
                <i class="fas fa-star"></i>
                <span class="star-count">${stargazers_count}</span>
            </span>
            <p class="repo-description">${description || '(no description)'}</p>
        </li>
        `;
    // add it to the string...
    // we could also append it directly here, but I prefer to do as fewer DOM manipulations when possible
    userInfo += infoItem;
  });

  document.querySelector('.user-repos ul').innerHTML = userInfo;
}

// what does "topFour" do? a better function name would describe what it does
// like "renderTopFourRepos"
function topFour(data) {
  // because sort mutates our array, it becomes hard to keep track of what state it's in at any time
  // a better option is to always create a new array
  // one way to do this is the spread operator:
  const sortedData = [...data].sort(
    (b, a) => a.forks + a.stargazers_count - (b.forks + b.stargazers_count),
  );

  //   it took me a minute to figure out what you're doing here, some comments explaining this would be helpful
  //   for (let i = 0; i < 4; ++i) {
  // not sure why we're spreading into a new object here, is there a reason to make a new object?
  //       TOP.push({ ...sortedData[i] });
  //   }
  // we can avoid using a for loop by using an array method instead
  // (for loops are hard to read, & sometimes slower than array methods in JS)
  const TOP_FOUR_REPOS = sortedData.slice(0, 4);
  drawInfo(TOP_FOUR_REPOS);
}
