import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer, NavigationController } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PruebaProp from './src/PruebaProp';
import PruebaState from './src/PruebaState';
function HomeScreen({ route, navigation }) {
  const [nombrePortada, setNombrePortada] = useState("Juan");
  React.useEffect(() => {
    if (route.params?.post) {
      console.log(route.params.post);
    }
  }, [route.params?.post]);


  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center'
    }}>
      <Text>Home</Text>
      <PruebaProp nombre="Jordi" />
      <PruebaState stateChanger={setNombrePortada} nombre={nombrePortada} />
      <Button title="Create Post" onPress={() => navigation.navigate("CreatePost")} />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details", {
        //itemId: 88,
        nombre: "Jordi"
      })} />
    </View>
  );
}
function CreatePostScreen({ route, navigation }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="Wha's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button title="Done" onPress={() => {
        navigation.navigate({
          name: 'Home',
          params: { post: postText },
          merge: true,
        });
      }}
      />
    </>
  );
}

function DetailScreen({ route, navigation }) {
  const { itemId, nombre } = route.params;
  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center'
    }}>
      <Text>Details</Text>
      <Text>IdItem: {JSON.stringify(itemId)}</Text>
      <Text>Nombre: {JSON.stringify(nombre)}</Text>
      <Button title="Go to Details .. again" onPress={() => navigation.navigate("Details", {
        itemId: Math.floor(Math.random() * 100),
      })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()} />
    </View>
  );
}
const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Details" component={DetailScreen} initialParams={{ itemId: 99 }} options={{ title: 'Detalles' }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

