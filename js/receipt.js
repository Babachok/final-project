document.body.onload = onLoad;
function onLoad (){	
	RenderList();
}

function addPagination (itemPerPage, total){
	let CountPages = Math.ceil(total/itemPerPage);
	let ul = document.getElementById("pager");
	pager.innerHTML = '';	
	for (let i = 0; i < CountPages; i++){
		let paginItem = document.createElement("li");
		paginItem.classList.add("pager-item");	
		paginItem.onclick = function() {			
			clickedPage = this.innerHTML;
			let page = document.getElementById("page");
			page.value = clickedPage-1;			
			RenderList();
		};
		ul.appendChild(paginItem);
		paginItem.innerHTML = i+1;
	}	
}


let itemFilter = document.getElementsByClassName("filter");
for (i=0; i<itemFilter.length; i++) {
  itemFilter[i].onclick = function(e) {	
	e.stopPropagation();
	let category = this.getAttribute("data-filter");
	let postFilter = document.getElementById("post-filter");
	postFilter.value = category;
	RenderList();
  }
}

let buttonSearch = document.getElementById("button-search");	
	searchString = '';	
	buttonSearch.onclick = function() {
		let searchBlock = document.getElementById("search-block");	
		var searchString = searchBlock.value;
		RenderList();	
	}



function RenderList () {

	let itemPerPage = 10;
	let page = document.getElementById("page").value;
    let category = document.getElementById("post-filter").value;
    let searchString = document.getElementById("search-block").value;
    

	posts = post_list;

	let receiptsPost = document.getElementById("receipts-post");	
	if (category !== '') {
		var posts_filtered = posts.filter(function (item) {
				return item.category == category;
		});		
		posts = posts_filtered;
	}
	
	if (searchString !== '') {		
		let posts_filtered  = posts.filter(function(item) {
			let title = item.ingredients;			
			return title.indexOf(searchString)>=0;
		});
		posts = posts_filtered;
	}

	let begin = page*itemPerPage;	
	let end = (parseInt(page)+1)*itemPerPage;
	if (end > posts.length) {
		end = posts.length;		
	}
	receiptsPost.innerHTML = '';	
	for (let i = begin; i < end; i++){		
		let receiptsPostItem = document.createElement("div");
		receiptsPostItem.classList.add("receipts-post-item");		
		receiptsPost.appendChild(receiptsPostItem);
		let receiptTitle = document.createElement("h3");
		receiptsPostItem.appendChild(receiptTitle);
		receiptTitle.innerHTML = posts[i].title;
		let receiptWrapper = document.createElement("div");
		receiptsPostItem.appendChild(receiptWrapper);
		receiptWrapper.classList.add("receipt-wrapper");
		let receiptImage = document.createElement("div");
		receiptWrapper.appendChild(receiptImage);
		receiptImage.classList.add("receipt-image");
		let aImg = document.createElement("a");
		receiptImage.appendChild(aImg);
		aImg.setAttribute('href', 'singlereceipt.html#receipt_' + (posts[i].id-1));
		let img = document.createElement("img");
		aImg.appendChild(img);
		img.setAttribute('src', posts[i].src);
		let postBody = document.createElement("p");
		postBody.innerHTML = posts[i].body;
		receiptWrapper.appendChild(postBody);
		let userName = document.createElement("div");
		receiptsPostItem.appendChild(userName);
		userName.innerHTML = posts[i].username;
		userName.classList.add("username");
		let readMore = document.createElement("div");	
		readMore.setAttribute('id', 'read_more_'+i);
		readMore.classList.add('read-more');
		readMore.innerHTML = "Детальніше...";
		receiptsPostItem.appendChild(readMore);	
		let commentWrapper = document.createElement('div');	
		commentWrapper.setAttribute('id', 'comments_' +i);		
		commentWrapper.classList.add("comments");
		for (let j = 0; j < comments.length; j++){
			let ul = document.createElement("ul");			
			if (posts[i].id == comments[j].postId ){
				let li = document.createElement("li");
				ul.appendChild(li);
				li.innerHTML = comments[j].body;
				commentWrapper.appendChild(ul);								
			}				
		}
		receiptsPostItem.appendChild(commentWrapper);
				
	}
	let readMoreLinks = document.getElementsByClassName('read-more');
		for (var i=0; i< readMoreLinks.length; i++) {	
			readMoreLinks[i].onclick = function() {		
			readMoreId = this.id;
			let commentSection = document.getElementById(readMoreId.replace('read_more_', 'comments_'));
			commentSection.classList.toggle('more');
			}
		}		
	addPagination(10, posts.length);
}

let topMenu = document.getElementById("top-menu");
window.onscroll = function() {	
	let scrolled = document.documentElement.scrollTop;
  if (window.innerWidth > 768) {
    if (scrolled > 50) {
    	topMenu.classList.add('appear');      
    } else {
    	topMenu.classList.remove('appear');
    }    
  }
}

let buttonSmallSearch = document.getElementById("small-button-search");	
buttonSmallSearch.onclick = function() {		
	bigSearchBlock.classList.toggle('appear');		
}

let bigSearchBlock = document.getElementById("big-search-wrapper");
if (window.innerWidth < 768) {
	bigSearchBlock.classList.add('hidden');
	topMenu.classList.add('appear');
	let chevronDown = document.getElementsByClassName("down-burger");
	console.log(chevronDown);
	for (i=0; i<chevronDown.length; i++){		
		chevronDown[i].onclick = function() {		
		let chevron = this.getAttribute("data-chevron");			
		let subMenu = document.getElementById(chevron);	
		subMenu.classList.toggle("appear-block");
		};
	}
}
