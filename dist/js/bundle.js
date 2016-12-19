/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 1);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 4);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 68);
	
	var _view = __webpack_require__(/*! ./view.jsx */ 69);
	
	var _twitch = __webpack_require__(/*! ./twitch.js */ 70);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.__query = _twitch.query;
	
	var storageKey = 'lincore.fcc-twitch-app';
	document.addEventListener('DOMContentLoaded', main);
	
	function main() {
	    var mock = true;
	    var state = init(mock);
	    renderView(state);
	    window.appState = state; // for debugging
	    if (mock) return;
	    var promises = state.channels.map(_twitch.query);
	    _promise2.default.all(promises).then(function (response) {
	        console.log('response:', response);
	        state.channelData = response;
	        // for mocking:
	        localStorage.setItem('twitch-state', (0, _stringify2.default)(state));
	        renderView(state);
	    }).catch(console.error.bind(console));
	}
	
	function renderView(state) {
	    (0, _reactDom.render)(React.createElement(_view.TwitchApp, { channels: state.channelData }), document.getElementById('app'));
	}
	
	function init() {
	    var mock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	    if (mock) {
	        var state = load('twitch-state');
	        if (state) return state;
	    }
	    var channels = load(storageKey) || ['freecodecamp', 'jefmajor', 'northernlion', 'quill18'];
	    var channelData = channels.map(function (name) {
	        return {
	            displayName: name,
	            loading: true
	        };
	    });
	    return {
	        channels: channels,
	        channelData: channelData
	    };
	}
	
	function load(key) {
	    var json = localStorage.getItem(key);
	    if (json) try {
	        return JSON.parse(json);
	    } catch (e) {
	        if (e.constructor !== SyntaxError) throw e;
	        console.log('Unable to parse stored JSON:', json);
	    }
	}
	
	/*function store(key, state) {
	    localStorage.setItem(key, JSON.stringify(state));
	}*/
	
	/*
	function escapeHtml(plaintext) {
	    const subst = {
	        '&': `&amp;`,
	        '>': `&gt;`,
	        '<': `&lt;`
	    };
	    return plaintext.replace(/[&<>]/g, c => subst[c] || `?`);
	}

	function wrapUrls(plaintext) {
	    const urlRe = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
	    return plaintext.replace(urlRe, `<a class="external" href="$1">$1</a>`);
	}

	*/

/***/ },
/* 1 */
/*!****************************************************!*\
  !*** ../~/babel-runtime/core-js/json/stringify.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/json/stringify */ 2), __esModule: true };

/***/ },
/* 2 */
/*!*************************************************!*\
  !*** ../~/core-js/library/fn/json/stringify.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(/*! ../../modules/_core */ 3)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 3 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_core.js ***!
  \*********************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 4 */
/*!*********************************************!*\
  !*** ../~/babel-runtime/core-js/promise.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ 5), __esModule: true };

/***/ },
/* 5 */
/*!******************************************!*\
  !*** ../~/core-js/library/fn/promise.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/es6.object.to-string */ 6);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 7);
	__webpack_require__(/*! ../modules/web.dom.iterable */ 50);
	__webpack_require__(/*! ../modules/es6.promise */ 54);
	module.exports = __webpack_require__(/*! ../modules/_core */ 3).Promise;

/***/ },
/* 6 */
/*!************************************************************!*\
  !*** ../~/core-js/library/modules/es6.object.to-string.js ***!
  \************************************************************/
/***/ function(module, exports) {



/***/ },
/* 7 */
/*!***********************************************************!*\
  !*** ../~/core-js/library/modules/es6.string.iterator.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 8)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 11)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 8 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_string-at.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 9)
	  , defined   = __webpack_require__(/*! ./_defined */ 10);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 9 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_to-integer.js ***!
  \***************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 10 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_defined.js ***!
  \************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_iter-define.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 12)
	  , $export        = __webpack_require__(/*! ./_export */ 13)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 27)
	  , hide           = __webpack_require__(/*! ./_hide */ 17)
	  , has            = __webpack_require__(/*! ./_has */ 28)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 29)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 30)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 46)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 48)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 47)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 12 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_library.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 13 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_export.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 14)
	  , core      = __webpack_require__(/*! ./_core */ 3)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 15)
	  , hide      = __webpack_require__(/*! ./_hide */ 17)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
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

