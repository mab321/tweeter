/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  


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
            <p>${timeago.format(tweet.created_at)} days ago</p>
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

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: "http://localhost:8080/tweets"
   }).then(function(tweets) {
     renderTweets(tweets);
     $("#tweet-text").val('');
   });
  
  
};
loadTweets();

$("#myFormTweet").submit(function(event) {
  event.preventDefault();

  const textInput = event.target[0].value;
  if (!textInput) {
    alert("You must enter something to tweet");
  } else if (textInput.length > 140) {
    alert("140 max chars are allowed");
  } else {
    
    $.ajax({
      type: 'POST',
      url:'/tweets/',
      data:$(this).serialize()
    }).then(function (successfulTweet) {
      renderTweets(successfulTweet)
      $("#tweet-text").val('');
    })
  }

})



});