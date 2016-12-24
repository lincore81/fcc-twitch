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
	
	var _reactDom = __webpack_require__(/*! react-dom */ 4);
	
	var _view = __webpack_require__(/*! ./view.jsx */ 5);
	
	var _twitch = __webpack_require__(/*! ./twitch.js */ 6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var storageKey = 'lincore.fcc-twitch-app';
	document.addEventListener('DOMContentLoaded', main);
	
	function main() {
	    var state = init();
	    window.appState = state; // for debugging
	    state.channels.forEach(function (name) {
	        return refresh(state, name);
	    });
	}
	
	function init() {
	    var channels = load(storageKey) || ['freecodecamp', 'jefmajor', 'northernlion', 'quill18', 'dawejfhsalkb', 'ESL_SC2', 'OgamingSC2'];
	    var channelData = {};
	    channels.forEach(function (name) {
	        return channelData[name] = {
	            displayName: name,
	            loading: true
	        };
	    });
	    var state = { channels: channels, channelData: channelData };
	    state.onAddChannelHandler = onAddChannelHandler.bind(this, state);
	    state.dragHandlers = {
	        onDragStart: onDragStartHandler.bind(this, state),
	        onDragOver: onDragOverHandler,
	        onDrop: onDropHandler.bind(this, state)
	    };
	    return state;
	}
	
	// renders the current state, see view.jsx
	function renderView(state) {
	    (0, _reactDom.render)(React.createElement(_view.TwitchApp, { order: state.channels, channels: state.channelData,
	        dragHandlers: state.dragHandlers, onsubmit: state.onAddChannelHandler }), document.getElementById('app'));
	}
	
	function refresh(state, channelName) {
	    var _this = this;
	
	    state.channelData[channelName] = {
	        loading: true,
	        displayName: channelName };
	
	    renderView(state);
	    (0, _twitch.query)(channelName).then(function (response) {
	        //console.log(`refresh:`, channelName, response);
	        response.onRefresh = refresh.bind(_this, state, channelName);
	        response.onRemove = removeChannel.bind(_this, state, channelName);
	        state.channelData[channelName] = response;
	        renderView(state);
	    }).catch(console.error.bind(console, 'refresh:'));
	}
	
	function addChannel(state, channelName) {
	    var channel = state.channels.find(function (name) {
	        return name.toLowerCase() === channelName.toLowerCase();
	    });
	    if (channel) {
	        // channel is already in list:
	        console.log('channel already in list: ' + channelName);
	    } else {
	        state.channels.push(channelName);
	        refresh(state, channelName);
	        store(storageKey, state.channels);
	    }
	
	    // bad hack: wait a second assuming renderView will be done by then:
	    setTimeout(function () {
	        var elem = document.getElementById(channelName);
	        if (elem) elem.scrollIntoView();
	    }, 1000);
	}
	
	function removeChannel(state, channelName) {
	    var index = state.channels.findIndex(function (x) {
	        return x === channelName;
	    });
	    if (index === -1) {
	        throw new Error('Can\'t remove, channel \'' + channelName + '\' does not exist.');
	    }
	    state.channels.splice(index, 1);
	    delete state.channelData[channelName];
	    store(storageKey, state.channels);
	    renderView(state);
	}
	
	function swapChannels(state, dragger, dropTarget) {
	    var i = state.channels.indexOf(dragger),
	        j = state.channels.indexOf(dropTarget);
	    if (i === j) return;
	    var swap = state.channels[i];
	    state.channels[i] = state.channels[j];
	    state.channels[j] = swap;
	    store(storageKey, state.channels);
	    renderView(state);
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
	
	function store(key, state) {
	    localStorage.setItem(key, (0, _stringify2.default)(state));
	}
	
	// event handlers:
	
	function onDragStartHandler(state, event) {
	    var channelName = event.target.getAttribute('data-channelName'),
	        channel = state.channelData[channelName],
	        url = channel && channel.channelUrl || '';
	    if (!channelName) return;
	    state.dragging = channelName;
	    event.dataTransfer.setData('text/plain', url);
	}
	
	function onDragOverHandler(event) {
	    event.preventDefault();
	    event.dataTransfer.dropEffect = 'move';
	}
	
	function onDropHandler(state, event) {
	    var getChannelName = function getChannelName(elem) {
	        if (!elem) return false;
	        if (elem.hasAttribute('data-channelName')) {
	            return elem.getAttribute('data-channelName');
	        }
	        return getChannelName(elem.parentElement);
	    };
	    event.preventDefault();
	    var dragger = state.dragging,
	        dropTarget = getChannelName(event.target);
	    if (!dragger || !dropTarget) {
	        event.persist();
	        return;
	    }
	    swapChannels(state, dragger, dropTarget);
	    delete state.dragging;
	}
	
	function onAddChannelHandler(state, event) {
	    var input = event.target.querySelector('input#add-channel'),
	        channelName = input.value;
	    if (!channelName) {
	        event.persist();
	        throw new Error('onAddChannelHandler: Unable to get channelName');
	    }
	
	    event.preventDefault();
	    addChannel(state, channelName);
	    input.value = '';
	}

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
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 5 */
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
	        "div",
	        { className: "text-center" },
	        React.createElement("img", { className: "loader", height: "100", alt: "Kappa", src: "img/k.png" })
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
	        { href: url, className: "external channel-name-link", title: displayName + "'s channel" },
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
	        "\xA0",
	        React.createElement(
	            "span",
	            { className: "sr-only" },
	            "Followers: "
	        ),
	        React.createElement(
	            "span",
	            { className: "channel-followers" },
	            followers.toLocaleString()
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
	
	var ChannelErrorComp = function ChannelErrorComp(_ref6) {
	    var errorMessage = _ref6.errorMessage;
	    return React.createElement(
	        "div",
	        { className: "channel-error" },
	        errorMessage
	    );
	};
	
	var ChannelButtonsComp = function ChannelButtonsComp(_ref7) {
	    var onRefresh = _ref7.onRefresh,
	        onRemove = _ref7.onRemove;
	    return React.createElement(
	        "span",
	        null,
	        React.createElement(
	            "button",
	            { className: "btn-clear", title: "Refresh", onClick: onRefresh },
	            React.createElement("i", { className: "fa fa-refresh", "aria-hidden": "true" }),
	            React.createElement(
	                "span",
	                { className: "sr-only" },
	                "Refresh"
	            )
	        ),
	        React.createElement(
	            "button",
	            { className: "btn-clear", title: "Remove", onClick: onRemove },
	            React.createElement("i", { className: "fa fa-trash-o", "aria-hidden": "true" }),
	            React.createElement(
	                "span",
	                { className: "sr-only" },
	                "Remove"
	            )
	        )
	    );
	};
	
	var ChannelLiveComp = function ChannelLiveComp(_ref8) {
	    var game = _ref8.game,
	        viewers = _ref8.viewers,
	        preview = _ref8.preview,
	        status = _ref8.status,
	        url = _ref8.url,
	        displayName = _ref8.displayName;
	    return React.createElement(
	        "div",
	        { className: "col-xs-12 channel-stream" },
	        React.createElement(
	            "div",
	            { className: "row" },
	            React.createElement(
	                "div",
	                { className: "col-sx-12 channel-status" },
	                status
	            )
	        ),
	        React.createElement(
	            "div",
	            { className: "row" },
	            React.createElement(
	                "div",
	                { className: "col-sx-12" },
	                React.createElement(
	                    "a",
	                    { href: url, title: "Watch " + displayName },
	                    React.createElement("img", { className: "img-fluid channel-preview", src: preview })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "col-sx-12 channel-footer" },
	                "Playing " + game + " for ",
	                viewers.toLocaleString(),
	                " ",
	                React.createElement(
	                    "span",
	                    null,
	                    "viewers"
	                )
	            )
	        )
	    );
	};
	
	var ChannelComp = function ChannelComp(_ref9) {
	    var channel = _ref9.channel;
	
	    var body = void 0;
	    if (channel.exists) body = React.createElement(ChannelBioComp, { bio: channel.bio });
	    if (channel.isLive) body = React.createElement(ChannelLiveComp, { game: channel.stream.game,
	        viewers: channel.stream.viewers, preview: channel.stream.preview.large,
	        status: channel.channel.status, url: channel.channelUrl,
	        displayName: channel.displayName });
	    if (channel.loading) body = React.createElement(LoadingComp, null);
	    if (channel.errorMessage) body = React.createElement(ChannelErrorComp, { errorMessage: channel.errorMessage });
	    return React.createElement(
	        "div",
	        null,
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
	                    { className: "col-xs-7" },
	                    React.createElement(ChannelNameComp, { displayName: channel.displayName || channel.name, url: channel.channelUrl }),
	                    channel.exists && React.createElement(ChannelLiveIndicatorComp, { isLive: channel.isLive })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "col-xs-3" },
	                    channel.exists && React.createElement(ChannelFollowersComp, { followers: channel.followers })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "col-xs-2 text-right" },
	                    React.createElement(ChannelButtonsComp, { onRefresh: channel.onRefresh, onRemove: channel.onRemove })
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "row channel-content" },
	                React.createElement(
	                    "div",
	                    { className: "col-xs-12" },
	                    body
	                )
	            )
	        )
	    );
	};
	
	var ChannelListItem = function ChannelListItem(_ref10) {
	    var channel = _ref10.channel,
	        i = _ref10.i,
	        dragHandlers = _ref10.dragHandlers;
	
	    var classes = "col-md-8 col-lg-6 col-sx-10 channel " + (channel.isLive ? "live" : "");
	    return React.createElement(
	        "div",
	        { className: "channel-list-item row" },
	        React.createElement("div", { className: "col-sx-1 col-md-2 col-lg-3" }),
	        React.createElement(
	            "div",
	            { className: classes, "data-channelName": channel.channelName, draggable: "true",
	                onDragStart: dragHandlers.onDragStart,
	                onDragOver: dragHandlers.onDragOver,
	                onDrop: dragHandlers.onDrop },
	            React.createElement(ChannelComp, { key: i, channel: channel })
	        ),
	        React.createElement("div", { className: "col-sx-1 col-md-2 col-lg-3" })
	    );
	};
	
	var ChannelListComp = function ChannelListComp(props) {
	    return React.createElement(
	        "div",
	        { className: "channel-list row" },
	        props.order.map(function (channel, i) {
	            return React.createElement(ChannelListItem, { channel: props.channels[channel], key: i, dragHandlers: props.dragHandlers });
	        })
	    );
	};
	
	var HeaderComp = function HeaderComp() {
	    return React.createElement(
	        "header",
	        { className: "text-center fullwidth", id: "header" },
	        React.createElement(
	            "a",
	            { href: "https://www.twitch.tv" },
	            React.createElement("img", { alt: "twitch streamers", style: { height: "1em" }, src: "img/twitch-streamers.png" })
	        )
	    );
	};
	
	var AddChannelComp = function AddChannelComp(_ref11) {
	    var onsubmit = _ref11.onsubmit;
	    return React.createElement(
	        "div",
	        { className: "text-center fullwidth", id: "add-channel-comp" },
	        React.createElement(
	            "form",
	            { onSubmit: onsubmit },
	            React.createElement(
	                "label",
	                { htmlFor: "add-channel-input" },
	                "Add channel:"
	            ),
	            React.createElement("input", { id: "add-channel" }),
	            React.createElement(
	                "button",
	                { className: "btn-clear", id: "btn-add", type: "submit" },
	                React.createElement("i", { className: "fa fa-plus-circle", "aria-hidden": "true" }),
	                React.createElement(
	                    "span",
	                    { className: "sr-only" },
	                    "Add"
	                )
	            )
	        )
	    );
	};
	
	var FooterComp = function FooterComp() {
	    return React.createElement(
	        "footer",
	        { className: "text-center fullwidth" },
	        React.createElement(
	            "a",
	            { href: "https://github.com/lincore81/fcc-twitch", title: "View the code on Github" },
	            React.createElement("i", { className: "icon fa fa-github", "aria-hidden": "true" }),
	            "\xA0",
	            React.createElement(
	                "span",
	                null,
	                "Source: "
	            ),
	            "https://github.com/lincore81/fcc-twitch"
	        ),
	        " | ",
	        React.createElement(
	            "a",
	            {
	                href: "https://www.freecodecamp.com" },
	            React.createElement("i", { className: "icon fa fa-free-code-camp", "aria-hidden": "true",
	                title: "learn web development at Free Code Camp" }),
	            "\xA0",
	            React.createElement(
	                "span",
	                null,
	                "Free Code Camp"
	            )
	        )
	    );
	};
	
	var TwitchApp = exports.TwitchApp = function TwitchApp(props) {
	    return React.createElement(
	        "div",
	        { className: "twitch-app" },
	        React.createElement(HeaderComp, null),
	        React.createElement(AddChannelComp, { onsubmit: props.onsubmit }),
	        React.createElement(
	            "div",
	            { className: "container" },
	            React.createElement(ChannelListComp, { order: props.order, channels: props.channels,
	                dragHandlers: props.dragHandlers })
	        ),
	        React.createElement(FooterComp, null)
	    );
	};

