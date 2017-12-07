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

const shadow = {
  shadowColor: colours.greys.base,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 2,
  shadowOpacity: 1.0,
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

  selected: StyleSheet.create({
    disabled: {
      ...container,
      backgroundColor: colours.greys.darkest,
      opacity: 0.7,
    },

    container: {
      ...container,
      ...shadow,
      backgroundColor: colours.black,
    },

    text: {
      ...text,
      color: colours.white,
    },
  }),

  unselected: StyleSheet.create({
    disabled: {
      ...container,
      backgroundColor: colours.greys.darkest,
      opacity: 0.7,
    },

    container: {
      ...container,
      ...shadow,
      backgroundColor: colours.greys.lighter,
    },

    text: {
      ...text,
      color: colours.white,
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
  type: PropTypes.oneOf(['primary', 'secondary', 'selected', 'unselected']).isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

Button.defaultProps = {
  disabled: false,
  style: null,
};

const Primary = props => <Button type="primary" {...props} />;
const Secondary = props => <Button type="secondary" {...props} />;

const Togglable = props => <Button type={props.selected ? 'selected' : 'unselected'} {...props} />;
Togglable.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default Primary;
export const PrimaryButton = Primary;
export const SecondaryButton = Secondary;
export const Toggle = Togglable;
