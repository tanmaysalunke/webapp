$(function(){
	$('#btnSignIn2').click(function(){
		console.log("This is working so far");
		$.ajax({
			url: '/validateteacherlogin',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});