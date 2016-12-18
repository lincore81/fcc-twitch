
const ChannelPicComp = props => (
    <a href={props.url} className="external" title={`${props.displayName}'s channel`}>
        <img src={props.src} />
    </a>);

const ChannelNameComp = props => (
    <a href={props.url} className="external" title={`${props.displayName}'s channel`}>
        <span className="channel-name">{props.displayName}</span>
    </a>);

const ChannelStreamingComp = props => {
    return props.isLive?
        (<span className="channel-streaming live">L I V E</span>) : 
        (<span className="channel-streaming">offline</span>);
};

const ChannelFollowersComp = props => (
    <span title="Followers">
        <i className="fa fa-user" aria-hidden="true"></i>
        <span className="sr-only">Followers: </span>
        <span className="channel-followers">{props.followers}</span>
    </span>);

const ChannelBioComp = props => (
    <div className="channel-bio">
        {props.bio}
    </div>);



const ChannelComp = props => {
    console.log(`ChannelComp:`, props);
    return (
    <div className="row channel">
        <div className="col-xs-2">
            <ChannelPicComp displayName={props.displayName} url={props.channelUrl} src={props.profilePic} />
        </div>
        <div className="col-xs-10">
            <div className="row channel-header">
                <div className="col-xs-9">
                    <ChannelNameComp displayName={props.displayName} url={props.channelUrl} />
                    <ChannelStreamingComp isLive={props.isLive} />
                </div>
                <div className="col-xs-3">
                    <ChannelFollowersComp followers={props.followers} />
                </div>
            </div>
            <div className="row channel-content">
                <div className="col-xs-12">
                    <ChannelBioComp bio={props.bio} />
                </div>
            </div>
        </div>
    </div>);
};

const ChannelListComp = props => {
    console.log(`ChannelListComp`, props);
    return (
    <div className="channel-list">
        {props.props.channelData.map((channel, i) => 
            <ChannelComp key = {i} data = {channel} />)}
    </div>);
};

const HeaderComp = () => (
    <h1>
        <img alt="twitch" style={{height: `1em`}} src="img/twitch.png" /> 
        &nbsp;streamers
    </h1>);

const FooterComp = () => (
    <div className="footer">
        github: <a href="https://github.com/lincore81/fcc-twitch">
        https://github.com/lincore81/fcc-twitch</a>
    </div>);

export const TwitchApp = props => {
    console.log(`TwitchApp`, props);
    return (
        <div className="twitch-app container">
            <HeaderComp />
            <ChannelListComp props={props.props} />
            <FooterComp />
        </div>);};

