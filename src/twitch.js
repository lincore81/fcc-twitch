import {jsonp} from './jsonp.js';

// I only get this because I use its 'bio'-text (aka channel description)
function getUserQueryUrl(channel) {
    return `https://api.twitch.tv/kraken/users/${channel}?callback=$CALLBACK&${getQueryString()}`;
}

// stream query responses contain info on a current live stream as well as general channel data.
// When a channel is not live, this is totally useless (= no data).
function getStreamQueryUrl(channel) {
    return `https://api.twitch.tv/kraken/streams/${channel}?callback=$CALLBACK&${getQueryString()}`;
}

// When a channel is offline, we make a second query to get the channel data 
// for profile pictures, display name, status message etc.
function getChannelQueryUrl(channel) {
    return `https://api.twitch.tv/kraken/channels/${channel}?callback=$CALLBACK&${getQueryString()}`;
}
  
// handles timed out promises
function catchTimeout(reason) {
    return {error: reason, message: reason.message, timedOut: true};
}

// returns a promise of a channel's user data
function getUserPromise(channelName) {  
    return jsonp(getUserQueryUrl(channelName))
        .then(response => response)
        .catch(catchTimeout);
}

// returns a promise of a channel's stream/channel data
function getStreamOrChannelPromise(channelName) {
    return jsonp(getStreamQueryUrl(channelName))
        .then(response => 
            response.stream?
                // channel is live, we got all the data we need. promise resolves immediately.
                response :
                // channel is offline, we have to send another query to get the channel data
                jsonp(getChannelQueryUrl(channelName)))
        .catch(catchTimeout);
}



// Create and send up to three twitch api queries to get stream/channel data and
// then call handleTwitchResponse with the results (asynchronously).
export function query(channelName) {
    return Promise.all([
        getUserPromise(channelName), 
        getStreamOrChannelPromise(channelName)])
    .then(handleTwitchResponse.bind(this, channelName))
    .catch(reason => {
        const response = catchTimeout(reason);
        return handleTwitchResponse(channelName, [null, response]);
    });
}

// Create a unified channelData object that contains stream, channel and error data, if available.
// This is called by queryTwitch, so there's no need to invoke it anywhere else. 
// I just put it here to keep queryTwitch small.
function handleTwitchResponse(channelName, responses) {
    console.log(channelName, responses);
    const [user, channelAndStream] = responses;
    const ans = {channelName, responses};
    if (channelAndStream.error) {
        console.error(user, channelAndStream);
        ans.errorMessage = channelAndStream.message;
        return ans;
    }
    const isLive = !!channelAndStream.stream;
    const channel = isLive? channelAndStream.stream.channel : channelAndStream;
    const stream = channelAndStream.stream;
    ans.isLive = isLive;
    ans.stream = stream;
    ans.channel = channel;
    ans.displayName = channel.display_name;
    ans.bio = user.bio;
    ans.channelUrl = channel.url;
    ans.profilePic = channel.logo;
    ans.followers = channel.followers;
    if (isLive) ans.preview = stream.preview;
    return ans;
}


function getQueryString() {
    // be nice :)
    return `cli${`ent`}_i${`d=`}rcs4bas49lbrgwkdps0p5b634wfrkr`; 
}
