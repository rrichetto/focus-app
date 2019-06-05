import Model from './model.js';
import View from './view.js';

const Controller = (_ => {

  // Cache DOM
  const formEl = document.querySelector('.form');
  const projectSectionEl = document.querySelector('.projects');

  // Init
  const init = _ => {
    listeners();
  }

  // Listeners
  const listeners = _ => {

    // Form Submission (add task input)
    formEl.addEventListener("submit", e => {
      e.preventDefault();

      // Get the input
      const input = View.getInput();

      // Add task to Model
      Model.addTask(input.name, input.date);

      // Add task to View
      View.renderTasks(Model.projects.inbox);
    });

    // Click on new Project
    projectSectionEl.addEventListener("click", View.changeProject);
  }

  return {
    init
  }
})();

export default Controller;