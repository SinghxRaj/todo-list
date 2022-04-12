/*
 * Name: Rajvir Singh
 * Date: January 26, 2022
 * Section AB, TA- Tara Wueger & Dylan McKone
 *
 * This is the JS to provide functionality for my to-do list website.
 * It provides functionality for the different buttons that are on
 * my website. It adds tasks into the uncompleted tasks section, removes
 * tasks from the uncompleted tasks section, moves tasks from the uncompleted
 * section to the completed section. It moves tasks from the completed section
 * to the uncompleted section.
 */
"use strict";
(function() {
  window.addEventListener('load', init);

  /**
   * Runs the initial code after the page loads
   */
  function init() {
    let addBtn = document.querySelector("#add-task button");
    addBtn.addEventListener("click", addTask);

    let rmBtn = document.querySelectorAll(".rm-btn");
    for (let i = 0; i < rmBtn.length; i++) {
      rmBtn[i].addEventListener("click", removeTask);
    }

    let completedBtn = document.querySelectorAll(".completed-btn");
    for (let i = 0; i < completedBtn.length; i++) {
      completedBtn[i].addEventListener("click", completedTask);
    }

    let undoBtn = document.querySelectorAll(".undo-btn");
    for (let i = 0; i < undoBtn.length; i++) {
      undoBtn[i].addEventListener("click", undoTask);
    }

    let rmAllBtn = document.querySelector("#rm-all-btn");
    rmAllBtn.addEventListener("click", rmAll);
  }

  /**
   * Adds a task to the uncompleted tasks list
   * @param {string} taskValue - The name of the task
   */
  function addToUncompletedTasks(taskValue) {
    let uncompletedTaskList = document.querySelector("#uncompleted ul");

    let newTask = document.createElement("li");
    let taskName = document.createElement("span");
    taskName.textContent = taskValue;
    newTask.appendChild(taskName);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    let rmBtn = document.createElement("button");
    let completedBtn = document.createElement("button");
    rmBtn.classList.add("rm-btn");
    rmBtn.textContent = "Remove";
    completedBtn.classList.add("completed-btn");
    completedBtn.textContent = "Completed";
    buttons.appendChild(rmBtn);
    buttons.appendChild(completedBtn);

    newTask.appendChild(buttons);

    uncompletedTaskList.appendChild(newTask);

    init();
  }

  /**
   * Adds a task from the uncompleted task list to
   * the completed task list
   */
  function completedTask() {
    let taskValue = this.parentNode.previousElementSibling.textContent;
    this.parentNode.parentNode.remove();
    let completedTaskList = document.querySelector("#completed ul");

    let newCompletedTask = document.createElement("li");
    let taskName = document.createElement("span");
    taskName.textContent = taskValue;

    let undoBtn = document.createElement("button");
    undoBtn.classList.add("undo-btn");
    undoBtn.textContent = "Undo";

    newCompletedTask.appendChild(taskName);
    newCompletedTask.appendChild(undoBtn);

    completedTaskList.appendChild(newCompletedTask);

    init();
  }

  /**
   * Adds the task from the input to the uncompleted task list
   */
  function addTask() {
    let inputElement = document.querySelector("#add-task input");
    if (inputElement.value !== '') {
      let taskValue = inputElement.value;
      inputElement.value = '';

      addToUncompletedTasks(taskValue);
    }
  }

  /**
   * Removes a task from the uncompleted task list
   */
  function removeTask() {
    this.parentNode.parentNode.remove();
  }

  /**
   * Moves a task from the completed task list to the
   * uncompleted task list
   */
  function undoTask() {
    let taskValue = this.previousElementSibling.textContent;
    this.parentNode.remove();
    addToUncompletedTasks(taskValue);
  }

  /**
   * Removes all tasks from the uncompleted task list
   * and the completed task list
   */
  function rmAll() {
    let allLists = document.querySelectorAll("ul");
    for (let i = 0; i < allLists.length; i++) {
      allLists[i].innerHTML = '';
    }
  }
})();