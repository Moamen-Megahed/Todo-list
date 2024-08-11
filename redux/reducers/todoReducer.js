const initialState = {
    todos: [],
    filter: 'All',
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case 'MARK_AS_DONE':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, status: 'Done' } : todo
                ),
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload,
            };
        case 'LOAD_TODOS':
            return {
                ...state,
                todos: action.payload,
            };
        default:
            return state;
    }
};

export default todoReducer;
