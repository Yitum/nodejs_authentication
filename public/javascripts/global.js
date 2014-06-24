$(document).ready(function(){
	console.log('Global.js file has been loaded.');
    bootstrapValidator();
});


//configurate Bootstrap Validator to validate the signup form
function bootstrapValidator(){
    $('#signupForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons:{
            //Glyphicons icons(included in Bootstrap)
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'

            //FontAwsome icons
            /*valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'*/
        },
        fields: {
            firstname: {
                message: 'The username is not valid.',
                validators: {
                    notEmpty: {
                        message: 'The firstname is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'The firstname must be more than 1 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The firstname can onlu consist of alphabetical, number and underscore'
                    }
                }
            },
            lastname: {
                message: 'The username is not valid.',
                validators: {
                    notEmpty: {
                        message: 'The lastname is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'The lastname must be more than 1 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: 'The lastname can only consist of alphabetical, number and underscore.'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address.'
                    }
                }
            },
            password: {
                message: 'The passport is not valid.',
                validators: {
                    notEmpty: {
                        message: 'The password is required and cannot be empty.'
                    },
                    stringLength: {
                        min: 6,
                        max: 15,
                        message: 'The password must be more than 6 and less than 15 characters long.'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9!@#$%^&*]+$/,
                        message: 'Enter a combination of at least six numbers, letters and punctuation marks(like ! and &).'
                    }
                }
            }
        }
    });
}