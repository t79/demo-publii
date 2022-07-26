
module.exports = function (Handlebars) {
	return {

        nextPreviousPostByTag: function(thisPost, allTagsWithPosts) {

                let nextPosts = [];
		        let previousPosts = [];

                for (tagIndex in thisPost.tags) {

                    let tagPosts = allTagsWithPosts.find(tag => tag.id == thisPost.tags[tagIndex].id);
                    thisPostIndex = tagPosts.posts.findIndex(post => post.id == thisPost.id);

                    function GetPost(postIndex, postArray) {
				        let postAllreadyFound = postArray.find(post => post.id == tagPosts.posts[postIndex].id);
				        if (postAllreadyFound) {
					        postAllreadyFound['tags'].push(tagPosts.name);
				        } else {
                            let post = {};
					        post['id'] = tagPosts.posts[postIndex].id;
					        post['title'] = tagPosts.posts[postIndex].title;
					        post['url'] = tagPosts.posts[postIndex].url;
					        post['tags'] = [];
					        post['tags'].push(tagPosts.name);
					        postArray.push(post);
                        }
			        }

                    if (thisPostIndex > 0) {
                        GetPost(thisPostIndex - 1, nextPosts);
                    }

                    if (thisPostIndex < tagPosts.posts.length - 1) {
			            GetPost(thisPostIndex + 1, previousPosts);
                    }
                }

                //let output = [];
                //output.push(previousPosts);
                //output.push(nextPosts);
                
                    let newOutput = {
                        "notEmpty": (previousPosts.length > 0 || nextPosts.length > 0 ? true : false),
                        "next": nextPosts,
                        "prev": previousPosts
                    };
                
                return [newOutput];

        }

    }
}