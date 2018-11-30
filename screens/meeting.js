import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from 'react-native';
import firebase from 'firebase';


export default class meeting extends React.Component {
  static navigationOptions = {
    title: 'Meeting',
  };
  state = {
    date: '',
    from: '',
    to: '',
    topic: '',
    detail: '',
    type: '',
    
  };
  
  onChooseImagePress = async () => {
    //let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, "test.jpg")
        .then(() => {
          alert("Success");
        })
        .catch((error) => {
          alert(error);
        });
      this.setState({ image: result.uri });
    }
  };

  
  handleDate = (text) => {
    this.setState({ date: text })
  }
  handleFrom = (text) => {
    this.setState({ from: text })
  }
  handleTo = (text) => {
    this.setState({ to: text })
  }
  handleTopic = (text) => {
    this.setState({ topic: text })
  }
  handleDetail = (text) => {
    this.setState({ detail: text })
  }
  handleType = (text) => {
    this.setState({ type: text })
  }

  alert = (firstname, lastname) => {
    alert('FirstName: ' + firstname + '\n' + 'LastName: ' + lastname)
  }
  //------------------------------------------------ start edit-----------------------------------------------
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={{ marginLeft: 50 }}>
              Request Form
               </Text>
            
            {/* ----- field input ---- */}
            <View style={{ alignItems: 'center' }}>
            <Text styles={styles.text}>
                Date
            </Text>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={'11/30/2018'}
                placeholderTextColor="#000"
                autoCapitalize="none"
                onChangeText={this.handleDate} />
              <Text styles={styles.text}>
                From
            </Text>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={'14:30'}
                placeholderTextColor="#000"
                autoCapitalize="none"
                onChangeText={this.handleFrom} />
              <Text styles={styles.text}>
                To
            </Text>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={'15:30'}
                placeholderTextColor="#000"
                autoCapitalize="none"
                onChangeText={this.handleTo} />
              <Text styles={styles.text}>
                Topic
            </Text>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={'Topic name'}
                placeholderTextColor="#000"
                autoCapitalize="none"
                onChangeText={this.handleTopic} />
              <Text styles={styles.text}>
                Detail
            </Text>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={'Detail of your topic'}
                placeholderTextColor="#000"
                autoCapitalize="none"
                onChangeText={this.handleDetail} />
                <Text styles={styles.text}>
                Type
            </Text>
              <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder={' '}
                placeholderTextColor="#000"
                autoCapitalize="none"
                onChangeText={this.handleType} />
            </View>
           
            
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={
                  () => firebase.database().ref('request/id/009').set({
                    date: this.state.date,
                    from: this.state.from,
                    to: this.state.to,
                    topic: this.state.topic,
                    detail: this.state.detail,
                    type: this.state.type,
                  })
                }>
                <Text style={styles.submitButtonText}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  //------------------------------------------------ end edit-----------------------------------------------
  _maybeRenderDevelopmentModeWarning() {
    if (_DEV_) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  text: {
    color: 'black',
  },
  input: {
    padding:20,
    margin: 15,
    height: 40,
    width: 250,
    borderColor: '#86888A',
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#1FB310',
    padding: 10,
    margin: 15,
    height: 40,
    width: 100,
    borderRadius: 50,
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white'
  }

});