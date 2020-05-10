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

# IBM Watson Tone Analyzer
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# IBM Watson NLU
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions, EmotionOptions, KeywordsOptions


# Twitter Credentials
consumer_key = os.getenv("TWITTER_CONSUMER_KEY")
consumer_secret = os.getenv("TWITTER_CONSUMER_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

# Watson Authentication
toneAnalyzerAPIKey = IAMAuthenticator(os.getenv("TONE_ANALYZER_API_KEY"))
nluAPIKey = IAMAuthenticator(os.getenv("NLU_API_KEY"))

tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=toneAnalyzerAPIKey
)
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2019-07-12',
    authenticator=nluAPIKey
)

tone_analyzer.set_service_url(os.getenv("TONE_ANALYZER_URL"))
natural_language_understanding.set_service_url(os.getenv("NLU_URL"))

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
limit = random.randrange(600,610)

if currentTimeStamp.hour < 8:
    startTimeStampHour = 0
    startTimeStampDay = currentTimeStamp.day  
else:
    startTimeStampHour = currentTimeStamp.hour - 8
    startTimeStampDay = currentTimeStamp.day 


########### HELPER FUNCTIONS ##########
def Merge(dict1 ,dict2):
    res  = Counter(dict1) + Counter(dict2) 
    return res

############### ROUTES ################
# Collect tweets from a hashtag
@app.route('/api/getTweets',methods=['GET',"POST"])
def getTweets():

    startTime = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, startTimeStampDay, startTimeStampHour, currentTimeStamp.minute, currentTimeStamp.second)
    endTime = datetime.datetime(currentTimeStamp.year, currentTimeStamp.month, currentTimeStamp.day, currentTimeStamp.hour, currentTimeStamp.minute, currentTimeStamp.second)

    # Variables to store resultant data
    posts = {"date" : currentDate, "hashtags":{}, "results":{}}
    posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStamp.hour)] = []
    hashtagsCounter = {}


    count = 0
    # Get the tweets from a particular hashtag
    for tweet in tweepy.Cursor(auth_api.search,q="#lockdown",count=200,
                            lang="en",geocode="22.9734,78.6569,1000km").items():
        tweets = ""

        # Collect the tweets for the past 6 hrs
        if tweet.created_at < endTime and tweet.created_at > startTime:

            tweets += tweet.text + "\n"            
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

    # Find the tones of the tweets
    toneAnalysis = tone_analyzer.tone({'text': tweets},content_type='application/json').get_result()
    # Find the sentiment, emotions and keywords
    sentimentAnalysis = natural_language_understanding.analyze(text = tweets,features=Features(sentiment=SentimentOptions(),emotion=EmotionOptions(),keywords=KeywordsOptions(sentiment=True,emotion=True,limit=2))).get_result()
    
    posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStamp.hour)][0] = sentimentAnalysis
    posts["results"][str(startTimeStampHour)+"-"+str(currentTimeStamp.hour)][1] = toneAnalysis

    # Write results to the file
    with open('result.json', 'w') as fp:
        json.dumps(posts, indent=4, default=json_util.default)


    # Store the results to the database
    existingData = mongo.db.tweets.find_one({"date":currentDate})
    
    if existingData == None:
        mongo.db.tweets.insert(posts)
    else:
        # Merge the two dictionaries
        newHashtags = Merge(existingData["hashtags"], posts["hashtags"])

        # Update Data in DB
        mongo.db.tweets.update({"date":currentDate},{"$set":{"hashtags": newHashtags}})
        mongo.db.tweets.update({"date":currentDate},{"$set":{"results." + (str(startTimeStampHour) + "-" + str(currentTimeStamp.hour)) : posts["results"][str(startTimeStampHour) + "-" + str(currentTimeStamp.hour)]}})
    posts = json.dumps(posts, indent=4, default=json_util.default)
    
    return posts

# Get tweets by date
@app.route('/api/getTweetsByDate',methods=['GET',"POST"])
def getTweetsByDate():
    tweets = ""
    size = 0
    topInfluencersCounter = {}
    res = mongo.db.tweets.find_one({"date":currentDate})


    
    if res != None:
        # Calculate the number of tweets and likes for each person
        for result in res["results"]:
            size += len(res["results"][result])
        

        for result in res["results"]:
                for item in res["results"][result]:
                    try:
                        # Find the top influencers and their tweetscount and likes count
                        if item["screenName"] in topInfluencersCounter:
                            topInfluencersCounter[item["screenName"]]["favouriteCount"] += int(item["favouriteCount"])
                            topInfluencersCounter[item["screenName"]]["tweetCount"] += 1   
                        else:
                            topInfluencersCounter[item["screenName"]] = {}
                            topInfluencersCounter[item["screenName"]]["favouriteCount"] = int(item["favouriteCount"])
                            topInfluencersCounter[item["screenName"]]["tweetCount"] = 1
                    except:
                        pass
        
        topInfluencersCounter =  {k: v for k, v in reversed(sorted(topInfluencersCounter.items(), key=lambda item: item[1]["favouriteCount"]))}

        # Add the top 5 hastags in the result
        res["topInfluencers"] = {}         
        count = 0
        for key in topInfluencersCounter:
            res["topInfluencers"][key] = topInfluencersCounter[key]
            count += 1
            if count == 20:
                break

        res["totalTweetCount"] = size - 2

        # Calculate average sentiment score
        totalScore = 0
        count = 0
        
        for result in res["results"]:
            count += 1 
            totalScore += res["results"][result][0]["sentiment"]["document"]["score"]

        overallSentimentScore = totalScore / count 
        overallSentimentLabel = ""

        if overallSentimentScore < 0 : overallSentimentLabel = "Negative"
        elif overallSentimentScore > 0 : overallSentimentLabel = "Positive"
        else: overallSentimentLabel = "Neutral" 

        res["overallSentimentScore"] = overallSentimentScore
        res["overallSentimentLabel"] = overallSentimentLabel

        return json.dumps(res, indent=4, default=json_util.default)
    else:
        return {}

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)