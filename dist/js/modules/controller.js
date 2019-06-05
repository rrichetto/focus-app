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

      // Get the current project
      let currentProject = View.getCurrentProject();
      console.log(currentProject);

      // Add task to Model
      Model.addTask(currentProject, input.name, input.date);

      // Add tasks to View
      View.renderTasks(Model.getProject(currentProject));
    });

    // Click on new Project
    projectSectionEl.addEventListener("click", e => {
      View.changeProject(e);
      let currentProject = View.getCurrentProject();
      View.renderTasks(Model.getProject(currentProject));
    });
  }

  return {
    init
  }
})();

export default Controller;