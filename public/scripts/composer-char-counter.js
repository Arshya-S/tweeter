$(document).ready(function() {
  const $textInput = $("#tweet-text");
  
  $textInput.on('input',function(event) {
    event.preventDefault();

    // Looks up to the parent (form) finds decendent with .counter
    const counter =  $(this).parent().find('.counter');
    // Sets that to 140 - the number of chars in the text area (this)
    let currentCount = 140 - $(this).val().length;

    // Checks if counter is negative and changes css color for counter
    if (currentCount < 0) {
      counter.css({
        'color': 'red'
      })
    }

    counter.val(currentCount);


  });
 
});