var books = [];
var users = [];

var ISSUE_LIMIT = 3;
var ERRORS = {
	"BOOKS_NOT_AVAILABLE": "Book is not available",
	"ISSUE_LIMIT": "Can't issue books, because you have reached the limit of "+ISSUE_LIMIT,
	"BOOK_RETURN": "you have no book for return",
}

var addBook = function(title, author, copies) {
	var newBook = {
	    "id": books.length+1,
	    "title": title,
	    "author": author,
	    "copies": copies,
	  }
  	books.push(newBook);
  	return newBook;
}

var getAllBooks = function(){
	return books;
}

var addUser = function(name){
	var newUser = {
		"id": users.length+1,
		"name": name,
		"bookIssued":[]

	}
	users.push(newUser);
	return newUser;
}

var getAllUsers = function(){
 	return users;
}


// check available books------------------DONE
// check how how many books user can issue----DONE


var bookIssue = function(user_id, book_id){
	if(checkBookAvailability(book_id) > 0 ){
		if(checkBookIssueAndReturnLimit(user_id) < ISSUE_LIMIT){
	   		for (var i = 0 ; i < users.length ; i++) {
	     		if (users[i].id == user_id) {
	        		if(users[i].bookIssued){        	
	        			users[i].bookIssued.push({"book_id" : book_id})
	        		}
	        		break; 
	     		}
	   		}
	   		updateBookCopies( book_id , -1);
	   		return {
	   			user: user_id,
	   			book: book_id,
	   		}
	   	}
	   	else {
	   		return ERRORS.ISSUE_LIMIT;
	   	}
   	}
   	else {
   		return ERRORS.BOOKS_NOT_AVAILABLE;
   	}
}

//check if book was not issued--------------------------------------DONE

var bookReturn = function(user_id, book_id){
	if(checkBookIssueAndReturnLimit(user_id) > 0){
	   	for (var i = 0 ; i < users.length ; i++) {
	     	if (users[i].id == user_id) {
	        	for(var k = 0 ; users[i].bookIssued && k < users[i].bookIssued.length; k++){
	        		if(users[i].bookIssued[k].book_id == book_id){
	        		 users[i].bookIssued.splice(k, 1);
	        		}
	        	}
	     	}
	   	}
	   	updateBookCopies(book_id, 1);
	   	return {
	   		user: user_id,
	   		book: book_id,
	   	}
	}
	else {
		return ERRORS.BOOK_RETURN;
	}
}

var updateBookCopies = function(book_id, copies){
	for (var i = 0; i < books.length; i++){
		if (books[i].id == book_id ){
			books[i].copies = books[i].copies+copies;
		} 
	}
	return{
		book_id: book_id,
		addcopies:  copies,
	}
}

var getBookId = function(book_id){
	var book;
	for (var i = 0; i < books.length; i++){
		if(books[i].id == book_id){
			book = books[i]
			break;
		}		
	}
	return book;
}

var getIssuedBooks = function(user_id){
	for (var i = 0; i < users.length; i++){
		if(users[i].id == user_id && users[i].bookIssued.length>0){
			var booksIssuedByUser = [];
			for(var k = 0 ; k < users[i].bookIssued.length; k++){
        		booksIssuedByUser.push(getBookId(users[i].bookIssued[k].book_id));
        	}
			return booksIssuedByUser;
		}
	}
}

var checkBookAvailability = function(book_id){
	var avalibalBookCopies = 0;
	for (var i = 0; i < books.length; i++) {
		if(books[i].id == book_id ){
			avalibalBookCopies =  books[i].copies;
		}
	}
	return avalibalBookCopies;
}

var checkBookIssueAndReturnLimit = function(user_id){
	var limit = 0; 
	for (var i = 0; i < users.length; i++) {
		if(users[i].id == user_id){
			for (var j = 0; j < users[i].bookIssued.length; j++) {
				limit = users[i].bookIssued.length;
			}
		}
	}
	return limit;
}

