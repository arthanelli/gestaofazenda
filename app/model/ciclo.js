const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js')
const config = acessos.config;

// const gado = [
//   {
//     id: 1,
//     nome: 'mimosa',
//     status: 'gravida',
//     dataNascimento: '10/12/2014',
//     dataCiclo: '10/03/2017',
//   },
//   {
//     id: 2,
//     nome: 'super',
//     status: 'bezzero',
//     dataNascimento: '10/01/2015',
//     dataCiclo: '',
//   }
// ]

function setNotification(msg) {
  console.log(msg);
}

function getToday (flag = false) {
  const d = new Date();
  const today = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
  }

  if (flag) return `${today.day}/${today.month}/${today.year}`;

  return today
}

function getAge(birth) {
  if (birth === '' || birth === undefined) {
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

function setCiclo(ciclo, brinco) {
  pg.connect(config, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
    }
    client.query('UPDATE gado SET status=($1), dataciclo=($2) WHERE brinco=($3)',
    [ciclo, getToday(true), brinco]);
  });    
  // INSERT ID CICLO E DATA DO CICLO (TODAY())
};
console.log(getToday())

const rules = {
  gravida: 2,
}


const today = getToday();
// module.exports = () => {
//   console.log('oi')
	pg.connect(config, (err, client, done) => {
		if(err) {
      done();
      console.log(err);
    }
    const gado = [];
		const query = client.query('SELECT * FROM gado ORDER BY brinco ASC;');
    
    query.on('row', elem => {
      const age = getAge(elem.datanascimento);
		  const dateCycle = getAge(elem.dataCiclo);

		  if (age.year >= rules.gravida && elem.status !== 'PODE-GRAVIDA') {
		    setCiclo('PODE-GRAVIDA', elem.brinco);
		    setNotification(`${elem.nome} precisa ficar Grávida`);
		  } else if (elem.status === 'GRAVIDA' && dateCycle.month > 7) {
		    setCiclo('PRODUCAO', elem.brinco);
		    setNotification(`${elem.nome} PODE ENTRAR EM PRODUÇÃO`);
		  } else if (elem.status === 'PRODUCAO' && dateCycle.month > 1) {
		    setCiclo('PARTO', elem.brinco);
		    setNotification(`${elem.nome} Está perto de nascer novo bezzero`);
		  } else if (elem.status === 'PARTO' && dateCycle.month > 2) {
		    setCiclo('RECEM-PARTO', elem.brinco);
        setNot
      }
    });
  });
  
// }

