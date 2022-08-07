function changefontsize() {
    var myInput = document.getElementById('placename');
    if(isOverflown(myInput)) {
        while(isOverflown(myInput)){
            console.log('smallening')
            fontsize -= (fontsize / 20);
            myInput.style.fontSize = fontsize + 'em';
        }
    } else {
        console.log('setting')
        fontsize = 1;
        myInput.style.fontSize = fontsize + 'em';
        while (isOverflown(myInput)){
            fontsize -= (fontsize / 20);
            myInput.style.fontSize = fontsize + 'em';
        }
    }
  }
  
  function isOverflown(element) {
      return element.scrollWidth > element.clientWidth;
  }