import { Dimensions } from 'react-native';

const ImageWidth = Dimensions.get('window').width;

export const spinnerStyle = {
  container: {
    flex: 1,
    padding: 10,
    width: ImageWidth,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    padding: 5
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#dddddd',
    padding: 5
  },
  gray: {
    backgroundColor: '#cccccc',
  }
};