/***/ },
/* 14 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_global.js ***!
  \***********************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_ctx.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_a-function.js ***!
  \***************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_hide.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 18)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 26);
	module.exports = __webpack_require__(/*! ./_descriptors */ 22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_object-dp.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 19)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 21)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 25)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_an-object.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_is-object.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/*!*******************************************************!*\
  !*** ../~/core-js/library/modules/_ie8-dom-define.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 22) && !__webpack_require__(/*! ./_fails */ 23)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_descriptors.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/*!**********************************************!*\
  !*** ../~/core-js/library/modules/_fails.js ***!
  \**********************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_dom-create.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 20)
	  , document = __webpack_require__(/*! ./_global */ 14).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/*!*****************************************************!*\
  !*** ../~/core-js/library/modules/_to-primitive.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_property-desc.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/*!*************************************************!*\
  !*** ../~/core-js/library/modules/_redefine.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 17);

/***/ },
/* 28 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_has.js ***!
  \********************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 29 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_iterators.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 30 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_iter-create.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 31)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 26)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 46)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 17)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 47)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 31 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_object-create.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 19)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 32)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 44)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 41)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 24)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 45).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 32 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_object-dps.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 18)
	  , anObject = __webpack_require__(/*! ./_an-object */ 19)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 33);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 33 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_object-keys.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 34)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 44);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 34 */
/*!*************************************************************!*\
  !*** ../~/core-js/library/modules/_object-keys-internal.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 28)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 35)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 38)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 41)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 35 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_to-iobject.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 36)
	  , defined = __webpack_require__(/*! ./_defined */ 10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_iobject.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_cof.js ***!
  \********************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/*!*******************************************************!*\
  !*** ../~/core-js/library/modules/_array-includes.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 35)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 39)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 40);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 39 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_to-length.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 9)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 40 */
/*!*************************************************!*\
  !*** ../~/core-js/library/modules/_to-index.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 9)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 41 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_shared-key.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 42)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 43);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 42 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_shared.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 14)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 43 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_uid.js ***!
  \********************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 44 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_enum-bug-keys.js ***!
  \******************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 45 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_html.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 14).document && document.documentElement;

/***/ },
/* 46 */
/*!**********************************************************!*\
  !*** ../~/core-js/library/modules/_set-to-string-tag.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 18).f
	  , has = __webpack_require__(/*! ./_has */ 28)
	  , TAG = __webpack_require__(/*! ./_wks */ 47)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 47 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_wks.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 42)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 43)
	  , Symbol     = __webpack_require__(/*! ./_global */ 14).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 48 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_object-gpo.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 28)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 49)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 41)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 49 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_to-object.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 50 */
/*!********************************************************!*\
  !*** ../~/core-js/library/modules/web.dom.iterable.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 51);
	var global        = __webpack_require__(/*! ./_global */ 14)
	  , hide          = __webpack_require__(/*! ./_hide */ 17)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 29)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 47)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 51 */
/*!**********************************************************!*\
  !*** ../~/core-js/library/modules/es6.array.iterator.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 52)
	  , step             = __webpack_require__(/*! ./_iter-step */ 53)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 29)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 35);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 11)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 52 */
