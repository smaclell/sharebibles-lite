import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import I18n from 'ex-react-native-i18n';
import Icon from './Icon';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import { step8Top, step9Top } from '../styles/onboardingHelper';
import { ACTION_STEPS, BUTTON_STEPS, STEPS, ORDERED_STEPS } from '../assets/constants/OnboardingSteps';

const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  step6Container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  step7Container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  step9Container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
});

const highlightButtonStyles = StyleSheet.create({
  step8Button: {
    position: 'absolute',
    top: step8Top(),
    left: 3,
    width: 35,
    height: 35,
    borderWidth: 3,
    borderColor: colours.blues.base,
    borderRadius: 5,
  },
  step9Button: {
    position: 'absolute',
    top: step9Top(),
    left: 15,
    width: 210,
    height: 35,
    borderWidth: 3,
    borderColor: colours.blues.base,
    borderRadius: 5,
  },
});

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: fonts.large,
    color: colours.blues.base,
  },
});

class Onboarding extends PureComponent {
  componentDidUpdate() {
    this.props.stepAction();
  }

  onContinuePress = () => {
    if (this.props.step < STEPS.end) {
      this.props.setStep(this.props.step + 1);
    } else {
      this.props.setOnboardingStatus(true);
    }
  }

  onBackPress = () => {
    const { step, setCompleted } = this.props;
    let back = 1;
    while (ACTION_STEPS.includes(step - back)) back += 1;
    const newStep = step - back;

    if (STEPS[ORDERED_STEPS[newStep]].backLogic) {
      STEPS[ORDERED_STEPS[newStep]].backLogic(setCompleted);
    }

    this.props.setStep(newStep);
  }

  onQuitPress = () => {
    this.props.setOnboardingStatus(true);
  }

  onHightlightButtonPress = () => {
    const { step, setStep } = this.props;

    if (STEPS[ORDERED_STEPS[step]].buttonLogic) {
      STEPS[ORDERED_STEPS[step]].buttonLogic();
    }

    setStep(step + 1);
  }

  getStepInfo = () => {
    const { step } = this.props;
    return {
      header: `onboarding/${step}_header`,
      description: `onboarding/${step}_description`,
      continueButton: step === STEPS.end ? 'onboarding/finish' : 'onboarding/continue',
    };
  }

  getContainerStyles = (step) => {
    const style = containerStyles[`step${step}Container`] || containerStyles.defaultContainer;
    return [styles.container, style];
  }

  render() {
    const {
      isOnboarded,
      step,
    } = this.props;

    // If already onboarded or waiting for user to complete action before showing info again then don't show anything
    if (isOnboarded || ACTION_STEPS.includes(step)) {
      return null;
    }

    const { header, description, continueButton } = this.getStepInfo();
    const showContinue = !BUTTON_STEPS.includes(step);

    console.log(step, isOnboarded);

    return (
      <View style={this.getContainerStyles(step)}>
        <View style={styles.onBoardingContainer}>
          <TouchableOpacity style={styles.quitBtn} onPress={this.onQuitPress}><Icon size="medium" colour="black" name="times" family="font-awesome" /></TouchableOpacity>
          <View style={styles.onBoardingInfo}>
            <Text style={styles.infoHeader}>{I18n.t(header)}</Text>
            <Text style={styles.infoDescription}>{I18n.t(description)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionBtn} onPress={this.onBackPress} disabled={step === 1}>
              <Text style={styles.actionBtnText}>{I18n.t('onboarding/back')}</Text>
            </TouchableOpacity>
            {showContinue &&
              <TouchableOpacity style={styles.actionBtn} onPress={this.onContinuePress}>
                <Text style={styles.actionBtnText}>{I18n.t(continueButton)}</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        <TouchableOpacity style={highlightButtonStyles[`step${step}Button`]} onPress={this.onHightlightButtonPress} />
      </View>
    );
  }
}

Onboarding.propTypes = {
  isOnboarded: PropTypes.bool.isRequired,
  setCompleted: PropTypes.func.isRequired,
  setOnboardingStatus: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  stepAction: PropTypes.func.isRequired,
};

export default Onboarding;
