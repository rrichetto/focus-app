const Model = (_ => {

  const Projects = {
    inbox: [],
    allTasks: [],
    today: [],
    nextDays: []
  }

  const Task = function(name, date) {
    this.name = name;
    this.date = date;
    this.priority = false;
    this.completed = false;
  }

  const addTask = (currentProject, name, date) => {
    const task = new Task(name, date);

    Projects[currentProject].push(task);
  }

  const deleteTask = (currentProject, index) => {
    Projects[currentProject].splice(index, 1);
  }

  const getProject = project => Projects[project];

  return {
    addTask,
    deleteTask,
    getProject
  }
})();

export default Model;