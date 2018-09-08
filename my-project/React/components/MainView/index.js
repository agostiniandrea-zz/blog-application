import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class MyComp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Blog Application</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default connect(
  null,
  null
)(MyComp);