/***/ },
/* 6 */
/*!*******************!*\
  !*** ./twitch.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 7);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	exports.query = query;
	
	var _jsonp = __webpack_require__(/*! ./jsonp.js */ 63);
	
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
	
	/**
	 * Send multiple queries to twitch to get all necessary channel data:
	 * 1) get info about the current live stream (includes stream and channel data if live)
	 * 2) if not live, get general data about the channel
	 * 3) if user exists (i. e. prev. queries did not return 404), get user data
	 * (for the user's "bio" field).
	 */
	function query(channelName) {
	    var firstResponse = {};
	    return getStreamOrChannelPromise(channelName).then(function (response) {
	        // user does not exist:
	        if (response.status === 404) return response;
	        firstResponse = response;
	        return getUserPromise(channelName);
	    }).then(function (response) {
	        return handleTwitchResponse(channelName, [response, firstResponse]);
	    })
	    // At this point I assume a timeout occured (though it could be a different error)
	    .catch(function (reason) {
	        console.error(reason);
	        var response = catchTimeout(reason);
	        return handleTwitchResponse(channelName, [null, response]);
	    });
	}
	
	// Create a unified channelData object that contains stream, channel and error data, if available.
	// This is called by queryTwitch, so there's no need to invoke it anywhere else. 
	// I just put it here to keep queryTwitch small.
	function handleTwitchResponse(channelName, responses) {
	    //console.log(channelName, responses);
	    var _responses = (0, _slicedToArray3.default)(responses, 2),
	        user = _responses[0],
	        channelAndStream = _responses[1];
	
	    var ans = { channelName: channelName, responses: responses };
	    if (channelAndStream.error) {
	        //console.error(user, channelAndStream);
	        ans.errorMessage = channelAndStream.message;
	        return ans;
	    }
	    var isLive = !!channelAndStream.stream;
	    var channel = isLive ? channelAndStream.stream.channel : channelAndStream;
	    var stream = channelAndStream.stream;
	    ans.exists = user.status !== 404;
	    ans.errorMessage = channelAndStream.message || user.message;
	    ans.isLive = isLive;
	    ans.stream = stream;
	    ans.channel = channel;
	    ans.displayName = channel.display_name;
	    ans.name = channelName;
	    ans.bio = user.bio;
	    ans.channelUrl = channel.url;
	    ans.profilePic = channel.logo;
	    ans.followers = channel.followers;
	    if (isLive) ans.preview = stream.preview;
	    return ans;
	}
	
	function getQueryString() {
	    // be nice :)
	    return 'cli' + 'ent' + '_i' + 'd=' + 'rcs4bas49lbrgwkdps0p5b634wfrkr';
	}

