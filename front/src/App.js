import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import FetchToken from './lib/fetchToken.js'
// import FetchTrack from './lib/fetchTrack.js'
// import FetchTrackFeatures from './lib/fetchTrackFeatures.js'
// import FetchRelatedTracks from './lib/fetchRelatedTracks.js'
import * as Spotify from './lib/fetchFromSpotify.js'
import Search from './components/search.js'
import TrackContent from './components/trackContent.js'
import TrackFeatures from './components/trackFeatures.js'
import RelatedTracks from './components/relatedTracks.js'
import Header from './components/header.js'
import FeatureDescription from './components/featureDescription.js'

class App extends Component {

  // app modes: trackFeatures, relatedTracks, search
  constructor(props) {
    super(props);
    this.setActiveTrack = this.setActiveTrack.bind(this);
    this.setAppMode = this.setAppMode.bind(this);
    this.enterFeatureSelectionMode = this.enterFeatureSelectionMode.bind(this)
    this.toggleQueryFeatures = this.toggleQueryFeatures.bind(this)
    this.onFindSimilarTracks = this.onFindSimilarTracks.bind(this)
    this.setActiveFeature = this.setActiveFeature.bind(this)
    this.loadTrackInPlayer = this.loadTrackInPlayer.bind(this)
    this.sortTracksAscending = this.sortTracksAscending.bind(this)
    this.sortTracksDescending = this.sortTracksDescending.bind(this)
    this.updateToken = this.updateToken.bind(this)
    this.tokenNeedsRefreshed = this.tokenNeedsRefreshed.bind(this)
  }



  state = {
    activeTrackId: '',
    currentlyPlayingTrackId: '',
    access_token: '',
    tokenInfo: {
      ageWhenReceived: null,
      timeWhenReceived: null
    },
    appMode: 'search',
    activeTrack: {},
    featureSelectionMode: false,
    queryFeatures: {
      acousticness: false,
      danceability: false,
      energy: false,
      instrumentalness: false,
      key: false,
      liveness: false,
      loudness: false,
      mode: false,
      speechiness: false,
      tempo: false,
      time_signature: false,
      valence: false
    },
    trackFeatures: {},
    relatedTracks: {}, 
    activeFeature: 'danceability'
  }

  async setActiveTrack(trackId) {
    this.setState({
      activeTrackId: trackId,
      activeTrack: {},
      trackFeatures: {}
      }, async function() {
      if (!(this.state.appMode === 'trackFeatures')) {
        this.setState({appMode: 'trackFeatures'})
      }

      console.log('token needs refreshed: ', this.tokenNeedsRefreshed(this.state.tokenInfo));
      if (this.tokenNeedsRefreshed(this.state.tokenInfo)) {
        this.updateToken()
      }

      this.setState({ 
        activeTrack:  await Spotify.fetchTrack(this.state.activeTrackId, this.state.access_token),
        trackFeatures: await Spotify.fetchTrackFeatures(this.state.activeTrackId, this.state.access_token)
      })
      
      
    })
  }


  setAppMode = (mode) => {
    this.setState({appMode: mode})
  }

  async updateToken() {
    const tokenObj = await Spotify.fetchToken()
    this.setState({
      access_token: tokenObj.token,
      tokenInfo: {
        ageWhenReceived: tokenObj.token_age_minutes,
        timeWhenReceived: Date.now()
      }
    })
  }

  tokenNeedsRefreshed(tokenInfo) {
    const totalAge = Math.floor((Date.now() - tokenInfo.timeWhenReceived)/60000) + tokenInfo.ageWhenReceived
    console.log('token age', totalAge);
    if (totalAge > 50) {
      return true
    } else {
      return false
    }
  }

  async componentWillMount() {
    this.updateToken()
  }

  enterFeatureSelectionMode() {
    this.setState({featureSelectionMode: true})
  }

  buildRecommendationQueryString() {
    const artists = this.state.activeTrack.artists
    const artist1String = `&seed_artists=${artists[0].id}` 
    const artist2String = artists[1] ? `&seed_artists=${artists[1].id}` : ''
    const artist3String = artists[2] ? `&seed_artists=${artists[2].id}` : ''
    const artistsString = `${artist1String}${artist2String}${artist3String}`
    const trackString = `seed_tracks=${this.state.activeTrackId}`
    
    const featuresToSearchBy = Object.keys(this.state.queryFeatures).filter((feature) => {
      return this.state.queryFeatures[feature] === true
    })
    let featuresStrings = featuresToSearchBy.map((feature) => {
      if (this.state.queryFeatures[feature] === true) {
        return `&${feature}=${this.state.trackFeatures[feature]}`;
      }
    })
    const featuresString = featuresStrings.join("")
    const queryString = `${trackString}${artistsString}${featuresString}`
    console.log(queryString);
    return queryString;
  }

