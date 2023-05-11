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

function gerarMapa() {
  console.log("Gerando mapa de minas...");

  var contagem_bombas = 0;

  for (var i = 0; i < tamanhoDoMapa; i++) {
    mapaDeMinas[i] = Array(tamanhoDoMapa).fill(0);
  }

  for (var coluna = 0; coluna < tamanhoDoMapa; coluna++) {
    for (var linha = 0; linha < tamanhoDoMapa; linha++) {
      mapaDeMinas[linha][coluna] = Math.floor(Math.random() * 2);
      if(mapaDeMinas[linha][coluna] == 1){
        contagem_bombas++
      }
    }
  }

  console.log("Mapa gerado:", mapaDeMinas);
  console.log("Quantidade de bombas:", contagem_bombas);
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
    mostrarBombas()
}
}

function adicionarBandeira(linha, coluna, tabela){
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
    }
}

function selecionarNiveis(){
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

