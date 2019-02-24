/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

document.addEventListener('DOMContentLoaded', function(){
    // responsive tables
    document.querySelectorAll("table").forEach(v => {
      if (v.parentElement.tagName != 'FIGURE') {
        // v.classList.add('table');
        // v.classList.add('table-responsive');
        // v.classList.add('table-striped');
        // v.classList.add('table-hover');
        v.className += ' table table-responsive table-striped table-hover'
      }
    });

    // responsive embed videos
    // $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    document.querySelectorAll('img').forEach(v => {
        v.classList.add('img-responsive-center');
    });
});

// whether a post
function isPages(attr){
    var currentBoolean = document.querySelector('.navbar.header-navbar').getAttribute(attr);
    if(currentBoolean === 'true'){return true;}
    return false;
}

/*
    scroll function
    3 parameters
        1. a DOM object
        2 a class for targeted object
        3 height when acctivated (optional. default: the height of the DOM)
*/
function scrollCheck(scrollTarget, toggleClass, scrollHeight){
    document.addEventListener('scroll',function(){
    var currentTop = window.pageYOffset;
        currentTop > (scrollHeight||scrollTarget.clientHeight)
        ?scrollTarget.classList.add(toggleClass)
        :scrollTarget.classList.remove(toggleClass)
    })
}

/*
* Steps
* 1. get the content of h1
* 2. scroll and appear fixed navbar
* 3. the content of h1 is shown center at the top of the page
* */

(function(){
    if (isPages('data-ispost')){
        var navbar = document.querySelector('.navbar-custom');
        var introHeader = document.querySelector('.intro-header').offsetHeight;
        var introHeader = introHeader > 597 ? introHeader : 500;
        var toc = document.querySelector('.toc-wrap');
        scrollCheck(toc,'toc-fixed',introHeader-60);
        // scrollCheck(navbar,'is-fixed');
    }
})();
