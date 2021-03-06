import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class VoteWait extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.event.name}: Awaiting results...`,
  });

  render() {
    return (
      <LinearGradient colors={['#2696a9', 'rgb(146, 201, 210)']} style={styles.container}>
        <Image source={require('../Assets/pitchLightBulb.png')} style={styles.image} />
        <Text style={styles.text}>Thank you for voting. Waiting for results to be released...</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    padding: 10,
    fontFamily: 'Futura',
    fontSize: 24,
    textAlign: 'center'
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    resizeMode: 'cover'
  }
});

module.exports = VoteWait;
