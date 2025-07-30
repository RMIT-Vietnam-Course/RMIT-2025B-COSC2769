export const initialState = {
    currentValue: '0',
    firstNumber: null,
    operator: null,
};

export function calculatorReducer(state, action) {
    switch (action.type) {
        case 'digit':
            return {
                ...state,
                currentValue: state.currentValue === '0' ? action.digit : state.currentValue + action.digit,
            };

        case 'operator':
            return {
                ...state,
                firstNumber: Number(state.currentValue),
                operator: action.operator,
                currentValue: '0',
            };

        case 'equal':
            if (state.firstNumber === null || state.operator === null) return state;

            const secondNumber = Number(state.currentValue);
            let result;

            switch (state.operator) {
                case '+': result = state.firstNumber + secondNumber; break;
                case '-': result = state.firstNumber - secondNumber; break;
                case 'x': result = state.firstNumber * secondNumber; break;
                case '/': result = secondNumber !== 0 ? state.firstNumber / secondNumber : '#ERR'; break;
                default: result = secondNumber;
            }

            return {
                ...state,
                currentValue: String(result),
                firstNumber: null,
                operator: null,
            };

        case 'clear':
            return initialState;

        default:
            return state;
    }
}
