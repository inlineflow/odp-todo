class SaveManager {
    save = function(key, json) {
        localStorage.setItem(key, json);
    }

    load = function(key) {
        return localStorage.getItem(key);
    }
}

const sm = new SaveManager();
export default sm;