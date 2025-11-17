import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface AuthPromptProps {
  onSignIn: (provider: 'apple' | 'google' | 'email') => void;
  isAuthenticated: boolean;
  userName?: string;
}

export const AuthPrompt: FC<AuthPromptProps> = ({ onSignIn, isAuthenticated, userName }) => {
  if (isAuthenticated) {
    return (
      <View style={styles.loggedContainer}>
        <Text style={styles.loggedText}>Bem-vindo, {userName}</Text>
        <Text style={styles.subtitle}>Seu progresso será sincronizado automaticamente.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre para salvar seu progresso</Text>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" style={[styles.button, styles.outline]} onPress={() => onSignIn('apple')}>
          <Text style={styles.buttonText}> Apple</Text>
        </Pressable>
        <Pressable accessibilityRole="button" style={[styles.button, styles.outline]} onPress={() => onSignIn('google')}>
          <Text style={styles.buttonText}>G Google</Text>
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.button} onPress={() => onSignIn('email')}>
          <Text style={[styles.buttonText, styles.darkText]}>E-mail</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1c1208'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f7c948',
    alignItems: 'center'
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0c4b7'
  },
  buttonText: {
    fontWeight: '600',
    color: '#1c1208'
  },
  darkText: {
    color: '#291507'
  },
  loggedContainer: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f5f0e8',
    marginBottom: 16
  },
  loggedText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#291507'
  },
  subtitle: {
    marginTop: 4,
    color: '#4a3b2a'
  }
});
