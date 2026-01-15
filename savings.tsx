
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  deadline: string;
}

export default function SavingsScreen() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 30000,
      currentAmount: 12000,
      icon: 'shield.fill',
      color: colors.primary,
      deadline: 'Dec 2024',
    },
    {
      id: '2',
      title: 'New Laptop',
      targetAmount: 15000,
      currentAmount: 8500,
      icon: 'laptopcomputer',
      color: colors.accent,
      deadline: 'Sep 2024',
    },
    {
      id: '3',
      title: 'Vacation',
      targetAmount: 20000,
      currentAmount: 5000,
      icon: 'airplane',
      color: '#ffc107',
      deadline: 'Jan 2025',
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [contributeAmount, setContributeAmount] = useState('');

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  const handleContribute = () => {
    if (selectedGoal && contributeAmount) {
      const amount = parseFloat(contributeAmount);
      setGoals(
        goals.map(goal =>
          goal.id === selectedGoal.id
            ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
            : goal
        )
      );
      setContributeAmount('');
      setShowContributeModal(false);
      setSelectedGoal(null);
    }
  };

  const openContributeModal = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setShowContributeModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Savings Goals</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.7}
          >
            <IconSymbol name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Total Savings Progress</Text>
            <Text style={styles.overviewAmount}>
              R{totalSaved.toFixed(2)} / R{totalTarget.toFixed(2)}
            </Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${overallProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{overallProgress.toFixed(1)}% Complete</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Goals</Text>
            {goals.map((goal, index) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const remaining = goal.targetAmount - goal.currentAmount;

              return (
                <Animated.View key={goal.id} entering={FadeInDown.delay(index * 100).duration(500)}>
                  <View style={styles.goalCard}>
                    <View style={styles.goalHeader}>
                      <View style={[styles.goalIcon, { backgroundColor: goal.color }]}>
                        <IconSymbol name={goal.icon} size={28} color="#ffffff" />
                      </View>
                      <View style={styles.goalInfo}>
                        <Text style={styles.goalTitle}>{goal.title}</Text>
                        <Text style={styles.goalDeadline}>Target: {goal.deadline}</Text>
                      </View>
                    </View>

                    <View style={styles.goalProgress}>
                      <View style={styles.goalAmounts}>
                        <Text style={styles.goalCurrent}>R{goal.currentAmount.toFixed(2)}</Text>
                        <Text style={styles.goalTarget}>R{goal.targetAmount.toFixed(2)}</Text>
                      </View>
                      <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: goal.color }]} />
                      </View>
                      <Text style={styles.goalRemaining}>R{remaining.toFixed(2)} remaining</Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.contributeButton, { backgroundColor: goal.color }]}
                      onPress={() => openContributeModal(goal)}
                      activeOpacity={0.7}
                    >
                      <IconSymbol name="plus.circle.fill" size={20} color="#ffffff" />
                      <Text style={styles.contributeButtonText}>Add Contribution</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            })}
          </View>

          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color={colors.primary} />
              <Text style={styles.tipsTitle}>Savings Tips</Text>
            </View>
            <Text style={styles.tipsText}>
              - Automate your savings with monthly transfers{'\n'}
              - Start small and increase gradually{'\n'}
              - Use the 50/30/20 budgeting rule{'\n'}
              - Consider a Tax-Free Savings Account (TFSA){'\n'}
              - Review and adjust goals regularly
            </Text>
          </View>
        </ScrollView>

        <Modal
          visible={showContributeModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowContributeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Contribution</Text>
                <TouchableOpacity onPress={() => setShowContributeModal(false)}>
                  <IconSymbol name="xmark" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              {selectedGoal && (
                <>
                  <View style={styles.modalGoalInfo}>
                    <View style={[styles.modalGoalIcon, { backgroundColor: selectedGoal.color }]}>
                      <IconSymbol name={selectedGoal.icon} size={32} color="#ffffff" />
                    </View>
                    <Text style={styles.modalGoalTitle}>{selectedGoal.title}</Text>
                    <Text style={styles.modalGoalProgress}>
                      R{selectedGoal.currentAmount.toFixed(2)} / R{selectedGoal.targetAmount.toFixed(2)}
                    </Text>
                  </View>

                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter amount"
                    placeholderTextColor={colors.textSecondary}
                    value={contributeAmount}
                    onChangeText={setContributeAmount}
                    keyboardType="decimal-pad"
                  />

                  <TouchableOpacity
                    style={[styles.saveButton, !contributeAmount && styles.saveButtonDisabled]}
                    onPress={handleContribute}
                    disabled={!contributeAmount}
                  >
                    <Text style={styles.saveButtonText}>Add Contribution</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  overviewCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  overviewAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  goalDeadline: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  goalProgress: {
    marginBottom: 16,
  },
  goalAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalCurrent: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  goalTarget: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  goalRemaining: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  contributeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  contributeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  tipsCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffd54f',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tipsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalGoalInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalGoalIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalGoalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  modalGoalProgress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
