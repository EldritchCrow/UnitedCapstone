// Fake (and better) jQuery
// This file was created (and owned) by Michael Peters

const $ = document.querySelector.bind(document);
const $$ = function(queryString) { // Because ElementList Objects are cancerous
    return Array.from(document.querySelectorAll(queryString));
}
const $$$ = function(element, queryString) {
    return element.querySelector(queryString);
}
const $$$$ = function(element, queryString) {
    return Array.from(element.querySelectorAll(queryString));
}

// General javascript functions

/**
 * @function $.zip
 * @description Zip arrays together
 * $.zip([2, 3, 4], [5, 6]) -> [ [2, 5], [3, 6], [4, undefined] ]
 * $.zip([3, 4], [5, 6, 7]) -> [ [3, 5], [4, 6], [undefined, 7] ]
 * @param  {...any} arrays Lists to zip together
 * @return The arrays zipped together
 */
$.zip = function(...arrays) {
    let n = 0;
    let result = [];
    for (let array of arrays) {
        $.assert(Array.isArray(array), 'all parameters must be arrays');
        for (let i = 0; i < array.length; ++i) {
            if (i == result.length) {
                result.push([]);
                for (let j = 0; j < n; ++j) {
                    result[i].push(undefined);
                }
            }
            result[i].push(array[i]);
        }
    }
    return result;
}

/**
 * @function $.previousElement
 * @description gets the previous HTMLElement in the DOM. Useful to skip any text nodes
 * @param element HTMLElement to get the previous element of
 * @returns the previous HTMLElement in the DOM or null if there are no HTMLElements before the specified element.
 */
$.previousElement = function(element) {
    while (element.previousSibling) {
        if (element.previousSibling instanceof HTMLElement) {
            return element.previousSibling;
        }
        element = element.previousSibling;
    }
    return null;
}

/**
 * @function $.nextElement
 * @description gets the next HTMLElement in the DOM. Useful to skip any text nodes
 * @param element HTMLElement to get the next element of
 * @returns the next HTMLElement in the DOM or null if there are no HTMLElements after the specified element.
 */
$.nextElement = function(element) {
    while (element.nextSibling) {
        if (element.nextSibling instanceof HTMLElement) {
            return element.nextSibling;
        }
        element = element.nextSibling;
    }
    return null;
}

// From elipzer.com q.js, custom HTMLElement generation

/**
 * @function $.assert
 * @description Asserts that the value is true, throwing an error with specified
 * message otherwise
 * @param value The value of the assertion
 * @param message The message to be put in the error message if the value is falsy
 */
$.assert = function(value, message) {
    if (!value) {
        throw new Error(message);
    }
}

/**
 * @function $.addContent
 * @description Adds to the internal content of an HTMLElement
 * @param {HTMLElement} element The element to add content to
 * @param content The content to be added to the element
 */
$.addContent = function(element, content) {
    content = Array.isArray(content) ? content : [ content ];
    for (let e of content) {
        element.appendChild($.create(e));
    }
}

/**
 * @function $.clearChildren
 * @description removes all children from an element
 * @param {HTMLElement} element The element to remove all children from
 */
$.clearChildren = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * @function $.create
 * Recursively creates an HTMLElement from the specified content
 * @param obj An element initialization object { tag, id, class, content, ... }
 *    @var tag The HTML tag of the element (default: 'div')
 *    @var id The id of the elemnt
 *    @var class The class of the element (string or list of strings)
 *    @var content The internal content of the element. This is handled recursively.
 *                 Can be a string, HTMLElement, obj, list of objs, or list of HTMLElements
 *    @var ... All other attributes will be applied using element.setAttribute(key, value)
 */
$.create = function(obj) {
    if (obj instanceof HTMLElement) {
        return obj
    } else if (typeof obj !== 'object') {
        return document.createTextNode(obj);
    } else if (obj == null) {
        return document.createTextNode('[null]');
    }

    $.assert(obj !== undefined, 'obj is undefined');

    let element = null;
    if (obj.ns) {
        element = document.createElementNS(obj.ns, obj.tag || 'div');
    } else {
        element = document.createElement(obj.tag || 'div');
    }

    if (obj.id) {
        element.id = obj.id;
    }

    if (obj.class) {
        if (Array.isArray(obj.class)) {
            for (let c of obj.class) {
                $.assert(typeof c === 'string', `Invalid obj.class[i] type: ${typeof c}`);
                element.classList.add(c);
            }
        } else if (typeof obj.class === 'string') {
            element.className = obj.class;
        } else {
            throw new Error(`Invalid obj.class type: ${typeof c}`);
        }
    }

    for (let key in obj) {
        if (key !== 'tag' && key !== 'id' && key != 'class' && key != 'content') {
            if (obj.hasOwnProperty(key)) {
                element.setAttribute(key.toString(), obj[key].toString());
            }
        }
    }

    if (obj.content !== undefined) {
        $.addContent(element, obj.content);
    }

    return element;
}
