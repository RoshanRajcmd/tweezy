<h1 align="center">
  Tweezy
  <br>
</h1>

<h4 align="center">Sentiment analysis and visualization on COVID-19 Tweets built on top of <a href="http://reactjs.org" target="_blank">React</a>.</h4>

<div align="center">
<img src="https://miro.medium.com/max/450/1*p3Ste5R_iJzi5IcSmFkmtg.png" />
</div>

## Description
Tweezy is a Python-based application that collects tweets, analyzes their sentiment, and stores the results in a MongoDB database. It utilizes various libraries such as Flask for the web framework, Tweepy for accessing the Twitter API, NLTK for natural language processing, and IBM Watson services for advanced text analysis.

## Project Structure
```
tweezy
├── server
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RoshanRajcmd/tweezy
   cd tweezy
   ```

2. **Create a Virtual Environment**
   It is recommended to use a virtual environment to manage dependencies.
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   Install React for front-end
   ```bash
   cd client
   npm install
   ```
   Install the required Python packages listed in `requirements.txt`.
   ```bash
   cd server
   pip install -r server/requirements.txt
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the `server` directory and add your Twitter and IBM Watson credentials:
   ```
   TWITTER_CONSUMER_KEY=<your_consumer_key>
   TWITTER_CONSUMER_SECRET=<your_consumer_secret>
   TWITTER_ACCESS_TOKEN=<your_access_token>
   TWITTER_ACCESS_TOKEN_SECRET=<your_access_token_secret>
   TONE_ANALYZER_API_KEY=<your_tone_analyzer_api_key>
   NLU_API_KEY=<your_nlu_api_key>
   TONE_ANALYZER_URL=<your_tone_analyzer_url>
   NLU_URL=<your_nlu_url>
   MONGODB_URI=<your_mongodb_uri>
   ```

5. **Run the Application**
   You can run the application using the following command:
   ```bash
   python server/app.py
   ```

## Usage
- The application exposes several API endpoints: `http://localhost:5000`
  - `/api/getTweets`: Collects tweets based on a specified hashtag and analyzes their sentiment.
  - `/api/getTweetsByDate`: Retrieves tweets stored in the database by date.
  - `/api/getAllTweets`: Fetches all tweets stored in the database.
  - `/api/getCoordinates`: Gets geographical coordinates for a given city name.

## Docker
To run the application in a Docker container, follow these steps:

1. **Build the Docker Image**
   ```bash
   docker build -t tweezy-client client/
   docker build -t tweezy-server server/
   ```

2. **Run the Docker Container**
   ```bash
   docker run -p 3000:3000 client/ tweezy-client
   docker run -p 5000:5000 --env-file server/.env tweezy-server
   (or)
   docker compose -f 'docker-compose.yaml' up -d --build
   ```

Note: The Front-end is running on port 3000 and the Back-end is on port 5000 of your local machine.
