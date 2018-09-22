import {
  View,
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
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
    justifyContent: 'flex-start',
  },
  groups: {
    flexWrap: 'wrap',
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
    const { group } = this.state;
    const styleProps = {
      backgroundColor: group === value ? colours.core.blue : colours.core.white,
      color: group === value ? colours.core.white : colours.core.black,
      borderColor: group === value ? colours.core.blue : colours.core.grey,
      borderRadius: 5,
      raised: true,
      containerViewStyle: { flex: 1 },
      fontSize: fonts.large,
    };

    return (
      <Button
        onPress={() => this.setState({ group: value })}
        title={I18n.t(label)}
        {...styleProps}
      />
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
