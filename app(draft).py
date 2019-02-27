#import modules
from flask import Flask, render_template,request,jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

#create an app
app=Flask(__name__)

'''
This is the sqlalchemy version
engine=create_engine("sqlite:///Database/XXX.sqlite,echo=True)
#conn=engine.connect()
Session=sessionmaker(bind=engine)
session=Session()
'''
#Database set up to import sqlite
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///Database/XXX.sqlite"
db=SQLAlchemy(app)


#reflect the existing sql database into new models, create base as parent class
Base=automap_base()
#reflect the schema of XXX.sqlite and produce the mapping
Base.prepare(db.engine,reflect=True)
#save the actual tables name as reference so can manipulate in the python enviroment

NewTableName=Base.classes.TableName

#use a decorator and get
@app.route("/")
def index():
    """Return the homepage for project"""
    return render_template("index.html")
#use /cities to store the cities name in json format
@app.route("/cities")
def names():
    '''return a list of cities name as json in /cities'''

#use /cities/cityname to store hourse price in a certain city 
@app.route("/cities/<cityname>")
def city_house_info(cityname):
    city_house_price=[
        NewTableName.city,
        NewTableName.XXprice,
        NewTableName.XXprice,
    ]






if __name__=="__main__":
    app.run(debug=True)