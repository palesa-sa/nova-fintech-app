
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

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
}

export default function BudgetScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Salary',
      amount: 15000,
      category: 'Income',
      type: 'income',
      date: new Date(),
    },
    {
      id: '2',
      title: 'Rent',
      amount: 5000,
      category: 'Housing',
      type: 'expense',
      date: new Date(),
    },
    {
      id: '3',
      title: 'Groceries',
      amount: 2000,
      category: 'Food',
      type: 'expense',
      date: new Date(),
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const categories = [
    { name: 'Housing', icon: 'house.fill', color: '#007bff' },
    { name: 'Food', icon: 'cart.fill', color: '#28a745' },
    { name: 'Transport', icon: 'car.fill', color: '#ffc107' },
    { name: 'Entertainment', icon: 'tv.fill', color: '#dc3545' },
    { name: 'Income', icon: 'dollarsign.circle.fill', color: '#28a745' },
    { name: 'Other', icon: 'ellipsis.circle.fill', color: '#6c757d' },
  ];

  const handleAddTransaction = () => {
    if (newTransaction.title && newTransaction.amount && newTransaction.category) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        title: newTransaction.title,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        type: newTransaction.type,
        date: new Date(),
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ title: '', amount: '', category: '', type: 'expense' });
      setShowAddModal(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Budget Tracker</Text>
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
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <IconSymbol name="arrow.down.circle.fill" size={24} color={colors.accent} />
                <Text style={styles.summaryLabel}>Income</Text>
                <Text style={[styles.summaryAmount, { color: colors.accent }]}>
                  R{totalIncome.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <IconSymbol name="arrow.up.circle.fill" size={24} color={colors.error} />
                <Text style={styles.summaryLabel}>Expenses</Text>
                <Text style={[styles.summaryAmount, { color: colors.error }]}>
                  R{totalExpenses.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Balance</Text>
              <Text style={[styles.balanceAmount, { color: balance >= 0 ? colors.accent : colors.error }]}>
                R{balance.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            {transactions.map((transaction, index) => (
              <Animated.View key={transaction.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                <View style={styles.transactionCard}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: transaction.type === 'income' ? colors.accent : colors.error },
                    ]}
                  >
                    <IconSymbol
                      name={transaction.type === 'income' ? 'arrow.down' : 'arrow.up'}
                      size={20}
                      color="#ffffff"
                    />
                  </View>
                  <View style={styles.transactionContent}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionCategory}>{transaction.category}</Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: transaction.type === 'income' ? colors.accent : colors.error },
                    ]}
                  >
                    {transaction.type === 'income' ? '+' : '-'}R{transaction.amount.toFixed(2)}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Transaction</Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <IconSymbol name="xmark" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newTransaction.type === 'expense' && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewTransaction({ ...newTransaction, type: 'expense' })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      newTransaction.type === 'expense' && styles.typeButtonTextActive,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newTransaction.type === 'income' && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewTransaction({ ...newTransaction, type: 'income' })}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      newTransaction.type === 'income' && styles.typeButtonTextActive,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.modalInput}
                placeholder="Title"
                placeholderTextColor={colors.textSecondary}
                value={newTransaction.title}
                onChangeText={text => setNewTransaction({ ...newTransaction, title: text })}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Amount"
                placeholderTextColor={colors.textSecondary}
                value={newTransaction.amount}
                onChangeText={text => setNewTransaction({ ...newTransaction, amount: text })}
                keyboardType="decimal-pad"
              />

              <View style={styles.categoriesGrid}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.categoryButton,
                      newTransaction.category === category.name && styles.categoryButtonActive,
                    ]}
                    onPress={() => setNewTransaction({ ...newTransaction, category: category.name })}
                  >
                    <IconSymbol name={category.icon} size={20} color={category.color} />
                    <Text style={styles.categoryButtonText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  (!newTransaction.title || !newTransaction.amount || !newTransaction.category) &&
                    styles.saveButtonDisabled,
                ]}
                onPress={handleAddTransaction}
                disabled={!newTransaction.title || !newTransaction.amount || !newTransaction.category}
              >
                <Text style={styles.saveButtonText}>Add Transaction</Text>
              </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceContainer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
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
  transactionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
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
    maxHeight: '80%',
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
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#ffffff',
  },
  modalInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: colors.text,
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
