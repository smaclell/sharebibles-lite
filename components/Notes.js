import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  StyleSheet,
} from 'react-native';
import Section from '../components/Section';
import I18n from '../assets/i18n/i18n';
import fonts from '../styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    alignSelf: 'stretch',
    flex: 1,
    fontSize: fonts.normal,
    margin: 10,
    padding: 10,
  },
});

const Notes = ({ sectionNumber, onFocus, onChangeText }) => (
  <Section style={styles.container} order={sectionNumber}>
    <TextInput
      style={styles.input}
      onFocus={onFocus}
      placeholder={I18n.t('components/add_notes')}
      multiline
      numberOfLines={5}
      maxLength={1000}
      autoGrow
      maxHeight={90}
      onChangeText={onChangeText}
    />
  </Section>
);

Notes.propTypes = {
  sectionNumber: PropTypes.number.isRequired,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  onFocus: () => {},
};

export default Notes;
