const shopNamevalidation = (ShopName) =>{
    if(!ShopName)
    throw 'The shop name is invalid';
    if(typeof ShopName!== 'string')
    throw 'The Shop name is not a string';
    if(ShopName.length === 0)
    throw 'Shop name must be provided';
    if(ShopName.trim().length ===0)
    throw 'The shop name contains only white spaces';
    var regex =new RegExp(/[^A-Za-z0-9]/g);
     if(regex.test(ShopName))
     throw 'The Shop name must contain only alpha numeric characters';
}

const userNamevalidation = (username) =>{
    if(!username)
    throw 'The username is invalid';
    if(typeof username !== 'string')
    throw 'The username is not a string';
    if(username.length === 0)
    throw 'username must be provided';
    if(username.length < 4)
    throw 'The username must be atleast 4 characters long';
    if(username.trim().length === 0)
    throw 'username contains only white spaces';
    var regex =new RegExp(/[^A-Za-z0-9]/g);
     if(regex.test(username))
     throw 'The username must contain only alpha numeric characters';
}

const passwordValidation = (password) =>{
    if(!password)
    throw 'The password is invalid';
    if(typeof password !== 'string')
    throw 'The password is not a string';
    if(password.length === 0)
    throw 'password must be provided';
    if(password.length < 6)
    throw 'password must be atleast 6 characters long';
    if(password.trim().length === 0)
    throw 'password contains only white spaces';
    if(password.indexOf() !== -1)
    throw 'password contains atleast one space in it';
}

module.exports = {
    userNamevalidation,
    passwordValidation
}