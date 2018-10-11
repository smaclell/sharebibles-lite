import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { BarCodeScanner, Permissions } from 'expo';
import { Keyboard, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from 'react-native';
import Spacer from 'react-native-keyboard-spacer';
import Sentry from 'sentry-expo';
import { accept } from '../actions/authentication';
import { initialize } from '../actions/overview';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colours.black,
  },
  permission: {
    color: colours.white,
    fontSize: fonts.header,
    padding: 15,
    textAlign: 'center',
  },
  denied: {
    textDecorationLine: 'underline',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    width: '100%',
    backgroundColor: colours.greys.lightest,
    padding: 15,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: colours.text,
    fontSize: fonts.normal,
    lineHeight: fonts.large,
  },
  failed: {
    color: colours.reds.base,
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
  disabled: {
    color: colours.greys.base,
  },
});

class Invites extends PureComponent {
  state = {
    hasCameraPermission: null,
    inviteCode: null,
    inviting: false,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  readCode = async (result) => {
    if (!result.data) {
      // TODO: Handle errors
      return;
    }

    try {
      const parsed = JSON.parse(result.data);
      if (parsed.type === 'sharebibles-invite-v1' && parsed.token) {
        this.setState({ inviteCode: parsed.token });
      }
    } catch (err) {
      // TODO
    }
  };

  accept = async () => {
    if (!this.state.inviteCode) {
      return;
    }

    try {
      this.setState({ inviting: true, failed: false });

      await this.props.acceptInvite(this.state.inviteCode);
      await this.props.initialize();
      this.props.navigation.goBack(null);
    } catch (err) {
      Sentry.captureException(err);
      this.setState({ failed: true });
    } finally {
      this.setState({ inviting: false });
    }
  };

  dismissKeyboard = () => Keyboard.dismiss();

  render() {
    const disabled = !this.state.inviteCode || this.state.inviting || this.state.failed;

    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission && (
          <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
            <BarCodeScanner
              onBarCodeRead={this.readCode}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              style={StyleSheet.absoluteFill}
            />
          </TouchableWithoutFeedback>
        )}
        <View style={styles.overlay}>
          {this.state.hasCameraPermission === null && (
            <Text style={styles.permission}>{I18n.t('permissions/camera/requesting')}</Text>
          )}
          {this.state.hasCameraPermission === false && (
            <Text style={[styles.permission, styles.denied]}>{I18n.t('permissions/camera/denied')}</Text>
          )}
        </View>
        <View style={styles.bottomBar}>
          <TextInput
            style={[styles.input, this.state.failed && styles.failed]}
            autoCorrect={false}
            spellCheck={false}
            clearButtonMode="always"
            onSubmitEditing={this.accept}
            returnKeyType="done"
            onChangeText={(inviteCode) => this.setState({ inviteCode, failed: false })}
            value={this.state.inviteCode}
            placeholderTextColor={colours.greys.lighter}
            placeholder={I18n.t('invites/placeholder')}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.acceptButton} onPress={this.accept} disabled={disabled}>
            <Text style={[styles.acceptButtonText, disabled && styles.disabled]}>{I18n.t('invites/accept')}</Text>
          </TouchableOpacity>
        </View>
        <Spacer />
      </View>
    );
  }
}
Invites.propTypes = {
  acceptInvite: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  acceptInvite: bindActionCreators(accept, dispatch),
  initialize: bindActionCreators(initialize, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invites);
