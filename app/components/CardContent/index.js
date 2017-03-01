import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Image,
  WebView,
  TouchableHighlight,
  View
} from 'react-native';
import { cardStyle } from './style';
import Moment from 'moment';

export default class CardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _media(){
    if (this.props.media_type == 'image') {
      return (
        <Image style={cardStyle.image} source={{uri: this.props.url }} resizeMode={'cover'} />
      );
    } else {
      return (
        <WebView
        style={cardStyle.video}
        javaScriptEnabled={true}
        source={{uri: this.props.url }} />
      );
    }
  }

  _formatDate(date){
    let formated_date = Moment(date).format('DD[/]MM[/]YYYY');

    return formated_date;
  }

  render(){

    if (this.props.title || this.props.content) {
      return (
        <View style={cardStyle.container}>
          <View style={cardStyle.imageWrapper}>
            { this._media() }
            <Text style={cardStyle.title}>{this.props.title}</Text>
            <Text style={cardStyle.copyright}>{this.props.copyright}</Text>
          </View>

          <Text style={cardStyle.content}>{this.props.content}</Text>

          <Text style={cardStyle.date}>{ this._formatDate(this.props.date) }</Text>
        </View>
      );
    } else {
      return (
        <View style={cardStyle.errorContainer}>
          <TouchableHighlight style={cardStyle.errorBlock}>
            <Text style={cardStyle.errorText}>Data inválida, tente outra.</Text>
          </TouchableHighlight>

        </View>
      );
    }


  }
};

AppRegistry.registerComponent('CardContent', () => CardContent);
