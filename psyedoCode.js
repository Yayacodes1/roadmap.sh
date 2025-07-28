const fs = require('fs');
//import fs
const path = require('path');
//import path so that it format the path of files we 
// want to access
const tasksFile = path.join(__dirname, 'tasks.json');
//dirname is the absoulte path of the current script 
// and  it a json file is added to it when the script 
// runs and they are both saved under tasksFile

if(!fs.existsSync(tasksFile)){
fs.writeFileSync(tasksFile,'[]');
//create the file inisde the tasksfile function which 
// is the tasks.json and write inside it an empty array 
}





function getTasks(){
   const data =  fs.readFileSync(tasksFile);
   //reads tasks files and saves content in data
   return JSON.parse(data);
   //parses json data into string javascript

}


function saveTasks(tasks){
    fs.writeFileSync(tasksFile, JSON.stringify(tasks))
}


//case 1
function addTask(description){

const tasks = getTasks();
const newTask = {id: tasks.length +1, 
    description:description,
    createdAt : new Date().toISOString()
};
tasks.push(newTask);

saveTasks(tasks);

console.log(`Added: id "${newTask.id}" and "${description}"  `);

}


//case 2
function list() {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log("Error: no tasks in the list");
    return;
  }
  tasks.forEach(task => {
    console.log(`${task.id}. ${task.description}`);
  });
}

//case 3
function update(id, newDescription){

const tasks = getTasks();

const taskToUpdate = tasks.find(task => task.id === id);

if(!taskToUpdate){

    console.log("Error: Can find chosen id");

    return;
}
taskToUpdate.description = newDescription;

taskToUpdate.updatedAt = new Date().toISOString();
saveTasks(tasks);
console.log(`updated: ${id} ${newDescription} `);
}

//case 4
function toDelete(id){
const tasks = getTasks();
const taskIndex = tasks.findIndex(task => task.id === id);
if(taskIndex === -1){

    console.log("Error: Can find chosen id");

    return;
}
tasks.splice(taskIndex, 1);
saveTasks(tasks);

}


//command handler

const command = process.argv[2];
const description = process.argv[3];

//case 1: add
if(command === 'add'){

    if(!description){
        console.log("Error: add a description to the tag");
        return;
    }
addTask(description);
}
//case 2
else if (command === 'list'){

list();

}
//case 3
else if (command === 'update'){
        const newDescription = process.argv[3];
const id = Number(process.argv[4]);

    if(!id || !newDescription){
        console.log("Error: insert an id to update it is value and a new description");
        return
    }
    update(id, newDescription);
}

//case 4
else if(command === 'delete'){
        const id = Number(process.argv[3]);

    if(id ===-1){
        console.log("Error: insert a viable id so we can delete it is element");
    return;
}
    toDelete(id);
}
else{
    console.log("Error: insert a command to execute");
}