  async onFindSimilarTracks() {
    console.log('token needs refreshed: ', this.tokenNeedsRefreshed(this.state.tokenInfo));
    if (this.tokenNeedsRefreshed(this.state.tokenInfo)) {
      this.updateToken()
    }

    console.log('find sim tracks')
    const queryString = this.buildRecommendationQueryString()
    this.setState({
      relatedTracks: await Spotify.fetchRelatedTracks(queryString, this.state.access_token),  
    }, this.setAppMode('relatedTracks'))
    this.setState({featureSelectionMode: false}) 
    console.log(this.state.relatedTracks)
  }

  toggleQueryFeatures(feature) {
    const newVal = !this.state.queryFeatures[feature]
    let queryFeatures = Object.assign({}, this.state.queryFeatures);    //creating copy of object
    queryFeatures[feature] = newVal;  
    this.setState({queryFeatures}, () => {
    });
  }

  setActiveFeature(feature) {
    this.setState({activeFeature: feature})
  }

  loadTrackInPlayer(id) {
    this.setState({currentlyPlayingTrackId: id});
  }

  sortTracksAscending(attribute) {
    let sortedTracks = this.state.relatedTracks.slice()
    sortedTracks.sort(function(a, b) {
      return a.features[attribute] - b.features[attribute]
    })
    this.setState({relatedTracks: sortedTracks});
  }

  sortTracksDescending(attribute) {
    let sortedTracks = this.state.relatedTracks.slice()
    sortedTracks.sort(function(a, b) {
      return b.features[attribute] -a.features[attribute]
    })
    this.setState({relatedTracks: sortedTracks});
  }

  render() {
    console.log(this.state.activeTrackId)
    const iframeURL = 'https://open.spotify.com/embed?uri=spotify:track:' + this.state.currentlyPlayingTrackId + '&theme=white'
    return (
      <div className={"App " + (this.state.currentlyPlayingTrackId && 'hasFooter')}>
        
        
        <Search token={this.state.access_token}
                setActiveTrack={this.setActiveTrack}
                mode={this.state.appMode}
                setAppMode={this.setAppMode}/>

        {(this.state.appMode !== 'search') 
          ? <div className='top'>
              <TrackContent track={this.state.activeTrack}/>
              <Header track={this.state.activeTrack}
                      loadTrackInPlayer={this.loadTrackInPlayer}/> 
            </div>
          : ''}

        {(this.state.appMode !== 'search')
        ? <div className='feature-main_wrapper'> 
            <div className='feature-description'> 
              <FeatureDescription 
                track={this.state.activeTrack}
                activeFeature = {this.state.activeFeature}
                mode={this.state.appMode}
                setActiveFeature={this.setActiveFeature}
                enterFeatureSelectionMode = {this.enterFeatureSelectionMode}
                featureSelectionMode = {this.state.featureSelectionMode}
                findSimilarTracks = {this.onFindSimilarTracks}
                sortTracksAscending = {this.sortTracksAscending}
                sortTracksDescending = {this.sortTracksDescending}/>
            </div>

            {(this.state.appMode === 'trackFeatures') 
              ? <TrackFeatures token={this.state.access_token}
                              trackId = {this.state.activeTrackId} 
                              queryFeatures = {this.state.queryFeatures}
                              toggleQueryFeatures = {this.toggleQueryFeatures}
                              features = {this.state.trackFeatures}
                              featureSelectionMode = {this.state.featureSelectionMode}/> 
              : ''}

            
            {(this.state.appMode === 'relatedTracks') 
              ? <RelatedTracks  relatedTracks={this.state.relatedTracks}
                                setActiveTrack={this.setActiveTrack}
                                activeFeature = {this.state.activeFeature}
                                setActiveFeature={this.setActiveFeature}
                                loadTrackInPlayer={this.loadTrackInPlayer}/> 
              : ''}
        </div>
        : ''}
        {(this.state.currentlyPlayingTrackId) ?
        <div className='footer'>
          <iframe src={iframeURL} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div> :''}
        
          
      </div>
    );
  }
}

export default App;



// <button onClick={this.onFindSimilarTracks}>Find Similar Tracks now</button>


// {(this.state.appMode !== 'search') 
//           ? <div className='side-bar'> 
//               <FeatureDescription 
//                 activeFeature = {this.state.activeFeature}
//                 mode={this.state.appMode}
//                 setActiveFeature={this.setActiveFeature}/>
      
//             </div>
//           : ''}