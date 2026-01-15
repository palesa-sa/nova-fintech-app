
import React, { useState } from 'react';
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
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface EducationTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  articles: Article[];
}

interface Article {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export default function EducationScreen() {
  const [selectedTopic, setSelectedTopic] = useState<EducationTopic | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const topics: EducationTopic[] = [
    {
      id: '1',
      title: 'Financial Basics',
      description: 'Learn the fundamentals of personal finance',
      icon: 'book.fill',
      color: colors.primary,
      articles: [
        {
          id: '1-1',
          title: 'Understanding Income and Expenses',
          duration: '5 min read',
          content: 'Income is the money you receive, while expenses are what you spend. Understanding the difference is crucial for financial health.\n\nTypes of Income:\n- Salary/Wages\n- Business income\n- Investment returns\n- Passive income\n\nTypes of Expenses:\n- Fixed (rent, insurance)\n- Variable (groceries, entertainment)\n- Discretionary (wants vs needs)\n\nKey Tip: Always track both to maintain a positive cash flow.',
        },
        {
          id: '1-2',
          title: 'The Importance of Saving',
          duration: '4 min read',
          content: 'Saving money is essential for financial security and achieving your goals.\n\nWhy Save?\n- Emergency fund for unexpected expenses\n- Future goals (house, car, education)\n- Retirement planning\n- Financial independence\n\nHow Much to Save?\n- Aim for 20% of your income\n- Start with at least 10% if 20% is too much\n- Increase gradually as income grows\n\nSouth African Tip: Consider Tax-Free Savings Accounts (TFSA) for tax-efficient savings.',
        },
        {
          id: '1-3',
          title: 'Building Good Credit',
          duration: '6 min read',
          content: 'Your credit score affects your ability to borrow money and the interest rates you pay.\n\nWhat Affects Credit Score:\n- Payment history (most important)\n- Credit utilization\n- Length of credit history\n- Types of credit\n- New credit applications\n\nHow to Build Good Credit:\n- Pay bills on time\n- Keep credit card balances low\n- Don&apos;t close old accounts\n- Limit new credit applications\n- Check your credit report regularly',
        },
      ],
    },
    {
      id: '2',
      title: 'Understanding SARS',
      description: 'Everything about South African Revenue Service',
      icon: 'building.2.fill',
      color: colors.accent,
      articles: [
        {
          id: '2-1',
          title: 'What is SARS?',
          duration: '5 min read',
          content: 'SARS (South African Revenue Service) is the official tax authority in South Africa.\n\nSARS Responsibilities:\n- Collecting taxes\n- Enforcing tax compliance\n- Facilitating trade\n- Providing taxpayer education\n\nTypes of Taxes:\n- Personal Income Tax\n- Value-Added Tax (VAT)\n- Corporate Tax\n- Capital Gains Tax\n- Estate Duty\n\nWho Must Register?\n- Anyone earning above the tax threshold\n- Business owners\n- Employers\n- VAT vendors',
        },
        {
          id: '2-2',
          title: 'Tax Filing in South Africa',
          duration: '7 min read',
          content: 'Filing your tax return is a legal requirement in South Africa.\n\nWhen to File:\n- Non-provisional taxpayers: By October 23\n- Provisional taxpayers: By January 31\n- Companies: Within 12 months of financial year-end\n\nWhat You Need:\n- IRP5/IT3(a) certificates\n- Proof of deductions\n- Medical aid certificates\n- Retirement annuity certificates\n- Bank statements\n\nHow to File:\n1. Register on eFiling\n2. Gather all documents\n3. Complete your return\n4. Submit before deadline\n5. Keep records for 5 years',
        },
        {
          id: '2-3',
          title: 'Tax Deductions and Rebates',
          duration: '6 min read',
          content: 'Understanding deductions can reduce your tax liability.\n\nCommon Deductions:\n- Medical expenses (above threshold)\n- Retirement contributions\n- Travel allowance expenses\n- Home office expenses (if applicable)\n- Donations to approved organizations\n\nTax Rebates:\n- Primary rebate: R17,235 (2024)\n- Secondary rebate: R9,444 (65+)\n- Tertiary rebate: R3,145 (75+)\n\nMedical Tax Credits:\n- R364 per month (main member)\n- R364 per month (first dependent)\n- R246 per month (additional dependents)',
        },
      ],
    },
    {
      id: '3',
      title: 'Managing Your Finances',
      description: 'Practical tips for financial management',
      icon: 'chart.line.uptrend.xyaxis',
      color: '#28a745',
      articles: [
        {
          id: '3-1',
          title: 'Creating a Budget',
          duration: '8 min read',
          content: 'A budget is your financial roadmap to success.\n\nThe 50/30/20 Rule:\n- 50% for Needs (rent, food, utilities)\n- 30% for Wants (entertainment, dining out)\n- 20% for Savings and Debt\n\nSteps to Create a Budget:\n1. Calculate your monthly income\n2. List all expenses\n3. Categorize expenses\n4. Set spending limits\n5. Track and adjust monthly\n\nBudgeting Tools:\n- Spreadsheets\n- Banking apps\n- Budgeting apps\n- NovaAi Budget Tracker\n\nTip: Review your budget monthly and adjust as needed.',
        },
        {
          id: '3-2',
          title: 'Debt Management',
          duration: '7 min read',
          content: 'Managing debt effectively is crucial for financial health.\n\nTypes of Debt:\n- Good debt (education, home loans)\n- Bad debt (high-interest credit cards)\n\nDebt Repayment Strategies:\n1. Snowball Method: Pay smallest debts first\n2. Avalanche Method: Pay highest interest first\n3. Consolidation: Combine debts into one\n\nAvoiding Debt:\n- Live within your means\n- Build an emergency fund\n- Avoid impulse purchases\n- Use credit cards responsibly\n\nSouth African Resources:\n- National Credit Regulator (NCR)\n- Debt counseling services',
        },
        {
          id: '3-3',
          title: 'Investment Basics',
          duration: '9 min read',
          content: 'Investing helps your money grow over time.\n\nInvestment Options in SA:\n- Unit Trusts\n- Exchange Traded Funds (ETFs)\n- Stocks and Shares\n- Retirement Annuities\n- Tax-Free Savings Accounts\n- Property\n\nInvestment Principles:\n- Start early\n- Diversify your portfolio\n- Understand your risk tolerance\n- Think long-term\n- Regular contributions\n\nRisk vs Return:\n- Higher risk = Higher potential return\n- Lower risk = Lower potential return\n- Balance based on your goals\n\nTip: Consider consulting a certified financial planner.',
        },
      ],
    },
    {
      id: '4',
      title: 'Student Finance',
      description: 'Financial guidance for students',
      icon: 'graduationcap.fill',
      color: '#ffc107',
      articles: [
        {
          id: '4-1',
          title: 'Student Banking',
          duration: '5 min read',
          content: 'Choosing the right bank account as a student is important.\n\nStudent Account Benefits:\n- Lower or no monthly fees\n- Free transactions (limited)\n- Overdraft facilities\n- Student cards\n- Online banking\n\nMajor SA Banks Offering Student Accounts:\n- FNB\n- Standard Bank\n- Absa\n- Nedbank\n- Capitec\n\nWhat to Look For:\n- Monthly fees\n- Transaction costs\n- ATM access\n- Online banking features\n- Student benefits\n\nTip: Compare different banks before choosing.',
        },
        {
          id: '4-2',
          title: 'Funding Your Studies',
          duration: '8 min read',
          content: 'There are various ways to fund your tertiary education.\n\nFunding Options:\n- NSFAS (National Student Financial Aid Scheme)\n- Bursaries\n- Scholarships\n- Student loans\n- Part-time work\n- Family support\n\nNSFAS:\n- For students from low-income households\n- Covers tuition and accommodation\n- Apply online annually\n- Maintain academic requirements\n\nBursaries vs Loans:\n- Bursaries: Don&apos;t need to be repaid\n- Loans: Must be repaid with interest\n\nTip: Apply early and to multiple sources.',
        },
        {
          id: '4-3',
          title: 'Student Budgeting',
          duration: '6 min read',
          content: 'Managing money as a student requires discipline.\n\nStudent Budget Categories:\n- Tuition and books\n- Accommodation\n- Food and groceries\n- Transport\n- Airtime and data\n- Entertainment\n- Emergency fund\n\nMoney-Saving Tips:\n- Buy second-hand textbooks\n- Cook your own meals\n- Use student discounts\n- Share accommodation\n- Use public transport\n- Limit eating out\n\nPart-Time Work:\n- Tutoring\n- Retail jobs\n- Online freelancing\n- Campus jobs\n\nTip: Track every expense to identify savings opportunities.',
        },
      ],
    },
  ];

