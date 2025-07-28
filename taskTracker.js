const fs = require('fs'); 
//require(fs) is used to read and write on our files
//by loading node.js built-in file system module
const path = require('path');
//'path' fixes our path to file so that we can always access
//no matter the format so basically handles path formatting
const tasksFile = path.join(__dirname, 'tasks.json');
// 1.tasksFile combines that first two variables
// 2. __dirname conatins the absolute path to the directory
//containg the current script
// and adds it to the newly created file named tasks.json
if(!fs.existsSync(tasksFile)){
    // 1.using fs to access existsSync.2.exist checks if
    //there is any file under tasksFile. 3. it returns
    //false and that false is negated so it runs what is
    //inside the loop 

    fs.writeFileSync(tasksFile, '[]');
    //1. fs gives us access to writeFileSync. 
    //2.writeFileSync writes a new file inside tasksFile
    //and adds an empty array in it
}


function getTasks() {
    //initalize a new function
  const data = fs.readFileSync(tasksFile); 
  // 1.fs gives access to readFileSync
  //2. readFileSync reads tasksFile
  //3. data from read file gets saved in const data
  return JSON.parse(data);
  //1. return data into a javascript array from json 
}


function saveTasks(tasks) {
    //1. we initalize and new function saveTasks that
    //that takes in on variable whixh is tasks

  fs.writeFileSync(tasksFile, JSON.stringify(tasks));
  //1. fs to access writeFileSync. 2. writeFilesync to
  //write to the file. 3. tasksFile is where the file is
  //4. JSON.strigify(tasks) takes tasks and turns it
  //into json formatted string from javascript
}


function addTask(description) {
    //initalizes a function called addTask that takes in 
    //description as a variable
  const tasks = getTasks(); 
  // tasks is going to be set to the output of getTasks()

  const newTask = {
    //we are inialzing newTask a new variable
    id: tasks.length + 1, 
 // this increments the tasks.length  by 1 and makes it 
 // the newTask's id

    description: description,
    //the description is what is addTask(description)

    createdAt: new Date().toISOString() 
    //this uses the exact date of adding the task and
    //saves in createdAT
  };
  
  tasks.push(newTask); 
  // Add the new task to array
  saveTasks(tasks); 
  // Save the new task to file. u have to manually save it
  // so that it gets a physical address instead of it just
  // being on the memory
  
  console.log(`Added: "${description}" (ID: ${newTask.id})`);
  // prints to console log
}


function listTasks() {
  const tasks = getTasks();
  //here const tasks is equal to already saved tasks
  
  if (tasks.length === 0) {
    console.log("No tasks yet!");
    return;
  }
  //this prints "No tasks yet!" if there is no tasks

  
  console.log("Your Tasks:");
  tasks.forEach(task => {
    console.log(`${task.id}. ${task.description}`);
  });
  // this prints each task with it is id no and description
}

function update(id, newDescription) {
 
    //load all tasks
    const tasks = getTasks();
  
 // get specific task using id
const taskToUpdate = tasks.find(task =>task.id === id)
  //this basically says go to array tasks and find a "task" with a 
  // task.id same as the id in the function parameter 
  //it then saves the array element with that id for later use
  if (!taskToUpdate) {
//this basically means if after using the taskToUpdate function
// u canfind the id then  print the error below
    console.log('Error: Task $(id) not found');

    return;
    //we need an exit early here and return exits right away
  } else {

    taskToUpdate.description = newDescription;
    //replace old description with new description. since the 
    // array element is already saved under taskToUpdate
    taskToUpdate.updatedAt = new Date().toISOString();
    // Track when updated
  
    saveTasks(tasks)
    //this saves the tasks array and soldifies the update 
console.log(`Updated task ${id}: "${newDescription}"`);  
  }

}


function deleteTask(id){

    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id );
if(taskIndex === -1){
    console.log('Error: Task ${id} not found')
    return;
}
    tasks.splice(taskIndex, 1)
    saveTasks(tasks);
    console.log(`Deleted task ${id}`);  

}


const command = process.argv[2];
const description = process.argv[3];

if (command === 'add') {
//when in terminal if the user types [node] [scriptName.js]
// then [add] 
    if (!description) {
        // if he did not type in a description after it 
        // the below message will pop up
    console.log("Error: Please provide a task description");
    return;
    
  }
  // if the user types in description, then the descrption
  // gets added
  addTask(description);

} 
else if (command === 'list') {
  listTasks();
  // this prints out the list if user types
  //[node] [scriptName.js] ['list']
}else if (command === 'update'){
    const id = Number(process.argv[3]);
    const newDescription = process.argv[4];
    if (!newDescription || !id) {
        // if he did not type in a description after it 
        // the below message will pop up
    console.log("Error: Please provide a task description and ID");
    console.log("Usage: update <id> \"<new description>\"");
    return;
} 
update(id,newDescription);
}else if (command === 'delete'){
    const id = Number(process.argv[3]);

    if(!id){
        console.log("Error: Provide id to delete")
        return;
    }
    deleteTask(id);
}
 else {
  console.log("Available commands:\n  add 'task'\n  list");
}
//if not entered this prints out 



