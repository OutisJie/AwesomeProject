import React from 'react'
import { View, StyleSheet } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Text, Input, Button } from 'react-native-elements'
import { red } from 'ansi-colors';
import { MainHeight, MainWidth } from '../../utils/constant'

const mail_icon = <FontAwesome5 name={'envelope'} solid size={24} />
const pwd_icon = <FontAwesome5 name={'unlock-alt'} solid size={24}/>

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: 'admin',
      pwd: '123456',
      loading: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h1>步尺</Text>
        <Input
          containerStyle={styles.input}
          placeholder='邮箱'
          leftIcon={mail_icon}
        />
        <Input
          containerStyle={styles.input}
          placeholder='密码'
          leftIcon={pwd_icon}
        />
        <Button
          style={styles.btn}
          loading={this.state.loading}
          title='登录'/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 50 , 
    padding: 10,
    width: MainWidth * 0.8
  },
  btn: {
    marginTop: 20,
    width: (MainWidth * 0.6)

  }

})