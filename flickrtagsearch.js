/*!
 * Flickr Tag Search
 * Author: Olufemi Saliu
 * Last Updated: March 23, 2014
 * 
 * Allows the user to browse Flickr
 * photos and conduct further searches
 * using the photos' tags.
 */

var myApi = 'f9c6edac33c3ecbee938e9a2ebe2cf1a'
var flickrURL = 'http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key='+myApi+'&format=json&nojsoncallback=1';
var tagUrl = '&per_page=24&page=1&tags=';



function newTagSearch() {
  var query = document.getElementById("tagQuery").value;
  var finishedURL = flickrURL+tagUrl+query;

  $.getJSON(finishedURL, function(data){
    document.getElementById("pictures").innerHTML="ready";
    var longPictureString ="";
    $.each(data.photos.photo, function(i,item){
      var farmId = item.farm;
      var serverId = item.server;
      var picId = item.id;
      var secretId = item.secret;
      var photoTitle = item.title;
      var newHTMLimage = '<input name ="'+photoTitle+'"type="image" width="25%" id="'+picId+'" onclick="pictureClicked(this.src, this.name, this.id)" src=http://farm'
                          +farmId+'.staticflickr.com/'+serverId+'/'+picId+'_'+secretId+'.jpg >';
      longPictureString += newHTMLimage;
    });
    document.getElementById("pictures").innerHTML=longPictureString;
  });
}

function pictureClicked(_src, _name, _id){
  var imageSource = _src;
  var imageTitle = _name;
  var imageId = _id;
  document.getElementById("fixedPos").setAttribute('id',"fixedPos2");

  var bigPhoto = document.createElement('img');
  bigPhoto.setAttribute('src', _src);
  bigPhoto.setAttribute('id', 'selectedPhoto');

  var backButton = document.createElement('input');
  backButton.setAttribute('type','button');
  backButton.setAttribute('id','backButton');
  backButton.setAttribute('value','Back');
  backButton.setAttribute('onclick','backButtonClick()');

  var bigPhotoName = document.createElement('p');
  bigPhotoName.setAttribute('id','bigPhotoInfo');
  bigPhotoName.setAttribute('class','whiteText');
  bigPhotoName.innerHTML=imageTitle;

  document.getElementById("forPhoto").appendChild(bigPhoto);
  document.getElementById("fixedPos2").appendChild(bigPhotoName);
  document.getElementById("fixedPos2").appendChild(backButton);
  document.getElementById("fixedPos2").appendChild(document.createElement('br'));
  getTagsForPhoto(imageId);
  
  

}

function backButtonClick(){
  document.getElementById("fixedPos2").setAttribute('id',"fixedPos");
  document.getElementById("fixedPos").innerHTML='<div id="forPhoto"></div>';
}

function getTagsForPhoto(givenId){
  var url = 'http://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key='+myApi+'&photo_id='+givenId+'&format=json&nojsoncallback=1';
  $.getJSON(url, function(data){
    $.each(data.photo.tags.tag, function(i,item){
      var tagButton = document.createElement('input');
          tagButton.setAttribute('type','button');
          tagButton.setAttribute('id','backButton');
          tagButton.setAttribute('value',item.raw);
          tagButton.setAttribute('onclick','tagClicked(this.value)');
          document.getElementById("fixedPos2").appendChild(tagButton);

    });
  });
}

function tagClicked(_value){
  backButtonClick();
  var query = _value;
  var finishedURL = flickrURL+tagUrl+query;

  $.getJSON(finishedURL, function(data){
    document.getElementById("pictures").innerHTML="ready";
    var longPictureString ="";
    $.each(data.photos.photo, function(i,item){
      var farmId = item.farm;
      var serverId = item.server;
      var picId = item.id;
      var secretId = item.secret;
      var photoTitle = item.title;
      var newHTMLimage = '<input name ="'+photoTitle+'"type="image" width="25%" id="'+picId+'" onclick="pictureClicked(this.src, this.name, this.id)" src=http://farm'
                          +farmId+'.staticflickr.com/'+serverId+'/'+picId+'_'+secretId+'.jpg >';
      longPictureString += newHTMLimage;
    });
    document.getElementById("pictures").innerHTML=longPictureString;
  });
}