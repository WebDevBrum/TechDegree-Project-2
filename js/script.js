/** ****************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
***************************************** */

/** * 
   Global variables
** */

const studentList = document.querySelector('.student-list').children;
const mainDiv = document.querySelector('.page');
const headerDiv = document.querySelector('.page-header.cf');
const itemsPerPage = 10;

/** * 
  `showPage` function that hides all list items  
   except for the ten you want to show.
** */

function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  for (let i = 0; i < list.length; i += 1) {
    const li = list[i];
    if (startIndex <= i && i < endIndex) {
      li.style.display = '';
    } else {
      li.style.display = 'none';
    }
  }
}

/** * 
   helper function for creating Dom elements
** */
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
  const ul = createElement('ul');

  const { length } = list;
  const numOfPages = Math.ceil(length / itemsPerPage);

  div.className = 'pagination';
  div.appendChild(ul);
  mainDiv.appendChild(div); // above appends initial container element

  for (let i = 0; i < numOfPages; i += 1) {
    const li = createElement('li');
    const a = createElement('a');
    li.appendChild(a);
    ul.appendChild(li);
    a.textContent = i + 1;
    a.href = '#'; // this appends a list of links to new container
  }

  const pageButton = document.querySelectorAll('a');
  if (pageButton[0] !== undefined) {
    pageButton[0].className = 'active';
  } // selects all 'a' elements

  for (let i = 0; i < pageButton.length; i += 1) {
    pageButton[i].addEventListener('click', e => {
      // adds event listener to a elements

      for (let j = 0; j < pageButton.length; j += 1) {
        pageButton[j].className = ''; // clears class names on click
      }

      const pageSelected = e.target.textContent;
      const pageIndex = i;
      pageButton[pageIndex].className = 'active'; // sets selected button class as active
      showPage(list, pageSelected); // shows correct page based on button clicked
    });
  }
}

showPage(studentList, 1); // initialises page to page 1 of required list
appendPageLinks(studentList); // adds page links to required list

/**
 * The below function appends a search bar to the given location on a page
 * it then adds search functionality matching user input to a list of names
 * Finally it then utilises two even listeners, one to listen for the click of the submmit button
 * and a second to live search against user input by using a keyup listener
 */

function appendSearchBar(element) {
  // creates initial search bar
  const div = createElement('div');
  const input = createElement('input');
  const button = createElement('button');
  const noMatch = createElement('p');
  let searchList = [];
  button.textContent = 'search';
  div.className = 'student-search';
  input.placeholder = 'Search for students...';
  input.type = 'text';
  div.appendChild(input);
  div.appendChild(button);
  element.appendChild(div);
  noMatch.textContent = 'Sorry , no matching results found.';
  noMatch.style.display = 'none';
  mainDiv.appendChild(noMatch);
  // adds search bar functionality
  function search(searchInput, names) {
    const searchContent = searchInput.value;
    const textInput = searchContent.toString().toLowerCase();
    const pageLinks = document.querySelector('.pagination');
    searchList = [];

    for (let i = 0; i < names.length; i += 1) {
      const searchName = names[i].querySelector('h3');
      const stringName = searchName.textContent.toString().toLowerCase();
      const match = stringName.indexOf(textInput);

      if (match !== -1) {
        names[i].style.display = '';
        searchList.push(names[i]);
      } else {
        names[i].style.display = 'none';
      }

      if (searchList.length === 0) {
        noMatch.style.display = '';
      } else if (searchList.length > 0) {
        noMatch.style.display = 'none';
      }
    }
    // removes previous pagination links and adds new links based on search results
    mainDiv.removeChild(pageLinks);
    showPage(searchList, 1);
    appendPageLinks(searchList);
  }
  // event listener for submit button
  button.addEventListener('click', event => {
    event.preventDefault();
    search(input, studentList);
  });
  // reactive event listener for searchbar entry
  input.addEventListener('keyup', () => {
    search(input, studentList);
  });
}

appendSearchBar(headerDiv);
