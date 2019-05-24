function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/todos/gSign',
        method: 'POST',
        headers : {
            token : id_token,
        }   
    })
    .done(function (response) {
        localStorage.setItem(`token`, response.token)
        $('#halaman-utama').show()
        $("#todo > div").remove()
        getData()
        $('#login-class').hide()
        $('#signOut').show()

    })
    .fail(function(jqXHR, textStatus) {
        console.log('request fail', textStatus)
        
    })
    
  }

  function signup() {
    event.preventDefault()
    let name = $('#nama-signup').val()
    let email = $('#email-signup').val()
    let password = $('#password-signup').val()
    $.ajax({
        url: 'http://localhost:3000/todos/signup',
        method: 'POST',
        data : {name : name,
            email: email,
            password: password}
    })
    .done(function (response) {
        $('#login-class').show()
        $('#signOut').hide()
        $('#signup-class').hide()

    })
    .fail(function(jqXHR, textStatus) {
        $('#signup-error').html(`<h5 class="alert">${jqXHR.responseJSON.msg}</h5>`)
        console.log('request fail', textStatus)
        
    })
  }

function login() {
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url : 'http://localhost:3000/todos/login',
        method : 'POST',
        data: {
            email : email,
            password : password
        }
        
    })
    .done(function (response) {
        localStorage.setItem(`token`, response.token)
        $('#halaman-utama').show()
        $("#todo > div").remove()
        getData()
        $('#login-class').hide()

           
    })
    .fail(function(jqXHR, textStatus) {
        // $('#not-found').show()
        console.log(jqXHR)
        $('#login-error').html(`<h5 class="alert">fill form correctly</h5>`)
        console.log('request fail', textStatus)
        
    })
    
}
function signout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log("User signed out.");
    });
    localStorage.clear()
    $('#halaman-utama').hide()
    $('#login-class').show()
    $('#signOut').hide()
}
function getData() {
    $.ajax({
        url : 'http://localhost:3000/todos',
        method: 'GET',
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(function(response) {
        if(response.length === 0){
            $('#todo').append(`<h1 style="color:black">Create Your Todo<h1>`)

        }
        for (const data of response) {
            let tanggal = new Date(data.due_date).toDateString()
            if(data.status === 'complete'){
                var kos = "complete"
            }else{
                var kos = "pending"
            }
            $("#todo")
            .append(`<div class="m-3 card-header ${kos}" id="title">
            <h3 class="card-title" id="due_date">Title: ${data.title}</h3>
          </div>
          <div class="card-body" id="card">
            <h5 class="card-title" id="due_date">Date: ${tanggal}</h5>
            <p class="card-text" id="Description">Description: ${data.description}</p>
            <button class="btn btn-success" onclick="update('${data._id}')" id="update-button")">Complete</button>
            <button class="btn btn-danger" onclick="del('${data._id}')" id ="delete-button">Delete</button>
          </div>
          <div class="card-footer text-muted">
           status: ${data.status}
          </div>`)
        }
        
        
    })
    .fail(function(jqXHR, textStatus) {
      
        console.log('request fail', textStatus)
        
    })
}

function del(id) {
    console.log(id)
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method: 'DELETE',
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(function (response) {
        $("#todo > div").remove()
        getData()
        
    })
    .fail(function(jqXHR, textStatus) {
        console.log('request fail', textStatus)
        
    })
    
}

function update(id) {
    event.preventDefault()
    $.ajax({
        url : `http://localhost:3000/todos/${id}`,
        method: 'PATCH',
        headers: {
            token : localStorage.getItem('token')
        }
    })
    .done(function (response) {
        $("#todo > div").remove()
        getData()
        
    })
    .fail(function(jqXHR, textStatus) {
        console.log('request fail', textStatus)
        
    })

    
}

//findone



function create() {
    event.preventDefault()
    let title = $('#title').val()
    let description = $('#description').val()
    let due_date = $('#date').val()
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: 'POST',
        data : {title : title,
            description: description,
            due_date: due_date},
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function (response) {
        $("#todo > div").remove()
        getData()
    })
    .fail(function(jqXHR, textStatus) {
        console.log(jqXHR.responseJSON.errors)
        console.log('request fail', textStatus)
        
    })
}



$(document).ready(function () {
    $('#signup-class').hide()
    if(localStorage.token){
        $('#halaman-utama').show()
        $('#login-class').hide()
        $('#signOut').show()
    }else {
        $('#halaman-utama').hide()
        $('#login-class').show()
        $('#signOut').hide()
        
    }
    
    $('#login-form').submit(function () {
        event.preventDefault()
        login()
    })

    $('#delete-button').click(function (id) {
        event.preventDefault()   
        del(id)

    })

    $('#update-button').click(function (id) {
        event.preventDefault()
        update(id)
       
    })

    $('#btn-signup').click(function() {
        event.preventDefault()
        $('#halaman-utama').hide()
        $('#login-class').hide()
        $('#signOut').hide()
        $('#signup-class').show()
    })

    $('#signup-form').submit(function () {
        event.preventDefault()
        signup()
        
    })




    $('#todo-form').submit(function () {
        event.preventDefault()
        create()
       
        
        
    })
    getData()
   
    
})