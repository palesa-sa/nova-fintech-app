
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useUser } from '@/contexts/UserContext';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const { userProfile } = useUser();

  const features = [
    {
      title: 'AI Chatbot',
      description: 'Get instant answers to your financial questions',
      icon: 'message.fill',
      color: colors.primary,
      route: '/(tabs)/chatbot',
    },
    {
      title: 'Financial Education',
      description: 'Learn about finances, SARS, and money management',
      icon: 'book.fill',
      color: colors.accent,
      route: '/(tabs)/education',
    },
    {
      title: 'Budget Tracker',
      description: 'Track your income and expenses',
      icon: 'chart.bar.fill',
      color: '#ffc107',
      route: '/(tabs)/budget',
    },
    {
      title: 'Savings Goals',
      description: 'Set and achieve your financial goals',
      icon: 'target',
      color: '#28a745',
      route: '/(tabs)/savings',
    },
  ];

  const quickActions = [
    {
      title: 'Tax Calculator',
      icon: 'calculator',
      color: colors.primary,
    },
    {
      title: 'Currency Converter',
      icon: 'dollarsign.circle.fill',
      color: colors.accent,
    },
    {
      title: 'Financial Tips',
      icon: 'lightbulb.fill',
      color: '#ffc107',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {userProfile?.name || 'Guest'}! 👋</Text>
            <Text style={styles.subtitle}>Welcome to NovaAi</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => console.log('Notifications pressed')}
          >
            <IconSymbol name="bell.fill" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Animated.View
                key={feature.title}
                entering={FadeInDown.delay(index * 100).duration(500)}
                style={styles.featureCardWrapper}
              >
                <TouchableOpacity
                  style={styles.featureCard}
                  onPress={() => router.push(feature.route as any)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                    <IconSymbol name={feature.icon} size={28} color="#ffffff" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.title}
                entering={FadeInDown.delay(300 + index * 100).duration(500)}
              >
                <TouchableOpacity
                  style={styles.quickActionCard}
                  onPress={() => console.log(`${action.title} pressed`)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <IconSymbol name={action.icon} size={24} color="#ffffff" />
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.primary} />
              <Text style={styles.tipTitle}>Financial Tip of the Day</Text>
            </View>
            <Text style={styles.tipText}>
              Start building an emergency fund with at least 3-6 months of living expenses. 
              This provides a financial safety net for unexpected situations.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCardWrapper: {
    width: '48%',
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffd54f',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
