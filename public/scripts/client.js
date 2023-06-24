$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
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
        <div>${escape(data.content.text)}</div>
        <div class="horizontal-line"></div>
        <footer class="tweet-footer">
            <h4>${timeago.format(data.created_at)}</h4>
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
    const $container = $('#tweets-container').empty();

    for (const tweet of tweets) {
      $container.prepend(createTweetElement(tweet));
    }
  };

  // Get request to /tweets to load database of tweets
  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      }
    });
  };

  loadTweets();

  // Post request to /tweets on submission of form
  // Tweet created will then load in dynamically
  const $tweetForm = $('.tweet-form');
  $tweetForm.on('submit', (event) => {
    event.preventDefault();

    // resets the text area height on submit in the case that user had a long tweet
    
    
    const textArea = $tweetForm.find('#tweet-text').val();
    const error = $('#error-display');

    
    // error handling for tweets equal to 0 or greater than 140
    if (textArea.length === 0) {
      error.text('Error: Need to more than 0 characters to submit tweet');
      error.slideDown()
      return;
    }

    if (textArea.length > 140) {
      error.text('Error: Cannot exeed for than 140 characters');
      error.slideDown();
      return;
    }

    $tweetForm.find('#tweet-text').css({
      'height': '40px'
    })

    const serialized = $tweetForm.serialize();

    $.ajax({
      method: 'POST',
      url: 'http://localhost:8080/tweets',
      data: serialized,
      success: () => {
        error.slideUp();
        $tweetForm.find('#tweet-text').val('');
        $tweetForm.find('#text-label').show();
        loadTweets();
      }
    });
  });
});