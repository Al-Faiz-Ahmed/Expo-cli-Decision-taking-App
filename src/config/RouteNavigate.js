import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '../context/context';
import Octicon from 'react-native-vector-icons/Octicons';
import Home from '../screens/home';
import About from '../screens/about';
import { auth, db, getDoc, doc, onAuthStateChanged } from './firebase';
import Authentic from '../screens/auth';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function NavigationRoute() {
  const { state, dispatch } = useContext(GlobalContext);
  const [fetchUser, getFetchedUser] = useState(false)
  const [authRoute, getauthRoute] = useState(false)

  useEffect(() => {
    if (state.authUser.uid !== undefined) {
      getFetchedUser(true)
    }
  }, [state.authUser])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          let { uid, displayName, email, photoURL } = docSnap.data()
          dispatch({
            type: 'USER_and_Route_FOUND', 
            payload: { uid: uid, displayName: displayName, email: email, photoURL: photoURL }
          })
          getauthRoute(true)
        }
      } else if (user === null) {
        dispatch({
          type: 'AUTH_ROUTE_FOUND',
        })
      }
    })
  }, [])


  return (

    <NavigationContainer>
      {
        fetchUser ?
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home';
                } else if (route.name === 'About') {
                  iconName = focused ? 'list-unordered' : 'list-unordered';
                }

                // You can return any component that you like here!
                return <Octicon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#0377FB',
              tabBarInactiveTintColor: 'gray',

            })}
          >

            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="About" component={About} />
          </Tab.Navigator> :

          <Stack.Navigator
            screenOptions={() => ({
              headerShown: false,
            })}
          >
            <Stack.Screen name="Auth" component={Authentic} />
          </Stack.Navigator>
      }


    </NavigationContainer>
  )
}
