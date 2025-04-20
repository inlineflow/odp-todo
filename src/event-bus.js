class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
            this.listeners[eventName].push(callback);
    }

    off(eventName, callback) {
        if (!this.listeners[eventName]) return;
        this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);
    }
    emit(eventName, data) {
        if(!this.listeners[eventName]) return;
        this.listeners[eventName].forEach(callback => callback(data));
    }
}

const bus = new EventBus();
export default bus;