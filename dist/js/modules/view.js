const View = (_ => {

  // Cache DOM
  const taskInputEl = document.querySelector('.form__add');
  const dateInputEl = document.querySelector('.form__date');
  const taskListEl = document.querySelector('.tasks__list');
  const newProjectInputEl = document.querySelector('.projects__new-input');
  const customProjectListEl = document.querySelector('.projects__custom-list');
  const searchInputEl = document.querySelector('.tasks__search');
  const tasksHeadingEl = document.querySelector('.tasks__heading');

  const getInput = _ => {
    return {
      name: taskInputEl.value,
      date: formatDate(dateInputEl.value)
    }
  };

  const formatDate = date => {
    if (date) {
      // example input: 2019-06-19
      let splitDate = date.split('-');
  
      let twelveMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
      let month = twelveMonths[parseInt(splitDate[1]) - 1];
      let day = splitDate[2];
  
      return `${month} ${day}`;
    }
  }

  const clearInput = _ => {
    taskInputEl.value = '';
    dateInputEl.value = '';
  };

  const getCurrentProject = _ => {
    const projectEls = document.querySelectorAll('.projects__project');

    for (let project of projectEls) {
      if (project.classList.contains('active')) return camelCase(project.textContent);
    }
  };

  const camelCase = str => {
    return str
      .replace(/[^a-z ]/gi, "")
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return "";
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
  };

  const renderTasks = project => {
    taskListEl.innerHTML = '';

    let markup;

    project.forEach((task, index) => {
      markup = `
        <li class="tasks__task ${task.completed ? 'tasks__faded' : ''}" data-index="${index}">
          <i class="tasks__checkbox ${task.completed ? 'fas fa-check-square' : 'far fa-square'}"></i>
          <span class="tasks__name">${task.name}</span>
          <i class="tasks__priority ${task.priority ? 'fas fa-star' : 'far fa-star'}"></i>
          <span class="tasks__date">${task.date ? task.date : '- - - -'}</span>
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

    tasksHeadingEl.textContent = project.textContent;
  };

  const showNewProjectInput = _ => {
    newProjectInputEl.style.display = 'block';
    newProjectInputEl.focus();
  };

  const hideNewProjectInput = _ => {
    newProjectInputEl.value = '';
    newProjectInputEl.style.display = 'none';
  };

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

  const clearTaskList = _ => {
    taskListEl.innerHTML = '';
  };

  const searchTasks = _ => {
    const taskEls = document.querySelectorAll('.tasks__task');
    const input = document.querySelector('.tasks__search').value;

    taskEls.forEach(task => {
      if (task.textContent.toLowerCase().includes(input.toLowerCase())) {
        task.style.display = 'flex';
      } else {
        task.style.display = 'none';
      }
    });

    if (input !== '') {
      searchInputEl.style.border = '2px solid #ff8686';
    } else {
      searchInputEl.style.border = '2px solid lightgrey'
    }
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
    renderProjects,
    clearTaskList,
    searchTasks
  }
})();

export default View;