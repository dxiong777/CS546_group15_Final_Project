const { checkShopkeeper } = require("../../data/shopkeeper");

    const signupform =document.getElementById("signup-form");
    const shopname = document.getElementById("Shopname");
    const s_user = document.getElementById("s_username");
    const s_ownerfirst = document.getElementById("s_ownerFirstname");
    const s_ownerlast = document.getElementById("s_ownerLastname");
    const s_Address = document.getElementById("s_Address");
    const s_email = document.getElementById("s_email");
    const s_pincode = document.getElementById("s_pincode");
    const s_phoneNumber = document.getElementById("s_phoneNumber");
    const s_password = document.getElementById("s_password");
    const loginform = document.getElementById("login-form");
    const user_error = document.getElementById("user-error");
    const pass_error = document.getElementById("pass-error");
    const login_error = document.getElementById("login-error");
    if(loginform){
        loginform.onsubmit = (event) =>{
            user_error.hidden = true;
            pass_error.hidden = true;
            login_error.hidden = true;
            let user_text = document.getElementById("username").value;
            if(user_text.length === 0){
                event.preventDefault();
                user_error.hidden =false;
                return;
            } 
            if(typeof user_text !== 'string'){
                event.preventDefault();
                user_error.hidden =false;
                return;
            }
            if(user_text.length< 4){
                event.preventDefault();
                user_error.hidden = false;
                return;
            }
            if(user_text.trim().length === 0){
                event.preventDefault();
                user_error.hidden = false;
                return;
            }
            //------ login user name---//
            let pass_text = document.getElementById("password").value;
            if(pass_text.length === 0){
                event.preventDefault();
                pass_error.hidden =false;
                return;
            } 
            if(typeof pass_text !== 'string'){
                event.preventDefault();
                pass_error.hidden =false;
                return;
            }
            if(pass_text.length < 6){
                event.preventDefault();
                user_error.hidden = false;
                return;
            }
            if(pass_text.trim().length === 0){
                event.preventDefault();
                pass_error.hidden = false;
                return;
            }
            if(pass_text.indexOf() !== -1){
                event.preventDefault();
                pass_error.hidden = false;
                return;
            }
            //-----login password---//
            
        }
    }
    if(signupform){
        signupform.onsubmit = (event) =>{
            // event.preventDefault();
            shopname.hidden = true;
            s_user.hidden = true;
            s_ownerfirst.hidden = true;
            s_ownerlast.hidden = true;
            s_Address.hidden = true;
            s_email.hidden = true;
            s_pincode.hidden = true;
            s_phoneNumber.hidden = true;
            s_password.hidden = true;
            let shopname_text = document.getElementById("ShopName").value;
            if(shopname_text.length === 0){
                event.preventDefault();
                shopname.hidden =false;
                return;
            } 
            if(typeof shopname_text !== 'string'){
                event.preventDefault();
                shopname.hidden =false;
                return;
            }
            if(shopname_text.length< 4){
                event.preventDefault();
                shopname.hidden = false;
                return;
            }
            if(shopname_text.trim().length === 0){
                event.preventDefault();
                shopname.hidden = false;
                return;
            }
            //--------Shop name------//
            
            let s_user_text = document.getElementById("s_username").value;
            if(s_user_text.length === 0){
                event.preventDefault();
                s_user.hidden =false;
                return;
            } 
            if(typeof s_user_text !== 'string'){
                event.preventDefault();
                s_user.hidden =false;
                return;
            }
            if(s_user_text.length< 4){
                event.preventDefault();
                s_user.hidden = false;
                return;
            }
            if(s_user_text.trim().length === 0){
                event.preventDefault();
                s_user.hidden = false;
                return;
            }
            //------user name -------//
           
            let s_first_text = document.getElementById("ownerFirstname").value;
            if(s_first_text.length === 0){
                event.preventDefault();
                s_ownerfirst.hidden =false;
                return;
            } 
            if(typeof s_first_text !== 'string'){
                event.preventDefault();
                s_ownerfirst.hidden =false;
                return;
            }
            if(s_first_text.length< 4){
                event.preventDefault();
                s_ownerfirst.hidden = false;
                return;
            }
            if(s_first_text.trim().length === 0){
                event.preventDefault();
                s_ownerfirst.hidden = false;
                return;
            }
            //------first name-------//

            let s_last_text = document.getElementById("ownerLastname").value;
            if(s_last_text.length === 0){
                event.preventDefault();
                s_ownerlast.hidden =false;
                return;
            } 
            if(typeof s_last_text !== 'string'){
                event.preventDefault();
                s_ownerlast.hidden =false;
                return;
            }
            if(s_last_text.length< 4){
                event.preventDefault();
                s_ownerlast.hidden = false;
                return;
            }
            if(s_last_text.trim().length === 0){
                event.preventDefault();
                s_ownerlast.hidden = false;
                return;
            }
            //----last name---//
            
            let s_add_text = document.getElementById("Address").value;
            if(s_add_text.length === 0){
                event.preventDefault();
                s_Address.hidden =false;
                return;
            } 
            if(typeof s_add_text !== 'string'){
                event.preventDefault();
                s_Address.hidden =false;
                return;
            }
            if(s_add_text.length< 4){
                event.preventDefault();
                s_Address.hidden = false;
                return;
            }
            if(s_add_text.trim().length === 0){
                event.preventDefault();
                s_Address.hidden = false;
                return;
            }
            //------address-----//
            
            let s_email_text = document.getElementById("email").value;
            if(s_add_text.length === 0){
                event.preventDefault();
                s_email.hidden =false;
                return;
            } 
            if(typeof s_email_text !== 'string'){
                event.preventDefault();
                s_email.hidden =false;
                return;
            }
            if(s_email_text.length< 4){
                event.preventDefault();
                s_email.hidden = false;
                return;
            }
            if(s_email_text.trim().length === 0){
                event.preventDefault();
                s_email.hidden = false;
                return;
            }
            //----email----//
            
            let s_pin_text = document.getElementById("pincode").value;
            if(s_pin_text.length === 0){
                event.preventDefault();
                s_pincode.hidden =false;
                return;
            } 
            if(typeof s_pin_text !== 'string'){
                event.preventDefault();
                s_pincode.hidden =false;
                return;
            }
            if(s_pin_text.length< 4){
                event.preventDefault();
                s_pincode.hidden = false;
                return;
            }
            if(s_pin_text.trim().length === 0){
                event.preventDefault();
                s_pincode.hidden = false;
                return;
            }
            //----pincode-----//
            
            let s_phone_text = document.getElementById("phoneNumber").value;
            if(s_phone_text.length === 0){
                event.preventDefault();
                s_phoneNumber.hidden =false;
                return;
            } 
            if(typeof s_phone_text !== 'string'){
                event.preventDefault();
                s_phoneNumber.hidden =false;
                return;
            }
            if(s_phone_text.length< 4){
                event.preventDefault();
                s_phoneNumber.hidden = false;
                return;
            }
            if(s_phone_text.trim().length === 0){
                event.preventDefault();
                s_phoneNumber.hidden = false;
                return;
            }
            //----phone number----//
            
            let s_pass_text = document.getElementById("phoneNumber").value;
            if(s_pass_text.length === 0){
                event.preventDefault();
                s_password.hidden =false;
                return;
            } 
            if(typeof s_pass_text !== 'string'){
                event.preventDefault();
                s_password.hidden =false;
                return;
            }
            if(s_pass_text.length< 4){
                event.preventDefault();
                s_password.hidden = false;
                return;
            }
            if(s_pass_text.trim().length === 0){
                event.preventDefault();
                s_password.hidden = false;
                return;
            }
        }
    }
(function($){
    const removeButton = $("#remove-button");
    const removeSucess = $("#remove-success");
    
    removeButton.on('click', (event)=>{
        event.preventDefault();
        let requestConfig = {
            method : "DELETE",
            url : "http://localhost:3000/delete/currentUser",
        };
        $.ajax(requestConfig).then((responseMessage)=>{
            console.log(responseMessage);
            removeSucess.attr("hidden", false);
            removeButton.attr("hidden",true);
        });  
    })
})(window.jQuery);