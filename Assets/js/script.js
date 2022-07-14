var tasks = {}
var taskStorage = []
var elementEdit = '';
var textBoxInput = '';
var currentDate = moment().format('ddd MMMM Do');

function checkTime() {
$(".time-container .activity-container").each(function(index, el) {
    auditTask(el);
  });
}

setInterval(checkTime(), 10000);

$("#currentDay").text(currentDate)

$(".activity-container").on("click", ".activity", function() {
    console.log("clicked")
    elementEdit = $(this);
    var text = $(this)
   .text()
   .trim();
   textBoxInput = $("<textarea>")
   .addClass("form-control col-7")
   .val(text);
   $(this).replaceWith(textBoxInput);
    textBoxInput.trigger("focus");
    $(".activity-container").css("pointer-events", "none")
    $(".saveBtn").css("pointer-events", "auto")

});
//$(".activity-container").on("blur","textarea",function(){

//})

$(".time-container").on("click", ".activity-container", function() {
    console.log("clicked");
    var textInput = $("<textarea>").addClass("form-control col-7");
    $(this).append(textInput);
    textInput.trigger("focus");
    $(".activity-container").css("pointer-events", "none")
    $(".saveBtn").css("pointer-events", "auto")
});

$(".time-container").on("click",".saveBtn", function() {
    var taskText = $("textarea").val().trim();
    var taskContainer = $(this)
    taskContainer = taskContainer.prev()
    createTask(taskText, taskContainer, elementEdit, textBoxInput)
    $("textarea").remove()
    $(".activity-container").css("pointer-events", "auto")
    $(".saveBtn").css("pointer-events", "none")
    elementEdit = ''
    textBoxInput = ''
    
});

function createTask(taskText, taskContainer, elementEdit, textBoxInput) {
    var taskDiv = $("<div>").addClass("activity").attr("id", taskNumber);
    var taskId = $(taskContainer).attr("id")
    var taskNumber = $(".activity").length
    if (elementEdit === '') {
    taskDiv.text(taskText);
    taskContainer.append(taskDiv)
    console.log(taskId);
    console.log(taskText);
    } else {

        elementEdit.text(taskText);
        textBoxInput.replaceWith(elementEdit);
    }
}

function auditTask(task) {
    var timeOffset = $(task).attr("id")
    var time = moment().format("H")
    $(task).removeClass("past present future");
    if (time > timeOffset + 8) {
        $(task).addClass("past");
      } else if (time === timeOffset + 8) {
        $(task).addClass("present");
      } else {
        $(task).addClass("future");
      }
    console.log(time);
}

function load() {
    $(".saveBtn").css("pointer-events", "none")
}
load()


  
  
