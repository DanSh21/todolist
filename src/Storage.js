export const initialState = {
    todo: {
        token: null,
        total: 0,
        tasks: []
    }
}

export const loadState = () => {
    try {
        const serializedStorage = localStorage.getItem('token');
        console.log(serializedStorage);
        if (serializedStorage === null) {
            return initialState;
        }
        // console.log('SAVE',serializedStorage);
        initialState.todo.token = JSON.parse(serializedStorage);
        return initialState;
    } catch (error) {
        return initialState;
    }
}

export const saveState = (state) => {
    try {
        const serializedStorage = JSON.stringify(state);
        // console.log('STAT', state)
        localStorage.setItem('token', serializedStorage);
    } catch (error) {
        return null;
    }
}