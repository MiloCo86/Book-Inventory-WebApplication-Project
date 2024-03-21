import {getBooksfromLS , saveBooksToLS} from './localStorageScripts.js';

//in stock text changer
const stockInputText = document.getElementById('stock');
const stockIcon = document.getElementById('check');

stockIcon.addEventListener('click',()=>{
    if(stockInputText.value=='In Stock'){
        stockInputText.value = 'Out of Stock'
        stockIcon.classList.remove('fa-check');
        stockIcon.classList.add('fa-xmark')
        stockIcon.style.color= "#A52B2B";
    }else{
        stockInputText.value = 'In Stock'
        stockIcon.classList.remove('fa-xmark');
        stockIcon.classList.add('fa-check')
        stockIcon.style.color= "#3B923B";
    }   
});

// data from form
const formTitleInput = document.getElementById('title');
const formAuthorInput = document.getElementById('author');
const formUrlInput = document.getElementById('image-URL');
const formPriceInput = document.getElementById('price');

//getting a base book elemt and remove it from the web
const listContainer = document.getElementById('list-container');
const InitialbookItem = document.querySelector('.books__item');
const bookItem = InitialbookItem.cloneNode(true);
InitialbookItem.remove();

/* Storage related variable ands functions*/
//create an array to save books objects
let booksList = getBooksfromLS();
console.log(booksList)

//create a new object with the values of the book
function saveBook(){
    const book = {}
    book.title = formTitleInput.value;
    book.author = formAuthorInput.value;
    book.url = formUrlInput.value;
    book.stock = stockInputText.value;
    book.price = formPriceInput.value;
    booksList.push(book);
    saveBooksToLS(booksList);
}
//delete an object from the array base on the title
function deleteBook(title){
    booksList = booksList.filter(x => x.title!=title);
    saveBooksToLS(booksList);
}

//load data from local Storage
booksList.forEach(element => {
    const newBook= bookItem.cloneNode(true);
    newBook.querySelector('.books__item__title').innerText = element.title;
    newBook.querySelector('.books__item__author').innerText = element.author;
    newBook.querySelector('img').src = element.url;

    if(element.stock!='In Stock'){
        const outOfStockText = newBook.querySelector('.books__item__stock');
        outOfStockText.innerText = "out of stock";
        outOfStockText.style.background = '#A52B2B';
        outOfStockText.style.width = '60px';
    }
    const formatPrice = '$' + element.price;
    newBook.querySelector('.books__item__price').innerText = formatPrice;
    
    //Trash Can action
    const trashIcon = newBook.querySelector('.fa-trash-can');

    trashIcon.addEventListener('click',()=>{
        deleteBook(trashIcon.parentElement.querySelector('.books__item__title').innerText);
        trashIcon.parentElement.remove(); 
    });

    listContainer.appendChild(newBook);

});


// function that all a book item base on the input boxes
function addBook (){
    const newBook= bookItem.cloneNode(true);

    newBook.querySelector('.books__item__title').innerText = formTitleInput.value;
    newBook.querySelector('.books__item__author').innerText = formAuthorInput.value;
    newBook.querySelector('img').src = formUrlInput.value;


    if(stockInputText.value!='In Stock'){
        const outOfStockText = newBook.querySelector('.books__item__stock');
        outOfStockText.innerText = "out of stock";
        outOfStockText.style.background = '#A52B2B';
        outOfStockText.style.width = '60px';
    }
    const formatPrice = '$'+formPriceInput.value;
    newBook.querySelector('.books__item__price').innerText = formatPrice;
    
    //Trash Can action
    const trashIcon = newBook.querySelector('.fa-trash-can');

    trashIcon.addEventListener('click',()=>{
        deleteBook(trashIcon.parentElement.querySelector('.books__item__title').innerText);
        trashIcon.parentElement.remove(); 
    });

    listContainer.appendChild(newBook);
    saveBook();
    console.log(booksList);

}

// action when submit
const form= document.querySelector('.submit-box');
const successText = document.querySelector('.success-text');


function hiddenSuccessText (){
    successText.style.visibility = 'hidden';
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    successText.style.visibility = 'visible';

    setTimeout(hiddenSuccessText, 1000);
    
    addBook();
    formTitleInput.value='';
    formAuthorInput.value='';
    formUrlInput.value='';
    formPriceInput.value='';

    stockInputText.value = 'In Stock'
    stockIcon.classList.remove('fa-xmark');
    stockIcon.classList.add('fa-check')
    stockIcon.style.color= "#3B923B";


});
