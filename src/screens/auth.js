import React, { useContext, useEffect, useRef, useState } from 'react';

//React Native facebook Api or Module 
import * as Facebook from 'expo-facebook';
// FirebAse methods and function from ./config/firebase.js
import { FacebookAuthProvider, auth, signInWithCredential,db,setDoc,getDoc,doc } from '../config/firebase'
//React Native APIs or Module 
import { StyleSheet, Text, Animated, TouchableOpacity, View, Easing } from 'react-native';
//React Native Vector ICons 
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome5';
//React Native Global context 
import { GlobalContext } from '../context/context';


export default function Authentic() {
    const { state, dispatch } = useContext(GlobalContext);

    // This state is getting boolean from firebaseauth to on and off the loading of spinner  
    let [fetchUser, getFetchedUser] = useState(false)

    // this is animating spinner rotating 360 degree
    let animateLoading = useRef(new Animated.Value(0)).current

    Animated.loop(
        Animated.timing(animateLoading,{
            easing:Easing.linear,  
            toValue:360,
            duration:2000,
            useNativeDriver:false,
        })
    ).start()

        const rotataion = animateLoading.interpolate({
            inputRange:[0,360],
            outputRange:['0deg','360deg']
        })

    // effect on stoping spinner when user fetched    
    useEffect(() => {
        if (state.shoeAuthRoute) {
            getFetchedUser(true)
            animateLoading.stopAnimation()
        }
    }, [state.shoeAuthRoute])
    
    
    
    async function logIn() {
        // faacebook app Id    
        // 303389848231534
        await Facebook.initializeAsync({
            appId: 'xxxxxxxxxxxxxxxx'
        });

        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        });


        if (type === 'success') {
        
            // this helps to give facebook token
            const credential = FacebookAuthProvider.credential(token);
            
            // this helps to give firebase facebook login
            signInWithCredential(auth, credential)
                .then(async({ user }) => {
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL,
                        email: user.email
                      })
                })
                .catch(error => {
                });
        }

    }
    return (
        <View style={styles.firstScreen}>
                        
            <Text style={styles.heading}>Your Decisions</Text>
            <Text style={{ fontSize: 25 }}>Easy now.</Text>


             {/* if user is logged in then condition false */}
            {fetchUser ? <TouchableOpacity style={styles.button} onPress={logIn}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View ><IconsFontAwesome name="facebook" size={25} color="#0377FB" /></View>
                    <View ><Text style={styles.fbText}>Continue with facebook</Text></View>
                </View>
            </TouchableOpacity> :
                <Animated.View style={{transform:[{rotate:rotataion}],marginTop:50}}>
                        <IconsFontAwesome name="circle-notch" size={35} color="#0377FB" />
                </Animated.View>
            }

           
        </View>
    )
}

const styles = StyleSheet.create({
    firstScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 32
    },
    fbText: {
        color: '#0377FB',
        fontSize: 18,
        marginStart: 10,

    },
    button: {
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        borderColor:'#0377FB',
        borderWidth:3


    }
})