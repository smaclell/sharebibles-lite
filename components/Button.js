import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import colours from '../styles/colours';
import fonts from '../styles/fonts';

const container = {
  flex: 1,
  height: 40,
  borderRadius: 0,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
};

const text = {
  fontSize: fonts.normal,
  fontWeight: 'bold',
};

const styles = {
  primary: StyleSheet.create({
    disabled: {
      ...container,
      backgroundColor: colours.primaryButton,
      opacity: 0.7,
    },

    container: {
      ...container,
      backgroundColor: colours.primaryButton,
    },

    text: {
      ...text,
      color: colours.buttonText,
    },
  }),

  secondary: StyleSheet.create({
    disabled: {
      ...container,
      backgroundColor: colours.secondaryButton,
      opacity: 0.7,
    },

    container: {
      ...container,
      backgroundColor: colours.secondaryButton,
    },

    text: {
      ...text,
      color: colours.secondaryButtonText,
    },
  }),
};

const ignore = () => {};

const Button = ({ children, disabled, onClick, style, type }) => (
  <TouchableOpacity
    onPress={!disabled ? onClick : ignore}
    style={[disabled ? styles[type].disabled : styles[type].container, style]}
  >
    <Text style={styles[type].text}>{children}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Button.defaultProps = {
  disabled: false,
  style: null,
};

const Primary = props => <Button type="primary" {...props} />;
const Secondary = props => <Button type="secondary" {...props} />;

export default Primary;
export const PrimaryButton = Primary;
export const SecondaryButton = Secondary;
