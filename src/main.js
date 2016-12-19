import {render} from 'react-dom';
import {TwitchApp} from './view.jsx';
import {query} from './twitch.js';
window.__query = query;

const storageKey = `lincore.fcc-twitch-app`;
document.addEventListener(`DOMContentLoaded`, main);

function main() {
    const mock = true;
    const state = init(mock);
    renderView(state);
    window.appState = state; // for debugging
    if (mock) return;
    const promises = state.channels.map(query);    
    Promise.all(promises)
        .then(response => {
            console.log(`response:`, response);
            state.channelData = response;
            // for mocking:
            localStorage.setItem(`twitch-state`, JSON.stringify(state));
            renderView(state);
        }).catch(console.error.bind(console));
}

function renderView(state) {
    render(<TwitchApp channels={state.channelData}/>, 
            document.getElementById(`app`));
}

function init(mock=false) {
    if (mock) {
        const state = load(`twitch-state`);
        if (state) return state; 
    }
    const channels = load(storageKey) || [`freecodecamp`, `jefmajor`, `northernlion`, `quill18`];
    const channelData = channels.map(name => ({
        displayName: name,
        loading: true
    }));
    return {
        channels,
        channelData,
    };
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
