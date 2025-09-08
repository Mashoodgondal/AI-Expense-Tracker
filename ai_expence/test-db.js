// test-db.js - Create this file in your project root
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });

    //     try {
    //         console.log('Testing database connection...');
    //         console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

    //         await prisma.$connect();
    //         console.log('✅ Database connection successful!');

    //         // Test a simple query
    //         const result = await prisma.$queryRaw`SELECT 1 as test`;
    //         console.log('✅ Query test successful:', result);

    //     } catch (error) {
    //         console.error('❌ Database connection failed:');
    //         console.error('Error code:', error.code);
    //         console.error('Error message:', error.message);
    //         console.error('Full error:', error);
    //     } finally {
    //         await prisma.$disconnect();
    //     }
    // }

    // testConnection();


    try {
//         console.log('Testing database connection...');
//         console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

//         await prisma.$connect();
//         console.log('✅ Database connection successful!');

//         // Test a simple query
//         const result = await prisma.$queryRaw`SELECT 1 as test`;
//         console.log('✅ Query test successful:', result);

//     } catch (error) {
//         console.error('❌ Database connection failed:');
//         console.error('Error code:', error.code);
//         console.error('Error message:', error.message);
//         console.error('Full error:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// testConnection();  try {
//         console.log('Testing database connection...');
//         console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

//         await prisma.$connect();
//         console.log('✅ Database connection successful!');

//         // Test a simple query
//         const result = await prisma.$queryRaw`SELECT 1 as test`;
//         console.log('✅ Query test successful:', result);

//     } catch (error) {
//         console.error('❌ Database connection failed:');
//         console.error('Error code:', error.code);
//         console.error('Error message:', error.message);
//         console.error('Full error:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// testConnection();  try {
//         console.log('Testing database connection...');
//         console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

//         await prisma.$connect();
//         console.log('✅ Database connection successful!');

//         // Test a simple query
//         const result = await prisma.$queryRaw`SELECT 1 as test`;
//         console.log('✅ Query test successful:', result);

//     } catch (error) {
//         console.error('❌ Database connection failed:');
//         console.error('Error code:', error.code);
//         console.error('Error message:', error.message);
//         console.error('Full error:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// testConnection();