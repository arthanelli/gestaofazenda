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
      const birthCiclo = getAge(results[0]['dataciclo']);      

      const daysCiclo = () => {
        const daysYear = birthCiclo.year * 365;
        const daysMonth = birthCiclo.month * 30; 
        return birthCiclo.day + daysYear + daysMonth;
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
      } else if (results[0].status === 'PRODUÇÃO') {
        cb(`Nas duas primeiras lactações da vida de uma vaca leiteira, deve-se fornecer
            alimentos em quantidades superiores àquelas que deveriam estar recebendo em
            função da produção de leite, pois estes animais ainda continuam em crescimento,
            com necessidades nutricionais bastante elevadas. Assim, recomenda-se que aos
            requerimentos de mantença sejam adicionados 20% a mais para novilhas de
            primeira cria e 10% para vacas de segunda cria.
            \n
            Recomenda-se alimentar as vacas primíparas separadas das vacas mais velhas.
            Este procedimento evita a dominância, aumentando o consumo de matéria seca.
          `)
      } else if (results[0].status === 'PRODUÇÃO' && daysCiclo() <= 100) {
        cb(`As vacas, nas primeiras semanas após o parto, não conseguem consumir alimentos
          em quantidades suficientes para sustentar a produção crescente de leite neste
          período, até atingir o pico, o que ocorre em torno de 5 a 7 semanas após o parto. O
          pico de consumo de alimentos só será atingido posteriormente, em torno de 9 a 10
          semanas pós-parto. Por isso, é importante que recebam uma dieta que possa
          permitir a maior ingestão de nutrientes possível, evitando que percam muito peso e
          tenham sua vida reprodutiva comprometida.
           
          Devem ser manejadas em pastagens de excelente qualidade e em quantidade
          suficiente para permitir alta ingestão de matéria seca. Para isto, o manejo dos
          pastos em rotação é prática recomendada.
           
          Deve-se fornecer volumoso de boa qualidade com suplementação com
          concentrados e mistura mineral adequada. Vacas de alto potencial de produção
          devem apresentar um consumo de matéria seca equivalente a pelo menos 4% do
          seu peso vivo, no pico de consumo.
           
          Vacas que são ordenhadas três vezes ao dia consomem 5 a 6% mais matéria seca
          do que se ordenhadas duas vezes ao dia.
           
          Para vacas mantidas a pasto, durante o período de menor crescimento do pasto, há
          necessidade de suplementação com volumosos: capim-elefante verde picado, cana-
          de-açúcar adicionada de 1% de uréia, silagem, feno ou forrageiras de inverno. 
          Para vacas de alta produção leiteira ou animais confinados, forneça silagem de
          milho ou sorgo, à vontade.
           
          Uma regra prática para determinar a quantidade de volumoso a ser fornecida é
          monitorar a sobra ou o excesso que fica no cocho. Caso não haja sobras ou se
          sobrar menos do que 10% da quantidade total fornecida no dia anterior, aumente a
          quantidade de volumoso a ser fornecida. Caso haja muita sobra, reduza a
          quantidade.
           
          Para cada dois quilogramas de leite produzidos, a vaca deve consumir pelo menos
          um quilograma de matéria seca. De outra forma, ela pode perder peso em excesso
          e ficar mais sujeita a problemas metabólicos.
          Fornecimento de concentrado
          O concentrado para vacas em lactação deve apresentar 18 a 22% de proteína bruta
          (PB) e acima de 70% de nutrientes digestíveis totais (NDT), na base de 1 kg para
          cada 2,5 kg de leite produzidos. Pode-se utilizar uma mistura simples à base de
          milho moído e farelo de soja ou de algodão, calcário e sal mineral ou dependendo
          da disponibilidade, soja em grão moída ou caroço de algodão. Algumas opções para
          formulação de concentrado são apresentadas na Instrução Técnica para o Produtor
          de Leite - Sistemas de Alimentação nº 40. Opções de concentrados para vacas em
          lactação.
           
          Vacas de alta produção de leite manejadas a pasto ou em confinamento, precisam
          ter ajustes em seu manejo e plano alimentar. Para vacas com produções diárias
          acima de 28-30 kg de leite, deve-se fornecer concentrados contendo fontes de
          proteína de baixa degradação no rúmen, como farinha de peixe, farelo de algodão,
          soja em grão moída, tostada, etc.
           
          Vacas com produções acima de 40 kg de leite por dia, além de uma fonte de
          gordura, como caroço de algodão, soja em grão moída ou sebo, devem receber
          gordura protegida (fonte comercial) para elevar o teor de gordura da dieta total
          para 7-8%. Essas vacas devem receber uma quantidade diária de gordura na dieta
          equivalente à quantidade de gordura produzida no leite. Instrução Técnica para o
          Produtor de Leite - Sistemas de Alimentação nº 47. Alimentação e manejo de vacas
          de alto potencial genético
          Dieta completa
          Dieta completa é uma mistura de volumosos (silagem, feno, capim verde picado)
          com concentrados (energéticos e proteicos), minerais e vitaminas. A mistura dos
          ingredientes é feita em vagão misturador próprio, contendo balança eletrônica para
          pesar os ingredientes. Muito usada em confinamento total, tem a vantagem de
          evitar que as vacas possam consumir uma quantidade muito grande de
          concentrado de uma única vez, o que pode causar problemas de acidose nos
          animais. Além disso recomenda-se a inclusão de 0,8 a 1% de bicarbonato de sódio
          e 0,5% de óxido de magnésio na dieta total, para evitar problemas com acidose.
           
          O melhor teor de matéria seca da ração total está entre 50 e 75%. Rações mais
          secas ou mais úmidas podem limitar o consumo. Por isso, o teor de umidade da
          silagem deve ser monitorado semanalmente, se possível.
          Normalmente, as vacas se alimentam após as ordenhas. Mantendo a dieta
          completa à disposição dos animais nesses períodos, pode-se conseguir aumento do
          consumo voluntário.
           
          Para reduzir mão-de- obra na mistura de diferentes formulações para os grupos de
          vacas com diferentes produções médias, a tendência atual é de se formular uma
          dieta completa com alto teor energético e com nível de proteína não degradável
          que atenda o grupo de maior produção de leite. Os demais grupos, vacas no terço
          médio e vacas em final de lactação, naturalmente já controlariam o consumo,
          ingerindo menos matéria seca.
           
          Para assegurar consumo máximo de forragem, principalmente na época mais
          quente do ano, deve-se garantir disponibilidade de alimentos ao longo do dia.
          Deve-se encher o cocho no final da tarde, para que os animais possam ter alimento
          fresco disponível durante a noite. Dessa forma as vacas podem consumir o
          alimento num horário de temperatura mais amena.
          
           
          A relação concentrado/volumoso é maior para vacas de maior produção de leite. De
          uma forma mais generalizada, sugere-se, na tabela abaixo, as relações
          concentrado/volumoso.
          Produção de Concentrado Volumoso
          Leite (kg/dia)           %                     %  
          Até 14                    30-35               65-70           
          14 a 23                    40                     60  
          24 a 35                     45                     55  
          36 a 45                  50-55                45-50           
          Acima de 45          55-60                40-45           
          Deve-se tomar o cuidado de retirar restos de alimentos mofados do cocho antes de
          fornecer nova alimentação.
          Para animais mantidos a pasto, o método mais prático de suplementar minerais é
          deixando a mistura (comprada ou preparada na própria fazenda) disponível em
          cocho coberto, à vontade. Instrução Técnica para o Produtor de Leite - Sistemas de
          Alimentação nº 41. Suplementos Minerais para Gado de Leite e Senar - Embrapa:
          Manual Técnico: Trabalhador na Bovinocultura de Leite - página 161.
          Para vacas em lactação e animais que são mantidos em confinamento, é mais
          seguro e garantido, incluir a mistura mineral no concentrado ou na dieta completa.
          Forneça água de boa qualidade
          Vacas em lactação requerem uma quantidade muito grande de água, uma vez que
          o leite é composto de 87 a 88% de água. Ela deve estar à disposição dos animais, à
          vontade e próxima dos cochos. Normalmente as vacas consomem 8,5 litros de água
          para cada litro de leite produzido. Quando a temperatura ambiente se eleva, nos
          meses de verão, o consumo de água aumenta substancialmente.
        `)
      } else if (results[0].status === 'PRODUÇÃO' && daysCiclo() <= 200) {
        cb(`
          Neste período, as vacas já recuperaram parte das reservas corporais gastas no
          início da lactação e já deveriam estar enxertadas. A produção de leite começa a cair
          e as vacas devem continuar a ganhar peso, preparando sua condição corporal para
          o próximo parto.
          O fornecimento de concentrado deve ser feito com 18 a 20% de proteína bruta, na
          proporção de 1 kg para cada 3 kg de leite produzidos acima de 5 kg, na época das
          chuvas, e a mesma relação acima de 3 kg iniciais de leite produzido, durante o
          período seco do ano, conforme tabela abaixo.
        `)
      } else if (results[0].status === 'PRODUÇÃO' && daysCiclo() <= 300) {
        cb(`
          Neste período as vacas devem recuperar suas reservas corporais e a produção de
          leite já é bem menor que nos períodos anteriores. Deve-se alimentar as vacas para
          evitar que ganhem peso em excesso, mas que tenham alimento suficiente,
          principalmente na época seca do ano, para repor as reservas corporais perdidas no
          início da lactação. É o período em que ocorre a secagem do leite, encerrando-se a
          lactação atual e o início da preparação para o próximo parto e lactação
          subsequente. Instrução Técnica para o Produtor de Leite - Qualidade do Leite e
          Segurança Alimentar nº 3. Método de secagem de vacas.
        `)
      } else if (results[0].status === 'PARTO') {
        cb(`
          É o período compreendido entre a secagem e o próximo parto. Em rebanhos bem
          manejados sua duração é de 60 dias. É fundamental para que haja transferência de
          nutrientes para desenvolvimento do feto, que é acentuado nos últimos 60 - 90 dias
          que precedem o parto, a glândula mamária regenere os tecidos secretores de leite
          e acumule grandes quantidades de anticorpos, proporcionando maior qualidade e
          produção de colostro, essencial para a sobrevivência da cria recém-nascida.
          O suprimento de proteína, energia, minerais e vitaminas é muito importante, mas
          deve-se evitar que a vaca ganhe muito peso nesta fase, para reduzir a incidência
          de problemas no parto e durante a fase inicial da lactação. Isso se deve,
          principalmente, à redução na ingestão de alimentos pós-parto, o que normalmente
          se observa com vacas que parem gordas.
          Nas duas semanas que antecedem ao parto deve-se iniciar o fornecimento de
          pequenas quantidades do concentrado formulado para as vacas em lactação, para
          que se adaptem à dieta que receberão após o parto. As quantidades a serem
          fornecidas variam de 0,5 a 1% do peso vivo do animal, dependendo da sua
          condição corporal.
          O teor de cálcio da dieta de vacas no final da gestação deve ser reduzido para
          evitar problemas com febre do leite (Febre do leite - EMBRAPA - CNPGL.
          Documentos, 67) após o parto. A mistura mineral (com nível baixo de cálcio) deve
          estar disponível, à vontade, em cocho coberto.
        `)
      }
      done();
    });
  });
}