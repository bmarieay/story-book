module.exports = {
    cutBody: function(description){
        if(description.length >= 50){
            return `${description.substring(0, 2)}...`;
        } else {
            return description;
        }
    }
    
}