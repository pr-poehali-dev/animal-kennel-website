import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD API for litters (puppies)
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with litters data
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
                "SELECT id, name, born_date, available, parents, description, image_url FROM litters ORDER BY born_date DESC"
            )
            rows = cur.fetchall()
            cur.close()
        finally:
            conn.close()
        
        litters = []
        for row in rows:
            litters.append({
                'id': row[0],
                'name': row[1],
                'born_date': row[2].strftime('%d.%m.%Y') if row[2] else '',
                'available': row[3],
                'parents': row[4],
                'description': row[5],
                'image_url': row[6]
            })
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'litters': litters}),
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
                """INSERT INTO litters (name, born_date, available, parents, description, image_url)
                   VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
                (
                    body_data.get('name'),
                    body_data.get('born_date'),
                    body_data.get('available'),
                    body_data.get('parents'),
                    body_data.get('description'),
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
        litter_id = body_data.get('id')
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute(
                """UPDATE litters SET name=%s, born_date=%s, available=%s, parents=%s,
                   description=%s, image_url=%s, updated_at=CURRENT_TIMESTAMP
                   WHERE id=%s""",
                (
                    body_data.get('name'),
                    body_data.get('born_date'),
                    body_data.get('available'),
                    body_data.get('parents'),
                    body_data.get('description'),
                    body_data.get('image_url'),
                    litter_id
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
        litter_id = params.get('id')
        
        conn = psycopg2.connect(database_url)
        try:
            cur = conn.cursor()
            cur.execute("DELETE FROM litters WHERE id=%s", (litter_id,))
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
