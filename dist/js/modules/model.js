const Model = (_ => {

  const Projects = {
    inbox: [],
    allTasks: [],
    today: [],
    nextDays: []
  }

  const customProjectNames = [];

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

  const getCustomProjectNames = _ => customProjectNames;

  const addProject = projectName => {
    // Add to list of custom project names
    customProjectNames.push(projectName);

    // Add camelCase project name to Projects data
    Projects[camelCase(projectName)] = [];
  }

  const camelCase = str => {
    return str
      .replace(/[^a-z ]/gi, "")
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
  }

  return {
    addTask,
    deleteTask,
    getProject,
    getCustomProjectNames,
    addProject
  }
})();

export default Model;