/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  
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
]

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    $(".tweet-container").prepend(createTweetElement(tweet)); // use prepend to push down tweets
  }
}

const createTweetElement = function(tweet) {
  
  let $tweet = `<div>
      <article class="tweet"> 
        <header>
            <div class="userIcon">
              <img src=${tweet.user.avatars}>
              <h3 class="userName">${tweet.user.name}</h3>
            </div>
              
              <h3 class="userHandle"> ${tweet.user.handle}</h3>
          </header>
          <p class="tweet-memory">${tweet.content.text}</p>
        <footer class="tweet-footer">
            <p>${tweet.created_at} days ago</p>
            <ul>
              <li class="fa-solid fa-flag"></li>
              <li class="fa-solid fa-retweet"></li>
              <li class="fa-solid fa-heart"></li>
            </ul>
        </footer>
    </article>
    </div>`
  return $tweet;
}

renderTweets(data);

});