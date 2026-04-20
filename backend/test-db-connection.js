const { Client } = require('pg');

// Configuration matching your app.module.ts / screenshot
const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'pass4536',
    database: process.env.DB_NAME || 'monstrack', // Default from app
};

const configBackup = {
    ...config,
    database: 'postgres' // Fallback based on screenshot
};

async function testConnection(conf, label) {
    console.log(`\n--- Testing Connection: ${label} ---`);
    console.log(`Host: ${conf.host}, Port: ${conf.port}, User: ${conf.user}, DB: ${conf.database}`);

    const client = new Client(conf);
    try {
        await client.connect();
        console.log('✅ Connection Sucessful!');

        const res = await client.query('SELECT NOW() as now');
        console.log('Query Result:', res.rows[0]);

        // Check tables
        const tables = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
    `);
        console.log('Tables found:', tables.rows.map(r => r.table_name));

        await client.end();
        return true;
    } catch (err) {
        console.error('❌ Connection Failed:', err.message);
        if (client) try { await client.end(); } catch (e) { }
        return false;
    }
}

async function run() {
    console.log("Starting Standalone DB Test...");

    // Test 1: 'monstrack' database
    const s1 = await testConnection(config, "Configured DB Name (monstrack)");

    // Test 2: 'postgres' database
    const s2 = await testConnection(configBackup, "Fallback DB Name (postgres)");

    if (!s1 && !s2) {
        console.error("\nCRITICAL: Both database connections failed.");
    }
}

run();
