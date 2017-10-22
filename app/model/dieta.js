const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js')
const config = acessos.config;

const getDaysInMonth = function(month,year) {
  return new Date(year, month, 0).getDate();
};

function getToday (flag = false) {
  const d = new Date();
  const today = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: getDaysInMonth(d.getMonth(), d.getFullYear()),
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
    day: today.day - cattle.day,
    year: today.year - cattle.year,
    month: today.month - cattle.month
  }

  if (age.month < 0) {
    age.month = age.month + 12;
  }

  return age;
}


module.exports = (brinco, cb) => {
  pg.connect(config, (err, client, done) => {
    if(err) done();
    const query = client.query('SELECT * FROM gado WHERE brinco = $1', [brinco]);
    let results = [];
    
    query.on('row', (row) => {
      results.push(row);
    });

    query.on('end', () => {
      const birth = getAge(results[0]['datanascimento']);
      const days = () => {
        const daysYear = birth.year * 365;
        const daysMonth = birth.month * 30; 
        return birth.day + daysYear + daysMonth;
      }
      
      const obs = "\n\nObservação: O ganho de peso médio diário deve ser superior a 0,350 kg por dia." + 
        "\nAnote, na ficha individual do bezerro, os pesos e quaisquer problemas ocorridos com o bezerro"

      if (days() <= 7) {
        cb("Então fornecer 4 l/animal/dia em duas refeições diárias" + obs);
      }
      else if (days() <= 14) {
        cb("Então fornecer colostro no balde, usar o colostro integral, permitindo a ingestão de 5 a 6 kg de colostro" + obs);
      }
      else if (days() <= 69) {
        cb("Então fornecer 4 l/animal/dia em uma refeição diária e fornecer concentrado de excelente qualidade como grãos de milho, raspa de mandioca, farelo de soja, farelo de algodão e misturas minerais e vitamínicas" + obs)
      }
      else if (days() <= 90) {
        cb("Então fornecer um bom volumoso, feno ou verde picado, alimentos verdes picados. Não é recomendado o uso de alimentos fermentados." + obs)
      }
      else if (days() <= 365) {
        cb("Então, pode-se utilizar concentrados de menor custo. Muito embora alguns estudos demonstrem ser viável a utilização de uréia nos concentrados iniciais para bezerros, recomenda-se o seu uso somente após os três meses de idade, quando o rúmen estará desenvolvido o suficiente para utilizar o nitrogênio não proteico da dieta. Após o desaleitamento, o consumo de concentrado aumentará rapidamente, devendo-se limitar a quantidade fornecida para estimular o consumo de volumoso. Tem-se sugerido o fornecimento de 1 a 2 kg de concentrado com 12% de proteína bruta e 66% de nutrientes digestíveis totais - NDT, dependendo da qualidade do alimento volumoso utilizado"  + obs)
      }
      done();
    });
  });
}