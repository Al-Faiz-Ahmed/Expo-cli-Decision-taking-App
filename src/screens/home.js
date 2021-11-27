import React, { useContext, useState, useRef } from 'react';
//React Native Api or Module 
import { Text, Animated, Easing, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, View, Alert, Image, TextInput, SafeAreaView, } from 'react-native';
// GLobal Context 
import { GlobalContext } from '../context/context';
// Safe Area PRovider From Safe Downloaded Library  
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// Alert Popup componennt from alertAnswer.js    
import AnswerPopUp from '../components/alertAnswer';
// React Native Vector Icons Download library    
import FAwesomeIcons from 'react-native-vector-icons/FontAwesome5'


export default function Home(props) {


    let { state, dispatch } = useContext(GlobalContext)
    let [optionOne, getOptionOne] = useState('')
    let [optionTwo, getOptionTwo] = useState('')
    let [optionThree, getOptionThree] = useState('')
    let [optionOneError, getOptionOneError] = useState(false)
    let [optionTwoError, getOptionTwoError] = useState(false)
    let [optionThreeError, getOptionThreeError] = useState(false)

    // This Line Focus Option 1 Input when we click on edit 
    let optionfirstfocusing = useRef(null)

    // state which sending a boolean and callback function  to alertAnswer.js (child component)  
    let [chosenDecision, getchosenDecision] = useState([false, ''])

    //Animation from react native showing error smoothly 
    let scaleAnimate = useRef(new Animated.ValueXY({ x: 0, y: -20 })).current
    let opacityAnimate = useRef(new Animated.Value(0)).current

    function showError() {
        Animated.parallel([
            Animated.timing(scaleAnimate, {
                toValue: { x: 0, y: -10 },
                duration: 500,
                useNativeDriver: true,
                easing: Easing.linear
            }),
            Animated.timing(opacityAnimate, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.linear
            }),
        ]).start()
    }

    // SafeArea method to pass padding Top to the safeAreaProvider 
    const insets = useSafeAreaInsets()


    //condition to check options are not empty string   

    async function makeDecesion() {
        if (!optionOne) {
            getOptionOneError(true)
            showError()
        }
        if (optionOne !== '') {
            getOptionOneError(false)
        }
        if (!optionTwo) {
            getOptionTwoError(true)
            showError()
        }
        if (optionTwo !== '') {
            getOptionTwoError(false)
        }
        if (!optionThree) {
            getOptionThreeError(true)
            showError()
        }
        if (optionThree !== '') {
            getOptionThreeError(false)
        }

        // function to deciide option randomly 

        let arr = [optionOne, optionTwo, optionThree]
        let randomize = Math.floor(Math.random() * 3)
        let decidedOption = arr[randomize]


        // condition sending a boolean and callbacback function to alertAnswer.js 

        if (optionOne && optionTwo && optionThree) getchosenDecision([true, { option1: optionOne, option2: optionTwo, option3: optionThree, decidedOpt: decidedOption }])
    }



    // function hich is calling from alertAnswer.js line no 55 
    function modalForDecidedValue(value) {
        if (value === 'done') {
            getOptionOne('')
            getOptionTwo('')
            getOptionThree('')
            getchosenDecision([false, ''])
        }
        if (value === 'edit') {
            getchosenDecision([false, ''])
            optionfirstfocusing.current.focus()
        }
    }
    return (
        // SafeAreaprovider from downaloaded Library prevent screen from statusBar
        <SafeAreaProvider style={{ paddingTop: insets.top, paddingLeft: 0, backgroundColor: '##F6F6F6' }}>
            <View style={styleHome.body}>


            {/* //  Component from AlertAnswer.js */}
                <AnswerPopUp showModal={modalForDecidedValue} decidedValue={chosenDecision} />

                <View style={styleHome.iamgeDiv}>
                    <View style={{ backgroundColor: 'red', flex: 1 }}></View>

                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{
                        state.authUser.displayName.length < 22 ?
                            state.authUser.displayName :
                            `${state.authUser.displayName.slice(0, 22)}...`}
                    </Text>


                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: state.authUser.photoURL }} style={styleHome.profilePic} />
                    </View>

                </View>

                <View style={{ paddingHorizontal: 15, flex: 1, }}>
                    <View style={styleHome.decisionsDiv}>
                        <Text style={[styleHome.texLabel], { fontSize: 32, color: '#0377FB' }}>Make Decision</Text>
                    </View>

                    <ScrollView>


                        <KeyboardAvoidingView
                            behavior={Platform.OS === "android" ? "padding" : "height"}
                        >
                            <View style={styleHome.decisionsDiv}>

                                <Text style={styleHome.texLabel}>Option 1</Text>

                                <TextInput ref={optionfirstfocusing} value={optionOne} onChangeText={(e) => { getOptionOne(e) }} style={styleHome.textINput} />
                                {optionOneError
                                    ?
                                    // error comes here smoothly with Animated Api
                                    <Animated.View style={[styleHome.errorDiv, {
                                        transform: [{ translateY: scaleAnimate.y },],
                                        opacity: opacityAnimate,
                                    }]}>

                                        <View>
                                            <FAwesomeIcons name='exclamation-triangle' color='#F94263' size={16} />
                                        </View>
                                        <View>
                                            <Text style={styleHome.errorLabel}>Please type condition for the decision</Text>
                                        </View>
                                    </Animated.View> : null
                                }
                            </View>
                            <View style={styleHome.decisionsDiv}>
                                <Text style={styleHome.texLabel}>Option 2</Text>
                                <TextInput value={optionTwo} onChangeText={(e) => { getOptionTwo(e) }} style={styleHome.textINput} selectionColor="red" />

                                {
                                    optionTwoError ?

                                    // error comes here smoothly with Animated Api
                                    <Animated.View style={[styleHome.errorDiv, {
                                        
                                        transform: [{ translateY: scaleAnimate.y },],
                                        opacity: opacityAnimate,
                                        

                                        }]}>
                                            <View>
                                                <FAwesomeIcons name='exclamation-triangle' color='#F94263' size={16} />
                                            </View>
                                            <View>
                                                <Text style={styleHome.errorLabel}>Please type condition for the decision</Text>
                                            </View>
                                        </Animated.View> : null
                                }
                            </View>
                            <View style={styleHome.decisionsDiv}>
                                <Text style={styleHome.texLabel}>Option 3</Text>
                                <TextInput value={optionThree} onChangeText={(e) => { getOptionThree(e) }} style={styleHome.textINput} selectionColor="blue" />

                                {
                                    optionThreeError ?
                                        <Animated.View style={[styleHome.errorDiv, {
                                            transform: [{ translateY: scaleAnimate.y },],
                                            opacity: opacityAnimate,


                                        }]}>
                                            <View>
                                                <FAwesomeIcons name='exclamation-triangle' color='#F94263' size={16} />
                                            </View>
                                            <View>
                                                <Text style={styleHome.errorLabel}>Please type condition for the decision</Text>
                                            </View>
                                        </Animated.View> : null
                                }
                            </View>

                            //Make Decision Button
                            <View style={styleHome.decisionsDiv}>
                                <TouchableOpacity onPress={makeDecesion} style={styleHome.ctaButton}>
                                    <Text style={styleHome.buttonText}>Make Decision</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaProvider>
    )
}

const styleHome = StyleSheet.create({

    // styling
    body: {
        flex: 1,
    },
    // Image Parent Div
    iamgeDiv: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    // profile pic Image
    profilePic: {
        marginStart: 'auto',
        marginEnd: 20,
        width: 30,
        height: 30,
        borderRadius: 100000,
        borderColor: '#0377FB',
        borderWidth: 3,

    },
    
    //Input field parent Div 
    decisionsDiv: {
        marginTop: 5,
        padding: 10,
    },
    
    //The Input Lqbel or Placeholder
    texLabel: {
        marginStart: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    //The InputField 
    textINput: {
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        paddingStart: 20,
        color: 'black',
        backgroundColor: 'white',
    }, 


    //Make Decision Button
    ctaButton: {
        backgroundColor: '#0377FB',
        padding: 14,
        textAlign: 'center',
        borderRadius: 10,
    }, buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },

    // Error view or div
    errorDiv: {
        flexDirection: 'row',
        backgroundColor: '#FDCED6',
        position: 'relative',
        zIndex: -1,
        paddingHorizontal: 20,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingTop: 15,
        paddingBottom: 10,
        
    },
    // Error Meassage holder
    errorLabel: {
        marginStart: 10,
        color: '#F94263'
    }
    
})

