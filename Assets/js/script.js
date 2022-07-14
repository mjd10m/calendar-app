var taskStorage = []
var elementEdit = '';
var textBoxInput = '';
var currentDate = moment().format('ddd MMMM Do');
var clickedE1ClassAC = $(".activity-container").attr("class")

function checkTime() {
$(".time-container .activity-container").each(function(index, el) {
    auditTask(el);
  });
  console.log(`Time Checked: ${moment().format("h:mm:ss a")}`);
}

setInterval(checkTime, 60000);

$("#currentDay").text(currentDate)

/*$(".activity-container").on("click", ".activity", function() {
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

});*/

/*$(".time-container").on("click", ".activity-container", function() {
    console.log("clicked");
    textBoxInput = $("<textarea>").addClass("form-control col-7");
    $(this).append(textBoxInput);
    textBoxInput.trigger("focus");
    $(".activity-container").css("pointer-events", "none")
    $(".saveBtn").css("pointer-events", "auto")
});*/

function openTextBox(clickedEl) {

    textBoxInput = $("<textarea>").addClass("form-control col-7");
    $(clickedEl).append(textBoxInput);
    textBoxInput.trigger("focus");
    $(".saveBtn").css("pointer-events", "auto")
}
function openTextBoxEdit(clickedEl) {
    elementEdit = clickedEl;
    var text = $(clickedEl)
   .text()
   .trim();
   textBoxInput = $("<textarea>")
   .addClass("form-control col-7")
   .val(text);
   $(clickedEl).replaceWith(textBoxInput);
    textBoxInput.trigger("focus");
    /*$(".activity-container").css("pointer-events", "none")
    $(".saveBtn").css("pointer-events", "auto")*/

}

function saveTask(clickedEl) {
    var taskText = $("textarea").val().trim();
    var taskContainer = $(clickedEl).prev()
    createTask(taskText, taskContainer, elementEdit, textBoxInput)
    $("textarea").remove()
    $(".saveBtn").css("pointer-events", "none")
    elementEdit = ''
    textBoxInput = ''
    localStorage.setItem("tasks", JSON.stringify(taskStorage))
    debugger;
}

/*$(".time-container").on("click",".saveBtn", function() {
    var taskText = $("textarea").val().trim();
    var taskContainer = $(this)
    taskContainer = taskContainer.prev()
    createTask(taskText, taskContainer, elementEdit, textBoxInput)
    $("textarea").remove()
    $(".activity-container").css("pointer-events", "auto")
    $(".saveBtn").css("pointer-events", "none")
    elementEdit = ''
    textBoxInput = ''
});*/

$(document).on("click",function(event){
    var activityContainerClass = $(".activity-container")[0].classList[0]
    var activityClass = $(".activity").attr("class")
    var saveBtnClass = $(".saveBtn")[0].classList[0]
    var textAreaClass = $("textarea").attr("class")
    console.log(event.target)
    console.log(textAreaClass)
    var clickedEl = event.target;
    clickedElClass = $(clickedEl)[0].classList[0];
    if(clickedElClass === activityContainerClass && textAreaClass === undefined) {
        openTextBox(clickedEl)
        $(".saveBtn").css("pointer-events", "auto")
    } else if(clickedElClass === activityClass) {
        openTextBoxEdit(clickedEl);
        $(".saveBtn").css("pointer-events", "auto")
    } else if(clickedElClass === saveBtnClass) {
        saveTask(clickedEl)
    } else if(!(textAreaClass === undefined)) {
        if(elementEdit === '') {
            $("textarea").remove()
        } else {
            var taskText = $(textBoxInput).val().trim()
            $(elementEdit).text(taskText);
            $(textBoxInput).replaceWith(elementEdit);
            elementEdit = ''
            textBoxInput = ''

        }

    }
    /*textBoxInput.replaceWith(elementEdit);
        $(".activity-container").css("pointer-events", "auto")
        $(".saveBtn").css("pointer-events", "none")*/
})

function createTask(taskText, taskContainer, elementEdit, textBoxInput) {
    var taskDiv = $("<div>").addClass("activity").attr("id", taskNumber);
    var taskId = $(taskContainer).attr("id")
    var taskNumber = $(".activity").length
    if (elementEdit === '') {
    taskDiv.text(taskText);
    taskContainer.append(taskDiv)
    taskStorage.push({
        text: taskText,
        id: taskId
    });
    } else {
        var index = $(element).first().attr("id")
        $(elementEdit).text(taskText);
        $(textBoxInput).replaceWith(elementEdit);

        taskStorage[index].text = text;
    }
}

function auditTask(task) {
    var timeOffset = parseInt($(task).attr("id"))
    var time = parseInt(moment().format("H"))
    $(task).removeClass("past present future");
    if (time > timeOffset + 8) {
        $(task).addClass("past");
      } else if (time == timeOffset + 8) {
        $(task).addClass("present");
      } else {
        $(task).addClass("future");
      }
}

function loadStoredTasks() {
    var recalledTasks = JSON.parse(localStorage.getItem("tasks"));
    recalledTasks.forEach((obj, index) => {
        debugger;
        var taskText = obj.text
        var containerClassId = ".activity" + "#" + obj.id
        var taskContainer = $(containerClassId)
        createTask(taskText, taskContainer, elementEdit, textBoxInput)
    })
}

function load() {
    $(".saveBtn").css("pointer-events", "none")
    checkTime();
    loadStoredTasks()
    
    //$(.activity-container#1)
}
load()


  
  
