export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export function createActionObject(name_action) {
    return {
        INIT: `${name_action}_INIT`,
        START: `${name_action}_START`,
        SUCCESS: `${name_action}_SUCCESS`,
        FAIL: `${name_action}_FAIL`,
    }
}
