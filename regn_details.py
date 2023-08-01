import mysql.connector
from sql_connection import get_sql_connection

def get_emp(connection):

    cursor=connection.cursor()

    query=("select registration.emp_id,registration.firstname,registration.lastname,registration.email,registration.password,registration.mobile")

    cursor.execute(query)

    response=[]

    for(emp_id,firstname,lastname,email,password,mobile) in cursor:
        response.append({
            'emp_id':emp_id,
            'firstname':firstname,
            'lastname':lastname,
            'email':email,
            'password':password,
            'mobile':mobile
        })

    return response

if __name__=='__main__':
    connection=get_sql_connection()

    print(get_emp(connection))