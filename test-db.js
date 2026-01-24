const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres.gqmvhuyxmcwljsjsskoo:XI1jngvkGu9z8a0x@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  connectionTimeoutMillis: 10000,
});

async function testConnection() {
  try {
    console.log('Đang thử kết nối tới DB...');
    await client.connect();
    console.log('Kết nối thành công!');
    const res = await client.query('SELECT NOW()');
    console.log('Thời gian server:', res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error('Lỗi kết nối:', err.message);
    process.exit(1);
  }
}

testConnection();
