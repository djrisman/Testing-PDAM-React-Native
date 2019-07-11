import React from 'react';
import { Platform, StyleSheet, Text, Image, View, TouchableOpacity, Button, TextInput, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';

class LogoTitle extends React.Component {
  render() {
    return (
      <Text
        style={{  color: 'white',justifyContent: 'center', textAlign: 'center', marginLeft: '39%' }}
      >PDAM Selayar </Text>

    );
  }
}

class HomeScreen extends React.Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Cek / Bayar Tagihan',
         },
         {
            id: 1,
            name: 'Daftar Online',
         },
         {
            id: 2,
            name: 'Info / Berita PDAM',
         },
         {
            id: 3,
            name: 'Pengaduan',
         },
         {
            id: 4,
            name: 'Lokasi / Alamat',
         }
      ]
   }

  static navigationOptions = {
    headerTitle: <LogoTitle  />,
    /*headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        style={{ marginRight:25, backgroundColor:'tomato'}}
      />
    ),*/
  };

  render() {
    return (
      <ImageBackground 
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      source={require('./assets/back.png')}
      >
          <Image
          source={require('./assets/pdam.png')}
          />
          {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.clist}
                     onPress={() => this.props.navigation.navigate('Details',
                         {
                          itemId: 86,
                          otherParam: 'Cek / Bayar Tagihan',
                          page:item.name,
                         }
                      )}
                     >
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
          }
      </ImageBackground>
    );
  }
}

class DetailsScreen extends React.Component {
  state = {
    id : '',
    para:'',
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  handleId = (text) => {
    this.setState({
      id : text
    });
  }

  kirim = (id) => {
      let dat = {
          "id" : id
      }
      axios({
        method: 'post',
        url : 'http://hmikomkedokteranuh.com/tesji/ci/tes/tagihan',
        data : dat
      }).then( (response) => {
        this.setState({
          id:response.data.tagihan[0].status,
          para:response.data.tagihan[0].status,
        });
        alert('adakah?');
      }).catch((error) =>{
        console.error(error);
      });
      alert(id);
   }

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;
    const page = params ? params.page : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>Adakah?: {this.state.para}</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>Page: {JSON.stringify(page)}</Text>
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
                        <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "ID"
                        placeholderTextColor = "#9a73ef"
                        autoCapitalize = "none"
                        onChangeText = {this.handleId}/>

                        <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {
                           () => this.kirim(this.state.id)
                        }>
                        <Text style = {styles.submitButtonText}> Submit </Text>
                        </TouchableOpacity> 
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'dodgerblue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlignVertical: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    color:'red',
    height:45,
    width:'100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  clist: {
      padding: 10,
      marginTop: 17,
      width:'80%',  
      backgroundColor: 'dodgerblue',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   text: {
      color: 'white'
   },
    input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
});