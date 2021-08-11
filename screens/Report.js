import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import './Data.json';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }

        this.csvLinktEl = React.createRef();

        this.headers = [
            { label: 'Id', key: 'id' },
            { label: 'Name', key: 'name' },
            { label: 'Email', key: 'email' },
        ]
    }

    getUserList = () => {
        return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
    }

    downloadReport = async () => {
        const data = await this.getUserList();
        this.setState({ data: data}, () => {
            setTimeout(() => {
                this.csvLinktEl.current.link.click();
            });
        });
    }


    render() {
        const { data} = this.state;
        return (

                <ImageBackground
                    source={require("../assets/Home-screen.jpg")}
                    style={styles.backgroundImage}
                >
                <View style={styles.screenContainer}>
                    <Text style={styles.textBox}>GlutenFree Report</Text> 

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.downloadReport}>
                            <Text style={styles.textElement}>Export to CSV</Text>
                        </TouchableOpacity> 

                    </View> 


                    <CSVLink
                        headers={this.headers}
                        data={data}
                        filename="Product_Report.csv"
                        ref={this.csvLinktEl}
                    />
                </View>    

                </ImageBackground>


            
        )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 300,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    buttons: {
      backgroundColor: "lightgrey",
      color: "white",
      fontSize: 200,
      height: 50,
      width: 200,
    },
    space: {
      width: 20,
      height: 20,
    },
    textBox: {
      marginBottom: 100,
      fontSize: 45,
      color: "brown",
    },
    textElement: {
      fontSize: 25,
      marginTop: 8,
      textAlign: "center",
    },
  });

export default Report;