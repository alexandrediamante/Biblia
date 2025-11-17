import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Plan, UserProfile } from '@/types';

interface ProfileScreenProps {
  user: UserProfile | null;
  plan: Plan;
  onUpgrade: () => void;
  onSignOut: () => void;
}

export const ProfileScreen: FC<ProfileScreenProps> = ({ user, plan, onUpgrade, onSignOut }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>Plano: {plan === 'premium' ? 'Premium vitalício' : 'Free limitado'}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.subtitle}>Entre para acessar histórico, notas e sincronização.</Text>
        </View>
      )}

      {plan === 'free' ? (
        <Pressable style={styles.primaryButton} onPress={onUpgrade}>
          <Text style={styles.primaryButtonText}>Fazer upgrade</Text>
        </Pressable>
      ) : (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Premium ativo</Text>
        </View>
      )}

      {user && (
        <Pressable style={styles.secondaryButton} onPress={onSignOut}>
          <Text style={styles.secondaryButtonText}>Sair</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f0e8'
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#291507',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#291507'
  },
  subtitle: {
    marginTop: 4,
    color: '#4a3b2a'
  },
  primaryButton: {
    backgroundColor: '#291507',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#f5f0e8',
    fontWeight: '600'
  },
  badge: {
    backgroundColor: '#d0f0c0',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center'
  },
  badgeText: {
    color: '#1d6834',
    fontWeight: '600'
  },
  secondaryButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#b39b84',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#291507',
    fontWeight: '600'
  }
});
