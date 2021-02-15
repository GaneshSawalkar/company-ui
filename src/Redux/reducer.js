const initialstate = {
    employees: []
};

const reducer = (state = initialstate, action) => {
    state.employees = []
    switch (action.type) {
        case 'GET_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.concat(action.payload)
            };
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.concat(action.payload)
            };
        case 'EDIT_EMPLOYEE':
            console.log(";;;;;;;;;;;;;;dd;;;;;;0", action.payload)
            return {
                ...state,
                employees: state.employees.map(
                    (content, i) => content._id === action.payload._id ? {...content, companyName : action.payload.companyName ,  companyDesc : action.payload.companyDesc }
                                            : content)
            };
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter(item => item._id !== action.payload)
            };
        default:
            return state;
    }
};

export default reducer;
