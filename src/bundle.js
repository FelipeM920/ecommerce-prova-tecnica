(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],2:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":15}],3:[function(require,module,exports){
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],4:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":1}],5:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],6:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":9}],7:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":11,"./_is-object":15}],8:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":3,"./_ctx":4,"./_global":11,"./_hide":13,"./_redefine":19}],9:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],10:[function(require,module,exports){
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":20}],11:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],12:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],13:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":6,"./_object-dp":17,"./_property-desc":18}],14:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":6,"./_dom-create":7,"./_fails":9}],15:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],16:[function(require,module,exports){
module.exports = false;

},{}],17:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":2,"./_descriptors":6,"./_ie8-dom-define":14,"./_to-primitive":23}],18:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],19:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":3,"./_function-to-string":10,"./_global":11,"./_has":12,"./_hide":13,"./_uid":24}],20:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":3,"./_global":11,"./_library":16}],21:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":9}],22:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":5}],23:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":15}],24:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],25:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_a-function":1,"./_export":8,"./_fails":9,"./_strict-method":21,"./_to-object":22}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionBox = void 0;
const Options = {
  MaiorValor: '1',
  MenorValor: '2',
  NomeAZ: '3',
  NomeZA: '4'
};

class OptionBox {
  static get Options() {
    return Options;
  }

}

exports.OptionBox = OptionBox;
},{}],27:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.array.sort");

var _service = require("./service.js");

var _enum = require("./enum.js");

const service = new _service.Service();
const pageSize = 20;
const firstPage = 1;
let actualPage = 1;
let actualAnchor = 1;
let products = [];
let totalPages = 0;
service.loadProducts().then(data => {
  totalPages = Math.ceil(data.products.length / pageSize);
  products = data.products;
  orderProducts(_enum.OptionBox.Options.MaiorValor);
  mapBarPaginationElements();
});

const orderProducts = orderBy => {
  switch (orderBy) {
    case _enum.OptionBox.Options.MaiorValor:
      products.sort((a, b) => b.price - a.price);
      break;

    case _enum.OptionBox.Options.MenorValor:
      products.sort((a, b) => a.price - b.price);
      break;

    case _enum.OptionBox.Options.NomeAZ:
      products.sort((a, b) => b.name < a.name);
      break;

    case _enum.OptionBox.Options.NomeZA:
      products.sort((a, b) => b.name > a.name);
      break;
  }

  paginate(firstPage);
};

const paginate = pageNumber => {
  if (pageNumber == '❮') --actualPage;else if (pageNumber == '❯') ++actualPage;else actualPage = --pageNumber;
  mapToHtml(products.slice(actualPage * pageSize, (actualPage + 1) * pageSize));
};

const setInactive = () => {
  const anchors = document.querySelectorAll('a');
  anchors.forEach(function (anchor) {
    anchor.classList.remove('active');
  });
};

const setActive = anchorId => {
  if (anchorId == 'arrowLeft') anchorId = "anchor".concat(--actualAnchor);else if (anchorId == 'arrowRight') anchorId = "anchor".concat(++actualAnchor);else actualAnchor = document.getElementById(anchorId).innerHTML;
  document.getElementById(anchorId).classList.add('active');
};

const manipulateActiveAnchor = anchorId => {
  setInactive();
  setActive(anchorId);
};

const addAnchorsEvents = () => {
  const anchors = document.querySelectorAll('a');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function () {
      if (anchor.innerHTML == '❮' && actualAnchor == 1 || anchor.innerHTML == '❯' && actualAnchor == totalPages) return;
      paginate(anchor.innerHTML);
      manipulateActiveAnchor(anchor.id);
    });
  });
};

const addOrderByEvents = () => {
  const options = document.querySelectorAll('option');
  options.forEach(function (option) {
    option.addEventListener('click', function () {
      orderProducts(option.value);
    });
  });
};

const openMobileMenu = () => {
  document.getElementById('sideNav').style.width = "350px";
};

const closeMobileMenu = () => {
  document.getElementById("sideNav").style.width = "0";
};

const addMobileMenuEvent = () => {
  document.getElementById('hamburguer').addEventListener('click', openMobileMenu);
  document.getElementById('closeButton').addEventListener('click', closeMobileMenu);
};

const mapBarPaginationElements = () => {
  let template = "<a id=\"arrowLeft\">\u276E</a>";

  for (let actualPage = 1; actualPage <= totalPages; actualPage++) {
    template += "<a id=\"anchor".concat(actualPage, "\">").concat(actualPage, "</a>");
  }

  template += "<a id=\"arrowRight\">\u276F</a>";
  document.getElementById('paginationSection').insertAdjacentHTML('beforeend', template);
  document.getElementById('anchor1').classList.add('active');
  addAnchorsEvents();
};

const clearProducts = () => {
  const productsDiv = document.getElementById('products');
  let child = productsDiv.lastElementChild;
  if (child != null) while (child) {
    productsDiv.removeChild(child);
    child = productsDiv.lastElementChild;
  }
};

const mapToHtml = products => {
  clearProducts();
  const productsDiv = document.getElementById('products');
  products.forEach(product => {
    let template = "<ul class=\"container__items\">\n            <li>\n                <picture>\n                    <img class=\"imgMobile\" srcset=\"".concat(product.image, "\">\n                </picture>\n                <p id=\"productName\">\n                    ").concat(product.name, "\n                </p>\n                <p>\n                   R$ ").concat(Math.trunc(product.price), "\n                </p>\n            </li>\n        </ul>");
    productsDiv.insertAdjacentHTML('beforeend', template);
  });
};

addOrderByEvents();
addMobileMenuEvent();
},{"./enum.js":26,"./service.js":28,"core-js/modules/es6.array.sort":25}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = void 0;

class Service {
  async loadProducts() {
    try {
      const resp = await fetch('https://raw.githubusercontent.com/ArezzoCo/ecommerce-prova-tecnica/master/front-end/categoria-owme-es6-sass/mock-products.json');
      return resp.json();
    } catch (err) {
      console.log(err);
    }
  }

}

exports.Service = Service;
},{}]},{},[26,28,27]);
