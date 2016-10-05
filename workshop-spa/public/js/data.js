/* globals requester */

const HTTP_HEADER_KEY = "x-auth-key",
    KEY_STORAGE_USERNAME = "username",
    KEY_STORAGE_AUTH_KEY = "authKey";

var dataService = {
    cookies() {
        return requester.getJSON("/api/cookies");
    },
    login(user) {
        return requester.putJSON("/api/auth", user)
            .then((respUser) => {
                localStorage.setItem("authKey", respUser.result.authKey);
                localStorage.setItem("username", respUser.result.username);
            });
    },
    register(user) {
        return requester.postJSON("/api/auth", user);
    },
    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    },
    logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
            });
    },
    addCookie(cookie) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };
        return requester.postJSON("/api/cookie", cookie, options);
    },
    rateCookie(cookieId, type) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(KEY_STORAGE_AUTH_KEY)
            }
        };
        return requester.putJSON("/api/cookie", cookie, options);
    }
};