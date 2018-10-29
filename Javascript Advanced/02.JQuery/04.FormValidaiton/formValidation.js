function validate() {
    let usernameField = $('#username');
    let emailField = $('#email');
    let passwordField = $('#password');
    let confirmPasswordField = $('#confirm-password');
    let companyNumberField = $('#companyNumber');
    let submitButton = $('#submit');
    let checkbox = $('#company');
    let isChecked = false;

    checkbox.on('change', toggleCompanyInfo);
    submitButton.on('click', validateFields);

    function validateFields(e) {
        e.preventDefault();

        let username = usernameField.val();
        let email = emailField.val();
        let password1 = passwordField.val();
        let password2 = confirmPasswordField.val();

        let usernameIsValid = validateUsername(username);
        let emailIsValid = validateEmail(email);
        let passwordIsValid = validatePassword(password1, password2);
        let companyNumberIsValid = isChecked ?
            validateCompanyNumber(Number(companyNumberField.val())) : true;

        let isValid = usernameIsValid && emailIsValid && passwordIsValid && companyNumberIsValid;

        if (isValid) {
            $('#valid').css('display', 'block');
        } else {
            $('#valid').css('display', 'none');
        }
    }

    function validateCompanyNumber(number) {
        if (number >= 1000 && number <= 9999) {
            companyNumberField.css('border', 'none');
            return true;
        } else {
            companyNumberField.css('border', 'solid');
            companyNumberField.css('border-color', 'red');
            return false;
        }
    }

    function validatePassword(password1, password2) {
        const regex = /^\w{5,15}$/g;
        let isValid = regex.test(password1);
        if (!isValid || password1 !== password2) {
            passwordField.css('border', 'solid');
            passwordField.css('border-color', 'red');
            confirmPasswordField.css('border', 'solid');
            confirmPasswordField.css('border-color', 'red');
        } else {
            passwordField.css('border', 'none');
            confirmPasswordField.css('border', 'none');
        }
        return isValid;
    }

    function validateEmail(email) {
        const regex = /^.+@.*?(\.).*$/g;
        let isValid = regex.test(email);
        if (!isValid) {
            emailField.css('border', 'solid');
            emailField.css('border-color', 'red');
        } else {
            emailField.css('border', 'none');
        }
        return isValid;
    }

    function validateUsername(username) {
        const regex = /^[a-zA-Z0-9]{3,20}$/g;
        let isValid = regex.test(username);
        if (!isValid) {
            usernameField.css('border', 'solid');
            usernameField.css('border-color', 'red');
        } else {
            usernameField.css('border', 'none');
        }
        return isValid;
    }

    function toggleCompanyInfo() {
        isChecked = !isChecked;
        if (isChecked) {
            $('#companyInfo').css('display', 'inline');
        } else {
            $('#companyInfo').css('display', 'none');
        }
    }
}
