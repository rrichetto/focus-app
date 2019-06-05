import Model from './modules/model.js';
import View from './modules/view.js';

const Controller = (_ => {

  // Cache DOM
  const formEl = document.querySelector('.form');
  const taskListEl = document.querySelector('.tasks__list');

  const init = _ => {
    listeners();
  };

  const listeners = _ => {
    formEl.addEventListener('submit', ctrlAddTask);

    taskListEl.addEventListener('click', ctrlDeleteTask);
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
  }



  return {
    init
  }
})();

Controller.init();