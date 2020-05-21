$(function(){
	$('#btnSignIn1').click(function(){
		console.log("This is working so far");
		$.ajax({
			url: '/validatestudentlogin',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
				alert("Invalid Moodle ID or Password!!") 
			}
		});
	});
});