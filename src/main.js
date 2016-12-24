import {render} from 'react-dom';
import {TwitchApp} from './view.jsx';
import {query} from './twitch.js';

const storageKey = `lincore.fcc-twitch-app`;
document.addEventListener(`DOMContentLoaded`, main);


function main() {
    const state = init();
    window.appState = state; // for debugging
    state.channels.forEach(name => refresh(state, name));
}

function init() {
    const channels = load(storageKey) || [`freecodecamp`, `jefmajor`, 
        `northernlion`, `quill18`, `dawejfhsalkb`, `ESL_SC2`, `OgamingSC2`];
    const channelData = {};
    channels.forEach(name => channelData[name] = {
        displayName: name,
        loading: true
    });
    const state = {channels, channelData};
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
    render(<TwitchApp order={state.channels} channels={state.channelData} 
            dragHandlers={state.dragHandlers} onsubmit={state.onAddChannelHandler}/>, 
            document.getElementById(`app`));
}


function refresh(state, channelName) {
    state.channelData[channelName] = {
        loading: true,
        displayName: channelName};

    renderView(state);
    query(channelName).then(response => {
        //console.log(`refresh:`, channelName, response);
        response.onRefresh = refresh.bind(this, state, channelName);
        response.onRemove = removeChannel.bind(this, state, channelName);
        state.channelData[channelName] = response;
        renderView(state);
    }).catch(console.error.bind(console, `refresh:`));
}


function addChannel(state, channelName) {
    const channel = state.channels.find(name => name.toLowerCase() === channelName.toLowerCase());
    if (channel) {
        // channel is already in list:
        console.log(`channel already in list: ${channelName}`);
    } else {
        state.channels.push(channelName);
        refresh(state, channelName);
        store(storageKey, state.channels);
    }

    // bad hack: wait a second assuming renderView will be done by then:
    setTimeout(() => {
        const elem = document.getElementById(channelName);
        if (elem) elem.scrollIntoView();
    }, 1000);
}


function removeChannel(state, channelName) {
    const index = state.channels.findIndex(x => x === channelName);
    if (index === -1) {
        throw new Error(`Can't remove, channel '${channelName}' does not exist.`);
    }
    state.channels.splice(index, 1);
    delete state.channelData[channelName];
    store(storageKey, state.channels);
    renderView(state);
}


function swapChannels(state, dragger, dropTarget) {
    const i = state.channels.indexOf(dragger),
        j = state.channels.indexOf(dropTarget);
    if (i === j) return;
    const swap = state.channels[i];
    state.channels[i] = state.channels[j];
    state.channels[j] = swap;
    store(storageKey, state.channels);
    renderView(state);
}


function load(key) {
    const json = localStorage.getItem(key);
    if (json) try {
        return JSON.parse(json);
    } catch (e) {
        if (e.constructor !== SyntaxError) throw e; 
        console.log(`Unable to parse stored JSON:`, json);
    }
}

function store(key, state) {
    localStorage.setItem(key, JSON.stringify(state));
}



// event handlers:

function onDragStartHandler(state, event) {
    const channelName = event.target.getAttribute(`data-channelName`),
        channel = state.channelData[channelName],
        url = channel && channel.channelUrl || ``;
    if (!channelName) return;
    state.dragging = channelName;
    event.dataTransfer.setData(`text/plain`, url);
}

function onDragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = `move`;
}

function onDropHandler(state, event) {
    const getChannelName = elem => {
        if (!elem) return false;
        if (elem.hasAttribute(`data-channelName`)) {
            return elem.getAttribute(`data-channelName`);
        }
        return getChannelName(elem.parentElement);
    };
    event.preventDefault();
    const dragger = state.dragging,
        dropTarget = getChannelName(event.target);
    if (!dragger || !dropTarget) {
        event.persist();
        return;
    }
    swapChannels(state, dragger, dropTarget);
    delete state.dragging;
}

function onAddChannelHandler(state, event) {
    const input = event.target.querySelector(`input#add-channel`),
        channelName = input.value;
    if (!channelName) {
        event.persist();
        throw new Error(`onAddChannelHandler: Unable to get channelName`);
    }

    event.preventDefault();
    addChannel(state, channelName);
    input.value = ``; 
}

