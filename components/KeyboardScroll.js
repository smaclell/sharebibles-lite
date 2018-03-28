import React, { PureComponent } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  findNodeHandle,
  Platform,
  ScrollView,
  StatusBar,
  UIManager,
  ViewPropTypes,
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
            android: StatusBar.currentHeight + 20,
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
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};

KeyboardScroll.defaultProps = {
  style: null,
  contentContainerStyle: null,
};

export default KeyboardScroll;
