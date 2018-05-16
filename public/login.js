$(document).ready(() => {
    $('#regBtn').click(() => {
        $.ajax({
            type: 'GET',
            url: '/register',
            success: (data) => {
                $('#regDiv').html(data);
            }
        });
    });

    $('#loginBtn').click(() => {
        $.ajax({
            type: 'GET',
            url: '/login',
            success: (data) => {
                $('#loginDiv').html(data);
            }
        });
    });

    // ==========Login Form Request =============
    $('#loginForm').click(() => {
        let uname = $('#uname').val();
        let upass = $('#upass').val();
        // bcrypt and send the already encrypted pass
        let loginData = {'name': uname, 'pass': upass};
        $.ajax({
            type: 'POST',
            url: '/demo',
            data: loginData,
            success: (data) => {
                $('#mainDiv').html(data);
            }
        });
    });

    // ======== Register Form ==========
    $('#regForm').click(() => {
        let uname = $('#uname').val();
        let upass = $('#upass').val();
        // call bcrypt for upass
        let regData = {'name': uname, 'pass': upass};
        $.ajax({
            type: 'POST',
            url: '/regiterToDb',
            data: regData,
            success: (data) => {
                $('#mainDiv').html(data);
            }
        });
    });

    // ====== \Save profile Data ======
    $('#saveBtn').click(() => {
        let email = $('#email').val();
        let phone = $('#phone').val();
        let education = $('#education').val();
        let aoi = $('#aoi').val();
        let name = $('#name').val();
        let pass = $('#pass').val();
        let profileData = {
            'email': email,
            'phone': phone,
            'education': education,
            'aoi': aoi,
            'name': name,
            'pass': pass
        };
        $.ajax({
            type: 'POST',
            url: '/completeprofile',
            data: profileData,
            success: (data) => {
                $('#mainDiv').html(data);
            }
        });
    });
});