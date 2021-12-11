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