/*!***********************************************************!*\
  !*** ../~/core-js/library/modules/_add-to-unscopables.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 53 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_iter-step.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 54 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/es6.promise.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(/*! ./_library */ 12)
	  , global             = __webpack_require__(/*! ./_global */ 14)
	  , ctx                = __webpack_require__(/*! ./_ctx */ 15)
	  , classof            = __webpack_require__(/*! ./_classof */ 55)
	  , $export            = __webpack_require__(/*! ./_export */ 13)
	  , isObject           = __webpack_require__(/*! ./_is-object */ 20)
	  , aFunction          = __webpack_require__(/*! ./_a-function */ 16)
	  , anInstance         = __webpack_require__(/*! ./_an-instance */ 56)
	  , forOf              = __webpack_require__(/*! ./_for-of */ 57)
	  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 61)
	  , task               = __webpack_require__(/*! ./_task */ 62).set
	  , microtask          = __webpack_require__(/*! ./_microtask */ 64)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 47)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 65)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(/*! ./_set-to-string-tag */ 46)($Promise, PROMISE);
	__webpack_require__(/*! ./_set-species */ 66)(PROMISE);
	Wrapper = __webpack_require__(/*! ./_core */ 3)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 67)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 55 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_classof.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./_cof */ 37)
	  , TAG = __webpack_require__(/*! ./_wks */ 47)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_an-instance.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 57 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_for-of.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(/*! ./_ctx */ 15)
	  , call        = __webpack_require__(/*! ./_iter-call */ 58)
	  , isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 59)
	  , anObject    = __webpack_require__(/*! ./_an-object */ 19)
	  , toLength    = __webpack_require__(/*! ./_to-length */ 39)
	  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 60)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 58 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_iter-call.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(/*! ./_an-object */ 19);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 59 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_is-array-iter.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(/*! ./_iterators */ 29)
	  , ITERATOR   = __webpack_require__(/*! ./_wks */ 47)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 60 */
/*!****************************************************************!*\
  !*** ../~/core-js/library/modules/core.get-iterator-method.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 55)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 47)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 29);
	module.exports = __webpack_require__(/*! ./_core */ 3).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 61 */
/*!************************************************************!*\
  !*** ../~/core-js/library/modules/_species-constructor.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(/*! ./_an-object */ 19)
	  , aFunction = __webpack_require__(/*! ./_a-function */ 16)
	  , SPECIES   = __webpack_require__(/*! ./_wks */ 47)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 62 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_task.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(/*! ./_ctx */ 15)
	  , invoke             = __webpack_require__(/*! ./_invoke */ 63)
	  , html               = __webpack_require__(/*! ./_html */ 45)
	  , cel                = __webpack_require__(/*! ./_dom-create */ 24)
	  , global             = __webpack_require__(/*! ./_global */ 14)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(/*! ./_cof */ 37)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 63 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_invoke.js ***!
  \***********************************************/
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 64 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_microtask.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 14)
	  , macrotask = __webpack_require__(/*! ./_task */ 62).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(/*! ./_cof */ 37)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 65 */
/*!*****************************************************!*\
  !*** ../~/core-js/library/modules/_redefine-all.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(/*! ./_hide */ 17);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 66 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_set-species.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(/*! ./_global */ 14)
	  , core        = __webpack_require__(/*! ./_core */ 3)
	  , dP          = __webpack_require__(/*! ./_object-dp */ 18)
	  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 22)
	  , SPECIES     = __webpack_require__(/*! ./_wks */ 47)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 67 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_iter-detect.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(/*! ./_wks */ 47)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 68 */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 69 */
