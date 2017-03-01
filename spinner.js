import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ActivityIndicator,
  View
} from 'react-native';

type State = { animating: boolean; };
type Timer = number;

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
      <View style={styles.centering}>
        <ActivityIndicator
          animating={this.state.animating}
          style={{height: 80}}
          size="large"
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('Spinner', () => Spinner);
