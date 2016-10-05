SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './scripts/main.js',
        'routing': './scripts/routing.js',
        'navigo': './bower_components/navigo/lib/navigo.min.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'Sammy': './bower_components/sammy/lib/sammy.js',
        'data': './scripts/data.js',
        'requester': './scripts/requester.js',
        'template': './scripts/template.js',
        'controller': './scripts/controller.js'
    }
});