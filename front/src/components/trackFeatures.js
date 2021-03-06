import React, { Component } from "react";
import ActiveTrackFeature from "./activeTrackFeature";

class TrackFeatures extends Component {
  constructor(props) {
    super(props);
    this.showFeatureDescription = this.showFeatureDescription.bind(this);
  }
  state = {
    trackFeatures: [
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence",
      "loudness",
      "tempo",
      "key",
      "mode",
      "time_signature"
    ],
    features: "",
    displayDescr: "none",
    activeFeatureDescr: null
  };

  showFeatureDescription(feature) {
    if (!this.state.activeFeatureDescr) {
      this.setState({ activeFeatureDescr: feature });
    } else {
      this.setState({ activeFeatureDescr: null });
    }
  }

  RenderFeatures(features) {
    return features.map((feature, index) => {
      return (
        <ActiveTrackFeature
          key={index}
          feature={feature}
          featureVal={this.props.features[feature]}
          showFeatureDescription={this.showFeatureDescription}
          activeFeatureDescr={this.state.activeFeatureDescr}
        />
      );
    });
  }

  render() {
    if (
      Object.keys(this.props.features).length === 0 &&
      this.props.features.constructor === Object
    ) {
      return "";
    }
    return (
      <div className="track-features">
        <div className="track-features_wrapper">
          {this.RenderFeatures(this.state.trackFeatures)}
        </div>
      </div>
    );
  }
}

export default TrackFeatures;
