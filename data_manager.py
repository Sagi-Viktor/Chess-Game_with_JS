import psycopg2.errors
from psycopg2.sql import SQL, Literal, Identifier
from psycopg2.extras import RealDictCursor

from database_common import connection_handler as connection


@connection
def get_users(cursor):
    query = """
    SELECT * FROM user_account
    """
    cursor.execute(SQL(query))
    return cursor.fetchall()


@connection
def login(cursor, username, password):
    query = """
    SELECT * FROM user_account
    WHERE username = {username}
     AND password = {password}
    """
    cursor.execute(SQL(query).format(
        username=Literal(username),
        password=Literal(password)
    ))
    return cursor.fetchone()
