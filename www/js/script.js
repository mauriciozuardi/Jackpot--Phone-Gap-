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
function onDeviceReady()
{
	// navigator.notification.alert("PhoneGap is ready to roll");
	// init();
}

//init no browser - DEV ONLY - EXCLUIR DEPOIS
$(init);

function init(){
	//aplica a função no click dos divs
	$('#slots').click(function (event){
		clicked(event);
	});
	
	//inicia as variáveis
	cardHeight = 300;
	
	coluna1 = {};
	coluna1.speed = 0;
	coluna1.snapReady = false;
	coluna1.card1 = {};
	coluna1.card2 = {};
	coluna1.card3 = {};
	
	coluna2 = {};
	coluna2.speed = 0;
	coluna2.snapReady = false;
	coluna2.card1 = {};
	coluna2.card2 = {};
	coluna2.card3 = {};
	
	coluna3 = {};
	coluna3.speed = 0;
	coluna3.snapReady = false;
	coluna3.card1 = {};
	coluna3.card2 = {};
	coluna3.card3 = {};
	
	//debug control
	reported = false;
	
	//ativa o "enterframe"
	interval = setInterval("nextStep()", 1000/30);//30fps
}

function nextStep(){
	snapLimit = 15;
  atrito = .95;
  
  //MANTÉM O GIRO
  //atualiza a nova posição das cartas (aplica a velocidade)

	$('#coluna1 .card').css({
		top: function(index, value) {
			var newTop = parseFloat(value) + coluna1.speed;
			return keepCardInRange(index, newTop);
		}
	});
	$('#coluna2 .card').css({
		top: function(index, value) {
			var newTop = parseFloat(value) + coluna2.speed;
			return keepCardInRange(index, newTop);
		}
	});
	$('#coluna3 .card').css({
		top: function(index, value) {
			var newTop = parseFloat(value) + coluna3.speed;
			return keepCardInRange(index, newTop);
		}
	});
	
  
  // aplica o atrito (tem q usar sempre arredondados para não bugar)
  coluna1.speed = Math.floor(coluna1.speed * atrito);
  coluna2.speed = Math.floor(coluna2.speed * atrito);
  coluna3.speed = Math.floor(coluna3.speed * atrito);
  
 
	//CALCULA OS ALVOS para as 3 colunas
	for(var k=1; k <= 3; k++){
		
		var colStr = 'coluna' + k;
		var col = this[colStr];
		
		if(col.speed < snapLimit && col.speed > 0 && !col.snapReady){
		
			//percorre as cartas da coluna 1
			$('#' + colStr + ' .card').css({
				top: function(index, value) {
					//calcula a diferença entre a posição da carta e o centro do slot e a armazena numa variável nomeada dinamicamente
					col['card' + (index+1)].dist = (parseFloat(value) - ((index-2) * -cardHeight));
				}
			});
		
			closestCardIndex = -1;
		
			//descobre quem está mais perto
			if(Math.abs(col.card1.dist) < Math.min(Math.abs(col.card2.dist), Math.abs(col.card3.dist))){
				closestCardIndex = 0;
			} else if(Math.abs(col.card2.dist) < Math.min(Math.abs(col.card1.dist), Math.abs(col.card3.dist))){
				closestCardIndex = 1;
			} else if(Math.abs(col.card3.dist) < Math.min(Math.abs(col.card1.dist), Math.abs(col.card2.dist))){
				closestCardIndex = 2;
			}
		
			//define os alvos
			for(var i=0; i < 3; i++){
				var newTop = (closestCardIndex-2) * -cardHeight;
				col['card' + (i+1)].topAlvo = keepCardInRange(i, newTop);
			}
		
			//altera o comportamento
			col.snapReady = true;
		
			//publica os resultados
			console.log(colStr + ": " + closestCardIndex);
		
		} else if(col.snapReady){
			//freia mais forte
			// col.speed = Math.floor(col.speed * 0.5);
		
			// aplica o snap nas cartas
			$('#' + colStr + ' .card').css({
				top: function(index, value) {
					var card = col['card' + (index+1)];
					card.d = card.topAlvo - parseFloat(value);
					return keepCardInRange(index, Math.round(parseFloat(value) + card.d/2));
				}
			});
		}
	}
}

function clicked(event){
	// console.log(event.target.id);
	
	//tem q usar sempre inteiros para não bugar
	coluna1.speed = 100 + Math.round(Math.random()*100);
	coluna2.speed = 200 + Math.round(Math.random()*100);
	coluna3.speed = 300 + Math.round(Math.random()*100);
	
	//reseta os snapReady
	coluna1.snapReady = false;
	coluna2.snapReady = false;
	coluna3.snapReady = false;
}

function keepCardInRange(index, newTop){
	if(newTop > ((index-2) * -cardHeight) + cardHeight * 1.5){
		newTop -= cardHeight * 3;
	}
	return newTop;
}