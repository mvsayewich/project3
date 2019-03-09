import sqlite3

connection = sqlite3.connect("//User//yinyue//Documents//GitHub//project3//db//output.db")
cursor = connection.cursor()
cursor.execute("SELECT * from Real_Estate") 
