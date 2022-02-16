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

//formata o valor para Real "R$"
function formatterCurrency(value) {
  const valueFormat = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valueFormat;
}

//funções que fazer o menu-hamburguer funcionar
function abrirMenu() {
  document.getElementsByClassName("menu")[0].classList.add("abrirMenu");
}
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

//função que desenha toda a tabela de acordo com as funções criadas
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
    document.querySelector(".lucroTotal").style.display = "none";
  } else {
    document.getElementById("todasTransacoes").style.display = "none";
    console.log(listaExtrato);

    document.querySelector(".lucroTotal").style.display = "flex";
  }
  let valorMascara;

  for (produto in listaExtrato) {
    if (listaExtrato[produto].tipoTransacao == "compra") {
      // total -= parseFloat(listaExtrato[produto].valorMercadoria);
      valorMascara = listaExtrato[produto];
      total -= Number(listaExtrato[produto].valorMercadoria);
    } else {
      // total += parseFloat(listaExtrato[produto].valorMercadoria);
      total += Number(listaExtrato[produto].valorMercadoria);
    }

    //adiciona as transações
    document.querySelector("table.lista tbody").innerHTML += `
  
    <tr class="grid-bg extratos mercadorias conteudo font-mercadorias" id="todasTransacoes"> 
     <td class="campoTransacao">${
       listaExtrato[produto].tipoTransacao == "compra" ? "-" : "+"
     }</td>
        <td class="campoMercadoria">
          ${listaExtrato[produto].nomeMercadoria}
        </td>
        <td></td>
        <td></td>
          <td class="valor-calculado">
          ${formatterCurrency(Number(listaExtrato[produto].valorMercadoria))}
          </td>
      </tr>

 
`;
  }

  //total
  if (listaExtrato.length > 0) {
    document.querySelector("table.lista tfoot").innerHTML = `
   
    <tr>
      <td>Total</td>
      <td>${formatter.format(total)}</td>
    </tr>

    `;

    /* <td class="font-total">Total</td>
    <td class="font-total-valor totalValor" id="totalValor">
     ${formatter.format(total)}
      </td>
    <tr class="valor-bg">
      <td class="lucro font-lucro" onkeypress="somaTotal()" id="lucroTotal">
       ${Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}
        </td>
           </tr>  */

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

  listaExtrato.push({
    tipoTransacao: e.target.elements["selecione"].value,
    nomeMercadoria: e.target.elements["name"].value,
    valorMercadoria: e.target.elements["valor"].value
      .replaceAll(".", "")
      .replaceAll(",", "."),
  });

  //transforma os objetos em string para que possam ser mostrados na tabela
  var listaString = JSON.stringify(listaExtrato);

  //localStorage
  localStorage.setItem("lista", listaString);

  desenhaTabela();
}

desenhaTabela();
