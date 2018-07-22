import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js' 
import TextFeature from './textFeature.js' 

class RelatedTracks extends Component {

    constructor(props) {
        super(props)
        this.representation = this.representation.bind(this)
        this.selectTrack = this.selectTrack.bind(this);
        this.setActiveFeature = this.setActiveFeature.bind(this)
    }
    state = {
        trackFeatures : [
            'acousticness',
            'danceability',
            'energy',
            'instrumentalness',
            'key',
            'liveness',
            'loudness',
            'mode',
            'speechiness',
            'tempo',
            'time_signature',
            'valence',
        ],
        activeFeature: 'danceability'
    }

    toggle(feature) {
        this.props.toggleQueryFeatures(feature)
    }

    representation(track) {
        const value = track.features[this.props.activeFeature]
        console.log('value', this.props.activeFeature)
        switch(this.props.activeFeature) {
        case 'key':
        case 'mode':
        case 'time_signature':
            return <TextFeature className="graph-bar" 
                                val={value}
                                feature={this.props.activeFeature}/>
        default:
            return <BarGraphFeature className="graph-bar" 
                                    val={value}
                                    feature={this.props.activeFeature}/>
        }
    }

    RelatedTrackList() {
        return this.props.relatedTracks.map((track) => {
            return (
                <div className='feature-row' key={track.id}>
                    <div class='load-track_wrapper' onClick={() => this.props.loadTrackInPlayer(track.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class='load-track_svg' x="0px" y="0px" viewBox="0 0 60 60" >
                            <g>
                                <path d="M34.437,7.413c-0.979-0.561-2.143-0.553-3.115,0.019c-0.063,0.037-0.121,0.081-0.174,0.131L17.906,19.891   C17.756,19.963,17.593,20,17.427,20H9.104C7.392,20,6,21.393,6,23.104v12.793C6,37.607,7.392,39,9.104,39h8.324   c0.166,0,0.329,0.037,0.479,0.109l13.242,12.328c0.053,0.05,0.112,0.094,0.174,0.131c0.492,0.289,1.033,0.434,1.574,0.434   c0.529,0,1.058-0.138,1.541-0.415C35.416,51.027,36,50.021,36,48.894V10.106C36,8.979,35.416,7.973,34.437,7.413z M34,48.894   c0,0.577-0.389,0.862-0.556,0.958c-0.158,0.09-0.562,0.262-1.025,0.037l-13.244-12.33c-0.054-0.051-0.113-0.095-0.176-0.131   C18.522,37.147,17.979,37,17.427,37H9.104C8.495,37,8,36.505,8,35.896V23.104C8,22.495,8.495,22,9.104,22h8.324   c0.551,0,1.095-0.147,1.572-0.428c0.063-0.036,0.122-0.08,0.176-0.131l13.244-12.33c0.465-0.226,0.868-0.053,1.025,0.037   C33.611,9.244,34,9.529,34,10.106V48.894z"></path>
                                <path d="M43.248,17.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c6.238,6.238,6.238,16.39,0,22.628   c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293   C50.266,35.73,50.266,24.312,43.248,17.293z"></path>
                                <path d="M39.707,20.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c4.297,4.297,4.297,11.289,0,15.586   c-0.391,0.391-0.391,1.023,0,1.414C38.488,38.902,38.744,39,39,39s0.512-0.098,0.707-0.293   C44.784,33.63,44.784,25.37,39.707,20.293z"></path>
                                <path d="M46.183,12.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c4.356,4.355,6.755,10.142,6.755,16.293   s-2.399,11.938-6.755,16.293c-0.391,0.391-0.391,1.023,0,1.414C44.964,47.902,45.22,48,45.476,48s0.512-0.098,0.707-0.293   c4.734-4.733,7.341-11.021,7.341-17.707S50.917,17.026,46.183,12.293z"></path>
                                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30   S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
                            </g>
                        </svg>
                    </div>
                    <div className='rel-track_text'>
                        <p  id={track.id}
                            className='rel-track_name'
                            onClick={this.selectTrack}>{track.name}</p>
                        <p className='rel-track_artist'>{track.artists[0].name}</p>
                    </div>
                    {this.representation(track)}
                    <div class='rel-track_val'>{track.features[this.props.activeFeature].toFixed(2)}</div>
                </div>)
        })
    }

    selectTrack = (e) => {
        e.preventDefault();
        this.props.setActiveTrack(e.currentTarget.getAttribute('id'))
    } 

    setActiveFeature = (e) => {
        e.preventDefault();
        this.props.setActiveFeature(e.target.value)
    }

    render() {
        if (this.props.relatedTracks.length > 18) {
            //const list = this.buildList()
            return (
                <div className='related-tracks'>
                    <div>{this.RelatedTrackList()}</div>
                </div>
            )
        } else {
            return ''
        }
        
    }
}

export default RelatedTracks;
//<span>{track.features[this.state.activeFeature]}</span>