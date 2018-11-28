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

let buttonSort = document.getElementById("button-sort");		
	buttonSort.onclick = function() {
	let sortFilter = document.getElementById("sort-filter");
	sortFilter.value = 1;
	let sortInform = sortFilter.value;
	RenderList();	
}


function RenderList() {

	let itemPerPage = 10;
	let page = document.getElementById("page").value;
    let category = document.getElementById("post-filter").value;
    let searchString = document.getElementById("search-block").value;
    let sortInform = document.getElementById("sort-filter").value;

	posts = post_list;
	let receiptsList = document.getElementById("receipts-list");	
	if (category !== '') {
		var posts_filtered = posts.filter(function (item) {
				return item.category == category;
		});		
		posts = posts_filtered;
	}

	if (sortInform !== ''){
		let posts_filtered  = posts.sort(function(a, b){
			let titleA = a.title.toLowerCase(); 
			let titleB = b.title.toLowerCase();
    		if(titleA < titleB) { return -1; }
    		if(titleA > titleB) { return 1; }
    		return 0;
		})
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
	receiptsList.innerHTML = '';	
	for (let i = begin; i < end; i++){		
		let receiptsListItem = document.createElement("div");
		receiptsListItem.classList.add("receipts-list-item");		
		receiptsList.appendChild(receiptsListItem);
		let receiptImage = document.createElement("div");
		receiptsListItem.appendChild(receiptImage);
		receiptImage.classList.add("receipt-image");
		let aImg = document.createElement("a");
		receiptImage.appendChild(aImg);
		aImg.setAttribute('href', 'singlereceipt.html#receipt_' + (posts[i].id-1));
		let img = document.createElement("img");
		aImg.appendChild(img);
		img.setAttribute('src', posts[i].src);
		let receiptTitle = document.createElement("h3");
		receiptsListItem.appendChild(receiptTitle);
		receiptTitle.innerHTML = posts[i].title;
		let ingredientItem = document.createElement("div");
		receiptsListItem.appendChild(ingredientItem);
		ingredientItem.classList.add("receipt-ing");
		ingredientItem.innerHTML = posts[i].ingredients;
	}
	addPagination(10, posts.length);
}

let topMenu = document.getElementById("top-menu");
window.onscroll = function() {	
	let scrolled = document.documentElement.scrollTop;
    if (scrolled > 50) {
    	topMenu.classList.add('appear');      
    } else {
    	topMenu.classList.remove('appear');
    }    
}

let login = document.getElementById("login");
let loginBox = document.getElementById("login-box");
login.onclick = function() {
	loginBox.classList.toggle('appear');
}

let signUp = document.getElementById("sign-up");
let registrBox = document.getElementById("registr-box");
signUp.onclick = function() {
	registrBox.classList.toggle('appear');
}

let buttonSmallSearch = document.getElementById("small-button-search");
let bigSearchBlock = document.getElementById("big-search-wrapper");	
	buttonSmallSearch.onclick = function() {
		bigSearchBlock.style.display = "block";
		
	}