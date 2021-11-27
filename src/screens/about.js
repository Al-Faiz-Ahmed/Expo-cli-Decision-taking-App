import React, { useContext, useEffect, useState } from 'react';

//React Native Api or Module 
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
// FirebAse methods and function from ./config/firebase.js
import { db, collection, query, where, onSnapshot, orderBy } from "../config/firebase";
// Safe Area PRovider From Safe Downloaded Library  
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// GLobal Context 
import { GlobalContext } from '../context/context';
// List componennt from DecisionList.js    
import DecisionList from '../components/DecisionLis';

export default function About({ navigation }) {
    let { state, dispatch } = useContext(GlobalContext)

    // this list help if therer is no decision List in your ID
    let [showList, setShowList] = useState(false)

    //For RealTime fireStore Update
    useEffect(() => {
        listenUpdate()
    }, [])

    // This Help In order data in squence  
    useEffect(() => {
        if (state.listOfOptions.length !== 0) {
            setShowList(true)
            console.log(state.listOfOptions)
        }
    }, [state.listOfOptions])

    // the Function of Realtine Time update Listnenr
    function listenUpdate() {
        const q = query(collection(db, "usersDecisions"), where("uid", "==", state.authUser.uid), orderBy('postNumber'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    dispatch({
                        type: 'LIST_UPDTAE_LISTENER',
                        payload: change.doc.data()
                    })
                }
            });
        });
    }
    //Again SafeArea method to pass padding Top to the safeAreaProvider 
    const insets = useSafeAreaInsets()

    return (
        <SafeAreaProvider style={{ paddingTop: insets.top, backgroundColor: '#F6F6F6' }}>
            <View style={styles.body}>

                <View style={styles.iamgeDiv}>
                    <View style={{ backgroundColor: 'red', flex: 1 }}>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    
                    {/* IF UserNAme is lesser than 22 letter so that is ok but if grether than it will hide remining chachrcter after 22. */}
                        {state.authUser.displayName.length < 22 ?
                            state.authUser.displayName :
                            `${state.authUser.displayName.slice(0, 22)}...`
                        }
                    </Text>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: state.authUser.photoURL }} style={styles.profilePic} />
                    </View>
                </View>
                {
                    // if you take any decision this true
                    showList ?
                    <ScrollView>
                            <View style={styles.listDiv}>
                                {
                                    state.listOfOptions.map((data) => {
                                        let { option1, option2, option3, decidedOpt, decisionId, postNumber } = data
                                        return (
                                            
                                            <DecisionList key={decisionId} option1={option1} option2={option2} option3={option3} decidedOpt={decidedOpt} />
                                            
                                            )
                                        })
                                    }
                            </View>
                        </ScrollView>
                        :
                        // if you did not take any decision this will true
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: '#595959' }}>No such Decisions to show </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.ctaButton}>
                                <Text style={styles.buttonText}>Take the decision</Text>
                            </TouchableOpacity>
                        </View>

                }

            </View>
        </SafeAreaProvider >
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,

    },
    iamgeDiv: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    profilePic: {
        marginStart: 'auto',
        marginEnd: 20,
        width: 30,
        height: 30,
        borderRadius: 100000,
        borderColor: '#0377FB',
        borderWidth: 3,

    },
    listDiv: {
        paddingHorizontal: 10,
    }, ctaButton: {
        backgroundColor: '#0377FB',
        padding: 14,
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 20
    }, buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },

})