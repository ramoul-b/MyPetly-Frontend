import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBackground from '../assets/imgs/bg.png';
import { loginUser } from '../redux/actions/authActions';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      console.log("🔄 Utilisateur authentifié, redirection via le RootStack...");
      // Laissez Redux gérer la navigation via le RootStackScreen.
      // Vous pouvez également, si vous le souhaitez, utiliser :
      // navigation.replace("MainStack");
      // Mais attention : "MainStack" est le nom déclaré dans RootStack, pas "Home".
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    dispatch(loginUser(email, password));
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={LoginBackground} style={styles.background}>
        <KeyboardAvoidingView style={styles.formWrapper} behavior="padding" enabled>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <AppInput
              placeholder="Email"
              leftIcon={<Icon name="mail-outline" size={20} color="black" />}
              containerStyle={styles.inputContainer}
              value={email}
              onChangeText={setEmail}
            />
            <AppInput
              placeholder="Password"
              secureTextEntry
              leftIcon={<Icon name="lock-closed-outline" size={20} color="black" />}
              containerStyle={styles.inputContainer}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => console.log('Forgot Password tapped')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <AppButton
              title={loading ? <ActivityIndicator color="#fff" /> : "LOGIN"}
              buttonStyle={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%', resizeMode: 'cover' },
  formWrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  formContainer: { backgroundColor: "rgba(244,245,247, 0.9)", borderRadius: 4, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  inputContainer: { marginBottom: 15 },
  forgotPassword: { marginBottom: 20, textAlign: 'right', color: '#5E72E4', textDecorationLine: 'underline' },
  loginButton: { backgroundColor: '#5E72E4', borderRadius: 4, paddingVertical: 12 },
  registerLink: { marginTop: 10, textAlign: 'center', color: '#5E72E4', textDecorationLine: 'underline' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
