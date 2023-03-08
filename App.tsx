import { SafeAreaView, ScrollView, StyleSheet, Text, View , TouchableOpacity,TextInput} from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'



const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,'Length should be greater than 4')
  .max(16,'Length should be less than 16')
  .required('Length is required')
})

export default function App() {
  const [password,setPassword] =  useState('')
  const [isPassGenerated,setIsPassGenerated] = useState(false)
  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,SetUpperCase] = useState(false)   
  const [number,setNumber] = useState(false)
  const [symbols,setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number)=>{
    let characterList = ''
    
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwzyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'

    if(lowerCase){
      characterList += lowerCaseChars
    }
    if(upperCase){
      characterList += upperCaseChars
    }
    if(number){
      characterList += digitChars
    }
    if(symbols){
      characterList += specialChars
    }
    console.log(characterList)
    const passwordResult = createPassword(characterList,passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters:string,passwordLength:number)=>{
    let result = ''
    for (let i = 0; i < passwordLength ; i++) {
      const characterIndex = Math.round(Math.random()* characters.length)
      result += characters.charAt(characterIndex)
    }
    return result;
  }

  const resetPasswordState =()=>{
    setIsPassGenerated(false)
    setPassword('')
    setLowerCase(true)
    setNumber(false)
    setSymbols(false)
    SetUpperCase(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style = {styles.appContainer}>
        <View style ={styles.formContainer}> 
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength:'' }}
            validationSchema = {PasswordSchema}
            onSubmit={(values)=>{
              console.log(values)
              generatePasswordString(+values.passwordLength)
            }}
          >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
         <>
          <View style = {styles.inputWrapper}>
            <View style = {styles.inputColumn}>
              <Text style= {styles.heading}>Password Length</Text>
              {
                touched.passwordLength && errors.passwordLength &&(
                  <Text style = {styles.errorText}>
                    {errors.passwordLength}
                  </Text>
                )
              }
            </View>
              
            <TextInput 
                style = {styles.inputStyle}
                value ={values.passwordLength}
                onChangeText ={handleChange('passwordLength')}
                placeholder="Ex. 8"
                keyboardType='numeric'
                />
          </View>
          <View style = {styles.inputWrapper}>
            <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={lowerCase}
            onPress = {() => setLowerCase(!lowerCase)}
            fillColor ="#29AB87"
            /> 
          </View>
          <View style = {styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={upperCase}
            onPress = {() => SetUpperCase(!upperCase)}
            fillColor ="#29AB87"
            /> 
          </View>
          <View style = {styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={number}
            onPress = {() => setNumber(!number)}
            fillColor ="#29AB87"
            /> 
          </View>
          <View style = {styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={symbols}
            onPress = {() => setSymbols(!symbols)}
            fillColor ="#29AB87"
            /> 
          </View>

          <View style ={styles.formActions}>
            <TouchableOpacity
            disabled = {!isValid}
            style = {styles.primaryButton}
            onPress = {handleSubmit}
            >
              <Text style = {styles.primaryBtnTxt}>Generate Password</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style = {styles.secondaryBtn}
            onPress = {()=>{
              handleReset();
              resetPasswordState();
            }}
            >
              <Text style = {styles.secondaryBtnTxt}>Reset</Text>
            </TouchableOpacity> 

          </View>
          </>
           )}
          </Formik>
        </View>
        {
          isPassGenerated?(
            <View style = {[styles.card, styles.cardElevated]}>
              <Text style = {styles.subTitle}>Result: </Text>
              <Text style = {styles.description}>Long Press to copy</Text>
              <Text style = {styles.generatedPassword} selectable>{password}</Text>
            </View>
          ):null
        }
        <View style = {styles.socialLink}>
          <TouchableOpacity>
            <Text>
              Follow me on Github
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1, 
  },
  formContainer:{
    margin:8,
    padding:8,
  },
  title:{
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15
  },
  inputWrapper:{
    marginBottom:15,
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection:'row',
  },
  formActions:{
    flexDirection:'row',
    justifyContent:'center'
  },
  inputColumn:{
    flexDirection: 'column'
  },
  heading:{
    
    fontSize: 15,
  },
  errorText:{
    fontSize: 12,
    color: '#ff0d10',
  },
  inputStyle:{
    padding:8,
    width: '30%',
    borderWidth: 1,
    borderRadius:4,
    borderColor: '#16213e'
  },
  primaryButton:{
    width:120,
    padding: 10,
    borderRadius: 8,
    marginHorizonta:8,
    backgroundColor:'#5DA3FA'
  },
  primaryBtnTxt :{
    color:'#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  secondaryBtn :{
    width:120,
    padding:10,
    borderRadius:8,
    marginHorizontal:8,
    backgroundColor: '#CAD5E2'
  },
  secondaryBtnTxt :{
    textAlign: 'center',
    fontWeight: '700'
  },
  card:{
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated:{
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  subTitle:{
    
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description:{
    
    color: '#758283',
    marginBottom: 8,
  },
  generatedPassword:{
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
  socialLink:{
    flex:1,
    alignSelf: 'center',
    backgroundColor: '#50DBB4',
    width: 240,
    padding:8,
    borderRadius: 6,
  marginTop:15,
  
  }

})