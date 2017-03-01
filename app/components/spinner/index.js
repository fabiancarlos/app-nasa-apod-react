import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  ActivityIndicator,
  View
} from 'react-native';
import { spinnerStyle } from './style';

type State = { animating: boolean; };
type Timer = number;

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
    if (this.state.animating) {
      return (
        <View style={spinnerStyle.container}>
          <ActivityIndicator
            animating={this.state.animating}
            style={spinnerStyle.spinner}
            size="large"
            color="#dddddd"
          />
          <Text style={spinnerStyle.label}>Aguarde...</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

AppRegistry.registerComponent('Spinner', () => Spinner);
