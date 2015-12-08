$(document).ready(function (){
	console.log('Document ready');
	$(".chat").hide();
	$("#user_table").hide();
	var socket = io.connect();

		$('#new').submit(function(){
		console.log('Posted form')
		
		socket.emit("adding_user", {
			name: $("#name").val(),
		})

		$(".form").hide();
		$(".chat").show();
		$("#user_table").show();
		return false;
	})

	//Letting other users know about new user

	socket.on("user_added", function(data){

		var new_user_name = data.user.name
		console.log(data.user.name)

		$("#chatroom").append("<li class ='bg-danger'>"+new_user_name+" joined the chat!</li>")
	})

	//Welcoming new user

	socket.on("welcome", function(data){

		var html = '';
		for (message in data.messages){
			html += "<li><span class = 'bg-info'>"+data.messages[message].author+" says: </span> <span class='bg-warning'>"+data.messages[message].message+"</span></li>"
		}

		html += "<li class = 'bg-success center'>Welcome "+data.user.name+"!</li>"
		console.log(html)

		$("#chatroom").empty().append(html);

	})

	socket.on('fill_user_table', function(data){
		$("#user_list").html('');
		for (user in data.users) {
			$("#user_list").append('<li>'+data.users[user].name+'</li>');
		}
		$('#user_table').scrollTop($('#user_table')[0].scrollHeight);
	})

	socket.on('user_left', function(data){
		$("#chatroom").append("<li class = 'bg-danger'>"+data.user+" left the room.</li>");
	})

	$("#new_message").submit(function() {

		var message = $("#message").val()
		console.log(message)

		socket.emit("new_message", {
			message: message

		})
		$("#message").val('')
		return false;
	})

	socket.on("message_added", function(data){
		var message = data.message.message
		var author = data.message.author

		// blacklisted words //
			if (message.toLowerCase() == 'swain' || 
				message.toLowerCase() == 'doublelift' ||
				message.toLowerCase() == 'tsm' ||
				message.toLowerCase() == 'clg' ||
				message.toLowerCase() == 'captain' ||
				message.toLowerCase() == 'trash' ||
				message.toLowerCase() == 'senpai' ||
				message.toLowerCase() == 'kappa' ||
				message.toLowerCase() == 'aatrox' ||
				message.toLowerCase() == 'ashe' ||
				message.toLowerCase() == 'akali' ||
				message.toLowerCase() == 'blitzcrank' ||
				message.toLowerCase() == 'corki' ||
				message.toLowerCase() == 'dyrus' ||
				message.toLowerCase() == 'alistar' ||
				message.toLowerCase() == 'ahri' ||
				message.toLowerCase() == 'darius' ||
				message.toLowerCase() == 'annie' ||
				message.toLowerCase() == 'anivia'  ||
				message.toLowerCase() == 'amumu' ||
				message.toLowerCase() == 'caitlyn' ||
				message.toLowerCase() == 'braum' ||
				message.toLowerCase() == 'brand' ||
				message.toLowerCase() == 'bard' ||
				message.toLowerCase() == 'azir' ||
				message.toLowerCase() == 'cassiopeia' ||
				message.toLowerCase() == "cho'gath" ||
				message.toLowerCase() == 'diana' ||
				message.toLowerCase() == "dr. Mundo" ||
				message.toLowerCase() == 'draven' ||
				message.toLowerCase() == 'ekko' ||
				message.toLowerCase() == 'elise' ||
				message.toLowerCase() == 'evelynn' ||
				message.toLowerCase() == 'ezreal' ||
				message.toLowerCase() == 'fiddlesticks' ||
				message.toLowerCase() == 'fiora'  ||
				message.toLowerCase() == 'fizz' ||
				message.toLowerCase() == 'galio' ||
				message.toLowerCase() == 'gangplank' ||
				message.toLowerCase() == 'garen' ||
				message.toLowerCase() == 'gnar' ||
				message.toLowerCase() == 'gragas' ||
				message.toLowerCase() == 'graves' ||
				message.toLowerCase() == 'hecarim' ||
				message.toLowerCase() == 'heimerdinger' ||
				message.toLowerCase() == 'illaoi' ||
				message.toLowerCase() == 'irelia' ||
				message.toLowerCase() == 'janna' ||
				message.toLowerCase() == 'jarvan' ||
				message.toLowerCase() == 'jax' ||
				message.toLowerCase() == 'jayce' ||
				message.toLowerCase() == 'jinx' ||
				message.toLowerCase() == 'kalista'  ||
				message.toLowerCase() == 'karma' ||
				message.toLowerCase() == 'karthus' ||
				message.toLowerCase() == 'kassadin' ||
				message.toLowerCase() == 'katarina' ||
				message.toLowerCase() == 'kayle' ||
				message.toLowerCase() == 'kennen' ||
				message.toLowerCase() == "kha'zix" ||
				message.toLowerCase() == 'kindred' ||
				message.toLowerCase() == "kog'maw" ||
				message.toLowerCase() == 'leblanc' ||
				message.toLowerCase() == 'lee Sin' ||
				message.toLowerCase() == 'leona' ||
				message.toLowerCase() == 'lissandra' ||
				message.toLowerCase() == 'lucian' ||
				message.toLowerCase() == 'lulu' ||
				message.toLowerCase() == 'lux' ||
				message.toLowerCase() == 'malphite'  ||
				message.toLowerCase() == 'malzahar' ||
				message.toLowerCase() == 'maokai' ||
				message.toLowerCase() == 'master yi' ||
				message.toLowerCase() == 'miss fortune' ||
				message.toLowerCase() == 'mordekaiser' ||
				message.toLowerCase() == 'morgana' ||
				message.toLowerCase() == 'nami' ||
				message.toLowerCase() == 'nasus' ||
				message.toLowerCase() == 'nautilus' ||
				message.toLowerCase() == 'nidalee' ||
				message.toLowerCase() == 'nocturne' ||
				message.toLowerCase() == 'nunu' ||
				message.toLowerCase() == 'olaf' ||
				message.toLowerCase() == 'orianna' ||
				message.toLowerCase() == 'pantheon' ||
				message.toLowerCase() == 'poppy' ||
				message.toLowerCase() == 'quinn'  ||
				message.toLowerCase() == 'rammus' ||
				message.toLowerCase() == "rek'sai" ||
				message.toLowerCase() == 'renekton' ||
				message.toLowerCase() == 'rengar' ||
				message.toLowerCase() == 'riven' ||
				message.toLowerCase() == 'rumble' ||
				message.toLowerCase() == 'ryze' ||
				message.toLowerCase() == 'sejuani' ||
				message.toLowerCase() == 'shaco' ||
				message.toLowerCase() == 'shen' ||
				message.toLowerCase() == 'shyvana' ||
				message.toLowerCase() == 'singed' ||
				message.toLowerCase() == 'sion' ||
				message.toLowerCase() == 'sivir' ||
				message.toLowerCase() == 'skarner' ||
				message.toLowerCase() == 'sona'

				){
			alert("Never underestimate the power of the Scout's code.");
			return false;
		}

		$("#chatroom").append("<li><span class = 'bg-info'>"+author+" says: </span> <span class='bg-warning'>"+message+"</span></li>")
		$('#chatroom').scrollTop($('#chatroom')[0].scrollHeight);

	})
})

	// Insert random message every 5 seconds //
	function createRandomWord(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz',
        vowels = 'aeiou',
        rand = function(limit) {
            return Math.floor(Math.random()*limit);
        },
        i, word='', length = parseInt(length,10),
        consonants = consonants.split(''),
        vowels = vowels.split('');
    for (i=0;i<length/2;i++) {
        var randConsonant = consonants[rand(consonants.length)],
            randVowel = vowels[rand(vowels.length)];
        word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
        word += i*2<length-1 ? randVowel : '';
    }
    return word;
}
			count = 0;
			for(count=0; count < 1000; count++){
			setInterval(function() {
			$("#chatroom").append("<li><span class = 'bg-info'>"+createRandomWord(5)+" says: </span> <span class='bg-warning'>"+createRandomWord(10)+"</span></li>")
			console.log(name)
			}, 5000);
}

