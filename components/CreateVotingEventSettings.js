import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TouchableHighlight,
   ListView,
   Image,
   TextInput,
   ActivityIndicator,
   Modal,
   Alert,
   Linking
} from 'react-native';

let ServerCommunicator = require('./ServerCommunicator').default;


class CreateVotingEventSettings extends Component {
   propTypes: {
      navigator: React.PropTypes.Object.isRequired,
      complete: React.PropTypes.Function.isRequired,
      rightButtonDisable: React.PropTypes.Function.isRequired
   }

   constructor(props) {
      super(props);

      // The list view dataSource
      const dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2,
         sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      this.event = {
         name: "",
         description: "",
         image: "",
         options: []
      }
      this.nextID = 0;

      this.state = {
         dataSource: dataSource.cloneWithRowsAndSections(this.loadRows()),
         showCoverModal: false
      };
   }

   loadRows() {
      var generalRows = [
         {
            title: "Name",
            type: "entry",
            key: "name"
         },
         {
            title: "Description",
            type: "entry",
            key: "description"
         },
         {
            title: "Image",
            type: "entry",
            key: "image"
         },
         {
            title: "Start",
            type: "entry",
            key: "startTime"
         },
         {
            title: "End",
            type: "entry",
            key: "endTime"
         }
      ]

      var optionRows = [
         {
            title: "New",
            type: "clickable",
            onPress: () => {
               let newOption = {
                  name: "",
                  id: this.nextID++
               }
               this.event.options.push(newOption);
               this.setState({
                  dataSource: this.state.dataSource.cloneWithRowsAndSections(this.loadRows())
               });
            }
         }
      ]

      this.event.options.forEach((option) => {
         optionRows.push({
            title: null,
            type: 'entry',
            key: "option" + option.id
         })
      })

      return {
         general: generalRows,
         options: optionRows
      }
   }

   createEvent=() => {
      if (this.state.name == "" || this.state.name == null) {
         Alert.alert("You need an event name");
         return;
      }
      this.event.name = this.state.name;

      if (this.state.description == ""|| this.state.description == null) {
         Alert.alert("You need an event description");
         return;
      }
      this.event.description = this.state.description;
      this.event.image = this.state.image;
      this.event.startTime = this.state.startTime;
      this.event.endTime = this.state.endTime;

      console.log(this.event.options);
      if (this.event.options.length <= 3) {
         Alert.alert("You need more than 3 options to choose from");
         return;
      }

      var options = [];
      this.event.options.forEach((option) => {
         option.name = this.state["option" + option.id];
         options.push(option.name);
      });
      this.event.options = options;

      this.setState({
         showCoverModal: true
      });
      console.log(this.event);
      ServerCommunicator.current.submitNewEvent(this.event).then(() => {
         this.props.navigator.pop();
         this.props.complete();
         this.setState({
            showCoverModal: false
         })
      }).catch((error) => {
         this.setState({
            showCoverModal: false
         });
         Alert.alert("Encountered an error", error);
      });
   }

   getLeftButton() {

   }

   getRightButton() {
      return {
         text: "Create",
         action: this.createEvent
      }
   }

   getNavigationTitle() {
      return "Create Event"
   }

   renderRow(data, section, row) {
      return (
         <TouchableHighlight
         style={styles.row}
         onPress={data.type == 'clickable' ? data.onPress : null}>
         <View style={styles.rowTextContainer}>
         <View style={styles.rowTextInnerContainer}>
         {data.title != null ? <Text style={styles.rowTitle}>{data.title}</Text> : null}
         {
            data.type == 'entry' ?
            <TextInput
            style={styles.textField}
            onChangeText={(text) => {
               this.setState({
                  [data.key]:text
               });
            }}
            value={this.state[data.key]}/>
            :
            <Image source={require('./Assets/disclosureIndicator.png')} style={styles.disclosureIndicator}/>
         }
         </View>
         <View style={styles.seperatorSmall}/>


         </View>
         </TouchableHighlight>
      );
   }

   /**
   Gets a view of a section header
   */
   renderSectionHeader(data, sectionName) {

      return (
         <View>
         {
            sectionName.toLowerCase() == "options" ?
            <View>
            <Text>Start and end time should be generated here (choose ISO): </Text>
            <TouchableHighlight
            underlayColor="rgba(110, 73, 189, 0)"
            onPress={() => Linking.openURL("http://www.timestampgenerator.com")}>
            <Text style={{color: 'rgb(33, 137, 204)'}}>http://www.timestampgenerator.com</Text>
            </TouchableHighlight>
            </View>
            :
            null
         }
         <View style={styles.sectionHeader}>
         <Text style={styles.sectionHeaderText}>{sectionName.toUpperCase()}</Text>
         </View>
         </View>
      )
   }

   render() {
      return (
         <View style={styles.container}>
         <Modal
         transparent={true}
         visible={this.state.showCoverModal}>
         <View style={{backgroundColor: 'rgba(131, 131, 131, 0.56)', flex: 1, justifyContent: 'center'}}>
         <ActivityIndicator
         size="large"
         color="rgb(0, 0, 0)"
         animating={this.state.showCoverModal}
         style={{alignSelf: 'center'}}/>
         </View>
         </Modal>
         <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderRow.bind(this)}
         renderSectionHeader={this.renderSectionHeader.bind(this)}/>
         <View style={{height: 250}}/>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'rgb(238, 238, 238)'
   },
   row: {
      flex: 1,
      flexDirection: 'row',
   },
   rowTextContainer: {
      backgroundColor: 'white',
      paddingLeft: 0,
      flex: 1,
   },
   rowTextInnerContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: 'center'
   },
   rowTitle: {
      padding: 15,
      fontSize: 18,
      flex: 1,
      fontFamily: 'Avenir Next',
   },
   sectionHeader: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      backgroundColor: 'rgb(238, 238, 238)'
   },
   sectionHeaderText: {
      alignSelf: 'flex-end',
      marginBottom: 10,
      marginLeft: 10,
      fontSize: 10,
      fontFamily: 'Avenir Next',
      fontWeight: '600',
      color: 'grey'
   },
   seperator: {
      height: 1,
      backgroundColor: 'rgb(200, 200, 200)',
      flex: 1
   },
   seperatorSmall: {
      height: 1,
      marginLeft: 20,
      backgroundColor: 'rgb(200, 200, 200)',
      flex: 1
   },
   disclosureIndicator: {
      alignSelf: 'flex-end',
      resizeMode: 'contain',
      height: 15,
      width: 15,
      marginBottom: 20,
      marginRight: 10
   },
   textField: {
      height: 35,
      borderColor: 'lightgray',
      borderWidth: 1,
      paddingLeft: 10,
      fontFamily: "Avenir Next",
      flex: 1,
      borderRadius: 15,
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      marginLeft: 10,
   },
});

module.exports = CreateVotingEventSettings;
