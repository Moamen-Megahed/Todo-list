// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './screens/Home';
// import TodoDetails from './screens/TodoDetails';
// import { Provider } from 'react-redux';
// import store from './redux/store';


// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="TodoApp" component={Home} />
//           <Stack.Screen name="TodoDetails" component={TodoDetails} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import TodoDetails from './screens/TodoDetails';
import CompletedTasks from './screens/CompletedTasks'; // تأكد من إنشاء هذه الشاشة
import { Provider } from 'react-redux';
import store from './redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodoApp" component={Home} />
      <Stack.Screen name="TodoDetails" component={TodoDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'CompletedTasks') {
                iconName = 'checkmark-done-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ea',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#000' }, // dark theme
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
          <Tab.Screen name="CompletedTasks" component={CompletedTasks} options={{ title: 'Completed' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
