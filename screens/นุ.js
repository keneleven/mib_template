import React from 'react';
import * as firebase from 'firebase';
import {
  Modal,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
const ListItem = require('../components/ListItem');

export default class home extends React.Component {


  static navigationOptions = {
    title: 'Home',
  };
  //------------------------------------------------start edit-----------------------------------------------
  state = {
    id: "",
    topic: "",
    detail: "",
    //host:"",
    //time_from:"",
    //time_to:"",
    //type:"",
    //status:""
    modalVisible: false
  }

  componentDidMount() {
    firebase.database().ref('/request/id/001').on('value', snapshot => {
      this.setState({ id: snapshot.val().id });
      this.setState({ topic: snapshot.val().topic });
      this.setState({ detail: snapshot.val().detail });
      this.setState({ host: snapshot.val().host });
      this.setState({ date_start: snapshot.val().date_start });
      this.setState({ time_from: snapshot.val().time_from });
      this.setState({ time_to: snapshot.val().time_to });
      this.setState({ type: snapshot.val().type });
      this.setState({ status: snapshot.val().status });
    })
  }

  not_approve_request(request_id) {
    firebase.database().ref('/request/id/' + request_id).update({
      status: 'not approve'
    });
    this.setState({ modalVisible: false });
  }

  approve_request(request_id) {
    firebase.database().ref('/request/id/' + request_id).update({
      status: 'approve'
    });
    modalVisible:
    this.setState({ modalVisible: false });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
    var innerContainerTransparentStyle = {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 15,
      height: 640,
      width: 960,
      fontSize: 14,
    };
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.modalView}>
            <Modal
              animationType='fade'
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => this.setModalVisible(false)}
            >
              <View style={[styles.modalView, modalBackgroundStyle]}>
                <View style={styles.modalViewPanel}>
                  <View style={innerContainerTransparentStyle}>
                    <View style={{
                      flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                      <View style={{
                        alignItems: 'center', marginTop: 20, marginLeft: 40
                      }}>
                        <Text style={{
                          alignItems: 'center', textAlign: 'center', fontSize: 28
                        }}>Detail</Text>
                      </View>
                      <View style={{
                        alignItems: 'right', marginTop: 10, marginRight: 30,
                      }}>
                        <Button title='close'
                          onPress={this.setModalVisible.bind(this, false)} />
                      </View>
                    </View>
                    <FlatList
                      data={[
                        {
                          topic: this.state.topic,
                          detail: this.state.detail,
                          host: this.state.host,
                          date_start: this.state.date_start,
                          time_from: this.state.time_from,
                          time_to: this.state.time_to,
                          type: this.state.type,
                          status: this.state.status
                        }
                      ]}
                      renderItem={({ item }) =>

                        <View style={{
                          alignItems: 'left', marginTop: 50, marginLeft: 40
                        }}>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>Topic : {item.topic}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>Detail : {item.detail}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>Host name : {item.host}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>Date : {item.date_start}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>From : {item.time_from}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>To : {item.time_to}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>Room type : {item.type}{"\n"}</Text>
                          <Text style={{
                            fontSize: 22, color: '#494949'
                          }}>Request status : {item.status}{"\n"}{"\n"}</Text>
                          <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center'
                          }}>
                            <TouchableOpacity style={[styles.button, styles.Approvebutton]} onPress={this.approve_request.bind(this, '001')}>
                              <Text style={styles.Textbutton} >Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.NotApprovebutton]} onPress={this.approve_request.bind(this, '001')}>
                              <Text style={styles.Textbutton} >Not Approve</Text>
                            </TouchableOpacity>
                          </View>
                        </View>}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
            <Text style={styles.getStartedText}>Get started by opening and edit</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/home.js</MonoText>
            </View>
            <Text style={styles.getStartedText}>{"\n"}</Text>

            </View>
            <View style={styles.container}>

              <FlatList
                data={[
                  {
                    id: this.state.id,
                    topic: this.state.topic
                  }
                ]}
                renderItem={({ item }) =>
                  <View style={[styles.box, styles.row]}>
                    <View style={[styles.box1,styles.two]}>
                      <Text style={styles.item}>Request id : {item.id}</Text></View>
                    <View style={[styles.box1,styles.box2]}>
                      <TouchableOpacity style={[styles.button, styles.Viewbutton]} onPress={() => {
                        this.setModalVisible(true);
                      }}>
                        <Text style={styles.Textbutton} >View</Text>
                      </TouchableOpacity>
                    </View>
                  </View>}
              />
          </View>
        </ScrollView>
      </View>
    );
  }
  //------------------------------------------------end edit-----------------------------------------------
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
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
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 15,
  },
  box: {
    flex: 1,
    height: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 15,
  },
  box1: {
    justifyContent: 'center',
  },
  buttonLayer: {
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  TextLayer: {
    justifyContent: 'center',
    flex: 3
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',

  },
  button: {
    borderColor: '#ffffff',
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  Approvebutton: {
    backgroundColor: '#1FB310',
  },
  NotApprovebutton: {
    backgroundColor: 'red',
  },
  Viewbutton: {
    justifyContent: 'center',
    backgroundColor: '#0098EE',
    marginRight: 25
  },
  Textbutton: {
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    borderColor: '#ffffff',
    fontSize: 20,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
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
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  item: {
    marginLeft: 30,
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
    justifyContent: 'flex-start',
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
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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

});