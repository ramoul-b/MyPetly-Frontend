// src/screens/Register.js
import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';
import Icon from 'react-native-vector-icons/Ionicons';
import RegisterBackground from '../assets/imgs/bg.png';

export default function Register() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  // États pour les champs du formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [agree, setAgree] = useState(false);

  // État local pour les erreurs de validation du formulaire
  const [formError, setFormError] = useState('');

  const handleRegister = () => {
    // Réinitialiser l'erreur locale
    setFormError("");

    // Vérifier que tous les champs sont remplis
    if (!name || !email || !password || !passwordConfirmation) {
      setFormError("Tous les champs sont requis.");
      return;
    }

    // Vérification du format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Vérifier que le mot de passe correspond à sa confirmation
    if (password !== passwordConfirmation) {
      setFormError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Vérifier que l'utilisateur a accepté les conditions
    if (!agree) {
      setFormError("Vous devez accepter les conditions.");
      return;
    }

    // Si toutes les validations passent, dispatch de l'action d'inscription
    dispatch(registerUser(name, email, password, passwordConfirmation));
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={RegisterBackground} style={styles.background}>
        <KeyboardAvoidingView style={styles.formWrapper} behavior="padding" enabled>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Register</Text>
            {(formError || error) && (
              <Text style={styles.errorText}>{formError || error}</Text>
            )}
            <Input
              placeholder="Name"
              leftIcon={<Icon name="person-outline" size={20} color="black" />}
              containerStyle={styles.inputContainer}
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email"
              leftIcon={<Icon name="mail-outline" size={20} color="black" />}
              containerStyle={styles.inputContainer}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              leftIcon={<Icon name="lock-open-outline" size={20} color="black" />}
              containerStyle={styles.inputContainer}
              value={password}
              onChangeText={setPassword}
            />
            {/* Champ de confirmation du mot de passe */}
            <Input
              placeholder="Confirm Password"
              secureTextEntry
              leftIcon={<Icon name="lock-closed-outline" size={20} color="black" />}
              containerStyle={styles.inputContainer}
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
            {/* CheckBox personnalisé */}
            <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkboxContainer}>
              <View style={[styles.checkbox, agree && styles.checked]} />
              <Text style={styles.checkboxLabel}>I agree with the Privacy Policy</Text>
            </TouchableOpacity>
            <Button
              title={loading ? <ActivityIndicator color="#fff" /> : "CREATE ACCOUNT"}
              buttonStyle={styles.createButton}
              onPress={handleRegister}
              disabled={loading}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Already have an account? Login</Text>
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
  createButton: { backgroundColor: '#5E72E4', borderRadius: 4 },
  loginLink: { marginTop: 10, textAlign: 'center', color: '#5E72E4', textDecorationLine: 'underline' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 3, borderWidth: 2, borderColor: '#5E72E4', marginRight: 10 },
  checked: { backgroundColor: '#5E72E4' },
  checkboxLabel: { fontSize: 16, color: '#333' },
});
