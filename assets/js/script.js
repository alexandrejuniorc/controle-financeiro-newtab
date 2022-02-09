var listaExtrato = [];

//localStorage
if (localStorage.getItem("lista") !== null) {
  var listaStorage = localStorage.getItem("lista");
  console.log("listaStorage", listaStorage);

  var listaObjeto = JSON.parse(listaStorage); //transforma as strings em objeto novamente
  console.log("listaStorage", listaObjeto);

  listaExtrato = JSON.parse(listaStorage);
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

  //coloca a variável nomeMercadoria dentro de um objeto da array listaExtrato
  listaExtrato.push({
    tipoTransacao: e.target.elements["selecione"].value,
    nomeMercadoria: e.target.elements["name"].value,
    valorMercadoria: e.target.elements["valor"].value.replace(/^.\D/g, ""), //remove todos os dígitos que não sejam números e mantém apenas o ponto, como foi declarado
  });

  //transforma os objetos em string
  var listaString = JSON.stringify(listaExtrato);

  //localStorage
  localStorage.setItem("lista", listaString);

  desenhaTabela();
}

//adiciona máscara no campo valor
function campoValor(e) {
  e.preventDefault();
  console.log(e);

  if (e.target.value.length == 2) {
    e.target.value += ".";
  }

  if (/[0-9]/g.test(e.key) && e.target.value.length < 5) {
    e.target.value += e.key;
  }
}

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});
formatter.format(2500);

function desenhaTabela() {
  var total = 0;

  document.querySelectorAll("#todasTransacoes > *").forEach((element) => {
    element.remove();
  });

  if (listaExtrato.length === 0) {
    document.getElementById("todasTransacoes").innerHTML += `
    <tr>
      <td class="nenhumaTransacao font-p" >Nenhuma transação cadastrada.</td>
    </tr>
    `;
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
    document.getElementById("lucroTotal").innerHTML =
      Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]";
  }
}
//função para limpar os dados quando clica no botão limpar dados
function limparDados() {
  let userConfirma = confirm("Deseja remover todas as transações?");

  if (userConfirma) {
    document.querySelectorAll(".conteudo").forEach((element) => {
      element.remove();
    });
    document.querySelectorAll("tfoot").forEach((element) => {
      element.remove();
    });
    localStorage.clear();
    listaExtrato = [];
  }
  desenhaTabela();
}

desenhaTabela();
