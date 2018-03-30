import React, { Component } from 'react';
import { Animated, Easing, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class SlideIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillMount() {
    const { visible, containerHeight, endPercentage } = this.props;
    this.visibility = new Animated.Value(visible ? containerHeight * endPercentage : containerHeight);
  }

  componentWillReceiveProps(nextProps) {
    const { visible, containerHeight, endPercentage } = nextProps;
    if (visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this.visibility, {
      toValue: visible ? containerHeight * endPercentage : containerHeight,
      easing: Easing.bezier(0.76, 0.01, 0.4, 1),
      duration: 500,
    }).start(() => this.setState({ visible }));
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      transform: [{ translateY: this.visibility }],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}

SlideIn.defaultProps = {
  visible: false,
  style: {},
};

SlideIn.propTypes = {
  containerHeight: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  endPercentage: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  visible: PropTypes.bool,
};

export default SlideIn;
