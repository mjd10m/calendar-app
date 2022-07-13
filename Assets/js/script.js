
$(".activity-container").on("click", ".activity", function() {
    console.log("clicked")
    var text = $(this)
   .text()
   .trim();
   var textInput = $("<textarea>")
   .addClass("form-control")
   .val(text);
   $(this).replaceWith(textInput);
   textInput.trigger("focus");
   });


$(".time-container").on("click", ".activity-container", function() {
   console.log("clicked")
  var textInput = $("<textarea>")
  .addClass("form-control col-10")
  $(this).append(textInput);
  textInput.trigger("focus");
  });
