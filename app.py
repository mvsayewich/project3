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
from collections import defaultdict

#create an engine and create the reference for table in output.sqlite through ORM
engine=create_engine("sqlite:///db/output.db")
result=engine.execute("select* from Real_Estate").fetchall()

app=Flask(__name__)

@app.route("/templates/main.html")
@app.route("/")
def home_page():
    return render_template("main.html")

@app.route("/templates/hpidata.html")
@app.route("/hpidata.html")
@app.route("/hpidata")
def hpi_data():
    return render_template("hpidata.html")

@app.route("/templates/geodata.html")
@app.route("/geodata.html")
@app.route("/geodata")
def geo_data():
    return render_template("geodata.html")

@app.route("/templates/ontdata.html")
@app.route("/ontdata.html")
@app.route("/ontdata")
def ont_data():
    return render_template("ontdata.html")

@app.route("/city")
def city_list():
    city_name=[]
    for i in result:
        city_name.append(i["Region"])
        city_name=list(set(city_name))
    return jsonify(city_name)


@app.route("/metadata/<city>")
def city_house(city):
    metadata_city=defaultdict(list)
    for i in result:
        if i.Region==city:
            metadata_city["Date"].append(i.Date)
            metadata_city["Composite_Benchmark"].append(i.Composite_Benchmark)
            metadata_city["Single_Family_Benchmark"].append(i.Single_Family_Benchmark)
            metadata_city["One_Storey_Benchmark"].append(i.One_Storey_Benchmark)
            metadata_city["Two_Storey_Benchmark"].append(i.Two_Storey_Benchmark)
            metadata_city["Townhouse_Benchmark"].append(i.Townhouse_Benchmark)
            metadata_city["Apartment_Benchmark"].append(i.Apartment_Benchmark)
    return jsonify (metadata_city)




if __name__=="__main__":
    app.run(debug=True)

