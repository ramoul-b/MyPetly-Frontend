// src/utils/EventBus.js
const listeners = {};

const EventBus = {
  on: (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  },

  off: (event, callback) => {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(cb => cb !== callback);
  },

  emit: (event, data) => {
    if (!listeners[event]) return;
    listeners[event].forEach(callback => callback(data));
  }
};

export default EventBus;
