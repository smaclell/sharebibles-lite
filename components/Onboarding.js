import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import NavigationService from '../utils/NavigationService';
import Icon from './Icon';

const LAST_STEP = 4;
const ACTION_STEPS = [3]; // Steps that require user to do something before we show them more info

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  onBoardingContainer: {
    width: '80%',
    minHeight: '25%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colours.greys.lighter,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colours.white,
  },
  quitBtn: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  onBoardingInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 10,
  },
  infoHeader: {
    fontSize: fonts.header,
    paddingBottom: 5,
    textDecorationLine: 'underline',
  },
  infoDescription: {
    fontSize: fonts.large,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: fonts.large,
    color: colours.blues.base,
  },
});

class Onboarding extends PureComponent {
  state = {
    hasAddedLocation: false,
    hasAcceptedInvite: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.numLocations > prevProps.numLocations && !this.state.hasAddedLocation && this.props.step === 3) {
      console.log('called');
      this.props.setStep(this.props.step + 1);
      this.setState({ hasAddedLocation: true }); // eslint-disable-line react/no-did-update-set-state
    }

    if (this.props.regionKey !== prevProps.regionKey && !this.state.hasAcceptedInvite) {
      this.props.setStep(this.props.step + 1);
      this.setState({ hasAcceptedInvite: true }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  onContinuePress = () => {
    if (this.props.step < LAST_STEP) {
      this.props.setStep(this.props.step + 1);
    } else {
      this.props.setOnboardingStatus(true);
    }
  }

  onbackPress = () => {
    this.props.setStep(this.props.step - 1);
  }

  onQuitPress = () => {
    this.props.setOnboardingStatus(true);
  }

  onHightlightButtonPress = () => {

  }

  getStepInfo = () => {
    const { step } = this.props;
    return {
      header: `onboarding/${step}_header`,
      description: `onboarding/${step}_description`,
      continueButton: step === LAST_STEP ? 'onboarding/finish' : 'onboarding/continue',
    };
  }

  render() {
    const {
      isOnboarded,
      step,
    } = this.props;

    console.log(step);

    if (isOnboarded || ACTION_STEPS.includes(step)) {
      return null;
    }

    const { header, description, continueButton } = this.getStepInfo();

    return (
      <View style={styles.container}>
        <View style={styles.onBoardingContainer}>
          <TouchableOpacity style={styles.quitBtn} onPress={this.onQuitPress}><Icon size="medium" colour="black" name="times" family="font-awesome" /></TouchableOpacity>
          <View style={styles.onBoardingInfo}>
            <Text style={styles.infoHeader}>{I18n.t(header)}</Text>
            <Text style={styles.infoDescription}>{I18n.t(description)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionBtn} onPress={this.onbackPress} disabled={step === 1}><Text style={styles.actionBtnText}>{I18n.t('onboarding/back')}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={this.onContinuePress}><Text style={styles.actionBtnText}>{I18n.t(continueButton)}</Text></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.highlightBtn} onPress={this.onHightlightButtonPress} />
      </View>
    );
  }
}

Onboarding.propTypes = {
  isOnboarded: PropTypes.bool.isRequired,
  numLocations: PropTypes.number.isRequired,
  regionKey: PropTypes.string.isRequired,
  setOnboardingStatus: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default Onboarding;
