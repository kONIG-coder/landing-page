/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navList = document.getElementById('navbar__list');
let navFragment = document.createDocumentFragment();
let sections = document.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function getRects(elements) {
    let rects = [];
    for (let i = 0; i < elements.length; i++) {
        let rect = elements[i].getBoundingClientRect();
        rects.push(rect);
    }
    return rects
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function scroll(e) {
    let scrollTarget = document.getElementById(e.target.getAttribute("scroll-target"));
    scrollTarget.scrollIntoView({behavior: "smooth"});
}
function checkActive(rects) {
    let active = false;  // to make sure there is only one section active
    
    for (let i = 0; i < rects.length; i++) {

        // getting navegation link corresponding to section
        let navLinkId = `nav-link${i+1}`
        let navLink = document.getElementById(navLinkId);

        if ((rects[i].bottom + rects[i].top)/2 > 0 
            && (rects[i].bottom + rects[i].top)/2 < screen.height 
            && !active ){
        
        // adding the active class to the element and its corresponding navbar link if on screen


        sections[i].classList.add("section__active");
        navLink.classList.add("menu_link_active");
        
        active = true;
        } 
        else {
        // removing the active class from the element and its corresponding navbar link if not on screen
        sections[i].classList.remove("section__active");
        navLink.classList.remove("menu_link_active");
        }
    }
}

// build the nav
for (let i = 0; i<sections.length; i++) {
    let sectionName = sections[i].getAttribute("data-nav");
    let li = document.createElement("li");
    li.textContent = sectionName;
    li.classList.add("menu__link");
    li.setAttribute("scroll-target", sections[i].getAttribute("id"));
    li.setAttribute("id", `nav-link${i+1}`);
    navFragment.appendChild(li);
}
navList.appendChild(navFragment);


// Scroll to section on link click
navList.addEventListener("click", scroll);

// check for the section on viewport and add active classes
window.addEventListener("scroll", function() {
    checkActive(getRects(sections))
});


