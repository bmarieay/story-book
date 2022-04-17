module.exports = {
    cutBody: function(description){
        if(description.length >= 50){
            return `${description.substring(0, 2)}...`;
        } else {
            return description;
        }
    },
    showEditIcon: function(user, author, story){
        if(user === author) //check if current user is the author
            return `<a href="/stories/${story}/edit"><i class="fas fa-edit fa-small edit-icon"></i></a>`;
        else 
            return '';
    },
    selectOption: function(status, renderStatus){
        if(status === renderStatus.toLowerCase()) {
            return 'selected';
        } else {
            return '';
        }
    },
    showNumComments: function(comments){
        if(comments.length)
            return comments.length + ' comments';
        else
            return comments.length + ' comment';
    }
}

//TODO HTML SANITIZE