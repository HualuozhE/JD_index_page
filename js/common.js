/*
* By:花落折
* QQ：540776612
*
* 2018年11月10日19:24:33更新
* 函数封装兼容库||测试正确兼容至IE8
* */

/**
 *
 * @param x
 * @returns {HTMLElement}
 */
function my$(x) {
    return document.getElementById(x);
}

/**
 *
 * @param element
 * @param text
 */
function setInnerText(element, text) {
    if (element.textContent) {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

/**
 *
 * @param element
 * @returns {*|string}
 */
function getInnerText(element) {
    if (element.textContent) {
        return element.textContent;
    } else {
        return element.innerText;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getElementLastChildByParent(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType !== 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getElementFirstChildByParent(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType !== 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getPreviousElementSibling(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType !== 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 *
 * @param element
 * @returns {*}
 */
function getNextElementSibling(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType !== 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 *
 * @param type
 * @param element
 * @param fn
 */
function addEventListener(type, element, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

/**
 *
 * @param type
 * @param element
 * @param fn
 */
function removeEvenListener(type, element, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, fn);
    } else {
        element["on" + type] = null;
    }
}

/**
 *
 * @param element
 * @param attribute
 * @returns {any}
 */
function getStyle(element, attribute) {
    return window.getComputedStyle ? window.getComputedStyle(element)[attribute] : element.currentStyle[attribute] || 0;
}

/**
 *
 * @param element
 * @param target
 */
function thinAnimate(element, target) {
    var iss = element.offsetLeft;
    iss = Math.abs(iss - target) / 48;
    console.log(iss);
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = Math.ceil(iss);
        step = current < target ? step : -step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + step + "px";
        } else {
            element.style.left = target + "px";
            clearInterval(element.timeId);
            element.timeId = 0;
        }
    }, 1);
}

/**
 *
 * @param element
 * @param json
 * @param callback
 */
function completeAnimate(element, json, callback) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var key in json) {
            if (key === "opacity") {
                var current = getStyle(element, key) * 100;
                var target = json[key] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[key] = current / 100;
            } else if (key === "zIndex") {
                element.style[key] = json[key];
            } else {
                var current = parseInt(getStyle(element, key));
                var target = json[key];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[key] = current + "px";
            }
            if (current !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (callback) {
                callback();
            }
        }
    }, 10);
}

// function myremoveSelection() {
//     window.getSelection ? window.getSelection().removeAllRanges(): document.selection.empty();
// }
//
// var evt = {
//     event:function (e) {
//         return window.event || e;
//     },
//     clientX:function (e) {
//         return this.event(e).clientX;
//     },
//     clientY:function (e) {
//         return this.event(e).clientY;
//     },
//     scrollTop:function () {
//         return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
//     },
//     scrollLeft:function () {
//         return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
//     },
//     pageX:function (e) {
//         return this.event(e).pageX ? this.event(e).pageX : this.clientX(e) + this.scrollLeft();
//     },
//     pageY:function (e) {
//         return this.event(e).pageY ? this.event(e).pageY : this.clientY(e) + this.scrollTop();
//     }
// };