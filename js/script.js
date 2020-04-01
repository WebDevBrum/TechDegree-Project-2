/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.querySelector('.student-list').children;
let itemsPerPage = 10;




/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page){
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage; 
   
   for(let i=0; i < list.length; i += 1 ) {  
      let li = studentList[i];
      if((startIndex <= i) && (i < endIndex)) { 
         li.style.display = '';
      } else {
         li.style.display = 'none';
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function createElement(elementName) {
   const element = document.createElement(elementName);
   return element;
}

/**
 * Create page links function which adds a number of page buttons based on the 
 * total list items and then adds functionality to access different groups within the 
 * list, eg pg 1 10 items, pg 2 next 10 items
 */

function appendPageLinks(list) { 
   const div = createElement('div'); 
   const ul =  createElement('ul');
   const mainDiv = document.querySelector('.page');
   let length = list.length;
   let numOfPages = Math.ceil(length / itemsPerPage);
   
   div.className = 'pagination';
   div.appendChild(ul);
   mainDiv.appendChild(div); //above appends initial container element 
   
   for (let i = 0; i < numOfPages; i += 1) {
      const li = createElement('li');
      const a = createElement('a');
      li.appendChild(a);
      ul.appendChild(li);
      a.textContent = i + 1;
      a.href = '#'; //this appends a list of links to new container
   }

   let pageButton = document.querySelectorAll('a');
   pageButton[0].className = 'active'; //selects all 'a' elements
   
   for(let i = 0; i < pageButton.length; i += 1) {

      pageButton[i].addEventListener('click', (e) => { //adds event listener to a elements

         for(let i = 0; i < pageButton.length; i += 1) {
            pageButton[i].className = '';  //clears class names on click
         }

         let pageSelected = e.target.textContent;
         let pageIndex = i; 
         pageButton[pageIndex].className = 'active'; //sets selected button class as active
         showPage(studentList, pageSelected); //shows correct page based on button clicked
      });
   }
}

showPage(studentList, 1); //initialises page to page 1 of required list
appendPageLinks(studentList); //adds page links to required list



// Remember to delete the comments that came with this file, and replace them with your own code comments.
const headerDiv = document.querySelector('.page-header.cf');

function appendSearchBar(element) {
      const div = createElement('div');
      const input = createElement('input');
      const button = createElement('button');
      button.textContent = 'search';
      div.className = 'student-search';
      input.placeholder = 'Search for students...';
      input.type = 'text';
      div.appendChild(input);
      div.appendChild(button);
      element.appendChild(div); //above creates none functional bar to be appended

      
     function search(searchInput, names){
        
       let input = searchInput.toString().toLowerCase();
        console.log(input);
        

        for (let i = 0; i < names.length; i += 1) {
         let searchName = names[i].querySelector('h3');
         let stringName = searchName.textContent.toString().toLowerCase();
         let match = stringName.indexOf(input);
         console.log(stringName);
         console.log(match);

         if (match != -1 ) { //this bit isnt working!!!
            names[i].style.display = ' ';
         } else {
            names[i].style.display = 'none';

         }
         // if (names[i].className != 'match') {
         //    names[i].style.display = 'none';
         // }
      }
     } 
      
      
      
      
      button.addEventListener('click', (event) => { // just searches current page??
         event.preventDefault();
// Invoke your search function here - Arguments: search, tableCells
         search(input.value, studentList);
         console.log('Submit button is functional!');
});


         input.addEventListener('keyup', () => {

            // Invoke your search function here - Arguments: search, tableCells
          
          
            // Helpful log statement to test function
            console.log('Keyup event on the Search input is functional!');
          });
       

}

appendSearchBar(headerDiv);
