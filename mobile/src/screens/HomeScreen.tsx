import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Plan } from '@/types';
import { PaywallCard } from '@/components/PaywallCard';
import { AuthPrompt } from '@/components/AuthPrompt';

interface HomeScreenProps {
  plan: Plan;
  isAuthenticated: boolean;
  userName?: string;
  onAuthenticate: (provider: 'apple' | 'google' | 'email') => void;
  onUpgrade: () => void;
}

export const HomeScreen: FC<HomeScreenProps> = ({
  plan,
  isAuthenticated,
  userName,
  onAuthenticate,
  onUpgrade
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Hoje</Text>
      <Text style={styles.subtitle}>Inicie o plano "Semeando Esperança" e receba lembretes pela manhã.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Devocional</Text>
        <Text style={styles.cardText}>"Um novo coração" — 12 min · Texto + Áudio</Text>
      </View>

      <AuthPrompt isAuthenticated={isAuthenticated} onSignIn={onAuthenticate} userName={userName} />

      {plan === 'free' ? (
        <PaywallCard onUpgrade={onUpgrade} />
      ) : (
        <View style={styles.premiumCard}>
          <Text style={styles.cardTitle}>Obrigado por apoiar</Text>
          <Text style={styles.cardText}>Todos os módulos foram desbloqueados. Explore Estudos, Ler, Ouvir e Perfil.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8'
  },
  content: {
    padding: 20,
    paddingBottom: 80
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#291507'
  },
  subtitle: {
    marginTop: 4,
    color: '#4a3b2a',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3
  },
  premiumCard: {
    backgroundColor: '#291507',
    padding: 20,
    borderRadius: 20,
    marginTop: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#291507',
    marginBottom: 4
  },
  cardText: {
    color: '#4a3b2a'
  }
});
