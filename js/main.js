
// here everytime we click on addnotes , whole local storage is reloaded with new modified object and same happens with notes area also
// at first we want to show all the notes that are already added
shownotes();


let addbtn = document.getElementById('addbtn');  //button
addbtn.addEventListener('click', function (e) {
    let addtext = document.getElementById('addtext'); //textarea
    let addtitle = document.getElementById('notetitle'); //texttitle
    let notes = localStorage.getItem('notes'); //key for notes is "notes"
    // let titles = localStorage.getItem('notetitle');
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes); //converting notes string into array
    }
    var myobj = {
        title: addtitle.value,
        text: addtext.value,
    }
    noteobj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(noteobj));

    addtext.value = ""; // this is to clear the text area once we click on add notes
    addtitle.value = "";
    shownotes(); // this is to show the added note in your notes area 
});


function shownotes() {
    console.log('show');
    //first get the value present in local storage in form of an array
    let notes = localStorage.getItem('notes'); //key for notes is "notes"

    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes); //converting notes string into array
    }


    //traverse the array and add each notes to different cards that we are using to show notes
    document.getElementById('mynotes').innerHTML = null;// we are first removing the already present card and then showing all new card
    // we are doing it so that repetetion doesnot happen as we are everytime traversing the whole array we got from local storage
    if (noteobj.length != 0) {
        noteobj.forEach(function (element, index) {
            // we add the array elements into card and then push that card to our div with id mynotes
            // console.log(element);
            //(?:\r\n|\r|\n)/g regular expresssion
          if(element && element.text)
            element.text = element.text.replace(/(?:\n)/g, '<br>');
             console.log(element);
            document.getElementById('mynotes').innerHTML += `
                                                <div class="mycard" >
                                                    <div class="card-body one" id="a${index}">
                                                        <h5 class="card-title" id="cardtitle">${element.title}</h5>
                                                        <p class=card-text id="cardtext">${element.text}</p>
                                                        <button onclick="deletenode(${index})"  class="btn btn-danger" id="addbtn">Delete</button>
                                                        <button onclick="editnode('${element.text}','${element.title}',${index})"  class="btn btn-success" id="addbtn">Edit</button>
                                                    </div>
                                                </div>
                                               `
        });
    }
    else {
        console.log('bye');
        document.getElementById('mynotes').innerHTML = `<h3 class = "heading3">You currently have no notes</h3>`;
    }
}

function deletenode(index) {
    console.log(`i am deleting ${index}`);

    let notes = localStorage.getItem('notes'); //key for notes is "notes"
    // let titles = localStorage.getItem('notetitle');

    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes); //converting notes string into array
    }
    

    noteobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteobj));
    shownotes();
}
function editnode(text,title,index) {

    text = text.replace(/<br\s*[\/]?>/gi, "\n");


    let parent = document.querySelector(`#a${index}`);
    //  console.log(title);
    //let lengthtextarea = document.getElementById('text1').length;
    //if we are clicking on text area for first time then length is 0. this can be used in cases where on every click page reloads
    parent.querySelector(`#cardtext`).innerHTML = `<div class="fonttitle">Writeup :<textarea class="form-control textarea" id="text1">${text}</textarea></div>`;
    parent.querySelector(`#cardtitle`).innerHTML = `<div class="mg-b fonttitle">Topic : <input class="notetitles" id="title1" type="text" value="${title}"></div>`;

    let notes = localStorage.getItem('notes'); //key for notes is "notes"


    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes); //converting notes string into array
    }
    

    let textarea = document.getElementById('text1');
    let titlearea = document.getElementById('title1');
    textarea.addEventListener('blur', func1);
    titlearea.addEventListener('blur', func1);
    function func1(e) {

        let TextTyped = textarea.value;
        let titletyped = titlearea.value;
        TextTyped = TextTyped.replace(/(?:\n)/g, '<br>');
        noteobj[index].text = TextTyped;
        noteobj[index].title = titletyped;
        localStorage.setItem('notes', JSON.stringify(noteobj));
        shownotes();
        console.log('exit');
    };

}
let search = document.getElementById('searchtext');
// console.log(search);
search.addEventListener('input', function (e) {
    console.log("input event fired");
    let searchvalue = search.value;
    let notecard = document.getElementsByClassName('mycard');
    Array.from(notecard).forEach(function (element) {
         //    console.log(element.getElementsByTagName('p'));
        let cardtext = element.getElementsByTagName('p')[0].innerText;
        //    console.log(element.getElementsByTagName('h5'));
        let cardtitle = element.getElementsByTagName('h5')[0].innerText;
        if (cardtext.includes(searchvalue) || cardtitle.includes(searchvalue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});
