const templateLoader = (() => {
    const cache = {};

    function get(templeteName) {
        return new Promise((resolve, reject) => {
            if (cache[templeteName]) {
                resolve(cache[templeteName]);
            } else {
                $.get(`../templates/${templeteName}.handlebars`)
                    .done((data) => {
                        let template = Handlebars.compile(data);
                        cache[templeteName] = template;
                        resolve(template);
                    })
                    .fail(reject);
            }
        });
    }

    return {
        get
    };
})();

export { templateLoader };