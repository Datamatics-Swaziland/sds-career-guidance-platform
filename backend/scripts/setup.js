// backend/scripts/setup.js
const { sequelize } = require('../src/models');
const { seedDatabase } = require('../src/seeders');

const run = async () => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const allowDestructiveSetup = process.env.ALLOW_DESTRUCTIVE_SETUP === 'true';

    if (isProduction && !allowDestructiveSetup) {
      throw new Error(
        'Refusing to run destructive setup in production. Set ALLOW_DESTRUCTIVE_SETUP=true to override intentionally.'
      );
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('   SDS CAREER GUIDANCE PLATFORM - DATABASE SETUP');
    console.log('   Ministry of Labour and Social Security');
    console.log('   Kingdom of Eswatini');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Test database connection
    console.log('📡 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful\n');
    
    // Sync models (creates tables)
    console.log('🔧 Creating database tables...');
    await sequelize.sync({ force: true }); // WARNING: Drops existing tables!
    console.log('✅ Database tables created\n');
    
    // Seed data
    console.log('🌱 Seeding baseline reference data...\n');
    await seedDatabase();
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('   ✨ SETUP COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📋 What was created:');
    console.log('   • Database tables from Sequelize models');
    console.log('   • Baseline education levels (1-5)\n');
    
    console.log('ℹ️ Note: This setup does not create demo users/questions/occupations.');
    console.log('   Load operational data through admin workflows or migration/seed scripts.\n');
    
    console.log('🚀 Next steps:');
    console.log('   1. Start the backend: npm run dev');
    console.log('   2. Start the frontend: cd ../frontend && npm start');
    console.log('   3. Visit http://localhost:3000\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your .env file has correct database credentials');
    console.error('   2. Ensure PostgreSQL is running: sudo service postgresql status');
    console.error('   3. Verify database exists: psql -U postgres -d sds_test_db');
    console.error('\nFull error:', error);
    process.exit(1);
  }
};

run();