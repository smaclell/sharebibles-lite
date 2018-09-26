import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button as NativeButton } from 'react-native-elements';
import fonts from '../styles/fonts';
import colours from '../styles/colours';

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

const buttonProps = {
  primary: {
    backgroundColor: colours.core.blue,
    color: colours.core.white,
    borderColor: colours.core.blue,
    borderRadius: 5,
  },
  secondary: {
    backgroundColor: colours.core.white,
    color: colours.core.black,
    borderColor: colours.core.grey,
    borderRadius: 5,
  },
};

const Button = ({
  disabled,
  fillContainer,
  fontSize,
  onPress,
  title,
  type,
}) => (
  <NativeButton
    {...buttonProps[type]}
    onPress={onPress}
    title={title}
    disabled={disabled}
    containerViewStyle={fillContainer ? styles.fill : {}}
    fontSize={fonts[fontSize]}
    raised
  />
);

Button.propTypes = {
  disabled: PropTypes.bool,
  fillContainer: PropTypes.bool,
  fontSize: PropTypes.oneOf(Object.keys(fonts)),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  disabled: false,
  fillContainer: true,
  fontSize: 'large',
  title: '',
  type: 'primary',
};

export default Button;
