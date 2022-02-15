const elList = document.querySelector('.list');
const elFilmModal = document.querySelector ('.modal');

// bookmark 
const elBookmakButton = document.querySelector ('.bookmak__button');
const elBookmarkModal = document.querySelector ('.bookmark_modal');
const elBookmarkList = document.querySelector ('.bookmark_list');


// modal
const elModalFilmTitle = document.querySelector('.modal__film-title');
const elModalFilmImg = document.querySelector('.modal__film-img');
const elModalFilmDescription = document.querySelector('.modal__film-desc');
const elModalFilmGenresTitle = document.querySelector('.modal__film-genres-title');
const elModalFilmGenresList = document.querySelector('.modal__film-genres-list');
const elModalFilmTime = document.querySelector('.modal__film-time');

const bookmarkFilms = [];

// render films

function renderFilms(arr,node){

    node.innerHTML=null;

    arr.forEach(film => {
        
        // films create element 
        const newLi = document.createElement ('li');
        const filmTitle =document.createElement('h3');
        const newImg = document.createElement ('img')
        const bookMark = document.createElement ('button')
        const moreInfo = document.createElement ('button')
        


        bookMark.textContent ='Bookmark';
        moreInfo.textContent = 'MoreInfo';
        
        // set atribute in films create element

        newLi.setAttribute ('class','item');
        newImg.setAttribute('src' ,film.poster);
        newImg.setAttribute('width', '200');
        newImg.setAttribute('height', '250');
        newImg.setAttribute('class', 'filmImg');
        bookMark.setAttribute('class', 'bookMark');
        moreInfo.setAttribute('class', 'moreInfo');
        
        moreInfo.dataset.filmId =film.id;
        bookMark.dataset.filmId = film.id


        // append child
       
        newLi.appendChild(filmTitle);
        newLi.appendChild(newImg);
        newLi.appendChild(bookMark);
        newLi.appendChild(moreInfo);
       
        node.appendChild(newLi);

    });
}

// render modal films 

function renderModalFilms (film){

    elModalFilmGenresList.innerHTML = null;
   
    film.genres.forEach(genre => {

        const elModalFilmGenreItem =  document.createElement('li');
        
        elModalFilmGenreItem.textContent = genre;

        elModalFilmGenreItem.classList.add('modal__film-genre-item');

        elModalFilmGenresList.appendChild(elModalFilmGenreItem);
    })

    elModalFilmTitle.textContent = film.title;
    elModalFilmDescription.textContent = film.overview;
    elModalFilmImg.setAttribute ('src' ,film.poster)
    elModalFilmGenresTitle.textContent = 'Films genres types:'


}



//  the elList rendered films addEventListener

elList.addEventListener('click' ,(evt)=>{
    
    const isMoreBtn = evt.target.matches('.moreInfo');
    const isBookmark = evt.target.matches('.bookMark');

    if(isBookmark){
        const filmId = evt.target.dataset.filmId;

        const foundBookmarkFilm = films.find((row)=>row.id === filmId);
        

        if(!bookmarkFilms.includes(foundBookmarkFilm)){
            
            bookmarkFilms.push(foundBookmarkFilm)
        console.log(bookmarkFilms);

            renderBookmarkFilms(bookmarkFilms ,elBookmarkList)
        }

    }

    else if(isMoreBtn){
        const filmId = evt.target.dataset.filmId;

        const foundFilm =films.find((row)=> row.id===filmId);

         elFilmModal.classList.add('modal--show')

         renderModalFilms(foundFilm);

    }
   
})

// render bookmark films 

function renderBookmarkFilms(arr,node){

    node.innerHTML=null;

    arr.forEach(film=>{

        const bookmarkItem = document.createElement('li');
        const bookmarkFilmtTitle = document.createElement('h3')
        const bookmarkDeleteBtn = document.createElement('button');


        bookmarkItem.setAttribute('class','bookmaritem');
        bookmarkFilmtTitle.setAttribute('class', 'bookmarkTitle')
        bookmarkDeleteBtn.setAttribute('class', 'bookmarkdeletebtn')

        bookmarkFilmtTitle.textContent = film.title;
        bookmarkDeleteBtn.textContent = 'Delete';

        
        bookmarkItem.appendChild(bookmarkFilmtTitle)
        bookmarkItem.appendChild(bookmarkDeleteBtn)
        node.appendChild(bookmarkItem);
    })

}

elBookmarkList.addEventListener('click',(evt)=>{

    if(evt.target.matches('.bookmarkdeletebtn')){

        const bookmarkId = evt.target.dataset.bookmarkId;
        const foundFilmIndex = bookmarkFilms.findIndex(film => film.id === bookmarkId);
        bookmarkFilms.splice(foundFilmIndex, 1);
        renderBookmarkFilms(bookmarkFilms ,elBookmarkList)

    }

    if(bookmarkFilms.length===0){
        elBookmarkModal.classList.remove('bookmark-show')

    }
})

elBookmakButton.addEventListener ('click' ,(evt) =>{

    elBookmarkModal.classList.toggle('bookmark-show');

})


// addEventListener modal 

elFilmModal.addEventListener ('click',(evt) =>{

    const isModal =evt.target.matches('.modal')|| evt.target.matches('.modal__close-btn')

if(isModal){

    elFilmModal.classList.remove('modal--show')
}
})

renderFilms(films,elList)