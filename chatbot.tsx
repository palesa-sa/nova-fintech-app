
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I&apos;m NovaAi, your financial assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const suggestedQuestions = [
    'What is SARS?',
    'How do I create a budget?',
    'Tell me about tax filing',
    'Savings tips for students',
  ];

  useEffect(() => {
    if (messages.length > 1) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      setTimeout(() => {
        const botResponse = generateBotResponse(inputText.trim());
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('sars')) {
      return 'SARS (South African Revenue Service) is the tax authority in South Africa. They collect taxes and ensure compliance with tax laws. You need to register with SARS if you earn above the tax threshold, and file your tax returns annually.';
    } else if (input.includes('budget')) {
      return 'Creating a budget is essential! Start by tracking your income and expenses. Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Our Budget Tracker feature can help you with this!';
    } else if (input.includes('tax')) {
      return 'In South Africa, tax filing is done annually. You need to submit your tax return to SARS by the deadline (usually October for non-provisional taxpayers). Keep all your IRP5 forms and receipts for deductions.';
    } else if (input.includes('savings') || input.includes('save')) {
      return 'Great question! Start by setting clear savings goals. Even small amounts add up. Consider opening a tax-free savings account (TFSA) in South Africa. Try to save at least 10-15% of your income each month.';
    } else if (input.includes('student')) {
      return 'As a student, focus on budgeting your allowance or part-time income. Look into student banking accounts with lower fees. Apply for bursaries and scholarships. Avoid unnecessary debt and start building good financial habits early!';
    } else if (input.includes('investment')) {
      return 'Investing is a great way to grow wealth! In South Africa, you can invest in unit trusts, ETFs, stocks, or retirement annuities. Start with understanding your risk tolerance and investment timeline. Consider consulting a financial advisor.';
    } else {
      return 'That&apos;s an interesting question! I can help you with topics like budgeting, SARS, tax filing, savings, investments, and general financial advice for South Africa. What would you like to know more about?';
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isUser = item.sender === 'user';
    return (
      <Animated.View
        entering={FadeInUp.delay(index * 50).duration(300)}
        style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}
      >
        {!isUser && (
          <View style={styles.botAvatar}>
            <IconSymbol name="sparkles" size={16} color="#ffffff" />
          </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <IconSymbol name="sparkles" size={24} color="#ffffff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>NovaAi Assistant</Text>
              <Text style={styles.headerSubtitle}>Always here to help</Text>
            </View>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.messagesList,
            Platform.OS !== 'ios' && styles.messagesListWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            messages.length === 1 ? (
              <View style={styles.suggestedQuestionsContainer}>
                <Text style={styles.suggestedTitle}>Suggested Questions:</Text>
                {suggestedQuestions.map((question, index) => (
                  <Animated.View key={question} entering={FadeInDown.delay(index * 100).duration(400)}>
                    <TouchableOpacity
                      style={styles.suggestedButton}
                      onPress={() => handleSuggestedQuestion(question)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestedText}>{question}</Text>
                      <IconSymbol name="arrow.right" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            ) : null
          }
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask me anything about finances..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.7}
            >
              <IconSymbol name="arrow.up" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  messagesList: {
    padding: 20,
    paddingBottom: 20,
  },
  messagesListWithTabBar: {
    paddingBottom: 120,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#ffffff',
  },
  botText: {
    color: colors.text,
  },
  suggestedQuestionsContainer: {
    marginTop: 16,
    gap: 12,
  },
  suggestedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  suggestedButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestedText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'flex-end',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
});
