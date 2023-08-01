def get_cat(connection):
    cursor = connection.cursor()
    query = ("select * from category")
    cursor.execute(query)
    response = []
    for (cat_id, cat_name) in cursor:
        response.append({
            'cat_id': cat_id,
            'cat_name': cat_name
        })
    return response

if __name__ == '__main__':
    from sql_connection import get_sql_connection

    connection = get_sql_connection()
    # print(get_all_products(connection))
    print(get_cat(connection))