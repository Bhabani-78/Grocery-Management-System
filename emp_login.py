from flask import Flask, render_template, request
import mysql.connector

app=Flask(__name__)
@app.route('/')
def grocery():
    return render_template("login.html")

@app.errorhandler(404)
@app.route('/result',methods=['POST','GET'])
def result():
    mydb=mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="grocery"
    )
    mycursor=mydb.cursor()
    if request.method=='POST':
        Login=request.form
        username=Login["email"]
        password=Login["password"]
        mycursor.execute("select * from registration where email='"+username+"' and password='"+password+"'")
        r=mycursor.fetchall()
        count=mycursor.rowcount
        if count==1:
            return render_template("index.html")
        elif count>1:
            return "more than one user!!"
        else:
            return render_template("login.html")
        
    mydb.commit()
    mycursor.close()
if __name__=='__main__':
    app.run(debug=True)    

