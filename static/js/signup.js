$(function() {
    $('#btnSignUp').click(function() {
        console.log("This is working so far");
        $.ajax({
            url: '/signup',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
		      console.log(response);
		      alert("User created successfully!!! Please go to the Login Page");                
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});
