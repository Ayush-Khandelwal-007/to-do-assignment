const { authActions } = require("utils/actionTypes");

const authReducer = (state = null, action) => {
    switch (action.type) {
        case authActions.Login:
            return {...action.user}
        case authActions.Logout:
            return null;
        default:
            return state;
    }
}

export default authReducer;