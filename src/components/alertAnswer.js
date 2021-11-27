import React,{useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { db,setDoc,doc,collection } from '../config/firebase'
import { GlobalContext } from '../context/context';


export default function AnswerPopUp({ showModal, decidedValue }) {
    const { state } = useContext(GlobalContext);

    //Counting your Post Number which help in order your list on UI
    let[postCount,newPostCount] = useState(0)


    useEffect(()=>{

        // filtering your countong of List initial is  = 0

        if(Object.keys(state.listOfOptions).length !== 0){
            const filterArray = Object.keys(state.listOfOptions).map(keys => state.listOfOptions[keys].postNumber);
            const maxValueOfY = Math.max(...filterArray);
            console.log(maxValueOfY,'from alert.js')
            newPostCount(maxValueOfY+1)
        }
    },[state.listOfOptions])


    async function doneOption(value){

        // when press the button save
        if(value === 'done'){
            let userDecisionList = doc(collection(db, "decisions"));
            
            // Push data to firebase FireStore 
            await setDoc(doc(db, "usersDecisions", userDecisionList.id), {
                option1: decidedValue[1].option1,
                option2: decidedValue[1].option2,
                option3: decidedValue[1].option3,
                decidedOpt: decidedValue[1].decidedOpt,
                decisionId: userDecisionList.id,
                postNumber:postCount,
                uid:state.authUser.uid
              })

            //   sending call back function to home.js 
            showModal('done')
        }else{

            //   sending call back function to home.js 
            showModal('edit')

        }
    }
    return(
        // getting data from home.js through callback function
        
        //if false othing will be show
        !decidedValue[0] ?
        null

        // if true, this alert box show on homepage
        :
        <View style={styles.displayPop}>
            <View style={styles.modal}>
                <Text style={{ fontSize: 18, }}>Our App Decide </Text>
                <Text style={{ fontSize: 18, }}>Option <Text style={{ color: '#0377FB', fontWeight: 'bold' }}>{decidedValue[1].decidedOpt}</Text> for you!</Text>
                <View style={styles.ctaDiv}>
                    <TouchableOpacity style={styles.ctaButtonEdit} onPress={()=>{doneOption('edit')}}>
                        <Text style={{ color: "#0377FB", textAlign: 'center', fontWeight: 'bold' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ctaButtonDone} onPress={()=>{doneOption('done')}}>
                        <Text style={{ color: "#fff", textAlign: 'center', fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    displayPop: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        display: 'flex',
        backgroundColor: 'hsla(0, 0%, 23%, 0.8)',
        width: '100%',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
    }, modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    }, ctaDiv: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }, ctaButtonEdit: {
        borderWidth: 2,
        borderColor: '#0377FB',
        color: '#0377FB',
        paddingHorizontal: 25,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 5,
    }, ctaButtonDone: {
        backgroundColor: '#0377FB',
        color: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 5,
    }
})