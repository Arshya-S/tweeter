const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// Function to create a tweet based on data given
const createTweetElement = (data) => {
  const $tweet = $(`
  <article class="tweet">
      <header class="tweet-header">
        <div class="header-info">
          <img class="tweet-image" src=${data.user.avatars}> 
          <h3 class="tweet-name">${data.user.name}</h3>
        </div>
        <h4>${data.user.handle}</h4>
      </header>
      <div>${data.content.text}</div>
      <div class="horizontal-line"></div>
      <footer class="tweet-footer">
          <h4>${data.created_at}</h4>
            <div class="footer-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-arrows-rotate"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
    </article>
  `);

  return $tweet;
};

// Function to loop through tweet data and append to tweets-container
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet))
  }
};

renderTweets(data);

