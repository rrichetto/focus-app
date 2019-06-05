const View = (_ => {

  // Cache DOM
  const taskInputEl = document.querySelector('.form__add');
  const dateInputEl = document.querySelector('.form__date');
  const taskListEl = document.querySelector('.tasks__list');

  const getInput = _ => {
    return {
      name: taskInputEl.value,
      date: dateInputEl.value
    }
  }

  const getCurrentProject = _ => {
    const projectEls = document.querySelectorAll('.projects__project');

    for (let project of projectEls) {
      if (project.classList.contains('active')) {
        return project.textContent;
      }
    }
  }

  const renderTasks = project => {
    taskListEl.innerHTML = '';

    project.forEach(task => {
      const markup = `
        <li class="tasks__task">
          <i class="tasks__checkbox far fa-square"></i>
          <span class="tasks__name">${task.name}</span>
          <i class="tasks__priority far fa-star"></i>
          <span class="tasks__date">${task.date}</span>
          <i class="tasks__delete far fa-times-circle"></i>
        </li>
      `;

      taskListEl.insertAdjacentHTML('beforeend', markup);
    });
  }

  const changeProject = e => {
    let li = e.target.closest('.projects__project');

    // If clicking on a project 'li' but NOT the delete button...
    if (li && !e.target.matches('.projects__delete')) {
      const projectEls = document.querySelectorAll('.projects__project');

      projectEls.forEach(project => {
        project.classList.remove('active');
      });

      li.classList.add('active');
    };
  }

  return {
    getInput,
    renderTasks,
    changeProject,
    getCurrentProject
  }
})();

export default View;