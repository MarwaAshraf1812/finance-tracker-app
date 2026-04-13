import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: '/media/dell/Data3/ITI/finance-tracker-app/.env' });

import Transaction from '../models/transaction.model.js';
import Budget from '../models/budget.model.js';
import { User } from '../models/user.model.js';
import Category from '../models/category.model.js';
import { createUserReport, generateTransactionReport, generateBudgetReport } from '../services/reports.service.js';

async function runTests() {
  try {
    console.log("🔄 Connecting to MongoDB DB URL:", process.env.DB_URL.substring(0, 50) + "...");
    await mongoose.connect(process.env.DB_URL);
    console.log("🟢 Connected successfully.");


    const user = new User({ 
        name: 'test_report_user_' + Date.now(), 
        email: `test${Date.now()}@test.com`, 
        password: 'password123', 
        role: 'user' 
    });
    await user.save();
    
    const catExpense = new Category({ type: 'food', user: user._id, color: '#000', icon: 'test' });
    const catIncome = new Category({ type: 'other', user: user._id, color: '#000', icon: 'test' });
    await Category.insertMany([catExpense, catIncome]);

    await Budget.insertMany([
      { user: user._id, category: catExpense._id, amount: 500, month: 2, year: 2024 },
      { user: user._id, category: catExpense._id, amount: 600, month: 3, year: 2024 },
      { user: user._id, category: catExpense._id, amount: 500, month: 4, year: 2024 },

      { user: user._id, category: catExpense._id, amount: 200, month: 12, year: 2023 }
    ]);

    await Transaction.insertMany([
      { user: user._id, type: 'income', amount: 2000, category: catIncome._id, date: new Date('2024-02-15') },
      { user: user._id, type: 'expense', amount: 400, category: catExpense._id, date: new Date('2024-02-20') },
      
      { user: user._id, type: 'income', amount: 2000, category: catIncome._id, date: new Date('2024-03-10') },
      { user: user._id, type: 'expense', amount: 650, category: catExpense._id, date: new Date('2024-03-25') },
      
      { user: user._id, type: 'expense', amount: 100, category: catExpense._id, date: new Date('2024-04-05') },
      
      { user: user._id, type: 'expense', amount: 1000, category: catExpense._id, date: new Date('2023-12-05') }
    ]);

    console.log("\n==================================");
    console.log("   🚀 RUNNING REPORT TEST CASES");
    console.log("==================================\n");
    

    console.log("🧪 TEST CASE 1: Master Combined Report (/api/v1/reports)");
    const report1 = await createUserReport(user._id, '2024-02-01', '2024-04-15T23:59:59');
    console.log(JSON.stringify(report1, null, 2));

    console.log("\n----------------------------------\n");

    console.log("🧪 TEST CASE 2: Transaction Report ONLY (/api/v1/reports/transactions-summary)");
    const report2 = await generateTransactionReport(user._id, '2024-02-01', '2024-04-15T23:59:59');
    console.log(JSON.stringify(report2, null, 2));

    console.log("\n----------------------------------\n");

    console.log("🧪 TEST CASE 3: Budget Report ONLY (/api/v1/reports/budgets-summary)");
    const report3 = await generateBudgetReport(user._id, '2024-02-01', '2024-04-15T23:59:59');
    console.log(JSON.stringify(report3, null, 2));

    await User.deleteOne({ _id: user._id });
    await Category.deleteMany({ user: user._id });
    await Budget.deleteMany({ user: user._id });
    await Transaction.deleteMany({ user: user._id });
    
    console.log("\n🧹 Cleaned up isolated test data.");
    console.log("✅ Testing Completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Test Failed!", err);
    process.exit(1);
  }
}

runTests();
