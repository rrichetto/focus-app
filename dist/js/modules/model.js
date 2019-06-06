const Model = (_ => {

  let Projects = {
    inbox: [],
  }

  let customProjectNames = [];

  const Task = function(name, date) {
    this.name = name;
    this.date = date;
    this.priority = false;
    this.completed = false;
  };

  const addTask = (currentProject, name, date) => {
    const task = new Task(name, date);

    Projects[currentProject].push(task);

    persistData();
  };

  const deleteTask = (currentProject, index) => {
    Projects[currentProject].splice(index, 1);

    persistData();
  };

  const getProject = project => Projects[project];

  const getCustomProjectNames = _ => customProjectNames;

  const addProject = projectName => {
    // Add to list of customProjectNames
    customProjectNames.push(projectName);

    // Add camelCase project name to Projects data
    Projects[camelCase(projectName)] = [];

    persistData();
  };

  const deleteProject = (projectName, index) => {
    // Delete from customProjectNames
    customProjectNames.splice(index, 1);

    // Delete from Projects data
    delete Projects[camelCase(projectName)];

    persistData();
  };

  const changePriority = (currentProject, taskIndex) => {
    if (Projects[currentProject][taskIndex].priority === false) {
      Projects[currentProject][taskIndex].priority = true;
    } else {
      Projects[currentProject][taskIndex].priority = false;
    }

    persistData();
  };

  const changeCompleted = (currentProject, taskIndex) => {
    if (Projects[currentProject][taskIndex].completed === false) {
      Projects[currentProject][taskIndex].completed = true;
    } else {
      Projects[currentProject][taskIndex].completed = false;
    }

    persistData();
  }

  const sortTasks = projectName => {
    const priorityTasks = [];
    const regularTasks = [];
    const completedTasks = [];

    Projects[projectName].forEach(task => {
      if (task.completed === true) {
        completedTasks.push(task);
      } else if (task.priority === true) {
        priorityTasks.push(task);
      } else {
        regularTasks.push(task);
      }
    });

    Projects[projectName] = [...priorityTasks, ...regularTasks, ...completedTasks];

    persistData();
  }

  const persistData = _ => {
    localStorage.setItem('Projects', JSON.stringify(Projects));
    localStorage.setItem('customProjectNames', JSON.stringify(customProjectNames));
  }

  const readStorage = _ => {
    const storageProjects = JSON.parse(localStorage.getItem('Projects'));
    const storageNames = JSON.parse(localStorage.getItem('customProjectNames'));

    // Restoring Projects from the localStorage
    if (storageProjects) Projects = storageProjects;
    if (storageNames) customProjectNames = storageNames;
  }

  const camelCase = str => {
    return str
      .replace(/[^a-z ]/gi, "")
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return "";
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
  };

  return {
    addTask,
    deleteTask,
    getProject,
    getCustomProjectNames,
    addProject,
    deleteProject,
    changePriority,
    changeCompleted,
    sortTasks,
    readStorage
  }
})();

export default Model;