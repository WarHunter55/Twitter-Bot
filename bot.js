//tells our console that the bot is starting
console.log("The Bot is Starting!");

//require the twit package
var Twit = require('twit');

//We need to authenticate 
var T = new Twit({
	consumer_key: 'gjVEVOdXcRqDPXyuF2FsqLUgZ',
	consumer_secret: 'UltU8psXjuiv7fSWIAa9gIdmgvaRckbr8QqUWtqJ2hKDHlWZ9N',
	access_token: '847904623536951296-ghUjiGeTR5aUOdAnOFGQdVoVD04SPXV',
	access_token_secret: 'an8Q1MNYEu45NddSu75lXVkjthpg6w0fRTeJwDGM5raDw',
	timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})

//GET---> search by hashtag, location, user, etc
//POST---> Post tweets
//STREAM---> follows, you can @ them, mentions, you can @ them

//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//

//var parameters = {
//q: 'banana since:2011-07-11',
//	count: 2,
//	lang: 'jp'
//}

//T.get('search/tweets', parameters, gotData);
//function gotData(err, data, response){	
//	var tweets = data.statuses;
//	for(var i = 0; i < tweets.length; i++){
//		console.log(tweets[i].text);
//	}
//}


//var tweet = { status: 'I am the HYPE!!!' }
//T.post('statuses/update', tweet, gotData);

//tweetIt();

//setInterval(tweetIt, 1000*45);

function tweetIt() {

	//find a random real number from 0 to 1 and multiply by 100, and then round down

	var r = Math.floor(Math.random() * 100);
	var tweet = {
		status: ' ' + r + ' #providencehigh #phs #ecs #2017 '
	}

	T.post('statuses/update', tweet, gotData);

	function gotData(err, data, response) {
		if (err) {

			console.log("Something went wron!!!")
		} else {
			console.log("It Posted");
		}

	}
}



//STREAM FUNCTION
followTweet();

function followTweet() {

	var stream = T.stream('user')
	//Anything someone follows me
	stream.on('follow', followed);

	function followed(eventMsg) {
		var name = eventMsg.source.name;
		var screenName = eventMsg.source.screen_name;

		var fs = require('fs');
		console.log('finished tweet json');
		var json = JSON.stringify(eventMsg, null, 2);
		fs.writeFile("tweet.json, json");


		tweetIt2('@' + screenName + ' Thanks for following me, youll get new updates on the best games from 2017 and ill be giving away free prizes once a month and remember guys... I AM THE HYPE!!! Jk this is a bot im working on in Computer Science dont worry');

	}
}

function tweetIt2(txt) {
	var tweet = {
		status: txt

	}

	T.post('statuses/update', tweet, tweeted)

	function tweeted(err, data, response) {
		if (err) {
			console.log("something went wrong!");
		} else {
			console.log("you were followed");
		}
	}
}


//var exec = require('child_process').exec;

//var cmd = '"C:\Users\18disalvo.raymond\Desktop\P5ECS-Raymond\processing-3.3\processing-java.exe" --sketch="C:\Users\18disalvo.raymond\Desktop\P5ECS-Raymond\lesson 20\CircleSketch" --run';



//exec(cmd, processing);
//function processing(){
//console.log('finished image');
//}



var fs = require('fs');
processing();
function processing() {
	console.log("uploading image");
	var filename = 'picture/image1.jpg';
	
	var parameters = {
		encoding: 'base64'
	}
	
	var 64 = fs.readFileSync(filename, parameters);
	
	//upload before i can tweet it
	T.post('media/upload', {media_data: b64}, uploaded);
	
	function uploaded(err, data, resopnse){
		//This is where you will tweet your picture
		//My picture has a unique ID
		var id = data.media_id_string;
		var tweet = {
			
			status: 'ioefnjdfjksdfnkerwuisdfhgweuisdfjhweruisdfbhweruisdjhbweqr87sduygfaopioryirqyhroiqwyeruihdfajskfhw',
			media_ids: [id]
		}
		
		T.post('statueses/update', tweet, tweeted);
		function tweeted(err, data, response){
			
			if (err){
				console.log("Something went wrong!!!");
			}else{
				console.log("It posted!");
			}
			
		}
		
	}
	
}
