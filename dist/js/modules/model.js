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

    const addTask = (name, date) => {
      const newTask = new Task(name, date);

      projects.inbox.push(newTask);
      console.log(projects);
    };

    const getProjects = _ => projects;

    return {
      addTask,
      getProjects
    };
})();

export default Model;