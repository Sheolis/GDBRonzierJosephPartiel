var secret_pattern=[0];
var color_guess=[0,0,0,0,0,0]; //retiens le choix du joueur quand il appuie sur "test"
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
  for (var i = 1; i<6; i++) {
    $("#c"+try_number+"_"+i).removeClass("color10");
    $("#c"+try_number+"_"+i).removeClass("color11");
    $("#"+try_number+"_"+i).addClass("color"+color_guess[i]);
    if (color_guess[i]==secret_pattern[i]){
      $("#c"+try_number+"_"+i).addClass("color10");
      victory_check++;
    }
    else if (secret_pattern.indexOf(color_guess[i])!=-1){
      $("#c"+try_number+"_"+i).addClass("color11");
      victory_check=0;
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