/***/ },
/* 7 */
/*!***************************************************!*\
  !*** ../~/babel-runtime/helpers/slicedToArray.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ 8);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ 59);
	
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
/* 8 */
/*!*************************************************!*\
  !*** ../~/babel-runtime/core-js/is-iterable.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ 9), __esModule: true };

/***/ },
/* 9 */
/*!**********************************************!*\
  !*** ../~/core-js/library/fn/is-iterable.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 10);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 55);
	module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ 57);

/***/ },
/* 10 */
/*!********************************************************!*\
  !*** ../~/core-js/library/modules/web.dom.iterable.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 11);
	var global        = __webpack_require__(/*! ./_global */ 22)
	  , hide          = __webpack_require__(/*! ./_hide */ 25)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 14)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 52)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 11 */
/*!**********************************************************!*\
  !*** ../~/core-js/library/modules/es6.array.iterator.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 12)
	  , step             = __webpack_require__(/*! ./_iter-step */ 13)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 14)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 15);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 19)(Array, 'Array', function(iterated, kind){
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
/* 12 */
/*!***********************************************************!*\
  !*** ../~/core-js/library/modules/_add-to-unscopables.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 13 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_iter-step.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 14 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_iterators.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 15 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_to-iobject.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 16)
	  , defined = __webpack_require__(/*! ./_defined */ 18);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 16 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_iobject.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 17);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 17 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_cof.js ***!
  \********************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 18 */
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
/* 19 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_iter-define.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 20)
	  , $export        = __webpack_require__(/*! ./_export */ 21)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 35)
	  , hide           = __webpack_require__(/*! ./_hide */ 25)
	  , has            = __webpack_require__(/*! ./_has */ 36)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 14)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 37)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 51)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 53)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 52)('iterator')
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
/* 20 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_library.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 21 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_export.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 22)
	  , core      = __webpack_require__(/*! ./_core */ 3)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 23)
	  , hide      = __webpack_require__(/*! ./_hide */ 25)
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
/* 22 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_global.js ***!
  \***********************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 23 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_ctx.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 24);
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
/* 24 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_a-function.js ***!
  \***************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 25 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_hide.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 26)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 34);
	module.exports = __webpack_require__(/*! ./_descriptors */ 30) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 26 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_object-dp.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 27)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 29)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 33)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 30) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 27 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_an-object.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 28);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 28 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_is-object.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 29 */
