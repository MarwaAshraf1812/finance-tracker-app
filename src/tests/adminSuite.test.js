import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/dbConfig.js';
import * as adminService from '../services/admin.service.js';

async function runTest(testName, testFn) {
  console.log(`\n--- Testing ${testName} ---`);
  try {
    const result = await testFn();
    console.log('Result:', JSON.stringify(result, null, 2));
    console.log(`SUCCESS: ${testName}`);
  } catch (error) {
    console.error(`FAILED: ${testName}`);
    console.error(error);
  }
}

async function startSuite() {
  try {
    await connectDB();
    console.log('Connected to MongoDB\n');

    await runTest('getSystemOverview', adminService.getSystemOverview);
    await runTest('getUserAnalytics', adminService.getUserAnalytics);
    await runTest('getFinanceAnalytics', adminService.getFinanceAnalytics);
    await runTest('getTrends', adminService.getTrends);
    await runTest('getCategoriesAnalytics', adminService.getCategoriesAnalytics);
    await runTest('getActivityMetrics', adminService.getActivityMetrics);

    console.log('\n--- Test Suite Completed ---');
  } catch (error) {
    console.error('Suite setup failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

startSuite();
