var terminou = false;
var tamanhoDoMapa = 3;
var mapaDeMinas = [];
var intervalo = undefined;
var contagemBombas = 0;
var bombasNiveis = 0;


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

  contagemBombas = 0;

  bombasNiveis = Math.round((tamanhoDoMapa * tamanhoDoMapa) / 2)

  for (var i = 0; i < tamanhoDoMapa; i++) {
    mapaDeMinas[i] = Array(tamanhoDoMapa).fill(0);
  }

  while(contagemBombas < bombasNiveis){
    var coluna = Math.floor(Math.random() * tamanhoDoMapa);
    var linha = Math.floor((Math.random() * tamanhoDoMapa));
    if(mapaDeMinas[linha][coluna] == 0){
      mapaDeMinas[linha][coluna] = "*";
      contagemBombas++
    }
  }

  var contador = document.getElementById('contadorDeBombas');
  contador.value;
  contador.innerHTML = `${contagemBombas}`.padStart(3, "0");  
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

  gerarNumero();
  console.log("Desenhado");
}

function cliqueDoUsuario(linha, coluna, evento) {
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
 
  if (mapaDeMinas[linha][coluna] != "*") {
    tabela.rows[linha].cells[coluna].className = "botao-aberto n" + mapaDeMinas[linha][coluna];
    if(mapaDeMinas[linha][coluna] > 0){
    tabela.rows[linha].cells[coluna].innerHTML = mapaDeMinas[linha][coluna];
  }
    tempo();
    verificarGanhou();
  } else if (mapaDeMinas[linha][coluna] === "*") {
    mostrarBombas();
    tabela.rows[linha].cells[coluna].className = "botao-bomba botao-bomba-clicou";
    document.querySelector("#btnReiniciar").className = "botao-reiniciar-perdeu";
      terminou = true;
      pause();
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
    if(contagemBombas <= bombasNiveis){
      contagemBombas += 1;
    document.querySelector("#contadorDeBombas").innerHTML = `${contagemBombas}`.padStart(3, "0");
    tabela.rows[linha].cells[coluna].className = "botao";
    }
  } else {
    if(contagemBombas > 0){
    contagemBombas -= 1
    document.querySelector("#contadorDeBombas").innerHTML = `${contagemBombas}`.padStart(3, "0");
    tabela.rows[linha].cells[coluna].className = "botao-bandeira";
    tempo();
    }
  }
}

function mostrarBombas(){
    for(var coluna = 0; coluna < tamanhoDoMapa; coluna++){
        for(var linha = 0; linha < tamanhoDoMapa; linha++){
          var tabela = document.querySelector("table");
            if(mapaDeMinas[linha][coluna] == "*") {
                tabela.rows[linha].cells[coluna].className = "botao-bomba";
            }
            if(mapaDeMinas[linha][coluna] != "*" && tabela.rows[linha].cells[coluna].className == "botao-bandeira"){
              console.log("local da bandeira errada!")
              tabela.rows[linha].cells[coluna].className = "botao-bandeira botao-bandeira-fechar";
            }
        }
    }
}

function verificarGanhou(){
    var tabela = document.querySelector('table');
    var qtdNumeros = 0;
    var btnVazios = 0;

    for(var coluna = 0; coluna < tamanhoDoMapa; coluna++){
        for(var linha = 0; linha < tamanhoDoMapa; linha++){
            if(tabela.rows[linha].cells[coluna].className == "botao-aberto n" + mapaDeMinas[linha][coluna]){
                btnVazios++
            }
            if(mapaDeMinas[linha][coluna] != "*"){
                qtdNumeros++
            }
        }
    }
    console.log("botão vazio: ", btnVazios)
    console.log("botão zeros: ", qtdNumeros)
    if(qtdNumeros == btnVazios){
      document.querySelector("#btnReiniciar").className = "botao-reiniciar-ganhou";
      document.querySelector("#mensagem").className = "visivel";
        terminou = true;
        pause();
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
  document.querySelector("#btnReiniciar").className = "botao-reiniciar"
  document.querySelector("#mensagem").className = "invisivel";
  iniciar();
  terminou = false;
  pause();
  zerarTempo();
 }

 function gerarNumero(){
  for(var linha = 0; linha < tamanhoDoMapa; linha++){
    for(var coluna = 0; coluna < tamanhoDoMapa; coluna++){
      if(mapaDeMinas[linha][coluna] == 0){

        var quantidadeAoRedor = 0;

        for(var i = linha - 1; i <= linha + 1; i++){
          for(var j = coluna - 1; j <= coluna + 1; j++){
            if(i >= 0 && i < tamanhoDoMapa && j >= 0 && j < tamanhoDoMapa && mapaDeMinas[i][j] == "*"){
              quantidadeAoRedor++
            }
          }
      }
      mapaDeMinas[linha][coluna] = quantidadeAoRedor;
    }
  }
  }
 }

 function tempo(){
  if(intervalo != undefined){
    console.log("intervalo já foi criado")
    return;
  }

  console.log("iniciou tempo");
  var hrs = 0;
  var min = 0;
  var seg = 0

  var cron = 1000;

  intervalo = setInterval(function (){
    seg++

    if (seg == 60) {
      seg = 0;
      min++;
    }

    if (min == 60) {
      min = 0;
      hrs++;
    }
    var minutos = document.getElementById("temporizador");
    minutos.innerHTML = `${min}`.padStart(2, "0") + `${seg}`.padStart(2, "0")
  }, cron)

}

function pause(){
  clearInterval(intervalo);
  intervalo = undefined;
}

function zerarTempo(){
  var tempo = document.querySelector("#temporizador")
  tempo.innerHTML = `0:0`.padStart(2, "0");
}