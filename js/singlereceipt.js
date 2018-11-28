document.body.onload = onLoad;
function onLoad (){	
	addReceipt ();
}

function addReceipt (){
	posts = post_list;

	let hash_id = location.hash;	
	let post_id = hash_id.replace('#receipt_', '');
		
	let receiptsPostItem = document.createElement("div");
	receiptsPostItem.classList.add("receipts-post-item");
	let receiptsPost = document.getElementById("receipts-post");		
	receiptsPost.appendChild(receiptsPostItem);
	let receiptTitle = document.createElement("h3");
	receiptsPostItem.appendChild(receiptTitle);
	receiptTitle.innerHTML = posts[post_id].title;
	let receiptWrapper = document.createElement("div");
	receiptsPostItem.appendChild(receiptWrapper);
	receiptWrapper.classList.add("receipt-wrapper");
	let receiptImage = document.createElement("div");
	receiptWrapper.appendChild(receiptImage);
	receiptImage.classList.add("receipt-image");
	let img = document.createElement("img");
	receiptImage.appendChild(img);
	img.setAttribute('src', posts[post_id].src);
	let postBody = document.createElement("p");
	postBody.innerHTML = posts[post_id].body;
	receiptWrapper.appendChild(postBody);
	let userName = document.createElement("div");
	receiptWrapper.appendChild(userName);
	userName.innerHTML = posts[post_id].username;
	userName.classList.add("username");
	let commentWrapper = document.createElement('div');
	receiptsPostItem.appendChild(commentWrapper);
	for (let j = 0; j < comments.length; j++){
			let ul = document.createElement("ul");						
			if (posts[post_id].id == comments[j].postId ){				
				let li = document.createElement("li");
				ul.appendChild(li);
				li.innerHTML = comments[j].body;
				commentWrapper.appendChild(ul);								
			}				
		}
}