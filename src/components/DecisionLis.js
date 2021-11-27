import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Share, ScrollView } from 'react-native';
import Ficon from 'react-native-vector-icons/FontAwesome5'


export default function DecisionList({option1,option2,option3,decidedOpt}) {
   
    // share api from React Native
    const onShare = async () => {
        try {
            const result = await Share.share({ 
                message: `From Options \n\n1. ${option1} \n2. ${option2} \n3. ${option3} \n\nOur App Decided the Option \n\n *"${decidedOpt}"* `,
            },{
            });
        
        } catch (error) {
            alert(error.message);
        }
    };
   
    return (

        <View style={styles.list}>

        {/* blue line in the left side of liSt */}
        <View style={styles.blueLine}></View>


        {/* Buuton to share your decision to any platform but  whatsapp recommended */}
        <View style={{ position: 'absolute', right: 0, top: 0, }}>            
            <TouchableOpacity onPress={onShare} style={{ width: 45, height: 45, borderBottomLeftRadius: 12, backgroundColor: '#0377FB' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Ficon name='share' color='white' size={20} />
                </View>
            </TouchableOpacity>
        </View>

        
        <View style={{ paddingHorizontal: 20, paddingVertical: 5 }} >

            <View style={{ marginTop: 6 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#595959' }}>From Options</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ position: 'relative', marginStart: 10 }}>
                        <View style={{ position: 'absolute', left: 0, top: '25.5%', borderRadius: 1000, width: 8, height: 8, backgroundColor: '#7D7D7D' }}></View>
                        <Text style={{ marginStart: 10, color: '#7D7D7D' }}> {option1}</Text>
                    </View><View style={{ position: 'relative', marginStart: 10 }}>
                        <View style={{ position: 'absolute', left: 0, top: '25.5%', borderRadius: 1000, width: 8, height: 8, backgroundColor: '#7D7D7D' }}></View>
                        <Text style={{ marginStart: 10, color: '#7D7D7D' }}> {option2}</Text>
                    </View><View style={{ position: 'relative', marginStart: 10 }}>
                        <View style={{ position: 'absolute', left: 0, top: '25.5%', borderRadius: 1000, width: 8, height: 8, backgroundColor: '#7D7D7D' }}></View>
                        <Text style={{ marginStart: 10, color: '#7D7D7D' }}> {option3}</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#595959', }}>App Decided</Text>
                <View style={{ position: 'relative', marginTop: 5 }}>
                    <View style={{ position: 'absolute', left: 10, top: '25.5%', borderRadius: 1000, width: 8, height: 8, backgroundColor: '#0377FB' }}></View>
                    <Text style={{ marginStart: 25, color: '#0377FB', fontWeight: '700' }}>{decidedOpt}</Text>
                </View>
            </View>
        </View>

    </View>)
}

const styles = StyleSheet.create({
    list: {
        overflow: 'hidden',
        borderColor: '#0377FB',
        borderWidth: 1,
        position: 'relative',
        borderRadius: 12,
        marginTop: 20,
    },
    blueLine: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 8,
        height: '100%',
        backgroundColor: '#0377FB'
    }

})