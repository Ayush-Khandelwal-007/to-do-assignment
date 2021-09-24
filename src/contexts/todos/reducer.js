const { todoActions } = require("utils/actionTypes");

const todoReducer = (state = [], action) => {
    switch (action.type) {
        case todoActions.AddTodo:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                },
            ];
        case todoActions.SetTodo:
                return [
                    ...action.todos
                ];
        case todoActions.CompleteTodo:
            return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: true } : todo,
            );
        case todoActions.DeleteTodo:
            return state.filter(todo =>todo.id === action.id);
        default:
            return state;
    }
}

export default todoReducer;