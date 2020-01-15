var secret_pattern=[0];
var i;
var color_guess=[0,0,0,0,0,0]; //retiens le choix du joueur quand il appuie sur "test"
var which_slot;


for (var i = 1; i<6;  i++) {
  secret_pattern.push((Math.floor((Math.random() * 8)+1)));
}

$('.pcolor_spot').on('click',function(){
  which_slot=this.id[6];
  color_guess[which_slot]+=1;
  if (color_guess[which_slot]==9){
    color_guess[which_slot]=1; //si on est à la dernière couleur on revient à la première.
    $("#"+this.id).removeClass("color8");
    $("#"+this.id).addClass("color1");
  }
  else {
    $("#"+this.id).removeClass("color"+(color_guess[which_slot]-1));
    $("#"+this.id).addClass("color"+color_guess[which_slot]);
  }

})
