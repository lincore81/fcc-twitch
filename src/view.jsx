const linkify = ({text}) => {
    const urlRe = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
    return text.replace(urlRe, `<a class="external" href="$1">$1</a>`);
};

const LoadingComp = () => (<p>Loading...</p>);

const ChannelPicComp = ({displayName, src, url}) => (
    <a href={url} className="external" title={`${displayName}'s channel`}>
        <img className="img-fluid profile-pic" src={src} />
    </a>);

const ChannelNameComp = ({displayName, url}) => (
    <a href={url} className="external channel-name-link" title={`${displayName}'s channel`}>
        <span className="channel-name">{displayName}</span>
    </a>);

const ChannelLiveIndicatorComp = ({isLive}) => {
    return isLive?
        (<span className="channel-streaming live">L I V E</span>) : 
        (<span className="channel-streaming">offline</span>);
};

const ChannelFollowersComp = ({followers}) => (
    <span title="Followers">
        <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
        <span className="sr-only">Followers: </span>
        <span className="channel-followers">{followers.toLocaleString()}</span>
    </span>);

const ChannelBioComp = ({bio}) => (
    <div className="channel-bio">
        {linkify(bio)}
    </div>);



const ChannelComp = ({channel}) => {
    return (
    <div>
        <div className="col-xs-2">
            <ChannelPicComp displayName={channel.displayName} url={channel.channelUrl} src={channel.profilePic} />
        </div>
        <div className="col-xs-10">
            <div className="row channel-header">
                <div className="col-xs-9">
                    <ChannelNameComp displayName={channel.displayName} url={channel.channelUrl} />
                    <ChannelLiveIndicatorComp isLive={channel.isLive} />
                </div>
                <div className="col-xs-3">
                    <ChannelFollowersComp followers={channel.followers} />
                </div>
            </div>
            <div className="row channel-content">
                <div className="col-xs-12">
                    <ChannelBioComp bio={channel.bio} />
                </div>
            </div>
        </div>
    </div>);
};

const ChannelListItem = ({channel, i}) => 
    (<div className="channel-list-item row">
        <div className="col-md-2 col-lg-3"></div>
        <div className="col-md-8 col-lg-6 col-sx-12 channel">
            {channel.loading? (<LoadingComp />) :
                (<ChannelComp key={i} channel={channel} />)}
        </div>
        <div className="col-md-2 col-lg-3"></div>
    </div>);


const ChannelListComp = props => 
    (<div className="channel-list row">
        {props.channels.map((channel, i) => 
            (<ChannelListItem channel={channel} key={i} />))}
    </div>);

const HeaderComp = () => (
    <header className="text-center row">
        <a href="https://www.twitch.tv">
            <img alt="twitch" style={{height: `1em`}} src="img/twitch.png" /> 
        </a>
        &nbsp;streamers
    </header>);

const FooterComp = () => (
    <footer className="text-center row">
        github: <a href="https://github.com/lincore81/fcc-twitch">
        https://github.com/lincore81/fcc-twitch</a>
    </footer>);

export const TwitchApp = props => {
    return (
        <div className="twitch-app container">
            <HeaderComp />
            <ChannelListComp channels={props.channels} />
            <FooterComp />
        </div>);};

