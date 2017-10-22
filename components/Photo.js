import {
  ActivityIndicator,
  Image,
  ImageEditor,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const container = {
  alignItems: 'center',
  flexDirection: 'column',
  margin: 10,
};

const circle = {
  alignItems: 'center',
  borderColor: colours.black,
  borderRadius: 80,
  borderStyle: 'solid',
  borderWidth: 2,
  flex: 0,
  height: 80,
  justifyContent: 'center',
  width: 80,
};

const text = {
  color: colours.text,
  fontSize: fonts.normal,
  padding: 5,
  textAlign: 'center',
};

const image = {
  height: 80,
  width: 80,
};

const iconSize = 48;

class Photo extends Component {
  static propTypes = {
    onPhotoChanged: PropTypes.func,
  }

  static defaultProps = {
    onPhotoChanged: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
    };
  }

  _cropPhoto({ height, width, uri }) {
    return new Promise((resolve, reject) => {
      const cropData = {
        offset: {
          x: 0,
          y: 0,
        },
        size: {
          width,
          height,
        },
        displaySize: {
          width: 160,
          height: 160,
        },
        resizeMode: 'contain',
      };
      ImageEditor.cropImage(uri, cropData, resolve, reject);
    });
  }

  getPhoto() {
    this.setState(p => ({ ...p, loading: true }));

    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    }).then(({ cancelled, uri, width, height  }) => {
      if (cancelled) {
        this.setState(p => ({ ...p, loading: false }));
        return;
      }
      return this._cropPhoto({ uri, width, height });
    }).then(uri => {
      this.setState(p => ({ ...p, uri }));
      this.props.onPhotoChanged(uri);
    });
  }

  getIcon() {
    if (this.state.loading) {
      return <FontAwesome name="refresh" size={iconSize} color={colours.text} />;
    }

    if (this.state.error) {
      return <FontAwesome name="warning" size={iconSize} color={'yellow'} />;
    }

    return <FontAwesome name="circle-o" size={iconSize} color={'green'} />;
  }

  render() {
    const icon = this.getIcon();

    return (
      <TouchableOpacity onPressOut={() => this.getPhoto()}>
        <ActivityIndicator size="small" animating={this.state.loading} />
        <View style={container}>
          <View style={[circle, { display: this.state.loading ? 'none' : 'flex' }]}>
            <Text>{icon}</Text>
          </View>
          <Image source={{ uri: this.state.uri }} style={[image, { display: this.state.uri ? 'flex' : 'none' }]} />
          <Text style={text}>Get Photo</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Photo;
