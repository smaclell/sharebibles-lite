import React, { Component } from 'react';
import { Animated, Easing, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class SlideIn extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.visible && nextProps.visible) {
      return {
        ...prevState,
        visible: true,
      };
    }

    return prevState;
  }

  constructor(props) {
    super(props);

    const { visible, containerHeight, endPercentage } = this.props;
    this.state = {
      visible,
    };

    this.visibility = new Animated.Value(visible ? containerHeight * endPercentage : containerHeight);
  }

  componentDidUpdate(prevProps) {
    const { visible, containerHeight, endPercentage } = this.props;
    let visibleHeight = containerHeight * endPercentage;
    if (this.props.fullHeight) {
      const max = containerHeight - this.props.fullHeight;
      visibleHeight = Math.max(visibleHeight, max);
    }

    if (prevProps.visible !== visible || prevProps.fullHeight !== this.props.fullHeight) {
      Animated.timing(this.visibility, {
        toValue: visible ? visibleHeight : containerHeight,
        easing: Easing.bezier(0.76, 0.01, 0.4, 1),
        duration: 500,
      }).start(() => this.state.visible !== visible && this.setState({ visible }));
    }
  }

  render() {
    const {
      visible, style, children, ...rest
    } = this.props;

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
  fullHeight: null,
};

SlideIn.propTypes = {
  containerHeight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  endPercentage: PropTypes.number.isRequired,
  // They have abug around support custom proptypes
  // eslint-disable-next-line react/no-typos
  style: ViewPropTypes.style,
  fullHeight: PropTypes.number,
  visible: PropTypes.bool,
};

export default SlideIn;
