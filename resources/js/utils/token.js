const TOKEN_KEY = "access_token";

const token = {
    get() {
        return localStorage.getItem(TOKEN_KEY);
    },

    set(value) {
        localStorage.setItem(TOKEN_KEY, value);
    },

    remove() {
        localStorage.removeItem(TOKEN_KEY);
    },
};

export default token;