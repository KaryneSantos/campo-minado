var terminou = false;
var tamanhoDoMapa = 3;
var mapaDeMinas = [];


function iniciar() {
  console.log("Iniciando jogo...");
  document.addEventListener("contextmenu", (evento) => {
    evento.preventDefault();
  });
  gerarMapa();
  desenharMapa();
}

function gerarMapa(){
  console.log("Gerando mapa de minas...");

  mapaDeMinas = [];
  var contagemBombas = 0;

  var bombasNiveis = Math.round((tamanhoDoMapa * tamanhoDoMapa) / 2)

  for (var i = 0; i < tamanhoDoMapa; i++) {
    mapaDeMinas[i] = Array(tamanhoDoMapa).fill(0);
  }

  while(contagemBombas < bombasNiveis){
    var coluna = Math.floor(Math.random() * tamanhoDoMapa);
    var linha = Math.floor((Math.random() * tamanhoDoMapa));
    if(mapaDeMinas[linha][coluna] == 0){
      mapaDeMinas[linha][coluna] = 1;
      contagemBombas++
    }
  }

  var contador = document.getElementById('contadorDeBombas');
  contador.value;
  contador.innerHTML = contagemBombas;  
  console.log("Mapa gerado:", mapaDeMinas);
}

function desenharMapa() {
  console.log("Desenhando na tela...");

  var linhasDaTabela = "";

  for (var linha = 0; linha < tamanhoDoMapa; linha++) {
    linhasDaTabela += "<tr>";
    for (var coluna = 0; coluna < tamanhoDoMapa; coluna++) {
      linhasDaTabela += `<td class='botao' onclick='cliqueDoUsuario(${linha}, ${coluna})' oncontextmenu='adicionarBandeira(${linha}, ${coluna}), event'></td>`;
    }
    linhasDaTabela += "</tr>";
  }

  var tabela = document.querySelector("table");
  tabela.innerHTML = linhasDaTabela;

  console.log("Desenhado");
}

function cliqueDoUsuario(linha, coluna, evento) {
  iniciarTempo(linha, coluna);
  // Impedir que o úsuario clique se já ganhou. 
  if(terminou){
    console.log("não pode mais clicar, o jogo terminou.");
    return;
  }
  console.log("clique do usuario na linha", linha, "coluna", coluna);


  var tabela = document.querySelector("table");

  if (evento && evento.button === 2) {
    adicionarBandeira(linha, coluna, tabela, evento);
    evento.preventDefault();
    return;
  }


  if (mapaDeMinas[linha][coluna] === 0) {
    tabela.rows[linha].cells[coluna].className = "botao-aberto";
    verificarGanhou()
  } else if (mapaDeMinas[linha][coluna] === 1) {
    tabela.rows[linha].cells[coluna].className = "botao-bomba";
    var divMensagem = document.getElementById("msgPerdeu")
      terminou = true;
      divMensagem.className = "visivel"
    mostrarBombas()
}
}

function adicionarBandeira(linha, coluna, tabela){

  if(terminou){
    console.log("não pode mais clicar, o jogo terminou.");
    return;
  }

  console.log("adicionando bandeira...")

  if(!tabela){
    tabela = document.querySelector('table');
  }

  if (tabela.rows[linha].cells[coluna].className === "botao-aberto") {
    return;
  }
  if (tabela.rows[linha].cells[coluna].className === "botao-bandeira") {
    tabela.rows[linha].cells[coluna].className = "botao";
  } else {
    tabela.rows[linha].cells[coluna].className = "botao-bandeira";
  }
}

function mostrarBombas(){
    for(var coluna = 0; coluna < tamanhoDoMapa; coluna++){
        for(var linha = 0; linha < tamanhoDoMapa; linha++){
            if(mapaDeMinas[linha][coluna] == 1) {
                var tabela = document.querySelector("table");
                tabela.rows[linha].cells[coluna].className = "botao-bomba";
            }
        }
    }
}

function verificarGanhou(){
    var tabela = document.querySelector('table');
    var qtdZeros = 0;
    var btnVazios = 0;

    for(var coluna = 0; coluna < tamanhoDoMapa; coluna++){
        for(var linha = 0; linha < tamanhoDoMapa; linha++){
            if(tabela.rows[linha].cells[coluna].className == "botao-aberto"){
                btnVazios++
            }
            if(mapaDeMinas[linha][coluna] == 0){
                qtdZeros++
            }
        }
    }
    if(qtdZeros == btnVazios){
        console.log("ganhou")
        var divJogo = document.getElementById("jogo")
        var divMensagem = document.getElementById("msgGanhou")
        terminou = true;
        // divJogo.className = 'invisivel'
        divMensagem.className = 'visivel'
    }
}

function selecionarNiveis(){

  if(terminou){
    console.log("não pode mais clicar, o jogo terminou.");
    return;
  }
    var select = parseInt(document.getElementById("dificuldade").value)
    console.log("selecionado: ", select);
    switch(select){
     case 1:
         tamanhoDoMapa = 3;
         iniciar()
         break;
     case 2:
         tamanhoDoMapa = 5;
         iniciar()
         break;
     case 3:
         tamanhoDoMapa = 7;
         iniciar()
         break;
    }
 }

 function reiniciar(){
  iniciar();
  var divJogo = document.getElementById("jogo")
  var divMensagemGanhou = document.getElementById("msgGanhou")
  var divMensagemPerdeu = document.getElementById("msgPerdeu")
  terminou = false;
  divJogo.className = 'visivel'
  divMensagemGanhou.className = 'invisivel'
  divMensagemPerdeu.className = 'invisivel'
 }

function iniciarTempo(linha, coluna){
  
}