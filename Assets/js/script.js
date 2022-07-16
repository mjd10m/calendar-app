var taskStorage = [];
var elementEdit = '';
var textBoxInput = '';
var currentDate = moment().format('ddd MMMM Do');
//checks the current time and logs current time to console
function checkTime() {
$(".time-container .activity-container").each(function(index, el) {
    auditTask(el);
  });
  console.log(`Time Checked: ${moment().format("h:mm:ss a")}`);
}

setInterval(checkTime, 60000);

$("#currentDay").text(currentDate);
//open textarea when a time slot is clicked
function openTextBox(clickedEl) {

    textBoxInput = $("<textarea>").addClass("form-control col-7");
    $(clickedEl).append(textBoxInput);
    textBoxInput.trigger("focus");
    $(".saveBtn").css("pointer-events", "auto");
}
//opens textarea when an task is clicked
function openTextBoxEdit(clickedEl) {
    elementEdit = clickedEl;
    var text = $(clickedEl).text().trim();
   textBoxInput = $("<textarea>").addClass("form-control col-7").val(text);
   $(clickedEl).replaceWith(textBoxInput);
    textBoxInput.trigger("focus");
}
//saves tasks from the temporary textarea
function saveTask(clickedEl) {
    var taskText = $("textarea").val().trim();
    var taskContainer = $(clickedEl).prev();
    var clickedElClass = $(clickedEl)[0].classList[0];
    createTask(taskText, taskContainer, elementEdit, textBoxInput, clickedElClass);
    var newArr = []
    $(".activity").each(function() {
        if(newArr.length === 0) {
        var newActivityId = newArr.length
        var textUpdate = $(this).text();
        var idUpdate = $(this).parent().attr("id");
        $(this).attr("id", newActivityId)
        newArr.push({
            text: textUpdate,
            id: idUpdate
        })
        } else {
            var newActivityId = newArr.length + 1
            var textUpdate = $(this).text();
            var idUpdate = $(this).parent().attr("id");
            $(this).attr("id", newActivityId)
            newArr.push({
                text: textUpdate,
                id: idUpdate
        })
        }
        taskStorage = newArr
    })
    $("textarea").remove();
    $(".saveBtn").css("pointer-events", "none");
    elementEdit = '';
    textBoxInput = '';
    localStorage.setItem("tasks", JSON.stringify(taskStorage));
}
//handles all click events on the page and guides to the appropiate function 
$(document).on("click",function(event){
    var activityContainerClass = $(".activity-container")[0].classList[0];
    var activityClass = $(".activity").attr("class");
    var saveBtnClass = $(".saveBtn")[0].classList[0];
    var textAreaClass = $("textarea").attr("class");
    console.log(event.target);
    console.log(textAreaClass);
    var clickedEl = event.target;
    var clickedElClass = $(clickedEl)[0].classList[0];
    if(clickedElClass === activityContainerClass && textAreaClass === undefined) {
        openTextBox(clickedEl);
        $(".saveBtn").css("pointer-events", "auto");
    } else if(clickedElClass === activityClass && textAreaClass === undefined) {
        openTextBoxEdit(clickedEl);
        $(".saveBtn").css("pointer-events", "auto");
    } else if(clickedElClass === saveBtnClass) {
        saveTask(clickedEl);
    } else if(!(textAreaClass === undefined)) {
        if(elementEdit === '') {
            $("textarea").remove();
        } else {
            debugger;
            var index = $(elementEdit).attr("id");
            var taskobj = taskStorage[index];
            var taskText = taskobj.text;
            $(elementEdit).text(taskText);
            $(textBoxInput).replaceWith(elementEdit);
            elementEdit = '';
            textBoxInput = '';
        }
    }
})
//creates the div element to store task
function createTask(taskText, taskContainer, elementEdit, textBoxInput, clickedElClass) {
    var taskNumber = $(".activity").length;
    var taskDiv = $("<div>").addClass("activity").attr("id", taskNumber);
    var taskId = $(taskContainer).attr("id");
    if (elementEdit === '') {
    taskDiv.text(taskText);
    taskContainer.append(taskDiv);
    taskStorage.push({
        text: taskText,
        id: taskId
    });
    } else {
        $(elementEdit).text(taskText);
        $(textBoxInput).replaceWith(elementEdit);
    }
}
//updates the columns color when hour changes
function auditTask(task) {
    var timeOffset = parseInt($(task).attr("id"));
    var time = parseInt(moment().format("H"));
    $(task).removeClass("past present future");
    if (time > timeOffset + 8) {
        $(task).addClass("past");
      } else if (time == timeOffset + 8) {
        $(task).addClass("present");
      } else {
        $(task).addClass("future");
      }
}
//retrieves saved tasks from local storage and publishes to page
function loadStoredTasks() {
    var recalledTasks = JSON.parse(localStorage.getItem("tasks"));
    recalledTasks.forEach((obj, index) => {
        var taskText = obj.text;
        var containerClassId = ".activity-container" + "#" + obj.id
        var taskContainer = $(containerClassId);
        createTask(taskText, taskContainer, elementEdit, textBoxInput);
    })
}
//function to run when page is loaded
function load() {
    $(".saveBtn").css("pointer-events", "none");
    checkTime();
    loadStoredTasks();
}
load()


  
  
