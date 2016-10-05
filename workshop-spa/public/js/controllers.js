/* globals dataService console templates */

// let controllers = {
//     get(dataService, templates) {
// return
let controllers = {
    home() {
        let url = "/api/cookies";
        var cookies;
        dataService.cookies()
            .then((cookiesResponse) => {
                cookies = cookiesResponse;
                return templates.get("home");
            })
            .then((templateHtml) => {
                let templateFunc = Handlebars.compile(templateHtml);
                let html = templateFunc(cookies);
                $("#container").html(html);

                $(".btn-like-dislike").on("click", (ev) => {
                    // TODO:finish
                });
            });
    },
    myCookie() {
        console.log("My Cookie");
    },
    addCookie() {
        // TODO: validate
        templates.get("cookie-add")
            .then((templateHtml) => {
                let templateFunc = Handlebars.compile(templateHtml);
                let html = templateFunc(cookies);
                $("#container").html(html);

                $("#btn-add").on("click", () => {
                    var cookie = {
                        text: $("#tb-text").val()
                    };
                });

                // TODO:finish
            });
    },
    login() {
        dataService.isLoggedIn()
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    //redirect
                    window.location = "#/home";
                    return;
                }
            });
        var cookies;

        templates.get("login")
            .then((cookiesResponse) => {
                cookies = cookiesResponse;
                return templates.get("login");
            })
            .then((templateHtml) => {
                let templateFunc = Handlebars.compile(templateHtml);
                let html = templateFunc(cookies);
                $("#container").html(html);

                $("#btn-login").on("click", (ev) => {

                    let user = {
                        username: $("#tb-username").val(),
                        passHash: $("#tb-password").val()
                    };

                    dataService.login(user)
                        .then((respUser) => {
                            alert(`${respUser.result.username} loged in!`);
                            console.log();

                            document.location = "#/home";
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    },
    register() {
        templates.get("login")
            .then((cookiesResponse) => {
                cookies = cookiesResponse;
                return templates.get("login");
            })
            .then((templateHtml) => {
                let templateFunc = Handlebars.compile(templateHtml);
                let html = templateFunc(cookies);
                $("#container").html(html);

                $("#btn-register").on("click", (ev) => {

                    let user = {
                        username: $("#tb-username").val(),
                        passHash: $("#tb-password").val()
                    };

                    dataService.register(user)
                        .then((respUser) => {
                            return dataService.login(user);
                        })
                        .then((respuser) => {
                            localStorage.setItem("authKey", respUser.result.authKey);
                            localStorage.setItem("username", respUser.result.username);
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    }
};
//     }
// };