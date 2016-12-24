const LoadingComp = () => (
    <div className="text-center">
        <img className="loader" height="100" alt="Kappa" src="img/k.png" />
    </div>);

const ChannelPicComp = ({displayName, src, url}) => (
    <a href={url} className="external" title={`${displayName}'s channel`}>
        <img className="img-fluid profile-pic" src={src} />
    </a>);

const ChannelNameComp = ({displayName, url}) => 
    (<a href={url} className="external channel-name-link" title={`${displayName}'s channel`}>
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
    <div className="channel-bio">{bio}</div>);

const ChannelErrorComp = ({errorMessage}) => (
    <div className="channel-error">{errorMessage}</div>);

const ChannelButtonsComp = ({onRefresh, onRemove}) => (
    <span>
        <button className="btn-clear" title="Refresh" onClick={onRefresh}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
            <span className="sr-only">Refresh</span>
        </button>
        <button className="btn-clear" title="Remove" onClick={onRemove}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            <span className="sr-only">Remove</span>
        </button>
    </span>);

const ChannelLiveComp = ({game, viewers, preview, status, url, displayName}) => (
    <div className="col-xs-12 channel-stream">
        <div className="row">
            <div className="col-sx-12 channel-status">{status}</div>
        </div>
        <div className="row">
            <div className="col-sx-12">
                <a href={url} title={`Watch ${displayName}`}>
                    <img className="img-fluid channel-preview" src={preview} />
                </a>
            </div>
            <div className="col-sx-12 channel-footer">
                {`Playing ${game} for `}
                {viewers.toLocaleString()} <span>viewers</span>
            </div>
        </div>
    </div>);


const ChannelComp = ({channel}) => {
    let body;
    if (channel.exists) body = <ChannelBioComp bio={channel.bio} />;
    if (channel.isLive) body = <ChannelLiveComp game={channel.stream.game} 
        viewers={channel.stream.viewers} preview={channel.stream.preview.large} 
        status={channel.channel.status} url={channel.channelUrl} 
        displayName={channel.displayName}/>;
    if (channel.loading) body = <LoadingComp />;
    if (channel.errorMessage) body = <ChannelErrorComp errorMessage={channel.errorMessage} />;
    return (
        <div >
            <div className="col-xs-2">
                <ChannelPicComp displayName={channel.displayName} url={channel.channelUrl} src={channel.profilePic} />
            </div>
            <div className="col-xs-10">
                <div className="row channel-header">
                    <div className="col-xs-7">
                        <ChannelNameComp displayName={channel.displayName || channel.name} url={channel.channelUrl} />
                        {channel.exists && <ChannelLiveIndicatorComp isLive={channel.isLive} />}
                    </div>
                    <div className="col-xs-3">
                        {channel.exists && <ChannelFollowersComp followers={channel.followers} />}
                    </div>
                    <div className="col-xs-2 text-right">
                        <ChannelButtonsComp onRefresh={channel.onRefresh} onRemove={channel.onRemove}/>
                    </div>
                </div>
                <div className="row channel-content">
                    <div className="col-xs-12">
                        {body}
                    </div>
                </div>
            </div>
        </div>);
};

const ChannelListItem = ({channel, i, dragHandlers}) => {
    const classes = `col-md-8 col-lg-6 col-sx-10 channel ${channel.isLive? `live`:``}`;
    return (<div className="channel-list-item row">
        <div className="col-sx-1 col-md-2 col-lg-3"></div>
        <div className={classes} data-channelName={channel.channelName} draggable="true" 
            onDragStart={dragHandlers.onDragStart} 
            onDragOver={dragHandlers.onDragOver}
            onDrop={dragHandlers.onDrop}>
            {(<ChannelComp key={i} channel={channel} />)}
        </div>
        <div className="col-sx-1 col-md-2 col-lg-3"></div>
    </div>);
};


const ChannelListComp = props => 
    (<div className="channel-list row">
        {props.order.map((channel, i) => 
            (<ChannelListItem channel={props.channels[channel]} key={i} dragHandlers={props.dragHandlers} />))}
    </div>);

const HeaderComp = () => (
    <header className="text-center fullwidth" id="header">
        <a href="https://www.twitch.tv">
            <img alt="twitch streamers" style={{height: `1em`}} src="img/twitch-streamers.png" /> 
        </a>
    </header>);

const AddChannelComp = ({onsubmit}) => (
    <div className="text-center fullwidth" id="add-channel-comp">
        <form onSubmit={onsubmit}>
            <label htmlFor="add-channel-input">Add channel:</label>
            <input id="add-channel" />
            <button className="btn-clear" id="btn-add" type="submit" >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                <span className="sr-only">Add</span>
            </button>
        </form>
    </div>
);

const FooterComp = () => (
    <footer className="text-center fullwidth">
        <a href="https://github.com/lincore81/fcc-twitch" title="View the code on Github" >
        <i className="icon fa fa-github" aria-hidden="true"></i>&nbsp;
        <span>Source: </span>
            https://github.com/lincore81/fcc-twitch</a> | <a 
            href="https://www.freecodecamp.com">
            <i className="icon fa fa-free-code-camp" aria-hidden="true"
                title="learn web development at Free Code Camp"></i>&nbsp;
            <span>Free Code Camp</span></a>
    </footer>);



export const TwitchApp = props => {
    return (
        <div className="twitch-app">
            <HeaderComp />
            <AddChannelComp onsubmit={props.onsubmit} />
            <div className="container">
                <ChannelListComp order={props.order} channels={props.channels} 
                    dragHandlers={props.dragHandlers}/>
            </div>
            <FooterComp />
        </div>);
};

