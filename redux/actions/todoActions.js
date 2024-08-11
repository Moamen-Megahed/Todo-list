export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo,
});

export const markAsDone = (id) => ({
    type: 'MARK_AS_DONE',
    payload: id,
});

export const removeTodo = (id) => ({
    type: 'REMOVE_TODO',
    payload: id,
});

export const setFilter = (filter) => ({
    type: 'SET_FILTER',
    payload: filter,
});

export const loadTodos = (todos) => ({
    type: 'LOAD_TODOS',
    payload: todos,
});
