// Variables
const taskStorageHandler = (() => {
    let tasks = [];

    const getStoredTasks = () => tasks;
    const pushTask = (taskObj) => tasks.push(taskObj);

    return {getStoredTasks, pushTask}
})()

const displayController = (() => {

    const addTaskDisplay = (taskObj) => {
        const mainContainer = document.getElementById("maintodo")

        let container = document.createElement("div")
        let checkbox = document.createElement("div")
        let task = document.createElement("div")
        let taskTitle = document.createElement("h2")
        let taskDesc = document.createElement("p")
        let taskBtnCont = document.createElement("div")
        let taskBtnDel = document.createElement("button")
        let taskBtnFin = document.createElement("button")

        console.log(container)
        
        taskTitle.textContent = taskObj.name
        taskDesc.textContent = taskObj.desc
        taskBtnDel.textContent = "Eliminar Tarea"
        taskBtnFin.textContent = "Finalizar Tarea"

        taskBtnCont.appendChild(taskBtnDel)
        taskBtnCont.appendChild(taskBtnFin)

        task.appendChild(taskTitle)
        task.appendChild(taskDesc)
        task.appendChild(taskBtnCont)

        container.appendChild(checkbox)
        container.appendChild(task)
        

        mainContainer.appendChild(container)

        container.classList.add("todo")
        checkbox.classList.add("todo-checkbox")
        task.classList.add("todo-task")
        taskTitle.classList.add("todo-title")
        taskDesc.classList.add("todo-desc")
        taskBtnCont.classList.add("todo-btn-cont")
        taskBtnDel.classList.add("todo-btn")
        taskBtnFin.classList.add("todo-btn")

    }

    const clearDisplay = () => 
    {
        const maintodo = document.getElementById("maintodo")
        maintodo.querySelectorAll("*").forEach(elem => elem.remove())
    }

    const render = () => {
        clearDisplay()

        let currentTask = taskStorageHandler.getStoredTasks()

        for (let i = 0; i < currentTask.length; i++)
        {   
            console.log(currentTask[i])
            addTaskDisplay(currentTask[i])
        }
    }

    return {render}

})()

const taskFactory = (name, desc, isFinished) => 
{
    return {name, desc, isFinished}
}

let form = document.getElementById("taskform");
form.addEventListener("submit", (e) => 
{
    e.preventDefault();
    taskStorageHandler.pushTask(
        taskFactory(e.target[0].value, e.target[1].value, false)
    )
    displayController.render()
    
})

