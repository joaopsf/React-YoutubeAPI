import React, { Fragment } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const VideoDetail = ({ video, handleCloseDetails }) => {
    if (!video) {
        return <div></div>
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`
    return (
        <Fragment>
            <div className="video-player">
                <Row>
                    <Col sm="8">
                        <iframe src={videoSrc} allowFullScreen title='Video player' />
                    </Col>
                    <Col sm="3">
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                    </Col>
                    <span onClick={handleCloseDetails} className="icon-pointer"><i className="fa fa-times-circle fa-2x text-danger"></i></span>
                </Row>
            </div>
        </Fragment>

    )
}

export default VideoDetail