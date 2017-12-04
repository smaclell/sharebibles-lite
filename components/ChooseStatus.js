import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Status from '../components/Status';
import colours from '../styles/colours';
import fonts from '../styles/fonts';
import I18n from '../assets/i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: colours.white,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  groups: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  statuses: {
    alignItems: 'flex-start',
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  text: {
    padding: 5,
    fontSize: fonts.header,
  },
  active_text: {
    color: colours.greys.darkest,
  },
  inactive_text: {
    color: colours.greys.lighter,
  },
});
class ChooseStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null,
    };
  }

  getStatuses = () => (
    this.props.statuses.filter(s => s.group === this.state.group)
  );

  showStatus = status => (
    <Status
      key={status.key}
      label={I18n.t(status.label)}
      onPressed={() => this.updateStatus(status.key)}
      selected={this.state.status === status.key}
      icon={status.icon}
      iconFamily={status.iconFamily}
    />
  );

  updateStatus = (status) => {
    this.setState({ status });
    this.props.updateStatus(status);
  };

  renderGroup = (label, value) => {
    const textStyle = [
      styles.text,
      this.state.group === value ? styles.active_text : styles.inactive_text,
    ];

    return (
      <TouchableOpacity onPress={() => this.setState({ group: value })}>
        <Text style={textStyle}>{I18n.t(label).toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  // tODO: Styling
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.groups}>
          {this.renderGroup('status/groups/home', 'home')}
          {this.renderGroup('status/groups/not_home', 'not_home')}
        </View>
        { this.state.group &&
          <View style={styles.statuses}>
            {this.getStatuses().map(this.showStatus) }
          </View>
        }
      </View>
    );
  }
}

ChooseStatus.propTypes = {
  statuses: PropTypes.array.isRequired,
  updateStatus: PropTypes.func.isRequired,
};

export default ChooseStatus;