/*!*******************************************************!*\
  !*** ../~/core-js/library/modules/_ie8-dom-define.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 30) && !__webpack_require__(/*! ./_fails */ 31)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 32)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 30 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_descriptors.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 31)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 31 */
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
/* 32 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_dom-create.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 28)
	  , document = __webpack_require__(/*! ./_global */ 22).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 33 */
/*!*****************************************************!*\
  !*** ../~/core-js/library/modules/_to-primitive.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 28);
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
/* 34 */
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
/* 35 */
/*!*************************************************!*\
  !*** ../~/core-js/library/modules/_redefine.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 25);

/***/ },
/* 36 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_has.js ***!
  \********************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 37 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_iter-create.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 38)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 34)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 51)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 25)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 52)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 38 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_object-create.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 27)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 39)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 49)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 46)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 32)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 50).appendChild(iframe);
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
/* 39 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_object-dps.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 26)
	  , anObject = __webpack_require__(/*! ./_an-object */ 27)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 40);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 30) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 40 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_object-keys.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 41)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 49);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 41 */
/*!*************************************************************!*\
  !*** ../~/core-js/library/modules/_object-keys-internal.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 36)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 15)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 42)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 46)('IE_PROTO');
	
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
/* 42 */
/*!*******************************************************!*\
  !*** ../~/core-js/library/modules/_array-includes.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 15)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 43)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 45);
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
/* 43 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_to-length.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 44)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 44 */
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
/* 45 */
/*!*************************************************!*\
  !*** ../~/core-js/library/modules/_to-index.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 44)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 46 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_shared-key.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 47)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 48);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 47 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_shared.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 22)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 48 */
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
/* 49 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_enum-bug-keys.js ***!
  \******************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 50 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_html.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 22).document && document.documentElement;

/***/ },
/* 51 */
/*!**********************************************************!*\
  !*** ../~/core-js/library/modules/_set-to-string-tag.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 26).f
	  , has = __webpack_require__(/*! ./_has */ 36)
	  , TAG = __webpack_require__(/*! ./_wks */ 52)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 52 */
