import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Plan } from '@/types';
import { PaywallCard } from '@/components/PaywallCard';

interface ExploreScreenProps {
  plan: Plan;
  onUpgrade: () => void;
}

const modules = [
  { id: 'estudos', title: 'Estudos guiados', description: 'Planos com perguntas, vídeos e notas comentadas.' },
  { id: 'kids', title: 'Kids', description: 'Histórias ilustradas e jogos bíblicos para crianças.' },
  { id: 'oracao', title: 'Sala de oração', description: 'Pedidos e respostas em comunidade, com moderação.' }
];

export const ExploreScreen: FC<ExploreScreenProps> = ({ plan, onUpgrade }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explorar</Text>
      {modules.map((module) => (
        <View key={module.id} style={styles.module}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>
        </View>
      ))}

      {plan === 'free' && <PaywallCard onUpgrade={onUpgrade} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 12
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#291507',
    marginBottom: 12
  },
  module: {
    backgroundColor: '#f5f0e8',
    borderRadius: 20,
    padding: 18
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#291507'
  },
  moduleDescription: {
    marginTop: 4,
    color: '#4a3b2a'
  }
});