  if (selectedArticle && selectedTopic) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.articleHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedArticle(null)}
              activeOpacity={0.7}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.articleContainer}
            contentContainerStyle={[
              styles.articleContent,
              Platform.OS !== 'ios' && styles.articleContentWithTabBar,
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.articleIconContainer, { backgroundColor: selectedTopic.color }]}>
              <IconSymbol name={selectedTopic.icon} size={32} color="#ffffff" />
            </View>
            <Text style={styles.articleTitle}>{selectedArticle.title}</Text>
            <Text style={styles.articleDuration}>{selectedArticle.duration}</Text>
            <Text style={styles.articleText}>{selectedArticle.content}</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (selectedTopic) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.topicHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedTopic(null)}
              activeOpacity={0.7}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={[styles.topicIconLarge, { backgroundColor: selectedTopic.color }]}>
              <IconSymbol name={selectedTopic.icon} size={40} color="#ffffff" />
            </View>
            <Text style={styles.topicTitleLarge}>{selectedTopic.title}</Text>
            <Text style={styles.topicDescriptionLarge}>{selectedTopic.description}</Text>
          </View>
          <ScrollView
            style={styles.articlesContainer}
            contentContainerStyle={[
              styles.articlesContent,
              Platform.OS !== 'ios' && styles.articlesContentWithTabBar,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {selectedTopic.articles.map((article, index) => (
              <Animated.View key={article.id} entering={FadeInDown.delay(index * 100).duration(500)}>
                <TouchableOpacity
                  style={styles.articleCard}
                  onPress={() => setSelectedArticle(article)}
                  activeOpacity={0.7}
                >
                  <View style={styles.articleCardContent}>
                    <Text style={styles.articleCardTitle}>{article.title}</Text>
                    <Text style={styles.articleCardDuration}>{article.duration}</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Financial Education</Text>
          <Text style={styles.headerSubtitle}>Learn at your own pace</Text>
        </View>

        <View style={styles.topicsGrid}>
          {topics.map((topic, index) => (
            <Animated.View
              key={topic.id}
              entering={FadeInDown.delay(index * 100).duration(500)}
              style={styles.topicCardWrapper}
            >
              <TouchableOpacity
                style={styles.topicCard}
                onPress={() => setSelectedTopic(topic)}
                activeOpacity={0.7}
              >
                <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
                  <IconSymbol name={topic.icon} size={32} color="#ffffff" />
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
                <View style={styles.topicFooter}>
                  <Text style={styles.articleCount}>{topic.articles.length} articles</Text>
                  <IconSymbol name="arrow.right" size={16} color={colors.primary} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
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
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  topicsGrid: {
    gap: 16,
  },
  topicCardWrapper: {
    width: '100%',
  },
  topicCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  topicIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  topicDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  topicHeader: {
    backgroundColor: colors.card,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  topicIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  topicDescriptionLarge: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  articlesContainer: {
    flex: 1,
  },
  articlesContent: {
    padding: 20,
  },
  articlesContentWithTabBar: {
    paddingBottom: 100,
  },
  articleCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  articleCardContent: {
    flex: 1,
  },
  articleCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  articleCardDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  articleHeader: {
    backgroundColor: colors.card,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  articleContainer: {
    flex: 1,
  },
  articleContent: {
    padding: 20,
  },
  articleContentWithTabBar: {
    paddingBottom: 100,
  },
  articleIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  articleDuration: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  articleText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});
