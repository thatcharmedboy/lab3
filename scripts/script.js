var searchterm;
$(document).ready(function() {
	main();
});

function main() {

	searchterm = "Animal Crossing";	
	var s = new Spotter("twitter.search",
			{q:searchterm, period:10},
			{buffer:true, bufferTimeout:1000});
	registerTweets(s, searchterm);
	s.start();
	$("form").submit(function () { return false; });
	}

function registerTweets(s, q) {
	var array = [];
	var num = 0;
	
	s.register(function(tweet) {
		if (q === searchterm) {
			var profile_img = "<img class=profilepic src='" + tweet.profile_image_url + "' alt='" +tweet.from_user_name +"' />";

			if (num % 2 === 0)
				var stripe = 'whiteonblack';
			else
				var stripe = 'blackonwhite';

			array.push(
				$("<div class='tweet " + stripe + " " + q + "'>" + profile_img + tweet.from_user_name + " tweets: " + tweet.text + "</div>")
					.prependTo($("#tweets"))
					.hide()
					.slideDown(500)
			);
			num++;

			if (array.length > 10) {
				lastTweet = array.shift();
				lastTweet.fadeOut(function() {
					lastTweet.remove();
				});
			}
		}
	});
}

