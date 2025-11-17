import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PaywallCardProps {
  onUpgrade: () => void;
}

export const PaywallCard: FC<PaywallCardProps> = ({ onUpgrade }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Plano Premium — acesso vitalício</Text>
      <Text style={styles.subtitle}>
        Desbloqueie leitura ilimitada, áudio, downloads e os planos guiados completos com um único pagamento.
      </Text>
      <Pressable accessibilityRole="button" onPress={onUpgrade} style={styles.button}>
        <Text style={styles.buttonText}>Quero desbloquear tudo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#291507',
    marginTop: 16
  },
  title: {
    color: '#f5f0e8',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  subtitle: {
    color: '#f5f0e8',
    opacity: 0.8,
    lineHeight: 20
  },
  button: {
    backgroundColor: '#f7c948',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: '600',
    color: '#291507'
  }
});
