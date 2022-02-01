var listaExtrato = [];

//localStorage
if (listaExtrato !== null) {
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
    tipoTransacao: tipoTransacao,
    nomeMercadoria: nomeMercadoria,
    valorMercadoria: valorMercadoria,
  });

  //transforma os objetos em string
  var listaString = JSON.stringify(listaExtrato);

  //localStorage
  localStorage.setItem("lista", listaString);
}

//adiciona máscara no campo valor
function campoValor(e) {
  e.preventDefault();
  console.log(e);

  if (e.target.value.length == 0) {
    e.target.value += "R";
  }

  if (e.target.value.length == 1) {
    e.target.value += "$";
  }

  if (e.target.value.length == 2) {
    e.target.value += " ";
  }

  if (e.target.value.length == 5) {
    e.target.value += ",";
  }

  if (/[0-9]/g.test(e.key) && e.target.value.length < 8) {
    e.target.value += e.key;
  }
}

var produtos = [{}];

for (produto in produtos) {
  //innerHTML é o conteúdo que está dentro da tag
  document.querySelector("table.lista tbody").innerHTML += `
      <tr class="mercadorias venda font-mercadorias">
        <td>
          ${produtos[produto].name}
        </td>
          <td>
          ${produtos[produto].valor}
          </td>
      </tr>
`;

  console.log(produtos[produto]);
}
