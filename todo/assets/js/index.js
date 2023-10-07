'use strict';

const todoInput = document.querySelector('input');
const todoForm = document.querySelector('.todoForm');
const todoList = document.querySelector('.todoList');

const TODO_REG_EXP = /^\s*$/;

todoInput.oninput = todoInputHandler;

function todoInputHandler({ target }) {
  if (!TODO_REG_EXP.test(target.value)) {
    target.classList.add('valid');
    target.classList.remove('invalid');
  } else {
    target.classList.add('invalid');
    target.classList.remove('valid');
  }
}

todoForm.onsubmit = submitHandler;

function submitHandler(e) {
  e.preventDefault();
  const inputElement = e.target.elements['todo-item'];

  if (!TODO_REG_EXP.test(inputElement.value)) {
    todoList.append(createToDo(inputElement.value));
    inputElement.value = '';
    inputElement.classList.remove('valid');
  } else {
    inputElement.classList.add('invalid');
  }
}

function createToDo(value) {
  const todoListItem = document.createElement('li');
  todoListItem.classList.add('todoListItem');

  const delBtn = document.createElement('button');
  delBtn.textContent = 'X';
  delBtn.onclick = ({ target }) => {
    target.parentElement.remove();
  };

  const isDoneEl = document.createElement('input');
  isDoneEl.type = 'checkbox';
  isDoneEl.onchange = ({ target }) => {
    target.nextSibling.classList.toggle('doneTask');
  };

  const todoValue = document.createElement('span');
  todoValue.textContent = value;

  todoListItem.append(isDoneEl, todoValue, delBtn);

  return todoListItem;
}
