document.querySelector('#flagpicker').addEventListener(
    "submit",
    function (event){
        event.preventDefault();
        var placename = document.querySelector('#placename').value;
        setColor(placename);
    }
)

function setColor(placename) {
    var box = document.querySelector('#colorbox');
    while (box.hasChildNodes()){
        box.removeChild(box.lastChild);
    }
    fetch($URL + '/flag-color?' + new URLSearchParams({
        placename: placename
    }))
    .then(response => response.json())
    .then(function (json){
        gradstring = "linear-gradient(to right"
        for(var i = 0; i < json.length; i++){
            var rgb = json[i]['rgb'];
            rgbstring = "rgb(" + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'
            gradstring += ", " + rgbstring
        }
        box.style['background-image'] = gradstring
    })
}