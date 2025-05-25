import { NextResponse } from 'next/server';
import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'shuttle.proxy.rlwy.net',
    port: parseInt(process.env.MYSQL_PORT || '31707'),
    database: process.env.MYSQL_DATABASE || 'railway',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || 'RkVdjRthOjLqmiLRZVKQsffRaTqXrUYL',
    ssl: {}
  }
});

export async function GET() {
  try {
    // Simple query to test connection
    const results = await db.query('SELECT 1 as connected');
    await db.end();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to MySQL database on Railway!',
      data: results 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}