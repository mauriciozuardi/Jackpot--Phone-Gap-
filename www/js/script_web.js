// If you want to prevent dragging, uncomment this section
// function preventBehavior(e) 
// { 
//     e.preventDefault(); 
//   };
// document.addEventListener("touchmove", preventBehavior, false);

/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
for more details -jm */
/*
function handleOpenURL(url)
{
	// TODO: do something with the url passed in.
}
*/

function onBodyLoad()
{		
	document.addEventListener("deviceready", onDeviceReady, false);
}

/* When this function is called, PhoneGap has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
for more details -jm */

//init no device
function onDeviceReady()
{
	// navigator.notification.alert("PhoneGap is ready to roll")
	init();
}

//init no browser - DEV ONLY - EXCLUIR DEPOIS
// $(init);

function init(){
	//aplica a função no click dos divs
	$('#container').click(function (event){
		clicked(event);
	});
	
	//ativa o "enterframe"
	interval = setInterval("nextStep()", 1000/30);//30fps
}

function nextStep(){
	snapLimit = 3;
  atrito = .95;
	speedColuna1 = 7;
	speedColuna2 = 13;
	speedColuna3 = 17;
  
  //MANTÉM O GIRO
  //atualiza a nova posição das cartas (aplica a velocidade)

  $('#coluna1 .card').css({
		top: function(index, value) {
		        var newTop = parseFloat(value) + speedColuna1;
						// console.log(index + ":" + newTop);
						if(newTop > ((index-2) * -300) + 470){
							newTop = ((index-2) * -300) - 420;
						}
						return newTop;
		      }
	});
	
	$('#coluna2 .card').css({
		top: function(index, value) {
		        var newTop = parseFloat(value) + speedColuna2;
						// console.log(index + ":" + newTop);
						if(newTop > ((index-2) * -300) + 470){
							newTop = ((index-2) * -300) - 420;
						}
						return newTop;
		      }
	});
	
	$('#coluna3 .card').css({
		top: function(index, value) {
		        var newTop = parseFloat(value) + speedColuna3;
						// console.log(index + ":" + newTop);
						if(newTop > ((index-2) * -300) + 470){
							newTop = ((index-2) * -300) - 420;
						}
						return newTop;
		      }
	});
  
  //aplica o atrito
  // speedColuna1 *= atrito;
  // speedColuna2 *= atrito;
  //  speedColuna3 *= atrito;
  
  //SNAP COLUNA 1
  // if (speedColuna1 < snapLimit) {
  //     //define as distancias
  //     float d1 = card1.position.y - defaultCardY;
  //     float d2 = card2.position.y - defaultCardY;
  //     float d3 = card3.position.y - defaultCardY;
  // 
  //     //identifica quem está mais perto e define os alvos
  //     if(!snapTargetsDefinedColuna1){
  //         if(abs(d1)<cardHeight/2){
  //             //card 1 é a mais próxima
  //             card1.yAlvo = defaultCardY;
  //             //define o alvo das outras
  //             card2.yAlvo = round(card2.position.y - d1);
  //             card3.yAlvo = round(card3.position.y - d1);
  //             NSLog(@"1 - Dark Ripper (%f, %f, %f)", card1.yAlvo, card2.yAlvo, card3.yAlvo);
  //         } else if(abs(d2)<cardHeight/2){
  //             //card 2 é a mais próxima
  //             card2.yAlvo = defaultCardY;
  //             //define o alvo das outras
  //             card1.yAlvo = round(card1.position.y - d2);
  //             card3.yAlvo = round(card3.position.y - d2);
  //             NSLog(@"2 - Forest Brute (%f, %f, %f)", card1.yAlvo, card2.yAlvo, card3.yAlvo);
  //         } else if(abs(d3)<cardHeight/2){
  //             //card 3 é a mais próxima
  //             card3.yAlvo = defaultCardY;
  //             //define o alvo das outras
  //             card2.yAlvo = round(card2.position.y - d3);
  //             card1.yAlvo = round(card1.position.y - d3);
  //             NSLog(@"3 - Tesla, the Hastah (%f, %f, %f)", card1.yAlvo, card2.yAlvo, card3.yAlvo);
  //         }
  //         
  //         //avisa que já calculou
  //         snapTargetsDefinedColuna1 = YES;
  //         
  //     } else {
  //         //SMOOTH
  //         speedColuna1 *= .5;
  //         card1.position = ccp(card1.position.x, card1.position.y + (card1.yAlvo - card1.position.y)/20);
  //         card2.position = ccp(card2.position.x, card2.position.y + (card2.yAlvo - card2.position.y)/20);
  //         card3.position = ccp(card3.position.x, card3.position.y + (card3.yAlvo - card3.position.y)/20);        
  //     }
  //     
  // } else {
  //     //HARD
  //     if(card1.position.y < defaultCardY - (1.5 * cardHeight)){
  //         card1.position = ccp(card1.position.x, card1.position.y + (3*cardHeight));
  //     }
  //     if(card2.position.y < defaultCardY - (1.5 * cardHeight)){
  //         card2.position = ccp(card2.position.x, card2.position.y + (3*cardHeight));
  //     }
  //     if(card3.position.y < defaultCardY - (1.5 * cardHeight)){
  //         card3.position = ccp(card3.position.x, card3.position.y + (3*cardHeight));
  //     }
  // }
  
}

function clicked(event){
	console.log(event.target.id);
}