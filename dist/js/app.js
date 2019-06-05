import Model from './modules/model.js';
import View from './modules/view.js';

const Controller = (_ => {

  // Cache DOM
  const formEl = document.querySelector('.form');
  const taskListEl = document.querySelector('.tasks__list');
  const projectListEl = document.querySelector('.projects');

  const init = _ => {
    listeners();
  };

  const listeners = _ => {
    formEl.addEventListener('submit', ctrlAddTask);
    taskListEl.addEventListener('click', ctrlDeleteTask);
    projectListEl.addEventListener('click', ctrlChangeProject)
  };

  const ctrlAddTask = e => {
    e.preventDefault();

    // Get the input
    const input = View.getInput();

    // Get the current project
    const currentProject = View.getCurrentProject();

    // Add input to model
    Model.addTask(currentProject, input.name, input.date);

    // Render tasks
    View.renderTasks(Model.getProject(currentProject));

    // Clear the input fields
    View.clearInput();
  };

  const ctrlDeleteTask = e => {
    // If the target is a delete button...
    if (e.target.classList.contains('tasks__delete')) {

      // Get index of task (list item) to be deleted
      const index = e.target.closest('.tasks__task').dataset.index;

      // Get the current project
      const currentProject = View.getCurrentProject();

      // Delete task from model
      Model.deleteTask(currentProject, index);

      // Render tasks
      View.renderTasks(Model.getProject(currentProject));
    }
  };

  const ctrlChangeProject = e => {
    // Get the project 'li'
    const projectLI = e.target.closest('.projects__project');

    // If the target is a Project 'li', but NOT a delete button...
    if (projectLI && !(e.target.classList.contains('projects__delete'))) {

      // Change project in view
      View.changeProject(projectLI);

      // Get the current project
      const currentProject = View.getCurrentProject();

      // Render tasks
      View.renderTasks(Model.getProject(currentProject));
    }
  };

  return {
    init
  }
})();

Controller.init();