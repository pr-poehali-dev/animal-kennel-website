import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD API for gallery photos
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with gallery data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute(
                "SELECT id, image_url, title, description FROM gallery ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()
        
        photos = []
        for row in rows:
            photos.append({
                'id': row[0],
                'image_url': row[1],
                'title': row[2],
                'description': row[3]
            })
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'photos': photos}),
            'isBase64Encoded': False
        }
    
    elif method == 'POST':
        user_role = event.get('headers', {}).get('X-User-Role', 'guest')
        
        if user_role != 'admin':
            return {
                'statusCode': 403,
                'headers': headers,
                'body': json.dumps({'error': 'Admin access required'}),
                'isBase64Encoded': False
            }
        
        body_data = json.loads(event.get('body', '{}'))
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute(
                """INSERT INTO gallery (image_url, title, description)
                   VALUES (%s, %s, %s) RETURNING id""",
                (
                    body_data.get('image_url'),
                    body_data.get('title'),
                    body_data.get('description')
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
    
    elif method == 'DELETE':
        user_role = event.get('headers', {}).get('X-User-Role', 'guest')
        
        if user_role != 'admin':
            return {
                'statusCode': 403,
                'headers': headers,
                'body': json.dumps({'error': 'Admin access required'}),
                'isBase64Encoded': False
            }
        
        params = event.get('queryStringParameters', {})
        photo_id = params.get('id')
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute("DELETE FROM gallery WHERE id=%s", (photo_id,))
            conn.commit()
            cur.close()
        finally:
            conn.close()
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
