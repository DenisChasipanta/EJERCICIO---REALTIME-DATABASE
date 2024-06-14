import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/navigator/StackNavigator';
import { StyleSheet, View } from 'react-native';


export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={styles.container}>
        <StackNavigator/>
        </View>
      </PaperProvider>
    </NavigationContainer>
  )
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', // Cambia este color al que prefieras
  },
});
export default App;

