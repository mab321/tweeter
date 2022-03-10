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
// escape to prevent XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



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
          <p class="tweet-memory">${escape(tweet.content.text)}</p>
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
     $(".counter").val(140);
   });
  
  
};
loadTweets();

$("#myFormTweet").submit(function(event) {
  event.preventDefault();

  $("#alertCard").slideUp(); //hides element by sliding upwards animation
  
  const textInput = event.target[0].value;
  if (!textInput) {
    $("#alertContent").text('Please enter make sure to enter atleast character to tweet');
    $("#alertCard").slideDown();
    setTimeout(() => {
      $("#alertCard").slideUp();
    }, 3000);
  } else if (textInput.length > 140) {
    $("#alertContent").text('Please limit your tweet to 140 characters only');
    $("#alertCard").slideDown();
    setTimeout(() => {
      $("#alertCard").slideUp();
    }, 3000);
  } else {
    
    $.ajax({
      type: 'POST',
      url:'/tweets/',
      data:$(this).serialize()
    }).then(function () {
      // this is to load without refreshing after it tweet has been saved.
     loadTweets();
    })
  }

})



});