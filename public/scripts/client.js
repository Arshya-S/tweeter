$(document).ready(function() {

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
      $container.prepend(createTweetElement(tweet))
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

    const textArea = $tweetForm.find('#tweet-text').val();

    if (textArea.length === 0) {
      alert('Please type something to be able to submit!');
    } else if (textArea.length > 140) {
      alert('Please keep the character length to at most 140!');
    }

    


    const serialized = $tweetForm.serialize();

    $.ajax({
      method: 'POST',
      url: 'http://localhost:8080/tweets',
      data: serialized,
      success: () => {
        $tweetForm.find('#tweet-text').val('');
        $tweetForm.find('#text-label').show();
        loadTweets();
      }
    });
  });

});