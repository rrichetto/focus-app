import Model from './modules/model.js';
import View from './modules/view.js';

const Controller = (_ => {

  // Cache DOM
  const formEl = document.querySelector('.form');
  const taskListEl = document.querySelector('.tasks__list');
  const projectListEl = document.querySelector('.projects');
  const newProjectBtnEl = document.querySelector('.projects__new-btn');
  const newProjectInputEl = document.querySelector('.projects__new-input');
  const searchInputEl = document.querySelector('.tasks__search');
  const taskSortBtnEl = document.querySelector('.tasks__sort');

  const init = _ => {
    listeners();
  };

  const listeners = _ => {
    window.addEventListener('load', _ => {
      Model.readStorage();

      // Get the current project
      const currentProject = View.getCurrentProject();

      // Render tasks
      View.renderTasks(Model.getProject(currentProject));

      View.renderProjects(Model.getCustomProjectNames());
    })

    formEl.addEventListener('submit', ctrlAddTask);
    taskListEl.addEventListener('click', ctrlDeleteTask);
    projectListEl.addEventListener('click', ctrlChangeProject);
    newProjectBtnEl.addEventListener('click', View.showNewProjectInput);
    newProjectInputEl.addEventListener('keypress', ctrlAddNewProject);
    projectListEl.addEventListener('click', ctrlDeleteProject);
    searchInputEl.addEventListener('keyup', View.searchTasks);
    taskListEl.addEventListener('click', ctrlChangePriority);
    taskListEl.addEventListener('click', ctrlChangeCompleted);
    taskSortBtnEl.addEventListener('click', ctrlSortTasks);
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

  const ctrlAddNewProject = e => {
    if (e.keyCode === 13) {
      // Get the input
      const newProject = View.getNewProjectInput();

      // Add input to model
      Model.addProject(newProject);

      // Render projects
      View.renderProjects(Model.getCustomProjectNames());

      // Clear and hide input
      View.hideNewProjectInput();
    }
  };

  const ctrlDeleteProject = e => {
    if (e.target.classList.contains('projects__delete')) {

      const projectName = e.target.closest('.projects__project').textContent;
      const index = e.target.closest('.projects__project').dataset.index;

      if (confirm("Are you sure you want to delete this project? All tasks will be lost.")) {
        // Delete project from model
        Model.deleteProject(projectName, index);

        // Render projects
        View.renderProjects(Model.getCustomProjectNames());

        // Clear task list if the currently active project was deleted
        if(!View.getCurrentProject()) {
          View.clearTaskList();
        }
      }
    }
  };

  const ctrlChangePriority = e => {
    if (e.target.classList.contains('tasks__priority')) {

      // Get index of task 'li
      const taskIndex = e.target.closest('.tasks__task').dataset.index;

      // Get current project
      const currentProject = View.getCurrentProject();

      // Change the priority of the task
      Model.changePriority(currentProject, taskIndex);

      // Render tasks
      View.renderTasks(Model.getProject(currentProject));
    }
  };

  const ctrlChangeCompleted = e => {
    if (e.target.classList.contains('tasks__checkbox')) {

      // Get index of task 'li
      const taskIndex = e.target.closest('.tasks__task').dataset.index;

      // Get current project
      const currentProject = View.getCurrentProject();

      // Change the priority of the task
      Model.changeCompleted(currentProject, taskIndex);

      // Render tasks
      View.renderTasks(Model.getProject(currentProject));
    }
  };

  const ctrlSortTasks = _ => {
    // Get current project
    const currentProject = View.getCurrentProject();

    // Sort tasks
    Model.sortTasks(currentProject);

    // Render tasks
    View.renderTasks(Model.getProject(currentProject));
  }

  return {
    init
  }
})();

Controller.init();