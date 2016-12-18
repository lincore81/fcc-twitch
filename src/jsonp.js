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
export function jsonp(url, timeout = 10000, doCleanUp = true) {
    return new Promise((resolve, reject) => { 
        // jsonp works like this:
        // 1. Create a new script-tag and set its src-attribute to the url of the api-call.
        // 2. The remote script loads as part of your web page and contains the response.
        // 3. You provide a global callback-function that the script calls with its response.
        //    For this to work you usually have to specify the function name in the api-call.
        
        // generate the function name from the given url to allow parallel requests:
        const callbackName = `jsonpCb_${url.replace(/[^\w]/g, `_`)}`;
        url = url.replace(`$CALLBACK`, callbackName);
        
        let rejected = false;
        // we can't easily check whether a jsonp request actually failed so we just wait 
        // some time and if nothing happend by then, we assume it failed.
        const timeoutId = setTimeout(() => {
            rejected = true; // in case we get a response after the timeout
            reject(new Error(`Request timed out: ${url}`));
            if (doCleanUp) cleanUp(); // see below
        }, timeout);
        
        // the jsonp callback:
        const callback = response => {
            if (rejected) { 
                // ignore the response, the user has likely reloaded a thousand times already 
                // still, we tell the client that we got something just in case they want to
                // increase the timeout.
                console.log(`got response after timeout: url='${url}', response='${response}'`);
                return;
            }
            clearTimeout(timeoutId);
            resolve(response); // yay, we did it!
            if (doCleanUp) cleanUp();
        };
        
        // we must provide a global callback function that can be called from the script
        // we are going to embed on the page
        window[callbackName] = callback;
        const scriptId = `jsonp-${callbackName}`; // for parallel requests, again

        // create the script element and set its src-attribute:
        let scriptElem = document.createElement(`script`);
        scriptElem.id = scriptId;
        scriptElem.setAttribute(`src`, url);
        document.body.appendChild(scriptElem);
        
        // since we pollute the global namespace and the html with jsonp, it's only fair that
        // we clean up afterwards:
        function cleanUp() {
            delete window[callbackName];
            document.body.removeChild(scriptElem);
        }
    });
}


