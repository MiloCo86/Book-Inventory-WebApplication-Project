
function getBooksfromLS (){
    let bookData;
    if(localStorage.getItem('bookData') === null){
        bookData = [];
    }else {
        bookData = JSON.parse(localStorage.getItem('bookData'));
    }
    return bookData;
}

function saveBooksToLS (bookData){
    localStorage.clear();
    localStorage.setItem('bookData', JSON.stringify(bookData));
}

export {getBooksfromLS , saveBooksToLS}

