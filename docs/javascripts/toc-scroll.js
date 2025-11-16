// Detect scroll on table of contents and add background to title
(function() {
  function findTocElements() {
    const tocScrollWrap = document.querySelector('.md-sidebar--secondary .md-sidebar__scrollwrap');
    const tocTitle = document.querySelector('.md-sidebar--secondary .md-nav__title[for="__toc"]') || 
                     document.querySelector('.md-sidebar--secondary > .md-sidebar__scrollwrap > .md-nav > .md-nav__title') ||
                     document.querySelector('.md-nav--secondary > .md-nav__title');
    return { tocScrollWrap, tocTitle };
  }
  
  function updateTocTitleBackground() {
    const { tocScrollWrap, tocTitle } = findTocElements();
    
    if (!tocScrollWrap || !tocTitle) {
      return;
    }
    
    // Check if scrolled - if scrollTop > 0, content is scrolling behind the sticky title
    const isScrolled = tocScrollWrap.scrollTop > 0;
    
    if (isScrolled) {
      tocTitle.setAttribute('data-scrolled', 'true');
    } else {
      tocTitle.removeAttribute('data-scrolled');
    }
  }
  
  function initTocScrollDetection() {
    const { tocScrollWrap, tocTitle } = findTocElements();
    
    if (!tocScrollWrap || !tocTitle) {
      // Retry after a short delay if elements aren't ready yet
      setTimeout(initTocScrollDetection, 100);
      return;
    }
    
    // Initial check
    updateTocTitleBackground();
    
    // Listen for scroll events on TOC
    tocScrollWrap.addEventListener('scroll', updateTocTitleBackground, { passive: true });
    
    // Also use IntersectionObserver for more reliable detection when title becomes sticky
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';
    sentinel.style.zIndex = '-1';
    
    const tocNav = tocTitle.closest('.md-nav');
    if (tocNav) {
      // Insert sentinel right after the title
      const titleParent = tocTitle.parentElement;
      if (titleParent && titleParent.nextSibling) {
        titleParent.insertBefore(sentinel, titleParent.nextSibling);
      } else if (titleParent) {
        titleParent.appendChild(sentinel);
      }
      
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          // When sentinel is not visible, it means content has scrolled behind the sticky title
          if (!entry.isIntersecting && tocScrollWrap.scrollTop > 0) {
            tocTitle.setAttribute('data-scrolled', 'true');
          } else if (entry.isIntersecting && tocScrollWrap.scrollTop === 0) {
            tocTitle.removeAttribute('data-scrolled');
          }
        });
      }, {
        root: tocScrollWrap,
        rootMargin: '0px',
        threshold: [0, 0.1]
      });
      
      observer.observe(sentinel);
    }
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTocScrollDetection);
  } else {
    initTocScrollDetection();
  }
  
  // Re-run when navigation changes (Material theme uses SPA navigation)
  document.addEventListener('md-navigation', function() {
    setTimeout(initTocScrollDetection, 100);
  });
  
  // Also listen for route changes in Material theme
  if (typeof app !== 'undefined' && app.document) {
    app.document.addEventListener('ready', initTocScrollDetection);
  }
})();