/*!******************!*\
  !*** ./view.jsx ***!
  \******************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var LoadingComp = function LoadingComp() {
	    return React.createElement(
	        "p",
	        null,
	        "Loading..."
	    );
	};
	
	var ChannelPicComp = function ChannelPicComp(_ref) {
	    var displayName = _ref.displayName,
	        src = _ref.src,
	        url = _ref.url;
	    return React.createElement(
	        "a",
	        { href: url, className: "external", title: displayName + "'s channel" },
	        React.createElement("img", { className: "img-fluid profile-pic", src: src })
	    );
	};
	
	var ChannelNameComp = function ChannelNameComp(_ref2) {
	    var displayName = _ref2.displayName,
	        url = _ref2.url;
	    return React.createElement(
	        "a",
	        { href: url, className: "external", title: displayName + "'s channel" },
	        React.createElement(
	            "span",
	            { className: "channel-name" },
	            displayName
	        )
	    );
	};
	
	var ChannelLiveIndicatorComp = function ChannelLiveIndicatorComp(_ref3) {
	    var isLive = _ref3.isLive;
	
	    return isLive ? React.createElement(
	        "span",
	        { className: "channel-streaming live" },
	        "L I V E"
	    ) : React.createElement(
	        "span",
	        { className: "channel-streaming" },
	        "offline"
	    );
	};
	
	var ChannelFollowersComp = function ChannelFollowersComp(_ref4) {
	    var followers = _ref4.followers;
	    return React.createElement(
	        "span",
	        { title: "Followers" },
	        React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
	        React.createElement(
	            "span",
	            { className: "sr-only" },
	            "Followers: "
	        ),
	        React.createElement(
	            "span",
	            { className: "channel-followers" },
	            followers
	        )
	    );
	};
	
	var ChannelBioComp = function ChannelBioComp(_ref5) {
	    var bio = _ref5.bio;
	    return React.createElement(
	        "div",
	        { className: "channel-bio" },
	        bio
	    );
	};
	
	var ChannelComp = function ChannelComp(_ref6) {
	    var channel = _ref6.channel;
	
	    return React.createElement(
	        "div",
	        { className: "row channel" },
	        React.createElement(
	            "div",
	            { className: "col-xs-2" },
	            React.createElement(ChannelPicComp, { displayName: channel.displayName, url: channel.channelUrl, src: channel.profilePic })
	        ),
	        React.createElement(
	            "div",
	            { className: "col-xs-10" },
	            React.createElement(
	                "div",
	                { className: "row channel-header" },
	                React.createElement(
	                    "div",
	                    { className: "col-xs-9" },
	                    React.createElement(ChannelNameComp, { displayName: channel.displayName, url: channel.channelUrl }),
	                    React.createElement(ChannelLiveIndicatorComp, { isLive: channel.isLive })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "col-xs-3" },
	                    React.createElement(ChannelFollowersComp, { followers: channel.followers })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "row channel-content" },
	                React.createElement(
	                    "div",
	                    { className: "col-xs-12" },
	                    React.createElement(ChannelBioComp, { bio: channel.bio })
	                )
	            )
	        )
	    );
	};
	
	var ChannelListItem = function ChannelListItem(_ref7) {
	    var channel = _ref7.channel,
	        i = _ref7.i;
	    return React.createElement(
	        "div",
	        { className: "channel-list-item" },
	        React.createElement("div", { className: "col-md-1 col-lg-2" }),
	        React.createElement(
	            "div",
	            { className: "col-md-10 col-lg-8 col-sx-12" },
	            channel.loading ? React.createElement(LoadingComp, null) : React.createElement(ChannelComp, { key: i, channel: channel })
	        ),
	        React.createElement("div", { className: "col-md-1 col-lg-2" })
	    );
	};
	
	var ChannelListComp = function ChannelListComp(props) {
	    return React.createElement(
	        "div",
	        { className: "channel-list row" },
	        props.channels.map(function (channel, i) {
	            return React.createElement(ChannelListItem, { channel: channel, key: i });
	        })
	    );
	};
	
	var HeaderComp = function HeaderComp() {
	    return React.createElement(
	        "header",
	        { className: "text-center" },
	        React.createElement(
	            "a",
	            { href: "https://www.twitch.tv" },
	            React.createElement("img", { alt: "twitch", style: { height: "1em" }, src: "img/twitch.png" })
	        ),
	        "\xA0streamers"
	    );
	};
	
	var FooterComp = function FooterComp() {
	    return React.createElement(
	        "footer",
	        { className: "text-center" },
	        "github: ",
	        React.createElement(
	            "a",
	            { href: "https://github.com/lincore81/fcc-twitch" },
	            "https://github.com/lincore81/fcc-twitch"
	        )
	    );
	};
	
	var TwitchApp = exports.TwitchApp = function TwitchApp(props) {
	    return React.createElement(
	        "div",
	        { className: "twitch-app container" },
	        React.createElement(HeaderComp, null),
	        React.createElement(ChannelListComp, { channels: props.channels }),
	        React.createElement(FooterComp, null)
	    );
	};

/***/ },
/* 70 */
/*!*******************!*\
  !*** ./twitch.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 71);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 4);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.query = query;
	
	var _jsonp = __webpack_require__(/*! ./jsonp.js */ 78);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// I only get this because I use its 'bio'-text (aka channel description)
	function getUserQueryUrl(channel) {
	    return 'https://api.twitch.tv/kraken/users/' + channel + '?callback=$CALLBACK&' + getQueryString();
	}
	
	// stream query responses contain info on a current live stream as well as general channel data.
	// When a channel is not live, this is totally useless (= no data).
	function getStreamQueryUrl(channel) {
	    return 'https://api.twitch.tv/kraken/streams/' + channel + '?callback=$CALLBACK&' + getQueryString();
	}
	
	// When a channel is offline, we make a second query to get the channel data 
	// for profile pictures, display name, status message etc.
	function getChannelQueryUrl(channel) {
	    return 'https://api.twitch.tv/kraken/channels/' + channel + '?callback=$CALLBACK&' + getQueryString();
	}
	
	// handles timed out promises
	function catchTimeout(reason) {
	    return { error: reason, message: reason.message, timedOut: true };
	}
	
	// returns a promise of a channel's user data
	function getUserPromise(channelName) {
	    return (0, _jsonp.jsonp)(getUserQueryUrl(channelName)).then(function (response) {
	        return response;
	    }).catch(catchTimeout);
	}
	
	// returns a promise of a channel's stream/channel data
	function getStreamOrChannelPromise(channelName) {
	    return (0, _jsonp.jsonp)(getStreamQueryUrl(channelName)).then(function (response) {
	        return response.stream ?
	        // channel is live, we got all the data we need. promise resolves immediately.
	        response :
	        // channel is offline, we have to send another query to get the channel data
	        (0, _jsonp.jsonp)(getChannelQueryUrl(channelName));
	    }).catch(catchTimeout);
	}
	
	// Create and send up to three twitch api queries to get stream/channel data and
	// then call handleTwitchResponse with the results (asynchronously).
	function query(channelName) {
	    return _promise2.default.all([getUserPromise(channelName), getStreamOrChannelPromise(channelName)]).then(handleTwitchResponse.bind(this, channelName)).catch(function (reason) {
	        var response = catchTimeout(reason);
	        return handleTwitchResponse(channelName, [null, response]);
	    });
	}
	
	// Create a unified channelData object that contains stream, channel and error data, if available.
	// This is called by queryTwitch, so there's no need to invoke it anywhere else. 
	// I just put it here to keep queryTwitch small.
	function handleTwitchResponse(channelName, responses) {
	    console.log(channelName, responses);
	
	    var _responses = (0, _slicedToArray3.default)(responses, 2),
	        user = _responses[0],
	        channelAndStream = _responses[1];
	
	    var ans = { channelName: channelName, responses: responses };
	    if (channelAndStream.error) {
	        console.error(user, channelAndStream);
	        ans.errorMessage = channelAndStream.message;
	        return ans;
	    }
	    var isLive = !!channelAndStream.stream;
	    var channel = isLive ? channelAndStream.stream.channel : channelAndStream;
	    var stream = channelAndStream.stream;
	    ans.isLive = isLive;
	    ans.stream = stream;
	    ans.channel = channel;
	    ans.displayName = channel.display_name;
	    ans.bio = user.bio;
	    ans.channelUrl = channel.url;
	    ans.profilePic = channel.logo;
	    if (isLive) ans.preview = stream.preview;
	    return ans;
	}
	
	function getQueryString() {
	    // be nice :)
	    return 'cli' + 'ent' + '_i' + 'd=' + 'rcs4bas49lbrgwkdps0p5b634wfrkr';
	}

