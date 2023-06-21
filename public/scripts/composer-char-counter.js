$(document).ready(function() {

  const $textInput = $("#tweet-text");
  const $label = $('#text-label');
  
  // Create tweet text input event 
  $textInput.on('input',function(event) {
    event.preventDefault();

    // Hide and show label based on if text is inputed
    if ($textInput.val().length > 0) {
      $label.hide();
    } else {
      $label.show();
    }

    // Looks up to the parent (form) finds decendent with .counter
    const counter =  $(this).parent().find('.counter');
    // Sets that to 140 - the number of chars in the text area (this)
    let currentCount = 140 - $(this).val().length;

    // Checks if counter is negative and changes css color for counter
    if (currentCount < 0) {
      counter.css({
        'color': 'red'
      })
    } else {
      counter.css({
        'color': '#545149'
      })
    }
    counter.val(currentCount);
  });
});