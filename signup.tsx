
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useUser, UserType } from '@/contexts/UserContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function SignupScreen() {
  const { setUserProfile } = useUser();
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const userTypes = [
    {
      type: 'under18' as UserType,
      title: 'Under 18',
      description: 'Financial basics for young learners',
      icon: 'person.fill',
      color: '#007bff',
    },
    {
      type: 'adult' as UserType,
      title: 'Adult',
      description: 'Comprehensive financial management',
      icon: 'briefcase.fill',
      color: '#28a745',
    },
    {
      type: 'student' as UserType,
      title: 'Student',
      description: 'College & varsity financial guidance',
      icon: 'book.fill',
      color: '#ffc107',
    },
  ];

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
    setStep(2);
  };

  const handleComplete = () => {
    if (name.trim() && email.trim() && selectedUserType) {
      setUserProfile({
        userType: selectedUserType,
        name: name.trim(),
        email: email.trim(),
        hasCompletedOnboarding: true,
      });
      router.replace('/(tabs)/(home)/');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {step === 1 ? (
            <Animated.View entering={FadeInUp.duration(600)} style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.logo}>NovaAi</Text>
                <Text style={styles.title}>Welcome to NovaAi</Text>
                <Text style={styles.subtitle}>
                  Your personal financial assistant for South Africa
                </Text>
              </View>

              <View style={styles.userTypeContainer}>
                <Text style={styles.sectionTitle}>I am a...</Text>
                {userTypes.map((item, index) => (
                  <Animated.View
                    key={item.type}
                    entering={FadeInDown.delay(index * 100).duration(500)}
                  >
                    <TouchableOpacity
                      style={[styles.userTypeCard, { borderColor: item.color }]}
                      onPress={() => handleUserTypeSelect(item.type)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                        <IconSymbol name={item.icon} size={32} color="#ffffff" />
                      </View>
                      <View style={styles.userTypeContent}>
                        <Text style={styles.userTypeTitle}>{item.title}</Text>
                        <Text style={styles.userTypeDescription}>{item.description}</Text>
                      </View>
                      <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInUp.duration(600)} style={styles.content}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(1)}
                activeOpacity={0.7}
              >
                <IconSymbol name="chevron.left" size={24} color={colors.primary} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <View style={styles.header}>
                <Text style={styles.title}>Complete Your Profile</Text>
                <Text style={styles.subtitle}>
                  Tell us a bit about yourself to personalize your experience
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.completeButton,
                    (!name.trim() || !email.trim()) && styles.completeButtonDisabled,
                  ]}
                  onPress={handleComplete}
                  disabled={!name.trim() || !email.trim()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.completeButtonText}>Get Started</Text>
                  <IconSymbol name="arrow.right" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  userTypeContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  userTypeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userTypeContent: {
    flex: 1,
  },
  userTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  userTypeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  completeButtonDisabled: {
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});
