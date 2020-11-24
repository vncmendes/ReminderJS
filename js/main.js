var lembretesSelecionados = [];

//funtion deletar
function deletarLembrete() {
	if (lembretesSelecionados.length > 0) {
		var lembretesExistentes = localStorage.getItem("lembretes");
		if (lembretesExistentes != null || lembretesExistentes != "" ) {
			var lembretesRecuperados = JSON.parse(lembretesExistentes);
			for (var i = 0; i < lembretesSelecionados.length; i++) {
				for (var j = 0; j < lembretesSelecionados.length; j++) {
					if (lembretesSelecionados[i] == lembretesRecuperados[j].id) {
						lembretesRecuperados[j].id =-1;
					}
				}
			}
			var lembretesTemporario = [];
			for (var i = 0; i < lembretesRecuperados.length; i++) {
				if (lembretesRecuperados[i].id !=-1) {
					lembretesTemporario.push(lembretesRecuperados[i]);
				}
			}

			//delete lembrete
			if (lembretesTemporario.length == 0) {
				localStorage.setItem("lembretes", "");
			}
			else {
				salvarLembretes(lembretesTemporario);
			}

			mostrarLembretes();
			selecionarLembrete();
		}

	}
}


//funtion verificar se há texto.
function textoValido(texto) {
	if (texto == null || texto == "" || texto.length < 1) {
		return false;
	}
	else {
		return true;
	}
}

//funtion mostra erros.
function mostrarErro() {
	var html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += 'Anote para não esquecer !';
	html += '</div>';

	document.getElementById('error').innerHTML = html;
}

function limparErros() {
	document.getElementById("error").innerHTML = "";
}

function criandoLembrete() { //createRecordatorio
	var conteudoTextArea = document.getElementById("texto").value;
	if (!textoValido(conteudoTextArea)) {
		mostrarErro();
		return;
	}

	limparErros();

	//var dos tempos
	var referencia = new Date();
	var id = referencia.getTime();
	var data = referencia.toLocaleDateString(); //ver se fica com () ou não, se é função ou não.
	var texto = conteudoTextArea;

	//json = objeto javascript, tipo de retorno de dados.
	var lembrete = {"id": id, "data": data, "texto": texto}; //recordatorio

	//function para ver se existe o lembrete
	checkLembrete(lembrete); //comprovarRecordatorio
	document.getElementById("texto").value = "";
}

function lembreteValido(lembretesExistentes) { //recordatorioValido ---- aqui ele bota no plural cuidar
	if (lembretesExistentes == null || lembretesExistentes == "" || typeof lembretesExistentes == "undefined" || lembretesExistentes == "undefined" ) {
		return false;
	}
	else {
		return true;
	}
}

function checkLembrete(lembrete) { //comprovarRecordatorio
	var lembretesExistentes = localStorage.getItem("lembretes"); // cuidar se é lembrete ou lembretes
	if (!lembreteValido(lembretesExistentes)) {
		var lembretes = [];
		lembretes.push(lembrete);

		//salvar lembrete
		salvarLembretes(lembretes); // saveRecordatorio
	}
	else {
		var lembretesRecuperados = JSON.parse(lembretesExistentes);
		//salvar lembrete
		lembretesRecuperados.push(lembrete);
		salvarLembretes(lembretesRecuperados); // saveRecordatorio
	}
	mostrarLembretes();
}

// recuperar lembretes
function selecionarLembrete() {
	var lembretes = document.getElementsByClassName("lembretes"); // erro aqui.
	for (var i = 0; i < lembretes.length; i++) {
		document.getElementById(lembretes[i].id).onclick = function(e) {
			e.stopPropagation();
			//casi tebga lembrete
			if (lembretesSelecionados.indexOf(this.id) == -1) {
				this.style.backgroundColor = "red";
				lembretesSelecionados.push(this.id);
			}
			else {
				this.style.backgroundColor = "#41dff4";
				for (var j = 0; j < lembretesSelecionados.length; j++) {
					if(lembretesSelecionados[j] == this.id) {
						lembretesSelecionados[j] = 0;
					}
				}
			}
			var lembreteTemporario = [];
			for (var k = 0 ; k < lembretesSelecionados; k++) {
				if (lembretesSelecionados[k] != 0) {
					lembreteTemporario.push(lembretesSelecionados[k]);
				}
			}
			lembretesSelecionados = lembreteTemporario;
		};
	}
}

// salvar lembrete
function salvarLembretes(lembretes) {
	var lembretesJSON = JSON.stringify(lembretes);
	localStorage.setItem("lembretes", lembretesJSON); // no código fica setItem("re]", lembretesJSON);
}

//exibir itens
function mostrarLembretes() {
	var html = "";
	var lembretesExistentes = localStorage.getItem("lembretes");
	if (!lembreteValido(lembretesExistentes)) { // ver o nome da funcao. acho que ele usa recordatorioValido

		html = "Não existem lembretes !";
		document.getElementById("lembretes").innerHTML = html;
	}
	else {
		// var lembretesRecuperados; //estava fuçando aqui
		// lembretesRecuperados - JSON.parse(lembretesExistentes); // no video parece ser ( - ) em vez de ( = )
		var lembretesRecuperados = JSON.parse(lembretesExistentes);
		for (var i = 0; i < lembretesRecuperados.length; i++) {
			html += formatarLembrete(lembretesRecuperados[i]);
		}
		document.getElementById("lembretes").innerHTML = html;
	}
}

//function exibir lembretes
function formatarLembrete(lembrete) {
	var html = "";
	html += '<div class="lembrete" id="' + lembrete.id + '">';
	html += '<div class="row">';
	html += '<div class="col-6 text-left">';
	html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + lembrete.data + '</small>';
	html += '</div>';
	html += '<div class="col-6 text-right">';
	html += '<small><i class="fa fa-window-close" aria-hidden="true"></i></small>';
	html += '</div>';
	html += '</div>';
	html += '<br>';
	html += '<div class="row">';
	html += '<div class="col-12">';
	html += lembrete.texto;
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<br>';

	return html;
}

document.addEventListener('DOMContentLoaded', function() {
	console.log('bombo !');
	document.getElementById("buttonSave").onclick = criandoLembrete;
	console.log('até aqui vem?');
	document.getElementById("buttonDelete").onclick = deletarLembrete;
	mostrarLembretes();
	selecionarLembrete();
});













