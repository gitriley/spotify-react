import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js'
import TextFeature from './textFeature.js' 
import * as descriptions from '../featureDescriptions.js'

class TrackFeatures extends Component {

    constructor(props) {
        super(props);
        this.showFeatureDescription = this.showFeatureDescription.bind(this);
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
        features: '',
        displayDescr: 'none',
        activeFeatureDescr: null
    }


    // https://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT

    // async componentWillMount() {
    //     if (!this.props.trackId) {
    //         console.log('dont call yet')
    //         return
    //     }
    //     const url = `https://api.spotify.com/v1/audio-features/${this.props.trackId}`
    //     const response = await fetch(url, {
    //         headers: new Headers({
    //             'Authorization': 'Bearer ' + this.props.token, 
    //         })
    //     });
    //     const data = await response.json()
    //     console.log(data)
    //     this.setState({features: data})
    // }

    showFeatureDescription(feature) {
        console.log('show the feature description');
        // if (this.state.displayDescr === 'none') {
        //     this.setState({displayDescr: 'block'});
        // } else {
        //     this.setState({displayDescr: 'none'});
        // }
        if (!this.state.activeFeatureDescr) {
            this.setState({activeFeatureDescr: feature})
        } else {
            this.setState({activeFeatureDescr: null})
        }
        
    }

    toggle(feature) {
        this.props.toggleQueryFeatures(feature)
    }

    render() {
        console.log(this.props.features)
        if (Object.keys(this.props.features).length === 0 && this.props.features.constructor === Object) {
            return ('')
        }
        return ( 
            <div className="track-features">
                <div className='track-features_wrapper'>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'acousticness'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>acousticness</span>
                                    <p className='feature-description__text'>{descriptions['acousticness']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('acousticness')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> acousticness: </span>
                        <div>
                        {this.props.featureSelectionMode 
                        ? <input    type='checkbox'
                                    className='track-feature_checkbox'
                                    checked={this.props.queryFeatures['acousticness']}
                                    onChange={() => this.toggle('acousticness')}/> 
                        : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['acousticness']}
                                        feature='acousticness'/>
                        <span className='numerical'>{this.props.features['acousticness'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'energy'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>energy</span>
                                    <p className='feature-description__text'>{descriptions['energy']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('energy')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> energy: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['energy']}
                                        onChange={() => this.toggle('energy')}/> 
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['energy']}
                                        feature='energy'/>
                        <span className='numerical'>{this.props.features['energy'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'danceability'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>danceability</span>
                                    <p className='feature-description__text'>{descriptions['danceability']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('danceability')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> danceability: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['danceability']}
                                        onChange={() => this.toggle('danceability')}/> 
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['danceability']}
                                        feature='danceability'/>
                        <span className='numerical'>{this.props.features['danceability'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'instrumentalness'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>instrumentalness</span>
                                    <p className='feature-description__text'>{descriptions['instrumentalness']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('instrumentalness')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> instrumentalness: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['instrumentalness']}
                                        onChange={() => this.toggle('instrumentalness')}/> 
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['instrumentalness']}
                                        feature='instrumentalness'/>
                        <span className='numerical'>{this.props.features['instrumentalness'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'liveness'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>liveness</span>
                                    <p className='feature-description__text'>{descriptions['liveness']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('liveness')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> liveness: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['liveness']}
                                        onChange={() => this.toggle('liveness')}/> 
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['liveness']}
                                        feature='liveness'/>
                        <span className='numerical'>{this.props.features['liveness'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'speechiness'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>speechiness</span>
                                    <p className='feature-description__text'>{descriptions['speechiness']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('speechiness')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> speechiness: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['speechiness']}
                                        onChange={() => this.toggle('speechiness')}/> 
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['speechiness']}
                                        feature='speechiness'/>
                        <span className='numerical'>{this.props.features['speechiness'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'valence'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>valence</span>
                                    <p className='feature-description__text'>{descriptions['valence']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('valence')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> valence: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['valence']}
                                        onChange={() => this.toggle('valence')}/> 
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['valence']}
                                        feature='valence'/>
                        <span className='numerical'>{this.props.features['valence'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'tempo'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>tempo</span>
                                    <p className='feature-description__text'>{descriptions['tempo']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('tempo')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> tempo: </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['tempo']}
                                        onChange={() => this.toggle('tempo')}/>  
                            : ''}
                        </div>
                        <BarGraphFeature className="graph-bar" 
                                        val={this.props.features['tempo']}
                                        feature='tempo'/>
                        <span className='numerical'>{this.props.features['tempo'].toFixed(2)}</span>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'mode'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>major/minor</span>
                                    <p className='feature-description__text'>{descriptions['mode']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('mode')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> major/minor </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['mode']}
                                        onChange={() => this.toggle('mode')}/>  
                            : ''}
                        </div>
                        <TextFeature className="graph-bar" 
                                val={this.props.features['mode']}
                                feature={'mode'}/>
                    </div>

                    <div className="track-feature-row">
                        <div className='track-feature_info-wrapper'>
                            {this.state.activeFeatureDescr === 'key'
                            ? 
                                <div className='feature-description__wrapper'>
                                    <span className='feature-description__title'>key</span>
                                    <p className='feature-description__text'>{descriptions['key']}</p>
                                </div> : <div></div>}

                            <div onClick={() => this.showFeatureDescription('key')}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className='svg__info'>
                                    <circle cy="24" cx="24" r="24"/>
                                    <g fill="#fff">
                                        <circle cx="24" cy="11.6" r="4.7"/>
                                        <path d="m17.4 18.8v2.15h1.13c2.26 0 2.26 1.38 2.26 1.38v15.1s0 1.38-2.26 1.38h-1.13v2.08h14.2v-2.08h-1.13c-2.26 0-2.26-1.38-2.26-1.38v-18.6"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <span className="attribute"> key </span>
                        <div>
                        {this.props.featureSelectionMode 
                            ? <input    type='checkbox'
                                        className='track-feature_checkbox'
                                        checked={this.props.queryFeatures['key']}
                                        onChange={() => this.toggle('key')}/>  
                            : ''}
                        </div>
                        <TextFeature className="graph-bar" 
                                val={this.props.features['key']}
                                feature={'key'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrackFeatures;