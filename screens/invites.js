import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BarCodeScanner, Permissions } from 'expo';
import { Text, Dimensions, View, StyleSheet } from 'react-native';
import { accept } from '../actions/authentication';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.black,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colours.greys.lightest,
    padding: 15,
    flexDirection: 'row',
  },
  text: {
    color: colours.text,
  },
  denied: {
    backgroundColor: colours.white,
  },
  input: {
    flex: 1,
  },
  inputText: {
    color: colours.text,
    fontSize: fonts.normal,
  },
  acceptButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: colours.text,
    fontSize: fonts.normal,
  },
});

class Invites extends PureComponent {
  state = {
    hasCameraPermission: null,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  readCode = async (result) => {
    if (!result.data) { // TODO: Handle errors
      return;
    }

    try {
      const parsed = JSON.parse(result.data);
      if (parsed.type === 'sharebibles-invite-v1' && parsed.token) {
        await this.props.acceptInvite(parsed.token);
        this.props.navigation.navigate('OverviewMap');
      }
    } catch (err) {
      // TODO
    }
  };

  render() {
    return (
      <View style={styles.container}>
        { this.state.hasCameraPermission && (
          <BarCodeScanner
            onBarCodeRead={this.readCode}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          />
        )}
        { this.state.hasCameraPermission === null && (
          <Text style={styles.text}>
            { I18n.t('permissions/camera/requesting') }
          </Text>
        )}
        { this.state.hasCameraPermission === false && (
          <Text style={[styles.text, styles.denied]}>
            {I18n.t('permissions/camera/denied') }
          </Text>
        )}
      </View>
    );
  }
}
/*
<TextInput
  style={SettingsItem.styles.text}
  autoCorrect={false}
  spellCheck={false}
  onSubmitEditing={e => acceptInvite(e.nativeEvent.text)}
  returnKeyType="send"
  placeholderTextColor={colours.greys.lighter}
  placeholder={I18n.t('settings/token_placeholder')}
/>
*/
Invites.propTypes = {
  acceptInvite: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  acceptInvite: bindActionCreators(accept, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invites);
