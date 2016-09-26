var data = (function() {
    const USERNAME_STORAGE_KEY = 'username-key';

    function* idGenerator() {
        let startId = 1001,
            someDay = true;

        while (someDay) {
            yield(startId += 1);
        }
    }

    // start users
    function userLogin(user) {
        localStorage.setItem(USERNAME_STORAGE_KEY, user);
        return Promise.resolve(user);
    }

    function userLogout() {
        localStorage.removeItem(USERNAME_STORAGE_KEY);
        return Promise.resolve();
    }

    function userGetCurrent() {
        return Promise.resolve(localStorage.getItem(USERNAME_STORAGE_KEY));
    }
    // end users

    // start threads
    function threadsGet() {
        return new Promise((resolve, reject) => {
            $.getJSON('api/threads')
                .done(resolve)
                .fail(reject);
        });
    }

    let threadIdGenerator = idGenerator();

    function threadsAdd(title) {
        let promise = new Promise(function(resolve, reject) {

            let username = userGetCurrent().then((username) => {
                let body = {
                    title: title,
                    username: username,
                    id: threadIdGenerator.next().value,
                };

                // got stuck at IDs, any advice is welcome

                $.ajax({
                        type: 'POST',
                        url: 'api/threads',
                        contentType: 'application/json',
                        data: JSON.stringify(body),
                    }).done((data) => resolve(data))
                    .fail((err) => reject(err));
            });
        });
        return promise;
    }

    function threadById(id) {
        return new Promise((resolve, reject) => {
            $.getJSON('api/threads/' + id)
                .done(resolve)
                .fail(reject);
        });
    }

    function threadsAddMessage(threadId, content) {
        let promise = new Promise(function(resolve, reject) {
            let url = "api/threads/" + threadId + "/messages",
                username = userGetCurrent().then((username) => {
                    var body = { username, content };

                    $.ajax({
                            type: 'POST',
                            url: url,
                            contentType: 'application/json',
                            data: JSON.stringify(body),
                        }).done((data) => resolve(data))
                        .fail((err) => reject(err));
                });
        });
        return promise;
    }
    // end threads

    // start gallery
    function galleryGet() {
        const REDDIT_URL = `https://www.reddit.com/r/aww.json?jsonp=?`;

        return new Promise((resolve, reject) => {
            $.ajax({
                    url: REDDIT_URL,
                    dataType: 'jsonp'
                })
                .done(resolve)
                .fail(reject);
        });
    }
    // end gallery

    return {
        users: {
            login: userLogin,
            logout: userLogout,
            current: userGetCurrent
        },
        threads: {
            get: threadsGet,
            add: threadsAdd,
            getById: threadById,
            addMessage: threadsAddMessage
        },
        gallery: {
            get: galleryGet,
        }
    }
})();

export { data };