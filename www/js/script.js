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
	
	coluna2 = {};
	coluna2.speed = 0;
	coluna2.snapReady = false;
	
	coluna3 = {};
	coluna3.speed = 0;
	coluna3.snapReady = false;
	
	globals = {};
	globals.d1 = 0;
	globals.d2 = 0;
	globals.d3 = 0;
	
	//pega as variáveis da URL
	
	// //Modo de acessar:
	// URLvars = getUrlVars();
	// for (var i=0; i<URLvars.length; i++){
	// 	console.log(URLvars[i] + ": " + URLvars[URLvars[i]]);		
	// }
	
	var URLvars = getUrlVars();
	var cardIDs = URLvars["deck"];
	var arrayIDs = cardIDs.split(",");
	
	//preenche as cartas com a classe de CSS devida
	var idIndex = 0;
	for (var l=1; l<4; l++){
		for(var c=1; c<4; c++){
			// console.log("coluna" + c + " " + "linha" + l + ": c" + arrayIDs[idIndex]);
			$('#coluna' + c + ' .linha' + l).addClass('c' + arrayIDs[idIndex]);
			idIndex ++;
		}
	}

	
	//ativa o "enterframe"
	interval = setInterval("nextStep()", 1000/60);//60fps
}

function nextStep(){
	snapLimit = 15;
  atrito = .95;
  
  //MANTÉM O GIRO
	somaVelocidades(true);

	//CALCULA OS ALVOS para as 3 colunas
	for(var c=1; c <= 3; c++){
		
		var colStr = 'coluna' + c;
		var col = this[colStr];
		
		if(col.speed < snapLimit && col.speed > 0 && !col.snapReady){
			atualizaDistancias(c);
			var cci = closestCardIndex(c);
			defineAlvos(cci, c);
			col.snapReady = true;
			// console.log('c' + c + ' if: ' + cci);
		} else if(col.snapReady){
			atualizaDistancias(c);
			var cci = closestCardIndex(c);
			afetaVelocidade(cci, c);
			// console.log('c' + c + ' else: ' + cci);
		}
		
		//move as cartas
		aplicaCSS();
		
		//aplica o atrito
		col.speed *= atrito;
	}
}

function clicked(event){
	// console.log(event.target.id);
	coluna1.speed = 150 + Math.random()*100;
	coluna2.speed = 300 + Math.random()*100;
	coluna3.speed = 600 + Math.random()*100;

	//reseta os snapReady
	coluna1.snapReady = false;
	coluna2.snapReady = false;
	coluna3.snapReady = false;
}

function setFloatAsData(element, key, value){	
	element.data(key, value);
}

function getFloatFromData(element, key){
	if(!element.data(key)){
		element.data(key, 0.00000000000);
	}
	return parseFloat(element.data(key));
}

function somaVelocidades(){
	// varre colunas
	for(var c=1; c<=3; c++){
		// varre linhas
		for(var l=1; l<=3; l++){
			//define o elemento
			var element = $('#coluna' + c + ' .linha' + l);
			//pega o valor armazenado no campo data do elemento
			var t = getFloatFromData(element, 'top');
			//soma a velocidade
			t += this['coluna' + c].speed;
			//atualiza a velocidade no campo data do elemento
			setFloatAsData(element, 'top', t);
		}
	}
}

function atualizaDistancias(c){
	// varre linhas
	for(var l=1; l<=3; l++){
		//define o elemento
		var element = $('#coluna' + c + ' .linha' + l);
		//pega o valor armazenado no campo data do elemento
		var t = getFloatFromData(element, 'top');			
		//calcula a diferença entre a posição da carta e o centro do slot e a armazena numa variável nomeada dinamicamente
		setFloatAsData(element, 'dist', (t - ((l-3) * -cardHeight)));
		globals['d' + l] = getFloatFromData(element, 'dist');
		// console.log("Coluna " + c + " : Carta " + l + " dist = " + getFloatFromData(element, 'dist'));
	}
}

function closestCardIndex(c){
	//descobre quem está mais perto
	if(Math.abs(globals.d1) < Math.min(Math.abs(globals.d2), Math.abs(globals.d3))){
		return 1;
	} else if(Math.abs(globals.d2) < Math.min(Math.abs(globals.d1), Math.abs(globals.d3))){
		return 2;
	} else if(Math.abs(globals.d3) < Math.min(Math.abs(globals.d1), Math.abs(globals.d2))){
		return 3;
	} else if(Math.abs(globals.d1) <= Math.min(Math.abs(globals.d2), Math.abs(globals.d3))){
		return 1;
	} else if(Math.abs(globals.d2) <= Math.min(Math.abs(globals.d1), Math.abs(globals.d3))){
		return 2;
	} else if(Math.abs(globals.d3) <= Math.min(Math.abs(globals.d1), Math.abs(globals.d2))){
		return 3;
	}
	return 'none';
}

function defineAlvos(ccIndex, c){
	for(var l=1; l<=3; l++){
		var element = $('#coluna' + c + ' .linha' + l);
		setFloatAsData(element, 'alvo', (ccIndex-3) * -cardHeight);
		// console.log("Coluna " + c + " : Carta " + l + " (" + getFloatFromData(element, 'alvo') + ")" );
	}
}

function afetaVelocidade(ccIndex, c){
	var speedDelta = -globals['d' + ccIndex]/80; // <-- diminua o divisor para aumentar a força q puxa para o lugar certo
	var col = this['coluna' + c];
	col.speed += speedDelta;
	col.speed *= 0.95; // <-- varie entre .7 e .9999 para controlar a "viscosidade" ou algo parecido
	// console.log(speedDelta);
	
	//SNAP final
	if(Math.abs(speedDelta) < 0.001){
		col.snapReady = false;
		col.speed = 0;
		console.log('coluna' + c + ': ' + closestCardIndex(c));
	}
	if(coluna1.speed == 0 && coluna2.speed == 0 && coluna2.speed == 0 && !coluna1.snapReady && !coluna2.snapReady && !coluna3.snapReady){
		console.log('-');
	}
}

function aplicaCSS(){
	// varre colunas
	for(var c=1; c<=3; c++){
		// varre linhas
		for(var l=1; l<=3; l++){
			//aplica o css no elemento
			var element = $('#coluna' + c + ' .linha' + l);
			//pega o valor armazenado no campo data do elemento
			var t = getFloatFromData(element, 'top');
			//mantém in range
			t = keepCardInRange(l-1, t);
			//atualiza a velocidade no campo data do elemento
			setFloatAsData(element, 'top', t);
			//aplica o css no elemento
			element.css('top', t);
		}
	}
}

function keepCardInRange(index, newTop){
	if(newTop > ((index-2) * -cardHeight) + cardHeight * 1.5){
		newTop -= cardHeight * 3;
	}
	return newTop;
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}