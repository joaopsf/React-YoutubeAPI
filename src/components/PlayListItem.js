import React, { Fragment } from 'react'

import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Image from 'react-bootstrap/Image'

const PlayListItem = ({ video, handleVideoRemove, handleVideoSelectPlay }) => {

    return (
        <Fragment>
            <div className='playlist-item item'>
                <Image className='playlist-item--image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} fluid />
                <div className='playlist-item--description'>
                    {video.snippet.title}
                </div>
                <ButtonToolbar className='playlist-item--actions'>
                    <Button onClick={() => handleVideoSelectPlay(video)} className="playlist-item--actions-item playlist-item--actions-play" title="Executar esse vídeo"><i className="fa fa-play"></i></Button>
                    <Button onClick={() => handleVideoRemove(video)} className="playlist-item--actions-item playlist-item--actions-remove" title="Remover da sua playlist"><i className="fa fa-trash"></i></Button>
                </ButtonToolbar>
            </div>
        </Fragment>
    )
}
export default PlayListItem