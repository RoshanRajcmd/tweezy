import os
from dotenv import load_dotenv

# Tweepy
import tweepy
from tweepy import OAuthHandler
from tweepy import API
from tweepy import Cursor

load_dotenv()

# Twitter Credentials
consumer_key = os.getenv("TWITTER_CONSUMER_KEY")
consumer_secret = os.getenv("TWITTER_CONSUMER_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token,access_token_secret)
auth_api=API(auth)

count = 0
for tweet in tweepy.Cursor(auth_api.search,q="#lockdown",count=100,
                           lang="en",geocode="13.0827,80.2707,200km").items():
    # print (tweet.id, tweet.text)
    # print(tweet.user)
    print("============================")
    print(tweet.id, tweet.text)
    print(tweet.entities)
    print(tweet.user.followers_count)
    print(tweet.user.friends_count)
    # print(tweet.created_at)
    # print(tweet.favourites_count)
    print(tweet.user.profile_image_url)
    print(tweet.user.location)
    # print(tweet.id)
    # print(tweet.possibly_sensitive)
    # print(tweet.user.coordinates)
    count += 1
    if(count == 200):
        break
    