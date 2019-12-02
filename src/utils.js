const name = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'Name'
    },
    value: '',
    validation: {
        required: true,
    },
    valid: false,
    touched: false
}

const author = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'Author'
    },
    value: '',
    validation: {
        required: true,
    },
    valid: false,
    touched: false
}


export const authControls = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    }
}

export const signUpControls = {
    name,
    ...authControls,
}

export const bookControls = {
    name,
    author,
    price: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Price'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
    },
    file: {
        elementType: 'file',
        elementConfig: {
            type: 'file',
            accept: '.txt'
        },
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }
}

export function checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}