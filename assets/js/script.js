/* GLOBAIS */
//localStorage
var listaExtrato = [];

if (localStorage.getItem("lista") !== null) {
  var listaStorage = localStorage.getItem("lista");
  console.log("listaStorage", listaStorage);

  var listaObjeto = JSON.parse(listaStorage); //transforma as strings em objeto novamente
  console.log("listaStorage", listaObjeto);

  listaExtrato = JSON.parse(listaStorage);
}

//transforma todo numero no formato da moeda real
var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});
formatter.format(2500);

/* FUNÇÕES */

function abrirMenu() {
  document.getElementsByClassName("menu")[0].classList.add("abrirMenu");
}

//função pra fechar o menu hamburguer
function fecharMenu() {
  document.getElementsByClassName("menu")[0].classList.remove("abrirMenu");
}

//função para limpar os dados quando clica no botão limpar dados
function limparDados() {
  let userConfirma = confirm("Deseja remover todas as transações?");

  if (userConfirma) {
    document.querySelectorAll(".conteudo").forEach((element) => {
      element.remove();
    });

    localStorage.clear();
    listaExtrato = [];
    desenhaTabela();
  }
}

function desenhaTabela() {
  var total = 0;

  document.querySelectorAll(".conteudo").forEach((element) => {
    element.remove();
  });

  if (listaExtrato.length === 0) {
    document.getElementById("todasTransacoes").style.display = "flex";
    console.log(listaExtrato.length === 0);
    `
    <tr>
      <td class="nenhumaTransacao font-p" >Nenhuma transação cadastrada.</td>
    </tr>
    `;
    /*   document.querySelectorAll("#idTotal").forEach((element) => {
      element.remove();
    }); */
    document.querySelector(".lucroTotal").style.display = "none";
  } else {
    document.getElementById("todasTransacoes").style.display = "none";
    console.log(listaExtrato);

    document.querySelector(".lucroTotal").style.display = "flex";
  }

  for (produto in listaExtrato) {
    if (listaExtrato[produto].tipoTransacao == "compra") {
      total -= parseFloat(listaExtrato[produto].valorMercadoria);
    } else {
      total += parseFloat(listaExtrato[produto].valorMercadoria);
    }

    //innerHTML é o conteúdo que está dentro da tag
    document.querySelector("table.lista tbody").innerHTML += `
      <tr class="tabelaLinha d-flex">
    <tr class="mercadorias conteudo d-flex ${
      listaExtrato[produto].tipoTransacao
    } font-mercadorias" id="todasTransacoes"> 
        <td>
          ${listaExtrato[produto].nomeMercadoria}
        </td>
          <td class="valor-calculado">
          ${formatter.format(parseFloat(listaExtrato[produto].valorMercadoria))}
          </td>
      </tr>
      </tr>
 
`;
  }

  if (listaExtrato.length > 0) {
    document.querySelector("table.lista tfoot").innerHTML = `
   <tr style="d-flex">
    <td class="font-total">Total</td>

   <tr class="valor-bg">
   <td class="font-total-valor totalValor" id="totalValor">${formatter.format(
     total
   )}</td>
    <td class="lucro font-lucro" onkeypress="somaTotal()" id="lucroTotal">${
      Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"
    }</td>
    </tr>
  </tr> 

    `;
    //soma todos os valores e da o valor total
    document.getElementById("totalValor").innerHTML = formatter.format(total);

    //mostra o lucro se for negativo será prejuízo se for positivo será lucro
    document.getElementById("lucroTotal").innerHTML = `
      <tr id="idTotal">
        ${Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}
      </tr>
      `;
  }
}

//validação do formulário
//foi validado todos os campos com sucesso!!
function validacao(e) {
  e.preventDefault();

  var nomeMercadoria = document.getElementById("nome").value;
  var valorMercadoria = document.getElementById("valor").value;
  var tipoTransacao = document.getElementById("selecione").value;

  if (nomeMercadoria == "") {
    alert("Preencha o nome da mercadoria!");
    return false;
  }
  if (valorMercadoria == "") {
    alert("Preencha o valor da mercadoria!");
    return false;
  }

  if (tipoTransacao == "selecione") {
    alert("Preencha o tipo de transação!");
    return false;
  }
  /* 
  valorAtual = e.target.value.toString();
  valorAtual = valorAtual.replace(/[\D]+/g, "");
  valorAtual = valorAtual.replace(/([0-9]{1})$/g, ",$1"); */

  //coloca a variável nomeMercadoria dentro de um objeto da array listaExtrato
  listaExtrato.push({
    tipoTransacao: e.target.elements["selecione"].value,
    nomeMercadoria: e.target.elements["name"].value,
    valorMercadoria: e.target.elements["valor"].value.replace(
      /([0-9]{4})[,|\.]/g,
      ".$1"
    ),
  });

  /*   /^.\D/g, "" */

  //transforma os objetos em string
  var listaString = JSON.stringify(listaExtrato);

  //localStorage
  localStorage.setItem("lista", listaString);

  desenhaTabela();
}

desenhaTabela();