/*!********************************************!*\
  !*** ../~/core-js/library/modules/_wks.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 47)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 48)
	  , Symbol     = __webpack_require__(/*! ./_global */ 22).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 53 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/_object-gpo.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 36)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 54)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 46)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 54 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_to-object.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 18);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 55 */
/*!***********************************************************!*\
  !*** ../~/core-js/library/modules/es6.string.iterator.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 56)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 19)(String, 'String', function(iterated){
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
/* 56 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_string-at.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 44)
	  , defined   = __webpack_require__(/*! ./_defined */ 18);
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
/* 57 */
/*!********************************************************!*\
  !*** ../~/core-js/library/modules/core.is-iterable.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 58)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 52)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 14);
	module.exports = __webpack_require__(/*! ./_core */ 3).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 58 */
/*!************************************************!*\
  !*** ../~/core-js/library/modules/_classof.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./_cof */ 17)
	  , TAG = __webpack_require__(/*! ./_wks */ 52)('toStringTag')
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
/* 59 */
/*!**************************************************!*\
  !*** ../~/babel-runtime/core-js/get-iterator.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 60), __esModule: true };

/***/ },
/* 60 */
/*!***********************************************!*\
  !*** ../~/core-js/library/fn/get-iterator.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 10);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 55);
	module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 61);

/***/ },
/* 61 */
/*!*********************************************************!*\
  !*** ../~/core-js/library/modules/core.get-iterator.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./_an-object */ 27)
	  , get      = __webpack_require__(/*! ./core.get-iterator-method */ 62);
	module.exports = __webpack_require__(/*! ./_core */ 3).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 62 */
/*!****************************************************************!*\
  !*** ../~/core-js/library/modules/core.get-iterator-method.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 58)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 52)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 14);
	module.exports = __webpack_require__(/*! ./_core */ 3).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 63 */
