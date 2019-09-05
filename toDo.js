//variables 
var id = 0;  
var taskArray = [];
var completedList =[]; 
var completeSt = 0;
//var checkbox; 

//Const variables
const todoListitems = document.querySelector('.toDolistitems');
const done = document.querySelector('.done');
const taskEntered = document.querySelector('#task');
const btnAdd = document.querySelector('.btnAdd');
const errMsg = document.querySelector('.msg');
const btnClear = document.querySelector('.btnClear');
const totalTasks = document.querySelector('.totalTasks');
const date = document.querySelector('.date');
const efficiency = document.querySelector('.efficiency');
const complete = document.querySelector('.complete');
const today = new Date();
//
//Date 
date.innerHTML = ' ';
    date.innerHTML = 'Date: ' + today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() ;

//
class listItem {  
    constructor(id, task, isComplete) {
        this.id = id;
        this.task = task; 
        this.isComplete = isComplete;
    }
    incrementID(){
        id++;
    }
   
}
function updateStatus(){
    totalTasks.innerHTML = ' ';
    totalTasks.innerHTML = 'Total Tasks:' + ' ' + id;
    complete.innerHTML = ' ';
    complete.innerHTML = 'Tasks Completed:' + ' ' + completeSt;
    efficiency.innerHTML =  ' ';
    efficiency.innerHTML = 'Efficiency:' + ' ' + ((completeSt / id) * 100);
}

//adding an entered task to the displayed list 
function addToList(task) {
    var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.name = 'checkbox'; 
        checkbox.value = task;
        var textNode = document.createTextNode(task);
        var span = document.createElement('span');
        span.className =textNode.nodeValue;
        span.innerHTML = textNode.nodeValue;
        var breakpoint = document.createElement("br");
        todoListitems.appendChild(checkbox);
        todoListitems.appendChild(span);
        todoListitems.appendChild(breakpoint);
}
//                      END                         ///

//This is the event handler for adding a task into the todo list 
btnAdd.addEventListener('click', (e) => {
    if(document.querySelector('#task').value === ''){
        errMsg.classList.add('error');
        taskEntered.classList.add('error');
        errMsg.innerHTML = 'Cannot Enter Empty String into ToDo list!';
        errMsg.style.backgroundColor = '#A52A2A';
        taskEntered.style.borderColor = 'red';
        setTimeout(()=>{
            errMsg.classList.remove('error');
            taskEntered.classList.remove('error');
        }, 200);
        
        setTimeout(()=> {
         errMsg.innerHTML = ' ';
         taskEntered.style.borderColor = 'grey';
         errMsg.style.backgroundColor =  '#fff8dc';
        }, 2000);
        
    }
    else {
      let item = document.querySelector('#task').value;
      if(!checkifAdded(taskArray,item)) {
      var task = new listItem(id,item, false);
      taskArray[id] = task; 
      task.incrementID();
      addToList(task.task);
      btnClear.style.display = "inline"
      taskEntered.value = '';
      updateStatus();
      }
      else {
        errMsg.classList.add('error');
        taskEntered.classList.add('error');
        errMsg.innerHTML = 'You have already Entered' + ' ' + '\'' + document.querySelector('#task').value + '\' ' + 'to the list!' ; 
        errMsg.style.backgroundColor = '#A52A2A';
        taskEntered.style.borderColor = 'red';
        setTimeout(()=>{
            errMsg.classList.remove('error');
            taskEntered.classList.remove('error');
        }, 200);

        setTimeout(()=> {
         errMsg.innerHTML = ' ';
         taskEntered.style.borderColor = 'grey';
         errMsg.style.backgroundColor =  '#fff8dc';
        }, 2000);
      }
    }
});

function checkifAdded(arr, value ) {
   for(i = 0; i < arr.length; i++){
       if(arr[i].task === value)
       {
           if(arr[i].isComplete === false){
            return true;
           }
           
       }
   }
   return false; 
}
function removeChecked(arr, val) {
        for(i = 0; i < arr.length; i++){
            if(arr[i].task === val)
            {
              return [arr[i],i]; 
            }
        }
    return -1;
}


//                      END                         //

//Cross Out item if completed 

//                      END                         //


btnClear.addEventListener('click', (e) => {
    mapToCompleted(updateCompleted());
    updateToDo();

});


function updateToDo(){
    document.querySelector('.toDolistitems').innerHTML = ' ';
    for(i = 0; i < taskArray.length; i++){ 
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className =  'checkbox'; 
        checkbox.name = 'checkbox';
        if(taskArray.length > 0){
        checkbox.value = taskArray[i].task;
        var textNode = document.createTextNode(taskArray[i].task);
        var span = document.createElement('span');
        span.className =textNode.nodeValue;
        span.innerHTML = textNode.nodeValue;
        var breakpoint = document.createElement("br");
        todoListitems.appendChild(checkbox);
        todoListitems.appendChild(span);
        todoListitems.appendChild(breakpoint);
        }
    }
}

function updateCompleted(){
    var tempo = taskArray; 
    var checkboxNode = document.querySelectorAll('input[name=checkbox]'); 
    checkboxNode.forEach((checkitem) => {
        if(checkitem.checked){
          completeSt++;
          var checkeditem = removeChecked(taskArray ,checkitem.defaultValue);
          checkeditem[0].isComplete = true;
          completedList.push(checkeditem[0]);
          tempo.splice(checkeditem[1], 1);
          //var updatedList = taskArray; 
        }
  })
  taskArray = tempo; 
  return completedList;
}

function mapToCompleted (completedArray){
    updateStatus();
    if(completedArray.length > 0){
    for(i = 0; i < completedArray.length; i++){
        var complete = document.createTextNode(completedArray[i].task);
        var itemC = document.createElement('li');
        var br = document.createElement('br');
        itemC.innerHTML = complete.nodeValue;
        itemC.innerHTML.strike();
        done.appendChild(itemC);
        done.appendChild(br);
    }
}
  completedList = [];
  console.log(completedList.length);
}