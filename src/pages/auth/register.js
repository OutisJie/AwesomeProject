import React from 'react'
import { View, Text } from 'react-native'

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      mail: '',
      phone: '',
      pwd: '',
    }
  }

  render () {
    return (
      <View>
        <Text>Register</Text>
      </View>
    )
  }
}