const padraoNumeros = /[^0-9]/;

function mascaraDinheiro(e) {
  if (padraoNumeros.test(e.key)) {
    console.log(e.key);
    e.preventDefault();
    return;
  }

  if (!e.target.value) return;

  valor = e.target.value.toString();
  valor = valor.replace(/[\D]+/g, "");
  valor = valor.replace(/([0-9]{1})$/g, ",$1");

  if (valor.length >= 6) {
    while (/([0-9]{4})[,|\.]/g.test(valor)) {
      valor = valor.replace(/([0-9]{1})$/g, ",$1");
      valor = valor.replace(/([0-9]{3})[,|\.]/g, ".$1");
    }
  }
  e.target.value = valor;
}
