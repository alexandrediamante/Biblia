import { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Plan } from '@/types';
import { PaywallCard } from '@/components/PaywallCard';

interface AudioScreenProps {
  plan: Plan;
  onUpgrade: () => void;
}

const tracks = [
  { id: 'ps-27', title: 'Salmo 27 — coragem em meio ao medo', duration: '08:32' },
  { id: 'jo-14', title: 'João 14 — O Consolador', duration: '12:41' },
  { id: 'hb-11', title: 'Hebreus 11 — Fé inabalável', duration: '15:55' }
];

export const AudioScreen: FC<AudioScreenProps> = ({ plan, onUpgrade }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ouvir</Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.track, index === 0 && styles.firstTrack]}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.trackSubtitle}>{item.duration}</Text>
          </View>
        )}
      />

      {plan === 'free' && <PaywallCard onUpgrade={onUpgrade} />}
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
  track: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12
  },
  firstTrack: {
    borderWidth: 2,
    borderColor: '#f7c948'
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#291507'
  },
  trackSubtitle: {
    marginTop: 4,
    color: '#4a3b2a'
  }
});
