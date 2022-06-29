import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import imagex from './assets/eco-light-off.png';
import Torch from 'react-native-torch'; //controla flash do celular
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(true);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //quando o celular for chacoalhado, mudaremos o toggle
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });

    //Essa func vai ser chamada quando o componente for ser desmontado
    return () => subscription.remove();
  }, []);

  return (
  <View style={toggle ? style.containerLight : style.container}>
    <TouchableOpacity onPress={handleChangeToggle}>
      <Image 
      style = {toggle ? style.lightingOn : style.lightingOff} source={toggle ? require('./assets/eco-light.png') : require('./assets/eco-light-off.png')
      } />
      <Image 
      style = {style.dioLogo} source={toggle ? require('./assets/logo-dio.png') : require('./assets/logo-dio-white.png')
      } />
    </TouchableOpacity>
  </View>
);
};

export default App;

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },

});