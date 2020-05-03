import React, {Component} from 'react';
import {View,Text,Image,TouchableOpacity,TextInput,form} from 'react-native';

import Modal from "react-native-modal";
const {layout, text, buttons,forms} = require ('../styles/main');


export class SimpleAlert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorImg : require('../../images/alert.png'),
            successImg: require('../../images/success.png')
        }
    }

    _toggleModal = () => {this.setState({ isModalVisible: !this.props.isModalVisible })};

    render() {
        return(
            <Modal 
            isVisible={this.props.isModalVisible}
            backdropColor = {'#66E49B'}
            backdropOpacity = {0.9}
            style = { {padding: 0, margin: 0,} }>
                <View style={layout.ModalCont}>
                    <View style={layout.ModalTrialInfoCont}>
                        <View style={layout.ModalIconAlertCont}>
                            <Image
                                style={[{width: 100, height: 100, borderRadius: 25, backgroundColor: '#c3e6cb'}, this.props.imageType==1 && {backgroundColor: '#ffeeba'}]}
                                source={this.props.imageType==1? this.state.errorImg: this.state.successImg }
                            />
                        </View>
                        <Text style={[text.GralText, text.Strong, text.TAccentPurple]}>
                            {this.props.line1}
                        </Text>
                        <Text style={[text.GralText, text.Regular, text.TLightBlue, {marginBottom: 10,}]}>
                            {this.props.line2}
                        </Text>
                        <TouchableOpacity 
                            onPress={this.props.closeModal}
                            style={[buttons.GralButton, buttons.ButtonAccentPurple, {marginBottom: 0,}]}
                            >
                            <Text style={[text.BText, text.TLight]}>
                                {this.props.buttonLabel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

export class TwoButtonsAlert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorImg : require('../../images/alert.png'),
            successImg: require('../../images/success.png')
        }
    }

    render() {
        return(
            <Modal 
            isVisible={this.props.isModalVisible}
            backdropColor = {'#66E49B'}
            backdropOpacity = {0.9}
            style = { {padding: 0, margin: 0,} }>
                <View style={layout.ModalCont}>
                    <View style={layout.ModalTrialInfoCont}>
                        <View style={layout.ModalIconAlertCont}>
                            <Image
                                style={[{width: 100, height: 100, borderRadius: 25, backgroundColor: '#c3e6cb'}, this.props.imageType==1 && {backgroundColor: '#ffeeba'}]}
                                source={this.props.imageType==1? this.state.errorImg: this.state.successImg }
                            />
                        </View>
                        <Text style={[text.GralText, text.Strong, text.TAccentPurple]}>
                            {this.props.line1}
                        </Text>
                        <Text style={[text.GralText, text.Regular, text.TLightBlue, {marginBottom: 10,}]}>
                            {this.props.line2}
                        </Text>

                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}>
                        
                            <TouchableOpacity 
                                onPress={this.props.leftFunction}
                                style={[buttons.GralButton, buttons.BLineLightBlue, {marginBottom: 0, width: '47%',}]}
                                >
                                <Text style={[text.BText, text.TLightBlue]}>
                                    {this.props.leftButton}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.rightFunction}
                                style={[buttons.GralButton, buttons.ButtonAccentPurpler, {marginBottom: 0, width: '47%',}]}
                                >
                                <Text style={[text.BText, text.TLight]}>
                                    {this.props.rightButton}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export class TwoButtonsTextInputModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorImg : require('../../images/alert.png'),
            successImg: require('../../images/success.png')
        }
    }

    render() {
        return(
            <Modal 
            isVisible={this.props.isModalVisible}
            backdropColor = {'#66E49B'}
            backdropOpacity = {0.9}
            style = { {padding: 0, margin: 0,} }>
                <View style={layout.ModalCont}>
                    <View style={layout.ModalTrialInfoCont}>

                        <Text style={[text.GralText, text.Strong, text.TAccentPurple]}>
                            {this.props.line1}
                        </Text>

                        <TextInput
                            multiline={true}
                            maxLength={100}
                            style={{
                                width: '100%', height: 100,
                                backgroundColor: 'transparent',
                                borderColor: '#00A0E6',
                                color: "#343D42",
                                borderWidth: 1,
                                borderRadius: 10,
                            }}
                            autoCorrect={false}
                            numberOfLines={4}
                            placeholder= {this.props.message}
                            onChangeText={(textReject) => this.props.onInputChanged(textReject)} />
                        
                        {this.props.textRejectError?
                          <View style={layout.textAlertCont}>
                              <Text style={[layout.textAlertError, text.Regular]}>
                                  {this.props.textRejectError ? "Inserta un motivo de rechazo":null}
                              </Text>
                          </View>
                        :null}
                        
                                        
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical:10}}>
                        
                            <TouchableOpacity 
                                onPress={this.props.leftFunction}
                                style={[buttons.GralButton, buttons.BLineLightBlue, {marginBottom: 0, width: '47%',}]}
                                >
                                <Text style={[text.BText, text.TLightBlue]}>
                                    {this.props.leftButton}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.props.rightFunction}
                                style={[buttons.GralButton, buttons.BRed, {marginBottom: 0, width: '47%',}]}
                                >
                                <Text style={[text.BText, text.TLight]}>
                                    {this.props.rightButton}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}