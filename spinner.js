import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
  View
} from 'react-native';

const ImageWidth = Dimensions.get('window').width;

type State = { animating: boolean; };
type Timer = number;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  spinner: {
    width: ImageWidth,
    height: 400
  },
  gray: {
    backgroundColor: '#cccccc',
  }
});

export default class Spinner extends Component {
  state: State;
  _timer: Timer;

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }

  componentDidMount() {
    this.setToggleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  setToggleTimeout() {
    this._timer = setTimeout(() => {
      this.setState({animating: !this.state.animating});
      this.setToggleTimeout();
    }, 2000);
  }

  render(){
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.state.animating}
          style={styles.spinner}
          size="large"
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Spinner', () => Spinner);
