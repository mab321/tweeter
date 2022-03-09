$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let inputLength = $(this).val().length;
    const defaultMaxChars = 140;
    let charCounter = defaultMaxChars - inputLength;
    if (charCounter < 0) {
      $(".counter").text(charCounter).css('color', 'red');
    } else {
      $(".counter").text(charCounter).css('color', 'black');
    }
  })
  
});
