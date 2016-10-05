/* globals Navigo controllers console $ dataService */

let router = new Navigo(null, true);

router
    .on("login", controllers.login)
    .on("home", controllers.home)
    .on("my-cookie", controllers.myCookie)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();

dataService.isLoggedIn()
    .then(function(isLoggedIn) {
        if (isLoggedIn) {
            $(document.body).addClass("logged-in");
        }
    });

$(".btn-nav-logout a").on("click", () => {
    dataService.logout();
    $(document.body).removeClass("logged-in");
});