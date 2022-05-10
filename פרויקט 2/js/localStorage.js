//local storage
let user, users, sname, spassword, semail, scores, lname, lpassword, currentUser;

let signUpButton = document.getElementById("signBotton");
signUpButton.addEventListener("click", signUp);

// a function for sign up
function signUp() {
    users = JSON.parse(localStorage.getItem('users'));
    sname = document.getElementById("sname").value;
    semail = document.getElementById("semail").value;
    spassword = document.getElementById("spassword").value;
    // checking if the user enters details
    if (!sname || !semail || !spassword)
    {
        return;
    }
    let user = {
        name: sname,
        email: semail,
        password: spassword,
        scores: 0
    }
    // build an array if it is the first user
    if (!users) {
        users = [];
    }
    // check if the user is almost exists in the local storage
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == user.email) {
                alert("you have to log in");
                return;
            }
        }
    }
    // add the user to the local storage
    users.push(user);
    localStorage.setItem('users',JSON.stringify( users));
    index = users.length - 1;
    localStorage.setItem('index', JSON.stringify(index));
    window.open("games.html", "games");
}

let loginButton = document.getElementById("logBotton");
loginButton.addEventListener("click", login);

// a function for log in
function login() {
    users = JSON.parse(localStorage.getItem('users'));
    lname = document.getElementById("lname").value;
    lpassword = document.getElementById("lpassword").value;

    //  checking if the user enters details
    if(!lname || !lpassword)
    {
        return;
    }

    // check if there are users in the local storage
    if (!users) {
        alert("you have to sign up");
        return;
    }

    // look for the user in the local storage
    for (let i = 0; i < users.length; i++) {
        if (users[i].name == lname && users[i].password == lpassword) {
            index = i;
            localStorage.setItem('index', JSON.stringify(index));
            window.open("games.html", "games");
            return;
        }
    }
    // didn't find the user in the local storage
    alert("you have to sign up");
}

