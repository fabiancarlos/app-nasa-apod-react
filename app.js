import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  WebView,
  ScrollView,
  Dimensions,
  Button,
  View
} from 'react-native';
import Spinner from './app/components/spinner';
import Moment from 'moment';

const ImageWidth = Dimensions.get('window').width;
const ImageHeight = Dimensions.get('window').height;

const ApiUrl = 'https://api.nasa.gov/planetary/apod';
const ApiKey = 'TdMjbXv6dJVYNJ1c51TV7zjHd9RzVN1ZHkFqm0bK';

// let moment = require('moment');
// let today = Moment().format('YYYY[-]MM[-]DD');

const stylesNavBar = StyleSheet.create({
  container: {
    width: 1000,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#2f3135'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: '#ffffff',
    position: 'absolute',
    left: 10,
    right: 0,
    bottom: 10,
    alignItems: 'center',
  }
});

class NavBar extends Component {
  render(){
    return (
      <View style={stylesNavBar.container}>
        <Text style={stylesNavBar.title}>
          Astronomia imagens do dia (APOD)
        </Text>
      </View>
    );
  }
}

const stylesCard = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ImageWidth,
    height: ImageHeight - 300
  },
  video: {
    width: ImageWidth,
    height: ImageHeight - 300
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    padding: 10,
    backgroundColor: 'transparent',
    textShadowColor: '#000000',
    textShadowOffset: {width: 1, height: 1}
  },
  content: {
    fontSize: 14,
    letterSpacing: 0.5,
    textAlign: 'left',
    padding: 10,
  },
  copyright: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    opacity: 0.7
  },
  date: {
    fontSize: 13,
    letterSpacing: 0.5,
    color: '#aaaaaa',
    textAlign: 'right',
    padding: 10,
  }
});

class CardContent extends Component {

  _media(){
    if (this.props.media_type == 'image') {
      return (
        <Image style={stylesCard.image} source={{uri: this.props.url }} />
      );
    } else {
      return (
        <WebView
        style={stylesCard.video}
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
    return (
      <View style={stylesCard.container}>
        <View style={styles.imageWrapper}>
          { this._media() }
          <Text style={stylesCard.title}>{this.props.title}</Text>
          <Text style={stylesCard.copyright}>{this.props.copyright}</Text>
        </View>

        <Text style={stylesCard.content}>{this.props.content}</Text>

        <Text style={stylesCard.date}>{ this._formatDate(this.props.date) }</Text>
      </View>
    );
  }
}

export default class AppNasaApod extends Component {
  constructor(props){
    super(props);
    this.state = {
      showText: true,
      result: {},
      loading: true,
      try_again: false
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    let today = Moment().format('YYYY[-]MM[-]DD');

    let that = this;
    this.loadData(today);
  }

  loadData(date) {
    this.setState({
        loading: true,
        try_again: false
    });

    const config = {
      mode: "cors",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const urlWithParam = `${ApiUrl}?api_key=${ApiKey}&date=${date}`;

    console.log("TODAYY >>", Moment().format('YYYY[-]MM[-]DD'), urlWithParam);

    let that = this;
    return fetch(urlWithParam, config)
      .then(response => response.json())
      .then((responseJson) => {
          console.log("success >>", responseJson);

           that.setState({
            result: responseJson,
            loading: false
          });
        return responseJson;
      })
      .catch((error) => {
          that.setState({
              loading: false,
              try_again: true
          });
      });
  }

  _tryAgain() {
    if (this.state.try_again) {
      return (
        <Button
          onPress={() => { this.loadData() }}
          title="Tentar novamente"
          color="#ffffff"
          accessibilityLabel="Tentar novamente"
        />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar></NavBar>
        <ScrollView>
          <View style={styles.main}>
            {
              this.state.loading ?
              <Spinner></Spinner> :
              <CardContent
                title={this.state.result.title}
                content={this.state.result.explanation}
                url={this.state.result.url}
                media_type={this.state.result.media_type}
                copyright={this.state.result.copyright}
                date={this.state.result.date}>
              </CardContent>
            }

            { this._tryAgain() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#222222'
  },
  main: {
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AppNasaApod', () => AppNasaApod);
