from sql_connection import get_sql_connection

def insert_employee(connection,emp):
    cursor=connection.cursor()

    query=("insert into registration (firstname,lastname,email,password,mobile) values (%s, %s, %s, %s, %s)")
    data=(emp['firstname'],emp['lastname'],emp['email'],emp['password'],emp['mobile'])

    cursor.execute(query,data)
    connection.commit()

if __name__=='__main__':
    connection=get_sql_connection()

    print(insert_employee(connection))