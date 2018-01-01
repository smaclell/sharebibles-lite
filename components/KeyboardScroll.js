import React, { PureComponent } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  findNodeHandle,
  Platform,
  ScrollView,
  StatusBar,
  UIManager,
} from 'react-native';
import PropTypes from 'prop-types';

// Based on https://github.com/APSL/react-native-keyboard-aware-scroll-view/blob/master/lib/KeyboardAwareHOC.js
class KeyboardScroll extends PureComponent {
  onFocus = (event) => {
    const handle = findNodeHandle(event.target);

    setTimeout(() => {
      UIManager.measureInWindow(
        handle,
        (x, y, width, height) => {
          const inputBottom = (y + height) - Platform.select({
            ios: height + 20,
            android: StatusBar.currentHeight + height + 20,
          });
          this.scroll.scrollTo({ x: 0, y: inputBottom, animated: true });
        },
      );
    }, 1);
  };

  render() {
    return (
      <ScrollView
        ref={(r) => {
          this.scroll = r;
        }}
        style={this.props.style}
        contentContainerStyle={this.props.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {this.props.children}
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}

KeyboardScroll.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  contentContainerStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

KeyboardScroll.defaultProps = {
  style: null,
  contentContainerStyle: null,
};

export default KeyboardScroll;
