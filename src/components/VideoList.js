import React, { Fragment } from 'react'
import VideoItem from './VideoItem'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const VideoList = ({ videos, handleVideoSelect }) => {
    const renderedVideos = videos.map((video) => {
        return <VideoItem
            key={video.id.videoId}
            video={video}
            handleVideoSelect={handleVideoSelect}
        />
    })

    const testIfVideos = () => {
        if(renderedVideos.length === 0) {
            return (
                <Col sm="12" className="after-request">
                    <i className="fa fa-warning text-warning">&nbsp;</i>
                        Os vídeos serão exibidos <strong>AQUI</strong> após a busca
                </Col>
            )
        } else {
            return renderedVideos
        }
    }

    return (
        <Fragment>
            <Row>
                {testIfVideos()}
            </Row>
        </Fragment>
    )
}
export default VideoList