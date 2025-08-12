const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const listEl = document.getElementById('list');
const emptyEl = document.getElementById('empty');
const countEl = document.getElementById('count');
const clearBtn = document.getElementById('clear-btn');
const filterBtns = document.querySelectorAll('[data-filter]');

let todos = JSON.parse(localStorage.getItem('todos_v1')) || [];
let filter = 'all';

function save() {
  localStorage.setItem('todos_v1', JSON.stringify(todos));
}

function render() {
  listEl.innerHTML = '';
  const visible = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  emptyEl.hidden = visible.length > 0;

  visible.forEach(todo => {
    const item = document.createElement('div');
    item.className = 'item' + (todo.done ? ' completed' : '');
    item.dataset.id = todo.id;

    const check = document.createElement('div');
    check.className = 'check';
    check.innerHTML = todo.done ? '✓' : '';
    check.addEventListener('click', () => toggleDone(todo.id));

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = todo.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn';
    delBtn.textContent = '🗑';
    delBtn.addEventListener('click', () => remove(todo.id));

    actions.appendChild(delBtn);

    item.appendChild(check);
    item.appendChild(text);
    item.appendChild(actions);

    listEl.appendChild(item);
  });

  updateCount();
}

function updateCount() {
  const remaining = todos.filter(t => !t.done).length;
  countEl.textContent = `${remaining} of ${todos.length} remaining`;
}

function add(text) {
  if (!text.trim()) return;
  todos.unshift({ id: Date.now().toString(), text: text.trim(), done: false });
  save();
  render();
}

function remove(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function toggleDone(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save();
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.done);
  save();
  render();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
    btn.setAttribute('aria-selected', 'true');
    filter = btn.dataset.filter;
    render();
  });
});

addBtn.addEventListener('click', () => {
  add(input.value);
  input.value = '';
});
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    add(input.value);
    input.value = '';
  }
});
clearBtn.addEventListener('click', clearCompleted);

render();
