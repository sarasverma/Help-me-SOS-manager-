from typing import Union
import pandas as pd
import hashlib
import smtplib
import json
from fastapi import Request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from fastapi import Response
from fastapi.encoders import jsonable_encoder
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User :
    name:str
    email:str
    password:str



@app.post("/api/auth/login")
async def read_root(request: Request):
    req= await request.json()
    data=pd.read_csv("database.csv")
    if len(data[(data["email"]==req["email"]) & (data["password"]==req["password"])])!=0:
        authHash=data[data["email"]==req["email"]]["authtoken"].values[0]
        responseData={"authtoken":authHash}
        return responseData
    else:
        return {"error":"invalid credentials"}

@app.post("/api/auth/signup")
async def read_root(request: Request):
    req= await request.json()
    data=pd.read_csv("database.csv")
    authHash= hashlib.md5(req["email"].encode()).hexdigest()
    temp_data=pd.DataFrame([{"username":req["name"],"email":req["email"],"password":req["password"],"phone":"","emphone":"","empemail":"","authtoken":authHash,"long":"","lat":""}])
    data=pd.concat([data,temp_data])
    data.to_csv("database.csv",index=False)
    return {"authtoken": authHash}

@app.post("/api/settings")
async def read_root(request: Request):
    req= await request.json()
    data=pd.read_csv("database.csv")
    data.loc[data["authtoken"]==req["authtoken"],"ememail"]=req["email"]
    data.loc[data["authtoken"]==req["authtoken"],"emphone"]=req["mobileNo"]
    data.loc[data["authtoken"]==req["authtoken"],"emname"]=req["name"]
    data.to_csv("database.csv",index=False)
    return {"status": "success"}
    

@app.post("/api/track")
async def read_root(request: Request):
    req= await request.json()
    data=pd.read_csv("database.csv")
    data.loc[data["authtoken"]==req["authtoken"],"long"]=req["longitude"]
    data.loc[data["authtoken"]==req["authtoken"],"lat"]=req["latitude"]
    data.to_csv("database.csv",index=False)
    return {"status": "success"}

@app.post("/api/location")
async def read_root(request: Request):
    req= await request.json()
    data=pd.read_csv("database.csv")
    
    email=data.loc[data["email"]==req["email"],"ememail"].values[0]
    name=data[data["email"]==req["email"]]["username"].values[0]
    print(name)
    phone=data.loc[data["email"]==req["email"],"emphone"].values[0]
    latitude=str(data.loc[data["email"]==req["email"],"lat"].values[0])
    longitude=str(data[data["email"]==req["email"]]["long"].values[0])
    fromaddr = "rohansiddeshwara02@gmail.com"
    toaddr = email
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = email
    msg['Subject'] = "Alert"
    body = "Your friend "+name+" is in trouble at "+latitude+" "+longitude+"   \r\n"+"Track the live location at: http://localhost:3000/api/location?email="+req["email"]
    msg.attach(MIMEText(body, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, "hqopximliuvcqgcu")
    text = msg.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()
    return {"latitude": latitude,"longitude":longitude}
