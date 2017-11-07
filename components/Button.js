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
  margin: 10,
  padding: 10,
};

const text = {
  fontSize: fonts.normal,
  fontWeight: 'bold',
};

const styles = {
  primary: StyleSheet.create({
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

const Button = ({ children, onClick, type }) => (
  <TouchableOpacity onPress={onClick} style={styles[type].container}>
    <Text style={styles[type].text}>{children}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  type: PropTypes.oneOf('primary', 'secodary').isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Primary = props => <Button type="primary" {...props} />;
const Secondary = props => <Button type="primary" {...props} />;

export default Primary;
export const PrimaryButton = Primary;
export const SecondaryButton = Secondary;
