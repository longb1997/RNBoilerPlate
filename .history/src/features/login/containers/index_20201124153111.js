import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import * as loginActions from '../actions';
import styles from './styles';

export default function Login() {
  const id = useSelector((state) => state.loginReducer.id);
  const dispatch = useDispatch();
  const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login Status : {id}</Text>

      <TextInput
        label="Username"
        value={user.username}
        onChangeText={(text) => setUser({...user, username: text})}
      />

      <TextInput
        label="Password"
        value={user.password}
        onChangeText={(text) => setUser({...user, password: text})}
      />
      <Button icon="login" mode="outlined" onPress={onLogin}>
        Login
      </Button>
    </View>
  );
}
