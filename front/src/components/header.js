import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    listArtists() {
        if (!this.props.track.artists) {
            return
        }
        let artists = this.props.track.artists.map((artist, index) => {
            console.log(index);
            if (index > 0) {
                console.log('should render dot before', artist.name)
                return (
                    <span> • {artist.name} </span>
                )
            } else {
                return (
                    <span className='header-artist'> {artist.name} </span>
                )
            }
        })
        return (
            <span className="track-artists">{artists}</span>
        )
    }

    render() {
        if (Object.keys(this.props.track).length === 0 && this.props.track.constructor === Object) {
            return ('')
        }
        return ( 
            <div className='header'>
                <div>
                    <h3 className='header-track'>{this.props.track.name}</h3>
                    {this.listArtists()}    
                </div>            
                <button onClick={this.enterFeatureSelectionMode}>Find Similar Tracks</button>
            </div>
        )
    }
}

export default Header;