var secret_pattern=[0];
var i;


for (var i = 1; i<6;  i++) {
  secret_pattern.push((Math.floor((Math.random() * 8)+1)));
}

$('.bouton_choix').on('click',function(){
  $.session.set('selection',this.id[7]);
  location.reload(true);
})
