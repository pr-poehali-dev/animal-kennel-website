import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Support messages API
    Args: event with httpMethod, body
    Returns: HTTP response with messages data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token, X-User-Role',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method == 'GET':
        user_role = event.get('headers', {}).get('X-User-Role', 'guest')
        
        if user_role != 'admin':
            return {
                'statusCode': 403,
                'headers': headers,
                'body': json.dumps({'error': 'Admin access required'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute(
                "SELECT id, name, email, phone, message, status, created_at FROM messages ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()
        
        messages = []
        for row in rows:
            messages.append({
                'id': row[0],
                'name': row[1],
                'email': row[2],
                'phone': row[3],
                'message': row[4],
                'status': row[5],
                'created_at': row[6].strftime('%d.%m.%Y %H:%M') if row[6] else ''
            })
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'messages': messages}),
            'isBase64Encoded': False
        }
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute(
                """INSERT INTO messages (name, email, phone, message)
                   VALUES (%s, %s, %s, %s) RETURNING id""",
                (
                    body_data.get('name'),
                    body_data.get('email'),
                    body_data.get('phone'),
                    body_data.get('message')
                )
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
        finally:
            conn.close()
        
        return {
            'statusCode': 201,
            'headers': headers,
            'body': json.dumps({'id': new_id, 'success': True}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
