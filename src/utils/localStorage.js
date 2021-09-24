/* eslint-disable import/no-anonymous-default-export */
const tryParseJSON = (jsonString) => {
    try {
        var obj = JSON.parse(jsonString);
        if (obj && typeof obj === 'object') {
            return obj;
        }
    } catch (error) {
        console.log('Invalid Json string, could not complete parse');
        return jsonString[0] === '[' ? [] : {};
    }
    return false;
};

const local_storage_save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const local_storage_get = (key) => {
    return tryParseJSON(localStorage.getItem(key));
};

export default {
    save: local_storage_save,
    get: local_storage_get,
};