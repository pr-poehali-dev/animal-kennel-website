import json
import os
from typing import Dict, Any, List
import psycopg2
import psycopg2.extras

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD API for dogs (producers)
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with dogs data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
                "SELECT id, name, gender, breed, titles, achievements, parents, image_url FROM dogs ORDER BY id"
            )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()
        
        dogs = []
        for row in rows:
            dogs.append({
                'id': row[0],
                'name': row[1],
                'gender': row[2],
                'breed': row[3],
                'titles': row[4] if row[4] else [],
                'achievements': row[5],
                'parents': row[6],
                'image_url': row[7]
            })
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'dogs': dogs}),
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
                """INSERT INTO dogs (name, gender, breed, titles, achievements, parents, image_url)
                   VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id""",
                (
                    body_data.get('name'),
                    body_data.get('gender'),
                    body_data.get('breed'),
                    body_data.get('titles', []),
                    body_data.get('achievements'),
                    body_data.get('parents'),
                    body_data.get('image_url')
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
    
    elif method == 'PUT':
        user_role = event.get('headers', {}).get('X-User-Role', 'guest')
        
        if user_role != 'admin':
            return {
                'statusCode': 403,
                'headers': headers,
                'body': json.dumps({'error': 'Admin access required'}),
                'isBase64Encoded': False
            }
        
        body_data = json.loads(event.get('body', '{}'))
        dog_id = body_data.get('id')
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute(
                """UPDATE dogs SET name=%s, gender=%s, breed=%s, titles=%s, 
                   achievements=%s, parents=%s, image_url=%s, updated_at=CURRENT_TIMESTAMP
                   WHERE id=%s""",
                (
                    body_data.get('name'),
                    body_data.get('gender'),
                    body_data.get('breed'),
                    body_data.get('titles', []),
                    body_data.get('achievements'),
                    body_data.get('parents'),
                    body_data.get('image_url'),
                    dog_id
                )
            )
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
        dog_id = params.get('id')
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute("DELETE FROM dogs WHERE id=%s", (dog_id,))
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