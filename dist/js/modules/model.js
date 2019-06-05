const Model = (_ => {

    // State
    const projects = {
      inbox: [],
      allTasks: [],
      today: [],
      next7Days: []
    };

    const Task = function(name, date) {
      this.name = name;
      this.date = date;
      this.priority = false;
    };

    const addTask = (projectName, name, date) => {
      const newTask = new Task(name, date);

      projects[camelize(projectName)].push(newTask);
    };

    const camelize = str => {
      return str.replace(/[^a-z ]/gi, "")
                .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                  if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                  return index == 0 ? match.toLowerCase() : match.toUpperCase();
                });
    }

    const getProject = projectName => projects[camelize(projectName)];

    return {
      addTask,
      getProject
    };
})();

export default Model;