import os
import json
import datetime
import random
from bson import json_util
from collections import Counter

from dotenv import load_dotenv
load_dotenv()

# Tweepy
import tweepy
from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor

# Flask
from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request
from flask import Flask, send_from_directory

# PyMongo for DB
from flask_pymongo import PyMongo

# Twitter Credentials
consumer_key = os.getenv("TWITTER_CONSUMER_KEY")
consumer_secret = os.getenv("TWITTER_CONSUMER_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")


app=Flask(__name__)

# MongoDB Connection 
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
mongo = PyMongo(app)

# CORS
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# OAuth 
auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)
auth_api=API(auth)


# Global Variables
currentDate = str(datetime.datetime.now()).split(" ")[0]
currentTime = str(datetime.datetime.now()).split(" ")[1]
currentTimeStamp = datetime.datetime.now()
limit = random.randrange(300, 400)

if currentTimeStamp.hour == 0:
    startTimeStampHour = 23 - 6
    startTimeStampDay = currentTimeStamp.day - 1
else:
    startTimeStampHour = currentTimeStamp.hour - 10             
    startTimeStampDay = currentTimeStamp.day

############### ROUTES ################
# Collect tweets from a hashtag
@app.route('/api/getTweets',methods=['GET',"POST"])
def getTweets():

    start_date = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, startTimeStampDay, startTimeStampHour, currentTimeStamp.minute, currentTimeStamp.second)
    end_date = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, currentTimeStamp.day, currentTimeStamp.hour, currentTimeStamp.minute, currentTimeStamp.second)

    # Variables to store resultant data
    posts = {"date" : currentDate, "hashtags":{}, "results":{}}
    posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStamp.hour)] = []
    hashtagsCounter = {}


    count = 0
    # Get the tweets from a particular hashtag
    for tweet in tweepy.Cursor(auth_api.search,q="#lockdown",count=100,
                            lang="en",geocode="22.9734,78.6569,1000km").items():
        # Collect the tweets for the past 6 hrs
        if tweet.created_at < end_date and tweet.created_at > start_date:
            
            data = {
                "id":tweet.id,
                "text":tweet.text,
                "screenName" : tweet.user.screen_name,
                "followersCount":tweet.user.followers_count,
                "profilePicURL" : tweet.user.profile_image_url,
                "location" : tweet.user.location,
                "favouriteCount" : tweet.favorite_count,
                "retweetCount" : tweet.retweet_count,
                "userFriendsCount" : tweet.user.friends_count,
                "date" : str(tweet.created_at).split(" ")[0],
                "time" : str(tweet.created_at).split(" ")[1]
            }

            # Exception handling because some of the posts doesn't have the "possibly_sensitive" attribute
            try:
                data["isSensitive"] = tweet.possibly_sensitive
            except:
                pass
            
            posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStamp.hour)].append(data)

            # Calculate the frequency of the hashtags 
            for data in tweet.entities["hashtags"]:
                if data["text"].capitalize() in hashtagsCounter:
                    hashtagsCounter[data["text"].capitalize()] += 1
                else:
                    hashtagsCounter[data["text"].capitalize()] = 0

            count += 1
            if(count == limit):
                break

    # Sort the dictionary by the value
    sortedHashTagsCounter =  {k: v for k, v in reversed(sorted(hashtagsCounter.items(), key=lambda item: item[1]))}

    # Add the top 5 hastags in the result
    count = 0
    for key in sortedHashTagsCounter:
        posts["hashtags"][key] = sortedHashTagsCounter[key]
        count += 1
        if count == 5:
            break

    # # Write results to the file
    # with open('result.json', 'w') as fp:
    #     json.dump(posts, fp)


    # Store the results to the database
    existingData = mongo.db.tweets.find_one({"date":currentDate})
    
    if existingData == None:
        mongo.db.tweets.insert(posts)
    else:
        mongo.db.tweets.update({"date":currentDate},{"$set":{"results." + (str(startTimeStampHour) + "-" + str(currentTimeStamp.hour)) : posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStamp.hour)]}})
    posts = json.dumps(posts)
    
    return posts


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)