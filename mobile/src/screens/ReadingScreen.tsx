import { FC, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { highlightedVerses } from '@/data/verses';
import { useReadingTimer } from '@/hooks/useReadingTimer';
import { Plan } from '@/types';
import { PaywallCard } from '@/components/PaywallCard';

const FREE_LIMIT_MS = 10_000;

interface ReadingScreenProps {
  plan: Plan;
  onUpgrade: () => void;
}

export const ReadingScreen: FC<ReadingScreenProps> = ({ plan, onUpgrade }) => {
  const [verseIndex, setVerseIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const verses = highlightedVerses;
  const currentVerse = verses[verseIndex];
  const limit = plan === 'free' ? FREE_LIMIT_MS : null;
  const { isBlocked, remainingMs, start, reset } = useReadingTimer(limit);

  const formattedRemaining = useMemo(() => {
    if (!limit || !hasStarted) {
      return null;
    }
    return `${(remainingMs / 1000).toFixed(0)}s restantes`; // simple
  }, [limit, hasStarted, remainingMs]);

  const handleStart = () => {
    setHasStarted(true);
    if (plan === 'free') {
      start();
    }
  };

  const handleNext = () => {
    const nextIndex = (verseIndex + 1) % verses.length;
    setVerseIndex(nextIndex);
    if (plan === 'free') {
      start();
    }
  };

  useEffect(() => {
    if (plan === 'premium') {
      reset();
      setHasStarted(false);
    }
  }, [plan, reset]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Leitura</Text>
      <Text style={styles.reference}>{currentVerse.reference}</Text>
      <Text style={styles.text}>{currentVerse.text}</Text>

      {!hasStarted ? (
        <Pressable accessibilityRole="button" onPress={handleStart} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Começar leitura guiada</Text>
        </Pressable>
      ) : (
        <Pressable accessibilityRole="button" onPress={handleNext} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Próximo trecho</Text>
        </Pressable>
      )}

      {formattedRemaining && plan === 'free' && !isBlocked && (
        <Text style={styles.timerLabel}>Tempo livre: {formattedRemaining}</Text>
      )}

      {isBlocked && plan === 'free' && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Seu tempo gratuito terminou</Text>
          <Text style={styles.overlayText}>
            Continue de onde parou desbloqueando o plano premium com pagamento único. Seus estudos e notas serão sincronizados em
            todos os dispositivos.
          </Text>
          <PaywallCard onUpgrade={onUpgrade} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: '100%'
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#291507',
    marginBottom: 8
  },
  reference: {
    fontWeight: '600',
    fontSize: 18,
    color: '#6b4c2a',
    marginBottom: 12
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
    color: '#1c1208',
    marginBottom: 24
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
  secondaryButton: {
    backgroundColor: '#f5f0e8',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#291507',
    fontWeight: '600'
  },
  timerLabel: {
    marginTop: 12,
    color: '#b55332',
    fontWeight: '600'
  },
  overlay: {
    marginTop: 20,
    backgroundColor: '#fbeee2',
    padding: 20,
    borderRadius: 20
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#291507',
    marginBottom: 8
  },
  overlayText: {
    color: '#4a3b2a'
  }
});
