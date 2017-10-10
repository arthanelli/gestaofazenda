const gado = [
  {
    id: 1,
    nome: 'mimosa',
    status: 'gravida',
    dataNascimento: '10/12/2014',
    dataCiclo: '10/03/2017',
  },
  {
    id: 2,
    nome: 'super',
    status: 'bezzero',
    dataNascimento: '10/01/2015',
    dataCiclo: '',
  }
]

function setNotification(msg) {
  console.log(msg);
}

function getToday () {
  const d = new Date();
  const today = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
  }

  return today
}

function getAge(birth) {
  if (birth === '') {
    return '';
  }

  const cattle = {
    year: birth.substring(birth.length - 4, birth.length),
    month: birth.substring(birth.length - 7, birth.length - 5),
    day: birth.substring(birth.length - 10, birth.length - 8),
  }

  const today = getToday();

  const age = {
    year: today.year - cattle.year,
    month: today.month - cattle.month
  }

  if (age.month < 0) {
    age.month = age.month + 12;
  }

  return age;
}

function setCiclo(ciclo, id) {
  // INSERT ID CICLO E DATA DO CICLO (TODAY())
}

const rules = {
  gravida: 2,
}


const today = getToday();

gado.forEach(elem => {
  const age = getAge(elem.dataNascimento);
  const dateCycle = getAge(elem.dataCiclo);

  if (age.year >= rules.gravida && elem.status !== 'PODE-GRAVIDA') {
    setCiclo('PODE-GRAVIDA', elem.id);
    setNotification(`${elem.nome} precisa ficar Grávida`);
  } else if (elem.status === 'GRAVIDA' && dateCycle.month > 7) {
    setCiclo('PRODUCAO', elem.id);
    setNotification(`${elem.nome} PODE ENTRAR EM PRODUÇÃO`);
  } else if (elem.status === 'PRODUCAO' && dateCycle.month > 1) {
    setCiclo('PARTO', elem.id);
    setNotification(`${elem.nome} Está perto de nascer novo bezzero`);
  } else if (elem.status === 'PARTO' && dateCycle.month > 2) {
    setCiclo('RECEM-PARTO', elem.id);
    setNotification(`${elem.nome} JÁ ESTA PRONTA PARA NOVA GRAVIDEZ`);
  }
});