/*!******************!*\
  !*** ./jsonp.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 64);
	
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

/***/ },
/* 64 */
/*!*********************************************!*\
  !*** ../~/babel-runtime/core-js/promise.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ 65), __esModule: true };

/***/ },
/* 65 */
/*!******************************************!*\
  !*** ../~/core-js/library/fn/promise.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/es6.object.to-string */ 66);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 55);
	__webpack_require__(/*! ../modules/web.dom.iterable */ 10);
	__webpack_require__(/*! ../modules/es6.promise */ 67);
	module.exports = __webpack_require__(/*! ../modules/_core */ 3).Promise;

/***/ },
/* 66 */
/*!************************************************************!*\
  !*** ../~/core-js/library/modules/es6.object.to-string.js ***!
  \************************************************************/
/***/ function(module, exports) {



/***/ },
/* 67 */
/*!***************************************************!*\
  !*** ../~/core-js/library/modules/es6.promise.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(/*! ./_library */ 20)
	  , global             = __webpack_require__(/*! ./_global */ 22)
	  , ctx                = __webpack_require__(/*! ./_ctx */ 23)
	  , classof            = __webpack_require__(/*! ./_classof */ 58)
	  , $export            = __webpack_require__(/*! ./_export */ 21)
	  , isObject           = __webpack_require__(/*! ./_is-object */ 28)
	  , aFunction          = __webpack_require__(/*! ./_a-function */ 24)
	  , anInstance         = __webpack_require__(/*! ./_an-instance */ 68)
	  , forOf              = __webpack_require__(/*! ./_for-of */ 69)
	  , speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 72)
	  , task               = __webpack_require__(/*! ./_task */ 73).set
	  , microtask          = __webpack_require__(/*! ./_microtask */ 75)()
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
	      , FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 52)('species')] = function(exec){ exec(empty, empty); };
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
	  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 76)($Promise.prototype, {
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
	__webpack_require__(/*! ./_set-to-string-tag */ 51)($Promise, PROMISE);
	__webpack_require__(/*! ./_set-species */ 77)(PROMISE);
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
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 78)(function(iter){
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
/* 68 */
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
/* 69 */
/*!***********************************************!*\
  !*** ../~/core-js/library/modules/_for-of.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(/*! ./_ctx */ 23)
	  , call        = __webpack_require__(/*! ./_iter-call */ 70)
	  , isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 71)
	  , anObject    = __webpack_require__(/*! ./_an-object */ 27)
	  , toLength    = __webpack_require__(/*! ./_to-length */ 43)
	  , getIterFn   = __webpack_require__(/*! ./core.get-iterator-method */ 62)
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
/* 70 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_iter-call.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(/*! ./_an-object */ 27);
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
/* 71 */
/*!******************************************************!*\
  !*** ../~/core-js/library/modules/_is-array-iter.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(/*! ./_iterators */ 14)
	  , ITERATOR   = __webpack_require__(/*! ./_wks */ 52)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 72 */
/*!************************************************************!*\
  !*** ../~/core-js/library/modules/_species-constructor.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(/*! ./_an-object */ 27)
	  , aFunction = __webpack_require__(/*! ./_a-function */ 24)
	  , SPECIES   = __webpack_require__(/*! ./_wks */ 52)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 73 */
/*!*********************************************!*\
  !*** ../~/core-js/library/modules/_task.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(/*! ./_ctx */ 23)
	  , invoke             = __webpack_require__(/*! ./_invoke */ 74)
	  , html               = __webpack_require__(/*! ./_html */ 50)
	  , cel                = __webpack_require__(/*! ./_dom-create */ 32)
	  , global             = __webpack_require__(/*! ./_global */ 22)
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
	  if(__webpack_require__(/*! ./_cof */ 17)(process) == 'process'){
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
/* 74 */
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
/* 75 */
/*!**************************************************!*\
  !*** ../~/core-js/library/modules/_microtask.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 22)
	  , macrotask = __webpack_require__(/*! ./_task */ 73).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(/*! ./_cof */ 17)(process) == 'process';
	
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
/* 76 */
/*!*****************************************************!*\
  !*** ../~/core-js/library/modules/_redefine-all.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(/*! ./_hide */ 25);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 77 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_set-species.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(/*! ./_global */ 22)
	  , core        = __webpack_require__(/*! ./_core */ 3)
	  , dP          = __webpack_require__(/*! ./_object-dp */ 26)
	  , DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 30)
	  , SPECIES     = __webpack_require__(/*! ./_wks */ 52)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 78 */
/*!****************************************************!*\
  !*** ../~/core-js/library/modules/_iter-detect.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(/*! ./_wks */ 52)('iterator')
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map