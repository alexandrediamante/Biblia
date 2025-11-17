import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReadingScreen } from '@/screens/ReadingScreen';
import { AudioScreen } from '@/screens/AudioScreen';
import { ExploreScreen } from '@/screens/ExploreScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { Plan, UserProfile } from '@/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  const [plan, setPlan] = useState<Plan>('free');
  const [user, setUser] = useState<UserProfile | null>(null);

  const isAuthenticated = Boolean(user);
  const userName = user?.name;

  const navigationTheme = useMemo(
    () => ({
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        background: '#f5f0e8',
        card: '#ffffff',
        text: '#291507',
        primary: '#291507',
        border: '#f0e7d7'
      }
    }),
    []
  );

  const handleAuthenticate = (provider: 'apple' | 'google' | 'email') => {
    // Placeholder auth flow: attach provider name to profile
    setUser({ id: provider, name: `Usuário via ${provider}`, plan });
  };

  const handleUpgrade = () => {
    setPlan('premium');
    setUser((prev) => (prev ? { ...prev, plan: 'premium' } : prev));
  };

  const handleSignOut = () => {
    setUser(null);
    setPlan('free');
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#291507',
            tabBarInactiveTintColor: '#9c8a7a',
            tabBarStyle: { backgroundColor: '#fff' },
            tabBarIcon: ({ color, size }) => {
              const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
                Hoje: 'sunny',
                Ler: 'book',
                Ouvir: 'musical-notes',
                Explorar: 'compass',
                Perfil: 'person'
              };
              const iconName = icons[route.name] ?? 'ellipse';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Hoje">
            {() => (
              <HomeScreen
                isAuthenticated={isAuthenticated}
                plan={plan}
                userName={userName}
                onAuthenticate={handleAuthenticate}
                onUpgrade={handleUpgrade}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Ler">
            {() => <ReadingScreen plan={plan} onUpgrade={handleUpgrade} />}
          </Tab.Screen>
          <Tab.Screen name="Ouvir">
            {() => <AudioScreen plan={plan} onUpgrade={handleUpgrade} />}
          </Tab.Screen>
          <Tab.Screen name="Explorar">
            {() => <ExploreScreen plan={plan} onUpgrade={handleUpgrade} />}
          </Tab.Screen>
          <Tab.Screen name="Perfil">
            {() => <ProfileScreen user={user} plan={plan} onUpgrade={handleUpgrade} onSignOut={handleSignOut} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
