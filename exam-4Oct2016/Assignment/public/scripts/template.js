'use strict';

import * as requester from 'requester';

const pathStart = '../html-templates/';

function loadTemplate(name) {
    let path = pathStart + name;

    return requester.get(path);
}

export { loadTemplate };