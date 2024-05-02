import 'react-native-gesture-handler'; // Must be at top always
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons'


import LoginScreen from './LoginScreen';
import NewPasswordScreen from './NewPasswordScreen'
import GeneratePassword from './GeneratePassword';
import updateDetails from './updateDetails'
import ViewPasswords from './ViewPasswords';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Plus = ({ focused, color, size }) => <Ionicons name='add-circle' size={size} color={color} />
const Update = ({ focused, color, size }) => <Ionicons name='refresh' size={size} color={color} />
const View = ({ focused, color, size }) => <Ionicons name='eye' size={size} color={color} />
const Generate = ({ focused, color, size }) => <Ionicons name='key' size={size} color={color} />

const Tabs = () => {

  let [fontsLoaded] = useFonts(
    {
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
    }
  )

  return (
    <Drawer.Navigator
      initialRouteName='View All Passwords'
      screenOptions={{
        drawerStyle: { backgroundColor: '#262626' },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
      }}
    >
      <Drawer.Screen name="Store Password" component={NewPasswordScreen} options={{ title: 'Store Password', drawerIcon: Plus }} />
      <Drawer.Screen name="Update User Details" component={updateDetails} options={{ title: 'Update User Details', drawerIcon: Update }} />
      <Drawer.Screen name="View All Passwords" component={ViewPasswords} options={{ title: 'View All Passwords', drawerIcon: View }} />
      <Drawer.Screen name="Generate Password" component={GeneratePassword} options={{ title: "Generate Password", drawerIcon: Generate }} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Tabs component acts like a middlegroud 

export default App;