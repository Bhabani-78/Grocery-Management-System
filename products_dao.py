import mysql.connector
from sql_connection import get_sql_connection

def get_products(connection):

    cursor=connection.cursor()

    query=("select products.product_id,products.cat_id,products.name,products.uom_id,products.price_per_unit," "uom.uom_name,category.cat_name from products inner join uom on products.uom_id=uom.uom_id inner join category on products.cat_id=category.cat_id")

    cursor.execute(query)

    response=[]

    for(product_id,cat_id,name,uom_id,price_per_unit,uom_name,cat_name) in cursor:
        response.append({
            'product_id':product_id,
            'cat_id':cat_id,
            'name':name,
            'uom_id':uom_id,
            'price_per_unit':price_per_unit,
            'uom_name':uom_name,
            'cat_name':cat_name,

        })

    return response

def insert_new_product(connection,product):
    cursor=connection.cursor()

    query=("insert into products (cat_id,name,uom_id,price_per_unit) values (%s, %s, %s, %s)")
    data=(product['cat_id'],product['name'],product['uom_id'],product['price_per_unit'])

    cursor.execute(query,data)
    connection.commit()

def delete_product(connection,product_id):
    cursor=connection.cursor()
    query=("delete from products where product_id=" + str(product_id))
    cursor.execute(query)
    connection.commit()

if __name__=='__main__':
    connection=get_sql_connection()

    print(get_products(connection))