/***/ },
/* 71 */
/*!***************************************************!*\
  !*** ../~/babel-runtime/helpers/slicedToArray.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ 72);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ 75);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 72 */
/*!*************************************************!*\
  !*** ../~/babel-runtime/core-js/is-iterable.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ 73), __esModule: true };

/***/ },
/* 73 */
/*!**********************************************!*\
  !*** ../~/core-js/library/fn/is-iterable.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 50);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 7);
	module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ 74);

/***/ },
/* 74 */
/*!********************************************************!*\
  !*** ../~/core-js/library/modules/core.is-iterable.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 55)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 47)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 29);
	module.exports = __webpack_require__(/*! ./_core */ 3).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 75 */
/*!**************************************************!*\
  !*** ../~/babel-runtime/core-js/get-iterator.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 76), __esModule: true };

/***/ },
/* 76 */
/*!***********************************************!*\
  !*** ../~/core-js/library/fn/get-iterator.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 50);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 7);
	module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 77);

/***/ },
/* 77 */
/*!*********************************************************!*\
  !*** ../~/core-js/library/modules/core.get-iterator.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./_an-object */ 19)
	  , get      = __webpack_require__(/*! ./core.get-iterator-method */ 60);
	module.exports = __webpack_require__(/*! ./_core */ 3).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 78 */
