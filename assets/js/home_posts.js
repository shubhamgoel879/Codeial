{
    // Method to submit the post data using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(), // It will convert the form data into json with key 'content'
                success: function (data) {
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                },
                error: function (error) {
                    console.log(error, responseText);
                }
            })
        });
    }
    // method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        <span>👤 ${post.user.name}</span>
                        <br>
                        <span>❥ ${post.content}</span>
                        <span><a class="delete-post-button" href="post/destroy/${post._id}">X</a></span>
                    </p>
                    <div class="post-comments">
                        <form action="/comment/create" method="POST">
                            <input type="text" name="content" required placeholder="Type comment here...">
                            <input type="hidden" name="postId" value="${post._id}">
                            <input type="submit" value="➤">
                        </form>
                    </div>
                </li>`);
    }
    createPost();
}