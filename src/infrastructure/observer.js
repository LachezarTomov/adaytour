let subscriptions = {
    'loginUser': [],
    'notification': []
};

export default {
    events: {
        loginUser: 'loginUser',
        notification: 'notification'
    },
    subscribe: (eventName, fn) => subscriptions[eventName].push(fn),
    trigger: (eventName, data) => {
        for (let index = 0; index < subscriptions[eventName].length; index++) {
            const element = subscriptions[eventName][index];
            element(data);
        }
    },
    // trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data))
    subscriptions: subscriptions
}
