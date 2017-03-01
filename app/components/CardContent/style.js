import { Dimensions } from 'react-native';

const ImageWidth = Dimensions.get('window').width;
const ImageHeight = Dimensions.get('window').height;

export const cardStyle = {
  container: {
    backgroundColor: '#ffffff'
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    height: ImageHeight - 250
  },
  video: {
    flex: 1,
    height: ImageHeight - 250
  },
  title: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 18,
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
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  errorBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  errorText: {
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: 'center',
    padding: 10,
  }
};
