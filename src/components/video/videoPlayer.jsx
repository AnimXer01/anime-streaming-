import { useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css';

const playerConfig = {
  autoPlay: false,
  controls: true,
  width: '100%',
  height: '100%',
};

const VideoPlayer = (props) => {
  // const player = useRef(null);
  const { url } = props;

  // const [vidUrl, setVidUrl] = useState('');

  const vidUrl = useMemo(() => {
    return url;
  }, [url]);
  return (
    <>
      <div className="player-wrapper">
        <ReactPlayer className="react-player" url={vidUrl} {...playerConfig} />
      </div>
    </>
    // <ReactPlayer className="react-player" url={vidUrl} {...playerConfig} />
  );
};

export default VideoPlayer;
