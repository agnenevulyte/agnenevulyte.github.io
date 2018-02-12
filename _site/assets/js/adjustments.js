// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    if ($elem.offset() === undefined) {
      return false;
    }
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

function simulateTyping(source, inputFieldId, hiddenInputId) {
  
    // checking whether element is visible
    var $elem = $(source);

    // started class is used to mark whether typing started
    var startedClass = 'started';

    // If the animation has already been started
    // so if it's started - don't add it again
    if ($elem.hasClass(startedClass)) {
      return;
    } 
  

    if (isElementInViewport($elem)) {
      
      // adding 'started' class so 
      // it won't get restarted
      $elem.addClass(startedClass);
    
      var inputField;
      var cursor;
      var hiddenInput;
      var content = [];
      var lastContent = "", targetContent = "";
      var inputLock = false;
      var autoWriteTimer;

      var isMobile, isIE;

      isMobile = navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/);

      isIE = (navigator.appName == 'Microsoft Internet Explorer');

      inputField = document.getElementById(inputFieldId);

      hiddenInput = document.getElementById(hiddenInputId);
      hiddenInput.focus();

      cursor = document.createElement('cursor');
      cursor.setAttribute('class', 'blink');
      cursor.innerHTML = "|";

      if (!isMobile && !isIE) inputField.appendChild(cursor);

      function refresh() {

          inputLock = true;

          if (targetContent.length - lastContent.length === 0) return;

          var v = targetContent.substring(0, lastContent.length + 1);

          content = [];

          var blinkPadding = false;

          for (var i = 0; i < v.length; i++) {
              var l = v.charAt(i);

              var d = document.createElement('div');
              d.setAttribute('class', 'letterContainer');

              var d2 = document.createElement('div');

              var animClass = (i % 2 === 0) ? 'letterAnimTop' : 'letterAnimBottom';

              var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;

              if (letterClass != 'letterStatic') blinkPadding = true;

              d2.setAttribute('class', letterClass);

              d.appendChild(d2);

              d2.innerHTML = l;
              content.push(d);
          }

          inputField.innerHTML = '';

          for (i = 0; i < content.length; i++) {
              inputField.appendChild(content[i]);
          }

          cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';

          if (!isMobile && !isIE) inputField.appendChild(cursor);

          if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
          else inputLock = false;

          lastContent = v;
      }

      if (document.addEventListener) {

          document.addEventListener('touchstart', function(e) {
              clearInterval(autoWriteTimer);
              targetContent = lastContent;
          }, false);

          document.addEventListener('click', function(e) {
              clearInterval(autoWriteTimer);
              targetContent = lastContent;
              hiddenInput.focus();
          }, false);

          if (!isIE) {
              // Input event is buggy on IE, so don't bother
              // (https://msdn.microsoft.com/en-us/library/gg592978(v=vs.85).aspx#feedback)
              // We will use a timer instead (below)
              hiddenInput.addEventListener('inputField', function(e) {
                  e.preventDefault();
                  targetContent = hiddenInput.value;
                  if (!inputLock) refresh();

              }, false);
          } else {
              setInterval(function() {
                  targetContent = hiddenInput.value;

                  if (targetContent != lastContent && !inputLock) refresh();
              }, 100);
          }

      }

      hiddenInput.value = "";

      autoWriteTimer = setTimeout(function() {
          if (lastContent !== "") return;
          targetContent =  $(source).text();
          refresh();
      }, 2000);    
    }
  
    // end simulate writing func        
  }


window.onload = function() {  
  simulateTyping(".container-fancy-input", 'inputField', 'hiddenInput');
  
//   simulateTyping(".container-fancy-input-2", 'inputField-2', 'hiddenInput-2');
  
};

// Capture scroll events
$(window).scroll(function(){
    simulateTyping(".container-fancy-input", 'inputField', 'hiddenInput');
    // simulateTyping(".container-fancy-input-2", 'inputField-2', 'hiddenInput-2');
});


// contact me form validation
// function checkStuff() {
//     var name = document.forml.name;
//     var email = document.forml.email;
//     var commment = document.forml.commment;
//     var msg = document.getElementById("msg");

//     if (name.value == "") {
//         msg.style.display = "block";
//         msg.innerHTML = "Name cannot be blank";
//         name.focus();
//         return false;
//     } else {
//         msg.innerHTML = "";
//         msg.style.display = 'none';
//     }

//     if (email.value = "") {
//         msg.innerHTML = "Email cannot be blank";
//         email.focus();
//         return false;
//     } else {
//         msg.innerHTML = "";
//     }
//     var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
//     if (!re.test(email.value)) {
//         msg.innerHTML = "Please enter a valid email";
//         email.focus();
//         return false;
//     } else {
//         msg.innerHTML = "";
//     }

//     if (comment.value = "") {
//         msg.innerHTML = "Please leave your message";
//         comment.focus();
//         return false;
//     } else {
//         msg.innerHTML = "";
//     }
// }


// download button

function downloadCv() {
    var download = $('.download'),
        meter = $('.meter');

    $('.button-download').on('click', function(e) {
    download.toggleClass('is-active');
    
    setTimeout(function() {
        meter.toggleClass('is-done');
    }, 4000);
    });
};
