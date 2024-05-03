let todos = [];

function addTodo() {
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const person = document.getElementById('person').value;
    const status = document.getElementById('status').value;

    const todo = {
        id: todos.length + 1,
        category,
        description,
        dueDate,
        person,
        status
    };

    todos.push(todo);
    updateTable();
    document.getElementById('todoForm').reset();
}

function updateTable() {
    const tbody = document.getElementById('todoList').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    todos.forEach(todo => {
        const row = tbody.insertRow();
        row.insertCell().textContent = todo.category;
        row.insertCell().textContent = todo.description;
        row.insertCell().textContent = todo.dueDate;
        row.insertCell().textContent = todo.person;
        const statusCell = row.insertCell();
        statusCell.appendChild(createStatusSelector(todo));
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.onclick = () => deleteTodo(todo.id);
        deleteCell.appendChild(deleteButton);
    });
}

function createStatusSelector(todo) {
    const selector = document.createElement('select');
    ['未実施', '実施中', '完了'].forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        option.selected = todo.status === status;
        selector.appendChild(option);
    });
    selector.onchange = () => {
        todo.status = selector.value;
        updateTable();
    };
    return selector;
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateTable();
}