/*!******************!*\
  !*** ./jsonp.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 4);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.jsonp = jsonp;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// and here is the star of the show: jsonp in all its ugliness :)
	/**
	 * Use the jsonp mechanism to query an api. Return a promise that will be resolved if
	 * a response is received or rejected if the request times out (default: 10 seconds).
	 * @param url {string} - the url to query. All occurances of $CALLBACK in the string
	 * are resolved by the name of the internally used callback function.
	 * @param timeout {number} - the time in milliseconds after which the promise is
	 * rejected (= we assume the request failed).
	 * @param doCleanUp {boolean} - whether the appended script-tag and global callback should be
	 * cleaned up afterwards. Can be set to false for debugging.
	 * @returns The promise. Use its .then() and .catch() to deal with the result of the query.
	 */
	function jsonp(url) {
	    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
	    var doCleanUp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	    return new _promise2.default(function (resolve, reject) {
	        // jsonp works like this:
	        // 1. Create a new script-tag and set its src-attribute to the url of the api-call.
	        // 2. The remote script loads as part of your web page and contains the response.
	        // 3. You provide a global callback-function that the script calls with its response.
	        //    For this to work you usually have to specify the function name in the api-call.
	
	        // generate the function name from the given url to allow parallel requests:
	        var callbackName = "jsonpCb_" + url.replace(/[^\w]/g, "_");
	        url = url.replace("$CALLBACK", callbackName);
	
	        var rejected = false;
	        // we can't easily check whether a jsonp request actually failed so we just wait 
	        // some time and if nothing happend by then, we assume it failed.
	        var timeoutId = setTimeout(function () {
	            rejected = true; // in case we get a response after the timeout
	            reject(new Error("Request timed out: " + url));
	            if (doCleanUp) cleanUp(); // see below
	        }, timeout);
	
	        // the jsonp callback:
	        var callback = function callback(response) {
	            if (rejected) {
	                // ignore the response, the user has likely reloaded a thousand times already 
	                // still, we tell the client that we got something just in case they want to
	                // increase the timeout.
	                console.log("got response after timeout: url='" + url + "', response='" + response + "'");
	                return;
	            }
	            clearTimeout(timeoutId);
	            resolve(response); // yay, we did it!
	            if (doCleanUp) cleanUp();
	        };
	
	        // we must provide a global callback function that can be called from the script
	        // we are going to embed on the page
	        window[callbackName] = callback;
	        var scriptId = "jsonp-" + callbackName; // for parallel requests, again
	
	        // create the script element and set its src-attribute:
	        var scriptElem = document.createElement("script");
	        scriptElem.id = scriptId;
	        scriptElem.setAttribute("src", url);
	        document.body.appendChild(scriptElem);
	
	        // since we pollute the global namespace and the html with jsonp, it's only fair that
	        // we clean up afterwards:
	        function cleanUp() {
	            delete window[callbackName];
	            document.body.removeChild(scriptElem);
	        }
	    });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map