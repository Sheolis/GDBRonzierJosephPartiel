var secret_pattern=[0];
var color_guess=[0,0,0,0,0,0]; //retiens le choix du joueur quand il appuie sur "test"
var no_iteration_check=[0,0,0,0,0,0,0,0,0]; //permet de faire en sorte qu'un indice ne soit pas donné 2 fois pour le même pion
var quantity_check=0;
var which_slot;
var try_number=0;
var victory_check=0;
//génération de la couleur mystère
for (var i = 1; i<6;  i++) {
  secret_pattern.push((Math.floor((Math.random() * 8)+1)));
}

//selection des couleurs
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

$('.pcolor_spot').mousedown(function(event) {
  switch (event.which) {
      case 3:
      which_slot=this.id[6];
      color_guess[which_slot]-=1;
      if (color_guess[which_slot]==0){
        color_guess[which_slot]=8; //si on est à la dernière couleur on revient à la première.
        $("#"+this.id).removeClass("color1");
        $("#"+this.id).addClass("color8");
      }
      else {
        $("#"+this.id).removeClass("color"+(color_guess[which_slot]+1));
        $("#"+this.id).addClass("color"+color_guess[which_slot]);
      }
    }
})



$('#validation').on('click',function(){
  try_number++;
  victory_check=0;
  no_iteration_check=[0,0,0,0,0,0,0,0,0];
  for (var i = 1; i<6; i++) {
    $("#c"+try_number+"_"+i).removeClass("color10");
    $("#c"+try_number+"_"+i).removeClass("color11");
    $("#"+try_number+"_"+i).addClass("color"+color_guess[i]);//on met l'historique à jour avec le dernier test

    if (color_guess[i]==secret_pattern[i]){ //si une couleur est bien placée
      $("#c"+try_number+"_"+i).addClass("color10"); //on le note
      victory_check++;
      no_iteration_check[color_guess[i]]+=1; //et on retiens qu'un indice à été donné pour cet emplacement.
    }
    else {
      victory_check=0;
    }
  }
  for (var i = 1; i<6; i++) { //on est obligé de faire une deuxieme boucle, afin de placer en priorité les pions qui sont au bon endroit et les comptabiliser
    if (secret_pattern.indexOf(color_guess[i])!=-1){
      quantity_check=0;
      for(var j=1; j<6; j++) {
        if (secret_pattern[j]==color_guess[i]) {
          quantity_check++;
        }
      }
      if (no_iteration_check[color_guess[i]]<quantity_check) {
        $("#c"+try_number+"_"+i).addClass("color11");
        victory_check=0;
        no_iteration_check[color_guess[i]]+=1; //et on retiens qu'un indice à été donné pour cet emplacement.
      }
    }
  }
  if (victory_check==5){
    $('#victory').removeClass('hidden');
    $('#restart_button').removeClass('hidden');
    for (var i = 1; i<6;  i++) {
      $('#guess_'+i).unbind("click");
    }
  }

  else if (try_number==12) { //afficher la défaite
    $('#defeat').removeClass('hidden');
    $('#restart_button').removeClass('hidden');
    for (var i = 1; i<6; i++) {
      $("#guess_"+i).addClass("color"+secret_pattern[i]);
      $('#guess_'+i).unbind("click");
    }
  }
})
