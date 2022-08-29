function changefontsize() {
    var myInput = document.getElementById('placename');
    if(isOverflown(myInput)) {
        while(isOverflown(myInput)){
            console.log("padding = " + myInput.offsetHeight)
            fontsize -= (fontsize / 20);
            myInput.style.fontSize = fontsize + 'em';
        }
    } else {
        console.log('setting')
        fontsize = 1;
        myInput.style.fontSize = fontsize + 'em';

        while (isOverflown(myInput)){
            console.log("padding = " + myInput.offsetHeight)
            fontsize -= (fontsize / 20);
            myInput.style.fontSize = fontsize + 'em';

        }
    }
  }
  
  function isOverflown(element) {
    console.log(element.scrollWidth);
    console.log(element.clientWidth);
      return element.scrollWidth > element.clientWidth;
  }