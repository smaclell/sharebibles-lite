import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { BarCodeScanner, Permissions } from 'expo';
import { Keyboard, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from 'react-native';
import Spacer from 'react-native-keyboard-spacer';
import { accept } from '../actions/authentication';
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
  text: {
    color: colours.text,
  },
  denied: {
    backgroundColor: colours.white,
  },
  overlay: {
    flex: 1,
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
    inviteCode: null,
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

    await this.props.acceptInvite(this.state.inviteCode);
    this.props.navigation.navigate('OverviewMap');
  }

  dismissKeyboard = () => Keyboard.dismiss()

  render() {
    return (
      <View style={styles.container}>
        { this.state.hasCameraPermission && (
          <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
            <BarCodeScanner
              onBarCodeRead={this.readCode}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              style={StyleSheet.absoluteFill}
            />
          </TouchableWithoutFeedback>
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
        <View style={styles.overlay} />
        <View style={styles.bottomBar}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            spellCheck={false}
            clearButtonMode="always"
            onSubmitEditing={this.accept}
            returnKeyType="done"
            onChangeText={inviteCode => this.setState({ inviteCode })}
            value={this.state.inviteCode}
            placeholderTextColor={colours.greys.lighter}
            placeholder={I18n.t('invites/placeholder')}
          />
          <TouchableOpacity style={styles.acceptButton} onPress={this.accept} disabled={!!this.state.inviteCode}>
            <Text style={styles.acceptButtonText}>{I18n.t('invites/accept')}</Text>
          </TouchableOpacity>
        </View>
        <Spacer />
      </View>
    );
  }
}
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
