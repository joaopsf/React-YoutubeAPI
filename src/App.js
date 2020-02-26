import React, { Fragment } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import SearchBar from './components/Searchbar'
import VideoList from './components/VideoList'
import PlayList from './components/PlayList'
import VideoDetail from './components/VideoDetail'

import axios from 'axios'
import _ from 'lodash'
import {API_KEY} from './environments/base'

const axiosRequestYoutube = axios.create({ baseURL: 'https://www.googleapis.com/youtube/v3/' })
const axiosRequestPLayList = axios.create({ baseURL: 'http://localhost:3001/' })


class App extends React.Component {

    state = {
        videos: [],
        playlist: [],
        selectedVideo: null
    }

    componentDidMount() {
        this.handlePlayList()
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await axiosRequestYoutube.get('/search', {
            params: {
                q: termFromSearchBar,
                part: 'snippet',
                maxResults: 4,
                type: 'video',
                key: API_KEY
            }
        })
        this.handleRemoveVideoIfOnPLayList(response.data.items)
    }

    handleRemoveVideoIfOnPLayList = (youtubeVideos) => {
        const videosInPlayList = _.intersectionBy(youtubeVideos, this.state.playlist, 'id.videoId')
        _.forEach(videosInPlayList, (video) => {
            this.handleRemoveVideoFromStateIfAdd(youtubeVideos, video)
        })
        this.setState({
            videos: youtubeVideos
        })
    }

    handleRemoveVideoFromStateIfAdd = (videos, video) => {
        _.remove(videos, (rmvideo) => {
            if (rmvideo.id.videoId === video.id.videoId) {
                return rmvideo
            }
        })
    }

    handleVideoSelect = async (video) => {
        video.videoIdDb = video.id.videoId
        const response = await axiosRequestPLayList.post('/playlist', video)
        if (response.status === 201) {
            this.setState({ selectedVideo: video })
            this.handlePlayList()
            this.handleRemoveVideoFromStateIfAdd(this.state.videos, video)
        }
    }

    handleVideoSelectPlay = async (video) => {
        this.setState({ selectedVideo: video })
        this.handleScrollToTop()
    }

    handleVideoRemove = async (video) => {
        const response = await axiosRequestPLayList.delete(`/playlist/${video.videoIdDb}`)
        if (response.status === 200) {
            this.handlePlayList()
        }
    }

    handlePlayList = async () => {
        const response = await axiosRequestPLayList.get('/playlist')
        if (response.status === 200) {
            this.setState({
                playlist: response.data
            })
        }
    }

    handleCloseDetails = () => {
        this.setState({ selectedVideo: null })
    }

    handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <Fragment>
                <Navbar bg="primary" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Playando</Navbar.Brand>
                    </Container>
                </Navbar>

                <Container>
                    <SearchBar handleFormSubmit={this.handleSubmit} />
                </Container>

                <Container>
                    <Row>
                        <Col sm="12">
                            <VideoDetail handleCloseDetails={this.handleCloseDetails} className="video-player" video={this.state.selectedVideo} />
                        </Col>
                        <Col sm="9">
                            <h5 className="text-primary">Resultado da busca</h5>
                            <VideoList
                                handleVideoSelect={this.handleVideoSelect}
                                videos={this.state.videos}
                            />
                        </Col>
                        <Col sm="3">
                            <h5 className="text-primary">Minha playlist</h5>
                            <PlayList
                                handleVideoRemove={this.handleVideoRemove}
                                handleVideoSelectPlay={this.handleVideoSelectPlay}
                                playlist={this.state.playlist}
                            />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default App