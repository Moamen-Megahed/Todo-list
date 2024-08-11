import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import TodoDetails from './screens/TodoDetails';
import { Provider } from 'react-redux';
import store from './redux/store';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TodoApp" component={Home} />
          <Stack.Screen name="TodoDetails" component={TodoDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
