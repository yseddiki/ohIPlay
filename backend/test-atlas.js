// ========================================
// ATLAS CONNECTION TEST SCRIPT
// Save as: backend/test-atlas.js
// ========================================

require('dotenv').config();
const mongoose = require('mongoose');

// Your corrected Atlas URI
const ATLAS_URI = "mongodb+srv://youssefseddikidev:ozRxe0yWH88WoRBQ@cluster0.ao8ygry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Modern connection options
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function testAtlasConnection() {
  console.log('🚀 Testing MongoDB Atlas connection...\n');
  
  try {
    // Step 1: Connect
    console.log('1️⃣ Connecting to Atlas...');
    await mongoose.connect(ATLAS_URI, clientOptions);
    console.log('✅ Connected successfully!\n');
    
    // Step 2: Ping database
    console.log('2️⃣ Pinging database...');
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('✅ Ping successful!\n');
    
    // Step 3: Check database info
    console.log('3️⃣ Database information:');
    console.log(`   📊 Database: ${mongoose.connection.name}`);
    console.log(`   🌐 Host: ${mongoose.connection.host}`);
    console.log(`   ⚡ Ready State: ${mongoose.connection.readyState}\n`);
    
    // Step 4: List collections
    console.log('4️⃣ Checking collections...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length > 0) {
      console.log('✅ Found collections:');
      collections.forEach(col => {
        console.log(`   📁 ${col.name}`);
      });
    } else {
      console.log('📝 No collections yet (normal for new database)');
    }
    console.log('');
    
    // Step 5: Test write operation
    console.log('5️⃣ Testing write operation...');
    const TestSchema = new mongoose.Schema({ message: String, timestamp: Date });
    const TestModel = mongoose.model('connectiontest', TestSchema);
    
    const testDoc = new TestModel({ 
      message: 'Atlas connection test successful!', 
      timestamp: new Date() 
    });
    
    await testDoc.save();
    console.log('✅ Write operation successful!\n');
    
    // Step 6: Test read operation
    console.log('6️⃣ Testing read operation...');
    const savedDoc = await TestModel.findOne({ message: 'Atlas connection test successful!' });
    if (savedDoc) {
      console.log('✅ Read operation successful!');
      console.log(`   💬 Message: ${savedDoc.message}`);
      console.log(`   🕐 Timestamp: ${savedDoc.timestamp}\n`);
    }
    
    // Cleanup test document
    await TestModel.deleteOne({ _id: savedDoc._id });
    console.log('🧹 Cleaned up test document\n');
    
    console.log('🎉 ALL TESTS PASSED! Your Atlas connection is working perfectly!\n');
    
    console.log('📝 Next steps:');
    console.log('   1. Update your backend/.env with this URI');
    console.log('   2. Run: npm run seed');
    console.log('   3. Run: npm run dev');
    console.log('   4. Visit: http://localhost:3000\n');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    // Provide specific help based on error type
    if (error.message.includes('authentication failed')) {
      console.error('\n🔐 Authentication Error:');
      console.error('   - Check your username: youssefseddikidev');
      console.error('   - Check your password: ozRxe0yWH88WoRBQ');
      console.error('   - Verify Database Access permissions in Atlas Dashboard');
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      console.error('\n🌐 Network Error:');
      console.error('   - Check Network Access in Atlas Dashboard');
      console.error('   - Add your IP address or use 0.0.0.0/0 for development');
      console.error('   - Ensure your cluster is running');
    } else if (error.message.includes('MongoParseError')) {
      console.error('\n🔗 Connection String Error:');
      console.error('   - Check the format of your connection string');
      console.error('   - Ensure password is URL-encoded if it contains special characters');
    }
    
    console.error('\n📚 Atlas Dashboard: https://cloud.mongodb.com');
  } finally {
    // Always disconnect
    try {
      await mongoose.disconnect();
      console.log('👋 Disconnected from Atlas');
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError.message);
    }
  }
}

// Run the test
testAtlasConnection().catch(console.error);

// ========================================
// HOW TO USE THIS SCRIPT:
// ========================================
/*
1. Save this file as: backend/test-atlas.js

2. Run from backend directory:
   cd backend
   node test-atlas.js

3. If successful, you'll see:
   🎉 ALL TESTS PASSED! Your Atlas connection is working perfectly!

4. Then proceed with normal setup:
   npm run seed
   npm run dev
*/