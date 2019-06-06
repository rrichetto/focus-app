const View = (_ => {

  // Cache DOM
  const taskInputEl = document.querySelector('.form__add');
  const dateInputEl = document.querySelector('.form__date');
  // const projectEls = document.querySelectorAll('.projects__project');
  const taskListEl = document.querySelector('.tasks__list');
  const newProjectInputEl = document.querySelector('.projects__new-input');
  const customProjectListEl = document.querySelector('.projects__custom-list');

  const getInput = _ => {
    return {
      name: taskInputEl.value,
      date: dateInputEl.value
    }
  }

  const clearInput = _ => {
    taskInputEl.value = '';
    dateInputEl.value = '';
  }

  const getCurrentProject = _ => {
    const projectEls = document.querySelectorAll('.projects__project');

    for (let project of projectEls) {
      if (project.classList.contains('active')) return camelCase(project.textContent);
    }
  }

  const camelCase = str => {
    return str
      .replace(/[^a-z ]/gi, "")
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
  }

  const renderTasks = project => {
    taskListEl.innerHTML = '';

    let markup;

    project.forEach((task, index) => {
      markup = `
        <li class="tasks__task" data-index="${index}">
          <i class="tasks__checkbox far fa-square"></i>
          <span class="tasks__name">${task.name}</span>
          <i class="tasks__priority far fa-star"></i>
          <span class="tasks__date">${task.date}</span>
          <i class="tasks__delete far fa-times-circle"></i>
        </li>
      `;

      taskListEl.insertAdjacentHTML('beforeend', markup);
    })
  };

  const changeProject = project => {
    const projectEls = document.querySelectorAll('.projects__project');

    for (let elem of projectEls) elem.classList.remove('active');

    project.classList.add('active');
  }

  const showNewProjectInput = _ => {
    newProjectInputEl.style.display = 'block';
    newProjectInputEl.focus();
  }

  const hideNewProjectInput = _ => {
    newProjectInputEl.value = '';
    newProjectInputEl.style.display = 'none';
  }

  const getNewProjectInput = _ => newProjectInputEl.value;

  const renderProjects = projectNames => {
    customProjectListEl.innerHTML = '';

    let markup;

    projectNames.forEach((name, index) => {
      markup = `
        <li class="projects__project" data-index="${index}"><i class="fas fa-chevron-right"></i><span class="projects__title">${name}</span><i class="projects__delete far fa-times-circle"></i></li>
      `;

      customProjectListEl.insertAdjacentHTML('beforeend', markup);
    })
  };

  return {
    getInput,
    clearInput,
    getCurrentProject,
    renderTasks,
    changeProject,
    showNewProjectInput,
    hideNewProjectInput,
    getNewProjectInput,
    renderProjects
  }
})();

export default View;