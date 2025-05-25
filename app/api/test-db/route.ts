import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  let connection;
  
  try {
    // Create connection with SSL options
    connection = await mysql.createConnection({
      host: 'shuttle.proxy.rlwy.net',
      port: 31707,
      database: 'railway',
      user: 'root',
      password: 'RkVdjRthOjLqmiLRZVKQsffRaTqXrUYL',
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Execute a simple query
    const [results] = await connection.query('SELECT 1 as connected');
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to MySQL database on Railway!',
      data: results 
    });
  } catch (error) {
    // Return error response
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  } finally {
    // Close the connection if it was opened
    if (connection) await connection.end();
  }
}