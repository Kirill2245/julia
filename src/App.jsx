import React, { useState, useEffect } from 'react';

// Компонент с сердечками (переиспользуемый)
const HeartsBackground = ({ count = 35 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      const isMobile = window.innerWidth <= 768;
      const heartCount = isMobile ? Math.floor(count * 0.6) : count;
      
      for (let i = 0; i < heartCount; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          size: isMobile ? 15 + Math.random() * 25 : 20 + Math.random() * 35,
          duration: 15 + Math.random() * 25,
          delay: Math.random() * 20,
          opacity: 0.15 + Math.random() * 0.35,
          rotation: Math.random() * 360,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();

    const handleResize = () => {
      generateHearts();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count]);

  return (
    <div style={styles.heartsContainer}>
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            top: '-60px',
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `floatHeart ${heart.duration}s linear ${heart.delay}s infinite`,
            transform: `rotate(${heart.rotation}deg)`,
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 88.5C50 88.5 5 55 5 30C5 15 15 5 30 5C40 5 47 12 50 18C53 12 60 5 70 5C85 5 95 15 95 30C95 55 50 88.5 50 88.5Z"
            fill="#f06292"
            stroke="#d81b60"
            strokeWidth="2"
          />
        </svg>
      ))}
    </div>
  );
};

// Главный компонент с причинами
const ReasonsSection = ({ onSwitch }) => {
  const [reason, setReason] = useState('Нажми на кнопку, чтобы узнать ✨');

  // reasons.js
const reasons = [
  // 1-50: Её качества
  "Потому что ты добрая",
  "Потому что ты нежная",
  "Потому что ты заботливая",
  "Потому что ты терпеливая",
  "Потому что ты мудрая",
  "Потому что у тебя сильный дух",
  "Потому что ты уверенная",
  "Потому что ты скромная",
  "Потому что ты щедрая",
  "Потому что ты искренняя",
  "Потому что ты честная",
  "Потому что ты верная",
  "Потому что ты преданная",
  "Потому что ты чуткая",
  "Потому что ты понимающая",
  "Потому что ты умная",
  "Потому что ты сообразительная",
  "Потому что ты креативная",
  "Потому что ты талантливая",
  "Потому что ты трудолюбивая",
  "Потому что ты оптимистка",
  "Потому что ты позитивная",
  "Потому что у тебя прекрасная улыбка",
  "Потому что у тебя заразительный смех",
  "Потому что у тебя красивый голос",
  "Потому что у тебя невероятные глаза",
  "Потому что у тебя шикарные волосы",
  "Потому что у тебя грациозная походка",
  "Потому что у тебя изящные жесты",
  "Потому что у тебя безупречный стиль",
  "Потому что у тебя отличный вкус",
  "Потому что у тебя прекрасное чувство юмора",
  "Потому что ты умеешь шутить",
  "Потому что ты лёгкая на подъём",
  "Потому что ты грациозная",
  "Потому что ты изящная",
  "Потому что ты красивая",
  "Потому что ты обаятельная",
  "Потому что у тебя есть харизма",
  "Потому что ты обладаешь магией",
  "Потому что ты уникальная",
  "Потому что ты неповторимая",
  "Потому что ты индивидуальность",
  "Потому что ты самобытная",
  "Потому что ты оригинальная",
  "Потому что ты смелая",
  "Потому что ты решительная",
  "Потому что ты целеустремлённая",
  "Потому что ты амбициозная",
  "Потому что ты страстная",

  // 51-100: Что она делает
  "Потому что ты прекрасно улыбаешься",
  "Потому что ты заразительно смеёшься",
  "Потому что ты так смотришь на меня",
  "Потому что ты красиво говоришь",
  "Потому что ты грациозно двигаешься",
  "Потому что ты великолепно танцуешь",
  "Потому что ты чудесно поёшь",
  "Потому что ты вкусно готовишь",
  "Потому что ты нежно заботишься",
  "Потому что ты умеешь слушать",
  "Потому что ты поддерживаешь меня",
  "Потому что ты вдохновляешь меня",
  "Потому что ты мотивируешь меня",
  "Потому что ты успокаиваешь меня",
  "Потому что ты тепло обнимаешь",
  "Потому что ты нежно целуешь",
  "Потому что ты так держишь за руку",
  "Потому что ты умеешь играть",
  "Потому что ты смешно шутишь",
  "Потому что ты удивляешь меня",
  "Потому что ты заботишься о других",
  "Потому что ты помогаешь людям",
  "Потому что ты учишь меня новому",
  "Потому что ты красиво рассказываешь",
  "Потому что ты мечтаешь со мной",
  "Потому что ты планируешь наше будущее",
  "Потому что ты достигаешь целей",
  "Потому что ты побеждаешь трудности",
  "Потому что ты умеешь прощать",
  "Потому что ты любишь искренне",
  "Потому что ты даришь тепло",
  "Потому что ты создаёшь уют",
  "Потому что ты украшаешь мир",
  "Потому что ты делаешь меня счастливым",
  "Потому что ты меняешь мою жизнь",
  "Потому что ты наполняешь смыслом",
  "Потому что ты веришь в меня",
  "Потому что ты гордишься мной",
  "Потому что ты ждёшь меня",
  "Потому что ты встречаешь меня",
  "Потому что ты провожаешь меня",
  "Потому что ты заботишься о себе",
  "Потому что ты развиваешься",
  "Потому что ты растёшь со мной",
  "Потому что ты преодолеваешь преграды",
  "Потому что ты справляешься с трудностями",
  "Потому что ты держишь удар",
  "Потому что ты сохраняешь спокойствие",
  "Потому что ты находишь выход",
  "Потому что ты делаешь мир лучше",

  // 101-150: Чувства и эмоции
  "Потому что твои руки тёплые",
  "Потому что твои прикосновения нежные",
  "Потому что твои губы мягкие",
  "Потому что твой взгляд глубокий",
  "Потому что твои объятия сильные",
  "Потому что твой голос — музыка",
  "Потому что твоя улыбка — свет",
  "Потому что твой смех — магия",
  "Потому что твои слова искренние",
  "Потому что твои чувства глубокие",
  "Потому что ты эмоциональная",
  "Потому что ты чувствительная",
  "Потому что ты эмпатичная",
  "Потому что ты сострадательная",
  "Потому что ты участливая",
  "Потому что ты поддерживаешь в трудную минуту",
  "Потому что ты принимаешь меня",
  "Потому что ты понимаешь без слов",
  "Потому что у тебя хорошая интуиция",
  "Потому что ты чувствуешь меня",
  "Потому что ты умеешь сопереживать",
  "Потому что ты душевная",
  "Потому что ты сердечная",
  "Потому что ты открытая",
  "Потому что ты искренняя с собой",
  "Потому что ты умеешь быть собой",
  "Потому что ты свободна быть собой",
  "Потому что ты лёгкая в общении",
  "Потому что ты слушаешь сердце",
  "Потому что ты чувствуешь душой",
  "Потому что ты светишь изнутри",
  "Потому что ты излучаешь тепло",
  "Потому что у тебя высокий эмоциональный интеллект",
  "Потому что ты умеешь любить по-настоящему",
  "Потому что ты умеешь принимать любовь",
  "Потому что ты благодарная",
  "Потому что ты признательная",
  "Потому что ты умеешь радоваться",
  "Потому что ты умеешь грустить",
  "Потому что ты умеешь отпускать",
  "Потому что ты умеешь прощать",
  "Потому что ты умеешь доверять",
  "Потому что ты умеешь верить",
  "Потому что ты умеешь надеяться",
  "Потому что ты умеешь мечтать",
  "Потому что ты умеешь творить",
  "Потому что ты умеешь жить",
  "Потому что ты чувствуешь жизнь",
  "Потому что ты умеешь быть счастливой",
  "Потому что ты делаешь меня лучше",

  // 151-200: Моменты вместе
  "Потому что ты обнимаешь меня по утрам",
  "Потому что мы говорим по вечерам",
  "Потому что мы завтракаем вместе",
  "Потому что мы проводим уютные вечера",
  "Потому что мы гуляем под дождём",
  "Потому что мы встречаем рассветы",
  "Потому что мы провожаем закаты",
  "Потому что мы разговариваем ночью",
  "Потому что мы мечтаем вместе",
  "Потому что мы строим планы",
  "Потому что у нас есть традиции",
  "Потому что у нас есть секретные знаки",
  "Потому что у нас есть общие шутки",
  "Потому что у нас есть внутренние мемы",
  "Потому что мы путешествуем вместе",
  "Потому что мы ищем приключения",
  "Потому что мы делаем открытия",
  "Потому что мы экспериментируем",
  "Потому что мы ошибаемся вместе",
  "Потому что мы побеждаем вместе",
  "Потому что мы терпим поражения вместе",
  "Потому что мы учимся на ошибках",
  "Потому что мы делаем выводы",
  "Потому что мы принимаем решения",
  "Потому что мы меняемся вместе",
  "Потому что мы растем вместе",
  "Потому что мы развиваемся вместе",
  "Потому что мы трансформируемся вместе",
  "Потому что мы радуемся вместе",
  "Потому что мы грустим вместе",
  "Потому что мы взлетаем вместе",
  "Потому что мы падаем вместе",
  "Потому что мы надеемся вместе",
  "Потому что мы боимся вместе",
  "Потому что мы мечтаем вместе",
  "Потому что мы ставим цели вместе",
  "Потому что мы достигаем целей вместе",
  "Потому что мы ставим рекорды вместе",
  "Потому что мы делаем прорывы вместе",
  "Потому что мы озаряемся вместе",
  "Потому что мы делимся инсайтами",
  "Потому что мы открываемся друг другу",
  "Потому что мы признаёмся в чувствах",
  "Потому что мы даём обещания",
  "Потому что мы храним верность",
  "Потому что у нас есть ритуалы",
  "Потому что у нас есть привычки",
  "Потому что у нас есть странности",
  "Потому что у нас есть особенности",
  "Потому что у нас уникальная история",

  // 201-250: Что она вносит в жизнь
  "Потому что ты наполняешь смыслом каждый день",
  "Потому что ты добавляешь красок в жизнь",
  "Потому что ты наполняешь тишину музыкой",
  "Потому что ты освещаешь темноту",
  "Потому что ты согреваешь холод",
  "Потому что ты превращаешь будни в праздник",
  "Потому что ты добавляешь волшебства",
  "Потому что ты делаешь обычное особенным",
  "Потому что ты создаёшь уют",
  "Потому что ты приносишь гармонию",
  "Потому что ты создаёшь баланс",
  "Потому что ты наводишь порядок в моих мыслях",
  "Потому что ты приносишь ясность",
  "Потому что ты даёшь уверенность",
  "Потому что ты укрепляешь веру в себя",
  "Потому что ты даёшь надежду",
  "Потому что ты наполняешь сердце любовью",
  "Потому что ты приносишь мир в душу",
  "Потому что ты даёшь покой",
  "Потому что ты наполняешь энергией",
  "Потому что ты вдохновляешь на творчество",
  "Потому что ты мотивируешь на действия",
  "Потому что ты помогаешь сосредоточиться",
  "Потому что ты даёшь силы в трудностях",
  "Потому что ты смягчаешь конфликты",
  "Потому что ты приносишь понимание",
  "Потому что ты учишь прощать",
  "Потому что ты учишь принимать",
  "Потому что ты побеждаешь ненависть любовью",
  "Потому что ты рассеиваешь тьму светом",
  "Потому что ты согреваешь теплом",
  "Потому что ты превращаешь хаос в уют",
  "Потому что ты видишь красоту в простом",
  "Потому что ты ценишь изящество",
  "Потому что ты приносишь гармонию в разногласия",
  "Потому что ты даёшь мир в суете",
  "Потому что ты даёшь покой в тревоге",
  "Потому что ты даёшь надежду в отчаянии",
  "Потому что ты даёшь веру в сомнениях",
  "Потому что ты даёшь любовь в одиночестве",
  "Потому что ты делаешь меня лучше",
  "Потому что ты развиваешь меня",
  "Потому что ты открываешь мои глаза",
  "Потому что ты расширяешь мои горизонты",
  "Потому что ты обогащаешь мою жизнь",
  "Потому что ты делаешь мою жизнь полной",
  "Потому что ты придаёшь смысл моему существованию",
  "Потому что ты делаешь меня счастливым",
  "Потому что ты делаешь меня цельным",
  "Потому что ты делаешь меня собой",

  // 251-300: Её маленькие детали
  "Потому что ты хмуришься, когда думаешь",
  "Потому что ты прикусываешь губу, когда сосредоточена",
  "Потому что ты поправляешь волосы",
  "Потому что ты улыбаешься во сне",
  "Потому что ты бормочешь что-то во сне",
  "Потому что ты потягиваешься по утрам",
  "Потому что ты щуришься на солнце",
  "Потому что ты кутаешься в плед",
  "Потому что ты пьёшь чай мелкими глотками",
  "Потому что ты смотришь на звёзды",
  "Потому что ты танцуешь, когда готовишь",
  "Потому что ты напеваешь любимые песни",
  "Потому что ты морщишь нос, когда смеёшься",
  "Потому что ты закатываешь глаза, когда я шучу",
  "Потому что ты корчишь смешные рожицы",
  "Потому что ты говоришь с животными",
  "Потому что ты целуешь меня в лоб",
  "Потому что ты проводишь рукой по моей голове",
  "Потому что ты держишь меня за руку в кино",
  "Потому что ты кладёшь голову мне на плечо",
  "Потому что ты засыпаешь у меня на груди",
  "Потому что ты просыпаешься от моих поцелуев",
  "Потому что ты ворчишь, когда я опаздываю",
  "Потому что ты ждёшь меня с ужином",
  "Потому что ты заказываешь моё любимое блюдо",
  "Потому что ты помнишь все мои привычки",
  "Потому что ты знаешь, что я люблю",
  "Потому что ты знаешь, что я не люблю",
  "Потому что ты угадываешь мои мысли",
  "Потому что ты заканчиваешь мои предложения",
  "Потому что мы думаем синхронно",
  "Потому что у нас одинаковые реакции",
  "Потому что мы смеёмся над одним и тем же",
  "Потому что мы грустим от одного и того же",
  "Потому что мы радуемся одинаково",
  "Потому что мы совпадаем во вкусах",
  "Потому что ты любишь ту же музыку",
  "Потому что ты любишь те же фильмы",
  "Потому что ты любишь те же книги",
  "Потому что ты разделяешь мои интересы",
  "Потому что ты уважаешь мои увлечения",
  "Потому что ты поддерживаешь мои хобби",
  "Потому что ты даёшь мне пространство",
  "Потому что ты уважаешь мои границы",
  "Потому что ты принимаешь моих друзей",
  "Потому что ты ладишь с моей семьёй",
  "Потому что ты терпишь моих друзей",
  "Потому что ты терпишь мою семью",
  "Потому что ты терпишь мои странности",
  "Потому что ты любишь меня таким, какой я есть",

  // 301-350: Её уникальность
  "Потому что ты не похожа на других",
  "Потому что ты особенная",
  "Потому что ты единственная в своём роде",
  "Потому что ты редкостная",
  "Потому что ты неповторимая",
  "Потому что ты драгоценная",
  "Потому что ты бесценная",
  "Потому что ты идеальная в своей неидеальности",
  "Потому что ты настоящая",
  "Потому что ты живая",
  "Потому что ты чувствуешь по-настоящему",
  "Потому что ты любишь по-настоящему",
  "Потому что ты страдаешь по-настоящему",
  "Потому что ты радуешься по-настоящему",
  "Потому что ты смеёшься по-настоящему",
  "Потому что ты плачешь по-настоящему",
  "Потому что ты злишься по-настоящему",
  "Потому что ты прощаешь по-настоящему",
  "Потому что ты принимаешь по-настоящему",
  "Потому что ты отпускаешь по-настоящему",
  "Потому что ты веришь по-настоящему",
  "Потому что ты надеешься по-настоящему",
  "Потому что ты мечтаешь по-настоящему",
  "Потому что ты живёшь по-настоящему",
  "Потому что ты дышишь жизнью",
  "Потому что ты наполняешь пространство собой",
  "Потому что ты оставляешь след",
  "Потому что ты меняешь мир вокруг",
  "Потому что ты влияешь на людей",
  "Потому что ты вдохновляешь окружающих",
  "Потому что ты делаешь мир добрее",
  "Потому что ты делаешь мир красивее",
  "Потому что ты делаешь мир лучше",
  "Потому что ты делаешь меня счастливым",
  "Потому что ты делаешь меня лучше",
  "Потому что ты делаешь меня сильнее",
  "Потому что ты делаешь меня мудрее",
  "Потому что ты делаешь меня добрее",
  "Потому что ты делаешь меня терпеливее",
  "Потому что ты делаешь меня увереннее",
  "Потому что ты делаешь меня смелее",
  "Потому что ты делаешь меня свободнее",
  "Потому что ты делаешь меня счастливее",
  "Потому что ты делаешь меня лучшей версией себя",
  "Потому что ты вдохновляешь меня быть собой",
  "Потому что ты даёшь мне силы жить",
  "Потому что ты даёшь мне смысл существования",
  "Потому что ты моя муза",
  "Потому что ты моё вдохновение",
  "Потому что ты моя любовь",

  // 351-400: Сравнения с чем-то прекрасным
  "Потому что ты красивее заката",
  "Потому что ты нежнее рассвета",
  "Потому что ты теплее солнца",
  "Потому что ты светлее звёзд",
  "Потому что ты глубже океана",
  "Потому что ты выше гор",
  "Потому что ты шире неба",
  "Потому что ты ярче радуги",
  "Потому что ты слаще мёда",
  "Потому что ты мягче шёлка",
  "Потому что ты нежнее цветка",
  "Потому что ты прекраснее розы",
  "Потому что ты чище утренней росы",
  "Потому что ты свежее весеннего ветра",
  "Потому что ты теплее летнего дня",
  "Потому что ты золотистее осени",
  "Потому что ты белоснежнее зимы",
  "Потому что ты ярче весны",
  "Потому что ты нежнее лета",
  "Потому что ты мудрее осени",
  "Потому что ты чище зимы",
  "Потому что ты красивее всех цветов",
  "Потому что ты нежнее всех лепестков",
  "Потому что ты слаще всех фруктов",
  "Потому что ты теплее всех объятий",
  "Потому что ты мягче всех подушек",
  "Потому что ты уютнее всех домов",
  "Потому что ты светлее всех ламп",
  "Потому что ты ярче всех улыбок",
  "Потому что ты теплее всех слов",
  "Потому что ты нежнее всех прикосновений",
  "Потому что ты глубже всех чувств",
  "Потому что ты сильнее всех ветров",
  "Потому что ты спокойнее всех морей",
  "Потому что ты выше всех облаков",
  "Потому что ты свободнее всех птиц",
  "Потому что ты легче всех перьев",
  "Потому что ты прозрачнее всех вод",
  "Потому что ты чище всех снегов",
  "Потому что ты белоснежнее всех облаков",
  "Потому что ты нежнее всех лун",
  "Потому что ты теплее всех солнц",
  "Потому что ты ярче всех звёзд",
  "Потому что ты красивее всех галактик",
  "Потому что ты бесконечнее всех вселенных",
  "Потому что ты вечна как любовь",
  "Потому что ты прекрасна как искусство",
  "Потому что ты совершенна как природа",
  "Потому что ты уникальна как снежинка",
  "Потому что ты неповторима как отпечаток пальца",

  // 401-450: Как она влияет на меня
  "Потому что ты даёшь мне крылья",
  "Потому что ты даёшь мне силы",
  "Потому что ты даёшь мне веру",
  "Потому что ты даёшь мне надежду",
  "Потому что ты даёшь мне любовь",
  "Потому что ты даёшь мне тепло",
  "Потому что ты даёшь мне свет",
  "Потому что ты даёшь мне жизнь",
  "Потому что ты даёшь мне смысл",
  "Потому что ты даёшь мне цель",
  "Потому что ты даёшь мне направление",
  "Потому что ты даёшь мне покой",
  "Потому что ты даёшь мне мир",
  "Потому что ты даёшь мне счастье",
  "Потому что ты даёшь мне радость",
  "Потому что ты даёшь мне улыбку",
  "Потому что ты даёшь мне смех",
  "Потому что ты даёшь мне слёзы счастья",
  "Потому что ты даёшь мне эмоции",
  "Потому что ты даёшь мне чувства",
  "Потому что ты даёшь мне мечты",
  "Потому что ты даёшь мне желания",
  "Потому что ты даёшь мне цели",
  "Потому что ты даёшь мне амбиции",
  "Потому что ты даёшь мне мотивацию",
  "Потому что ты даёшь мне вдохновение",
  "Потому что ты даёшь мне энергию",
  "Потому что ты даёшь мне силу духа",
  "Потому что ты даёшь мне уверенность",
  "Потому что ты даёшь мне спокойствие",
  "Потому что ты даёшь мне терпение",
  "Потому что ты даёшь мне мудрость",
  "Потому что ты даёшь мне знания",
  "Потому что ты даёшь мне опыт",
  "Потому что ты даёшь мне рост",
  "Потому что ты даёшь мне развитие",
  "Потому что ты даёшь мне эволюцию",
  "Потому что ты даёшь мне трансформацию",
  "Потому что ты даёшь мне свободу",
  "Потому что ты даёшь мне независимость",
  "Потому что ты даёшь мне выбор",
  "Потому что ты даёшь мне право быть собой",
  "Потому что ты даёшь мне право ошибаться",
  "Потому что ты даёшь мне право учиться",
  "Потому что ты даёшь мне право расти",
  "Потому что ты даёшь мне право меняться",
  "Потому что ты даёшь мне право любить",
  "Потому что ты даёшь мне право быть любимым",
  "Потому что ты даёшь мне право быть счастливым",
  "Потому что ты даёшь мне всё",

  // 451-500: Просто потому что
  "Потому что ты — это ты",
  "Потому что ты существуешь",
  "Потому что ты есть в моей жизни",
  "Потому что ты появилась",
  "Потому что ты осталась",
  "Потому что ты выбрала меня",
  "Потому что ты доверилась мне",
  "Потому что ты поверила в меня",
  "Потому что ты полюбила меня",
  "Потому что ты ждёшь меня",
  "Потому что ты скучаешь по мне",
  "Потому что ты думаешь обо мне",
  "Потому что ты мечтаешь обо мне",
  "Потому что ты говоришь обо мне",
  "Потому что ты гордишься мной",
  "Потому что ты веришь в нас",
  "Потому что ты строишь наше будущее",
  "Потому что ты создаёшь наш мир",
  "Потому что ты делаешь нашу жизнь",
  "Потому что ты наполняешь наши дни",
  "Потому что ты — моя семья",
  "Потому что ты — мой дом",
  "Потому что ты — моя гавань",
  "Потому что ты — моя крепость",
  "Потому что ты — мой тыл",
  "Потому что ты — моя опора",
  "Потому что ты — моя поддержка",
  "Потому что ты — моя надежда",
  "Потому что ты — моя вера",
  "Потому что ты — моя любовь",
  "Потому что ты — моя жизнь",
  "Потому что ты — моё сердце",
  "Потому что ты — моя душа",
  "Потому что ты — моё дыхание",
  "Потому что ты — моя кровь",
  "Потому что ты — моя судьба",
  "Потому что ты — моя вселенная",
  "Потому что ты — мой мир",
  "Потому что ты — моя реальность",
  "Потому что ты — моя мечта",
  "Потому что ты — моё вчера",
  "Потому что ты — моё сегодня",
  "Потому что ты — моё завтра",
  "Потому что ты — моё всегда",
  "Потому что ты — моя вечность",
  "Потому что ты — моя бесконечность",
  "Потому что я существую благодаря тебе",
  "Потому что я дышу тобой",
  "Потому что я живу тобой",
  "Потому что я люблю тебя"
];

  const getRandomReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setReason(reasons[randomIndex]);
  };

  return (
    <div style={styles.section}>
      <HeartsBackground count={35} />
      <div style={styles.card}>
        <h1 style={styles.title}>❤️ Почему я люблю тебя?</h1>
        <p style={styles.reasonText}>{reason}</p>
        <button style={styles.button} onClick={getRandomReason}>
          Узнать причину 💕
        </button>
        <button style={{...styles.button, ...styles.switchButton}} onClick={onSwitch}>
          📸 Смотреть наши фото
        </button>
        <p style={styles.footer}>Для моей любимой девушки 🌸</p>
      </div>
    </div>
  );
};

// Компонент галереи с фотографиями
const GallerySection = ({ onSwitch }) => {
  // Сюда добавьте свои фото
  const getRandomIcon = () => {
    const icons = ['❤️', '🐱', '🐶', '🔥'];
    return icons[Math.floor(Math.random() * icons.length)];
  };
  const photos = [
    { url: 'https://storage.yandexcloud.net/jul/-0_38ZdIqzaCTBObkXPGkYJBBlRQUoklkir99clJK66HRCAo4SSE0ozemH7eh6VNshVZzfyHkEnOyD8UsDURKS59.jpg', alt: 'Наше фото 1' },
    { url: 'https://storage.yandexcloud.net/jul/-qwK65UmfHPJnGP9N_WUstaKaDb6ARB1iAmrhlVZk1hbPAMF9n8pQLLosyVcVpp6aT59MZMB46vLg3_9h9knR70g.jpg', alt: 'Наше фото 2' },
    {url: 'https://storage.yandexcloud.net/jul/0sgsXnsPQApJMGw_nQI4c6a_g4Uy8SosOZyUJw_dWRtp74sfQ7LN2BtNuNxPmiKgGKkjL6LVpKGW9tlFOkK6ecnt.jpg', alt: 'Наше фото 3' },
    {url: 'https://storage.yandexcloud.net/jul/1r4Ak0phWyOYshH9KxtmcVBqBbN3GftJLz8Jpc-tuMzbKwUXLi1NdU2MYWZ_lpzjhKb7VX74v-HS2d4n8c5gbjpg.jpg', alt: 'Наше фото 4' },
    {url: 'https://storage.yandexcloud.net/jul/20Ouzbnky_plbrAzqPgZpJF2S94_MTxtYSnpnW7oGfSuLS3JCiqHKsQ7Ay2UW9GgQ6NVzjunu4mI8-oBCJo-OPBN.jpg', alt: 'Наше фото 5' },
    {url: 'https://storage.yandexcloud.net/jul/4jL8NTvmZAujDb_67Vzsp7gQ_bLQXOUx5C_PSq6iyFLS57pS3Q0l7G0Jw0pr7Cdm-rnIw8_HpjxErtWVhBsUuwf7.jpg', alt: 'Наше фото 6' },
    { url: 'https://storage.yandexcloud.net/jul/4zCi6be-a5ztd7lirv5AfvM-hxsTg0O2PcJsUatCweRslh9n4SPwR0FKAHrEBO4tFmZQiEQFI62j9WqLrM5dx2XU.jpg', alt: 'Наше фото 7' },
    { url: 'https://storage.yandexcloud.net/jul/5-Qu2UmT-ov91nNz8mveFfjZfPWEHsYVWtwp6oI9c44UWMm0Stgi6rX98ZyVGPFyLN5IEPcw33VcJyaxDm3wdF3V.jpg', alt: 'Наше фото 8' },
        {url: 'https://storage.yandexcloud.net/jul/YMUYSdS3Qnj-ApRAjiSQsd9wtISzjgaXCp7kpdnSHsiE1HZpDqKf-UjzJmDI3-cElqd9JRBI6biKB11epYyjjHjT.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/52ZJNRFn0vVDkwsYib-OqDMzuBL3oc9UQrfbUXJ0AAZM7TPrTuLuq0K5uSotzOzSi5q398B4wQk_se6EiR0C-ONO.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/65gXUQ1ZPyyHKc8agoB2Q7slrrSD0BGurKkvFMIY7uLDgWSvaUz9Npn6UwQ_j-ivSA6t053xYygBz1aafP_BdNjR.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/6C-gzxslcp_tD9h-qWkbceqLkKAFzPI9o1dQrCeI8UIn1kX6wrj21W39dve67uk8lJYpVpbppCXIxVuL6TV-b5pj.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/6YSDpqc4I4bzCj5p8MwF7rRLwS8gBJ3V6v8D7gVIemhEezeEDTdQvQiwp8_3LKfILDmp89q_-2Lfa8oeZ4EGY1qx.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/6fLjW6f7P-k0wDUGIdpw21tZ6Y6F9Y-3Y0WKSqPLMq6lrllQkPwi-5MOpCCH_K5b5lcmxpiswOUHqEdqGFaS1gd4.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/8as3GHJPgX5k2R0Dw0pCOpXjZIfytT1WeW6ttWkSQ4KpyGxy02ihPGLOjaYiOzoeBcRkqOPtFOhO4jLvLRtx94M5.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/9I7u67oSQevR78ZKh0YRsj4vBZDl3zLWz22Ws9aMV4f4t1O5dxaDkUdDm9ei9r-t_toJ3Fh_7wclh_SE3M0Ok3q5.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/9MSLtIYUCWQyKQWwFV1bJodq945VIOG_Ky9MTMPRxrtNLgepl-k9sTPSwZO-qxJ6eaZvY6E4Xpq1TLTs_MUtuKJ8.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/A8pxLRt79yMfhbIzH-W-hvJhciDarnaCRRscMxlHkYQ4IWsgWo7E4YV1HMoy8ISoHmpKQbC1tPnfWpfBmWe3it4P.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/AT-UmIl9tVyHBz_pHovemO22fjDHENYB8XPmf1RD8kDtcj-PkD-uLH-_VWVpmI9kGG4MzH7qAJXuM80I10nTEDD_.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/AwyUaIO4ci-Fwh1uVin5YWQP9pCbjWvocMvjoeKALzhnFfnraqoHjgwUC2pyO_SwwBpW37TsglOA6EF7BshSibh7.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/Bp3j61WLRNASHyCfCq4qiQPY_9TgBeEEkKKu1UoWojuZC2Jx51QJS9QPhcIt_g-k2vWyJKewLLo4gQC_v6Jw647s.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/CV04HyRseOSuOHZ6LMkg8lMoVd6ZVbkmOzfvdaFm6yz-sgsVn5oTMPNL1ofedWGuGwQydHRhZyOyvUoyEoovBNsa.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/CkSQDe0pvMBUcPWAfTv3J0csNzu9YhV1dJTYV_zk6XC7gESsWuh5XBERZPM8_vAHjitTfS-Xh7i2AQFq8vyu91mr.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/EkgvvDMaFM9k6oRDuJ3owgAkhY9pNMAXAOnbaFrYbyKQ0yYWD8msfBtESqsu3W0hkEfv9BC-i5-Jz_PsTMlDCPfN.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/F3_UpmxKsFG0jWsUEvnA-3p03C5Qpdfck5VEPF4Uh3OQNjvNEcQ_0e2y4cYNOID22VoZ8AMvhqkXmQa0JKbRvPbD.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/HC_Grib_9kurd1X_3jtIo621uxwYVHW3i8xpIMskuRvEL0FG-YCsN-CfO0kRaQIX3X437Sdm-14psEkMjgog1OJw.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/Hcl_HaPPewrRonuZahajPeLajVsnlt0WcU3jUWE1zlJ5bBJmWzemQSzCbvsDO8LY9p6QcsZmVofJFRAmaiZgfd_S.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/IMrcMzT-ma4XpG-K23HeMedPVa3TlkYh3DKS25OiWV2Sgdy-dsQPln6iXgGqDBCajFm-9bRM9p09mo_v0xXA1Vfu.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/Iy_tYfzbNVeGZ-tclKvj59-leyKh_5gNgcaPUjBl0ScpYlKMyl9tbOFv7Zny_OzMUQkk6yB1wQA21VOTATwf_Fnr.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/JXCtc0Rw2KZ5A1jm1aU3o4Kn9K_mJtnZuHbppz1mYbvfcVGx6qPSD0N5vtLix8JM_nAyvVE8IY1_doyQP2Heax74.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/_N34X5R1tqHyeZJe4M4oEsQlV0CfGwgF5iYenKnEMZEXqD0-w9Gw9Ew3ZEXS_XX6ocHtOTm-zMPUO3UOxdHlZ0d8.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/_b9VnPnTEAHU2D_vn10ziSttcEKrHyWBt_msfQYN4n7LyCpyU76Tkggzbp7rnJOUlz2cvFujxbzbvyP9luYVCb1x.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/Jl5EX9eAKiePROI4S3sKLP6--hgJtXx9SO5QD8bV_iMJX6O8IuNpvHPRApJuczPRdEyd-OoGbymWWLyngfN39buU.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/KsKsabu7tTNLTUqJRWsc6D1PlQKIQUvkYsiOam75GhT24lZgT1t9RSYeQ7d7WuJFk5V-IA47ZtBOdAahE5LY4q6o.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/LYcgxg5Xu5ql37mhxCM02LVC8S2HlH1rH0eDnV5FNI734xdh9BrvNzb_zmGMhf8MejdbbWPUbV7MH8cpJWjlUCll.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/LgLVvrCFwZ391lTMuFj03SzUUyQejhoSK-SbIIcVmTVNtYFEGTFRgNB51Vp3gAFwSvj4JyHQHq9x63dTou878IiZ.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/LkvrqsWwgj9CVUYuAG4NLNbCXH-6sxhd7N_5VUlir7itb67B3-u0iefRS99q35tSQfMsaAp8K865DtU1vd6ysLn1.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/M5f6GedrvhSR__jP9c8KX-VE2qlfTGkorF0k1rrcySfkGXZODHZYuJVBtgQa71x_c7PxuJrBaIqhGXN2Kj8nxEt9.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/O59xarLMOPCFIA01MmaDYOVgW4j0rErqyGja-TIMlFo8BdR8Br1TUnuYc01GAlM_myXXLGiEEiESNhoY1M73xRS9.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/OM_UNk7v_ALduEgIuuwkZQl3GcBoa6ktMtdmQk1Ln30bGKOrMFIHKf-M7uiFy2FWtPFSPY13Yx-lkpLKUSK_Rlct.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/PPazCEoxYB79VosEKPYkzNYg9G2fEcBSkKX5kxm3twqMOGcic7irXN4FdEvAR5glEd6ac60LxkOWGya1PrnqmGgQ.jpg', alt: 'Наше фото 9' },
      { url: 'https://storage.yandexcloud.net/jul/Pfa15ttPQAU-bov4EGt-nfTjPL9ixguEwtFMpYiR-H4wFI_0Fw-kzJ-GvFgjEooMpp-7AQ2S3aMbXWbxmIR9sRKn.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/Q_LnE7NrfyVtmzHvsNg4TOgKooaF8yj3lhkx6wG9lciHp43GMnhFS-7X36TCK_HA5uTJW52hw6NI3y7aOt6xauQT.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/R0Rpf_9aCva1Vxi7Har8xnDrU5YDn1KJ85iRvC3fbppIB_cikZK5dH5mMk6rQrpXQf8ziQugOdqwPYkaJqeCJlIu.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/R7Q1fQ3UTEzxQLeBtd0SQsZe3GkRTb309gJoeq0ySCeavOcZlZj6_pffZfDyfItXlAz_e0_MeCe2UrINJyT046Lj.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/RkS9AKp8Pz-nVoNxfBJjXmn3FnXkuDm9eLM-tyNEcRCz8RZ9A7igI-oPVb4C4ipFsEWCdaTXIfbvnQSMO7ZINamD.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/ZjpkieCa6Ecf4Gg12deYA2TX9rg4PQMugwW5Au9QBSV8APqlARKfH6YfpczJE_iz8Rsyjv5U1GacaYzviHAgQ8AL.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/T6gvcC4Oq8TaiFcfMtI0e_x7rGQBEXaTyTWkLhKfNlVHuOX8GFft9SNMWGggsHH-z_HiV6_mm9CFZeSvHbYFFfAt.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/U5rGjp-O1FUTxCWUUqz0W1QwZSCnR0wkyXMIhAC-3IVLZHXMpssS1shxrvsbB9uwb8RTnVq69BCiTDJx5JcEt4qs.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/UE-JKia9dDI0NgEZ5PU5nDiWTW8I_YjLXeZevCsIPPF074yjKqj_RyY3jYDgcadSgoi8-s9AZ3e3Pym2qU_aZO1S.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/UowbAHhn0aMVQuzQfwv9lJvvoh8rvVNUexjrsUb472gExJGL2bhLBonjeADfo0tUwbLfUIKxoDQX4o5tDpbxCR9t.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/VJNlwztoro-CMU98cpoOAWEH0EHim2PCK3M5Xu-tjzJ3he6FNPQ0Kfy-xra8qiYdoW3IPHyNVr8naQL6I1swBToe.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/aPtUpcKiEsRRCFG3je9LUPVmpWFe_NxFcJSWrcSnRNn40I30OZAt-rHSXMmIpvnmKhXggvr2MdQr3Wq9L4Q-dvgi.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/bFTAiI4W99hVIMWPw7YtOW4tgZjJu-T0_rTNotggfixif3xCyGCcICixz3eoprPUoLOw-PQTU1CKdOkszECE9I47.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/cROXmHa4AaHxyZ1O2_NVGtTwQxJzBtbMltr9i1d55tDzEul28SsRenj2z966fPaD8nSp7smqpOXbUoxVMdUIXir1.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/cSCrEL811Lk9CxSeI2VL5Ls89cMSCyDzFG-Xss_TEKQT3HQFyETVgeuY_9SS19MXpod31ZeowSILNGMnYdPdLdm3.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/cYc2TNZxZvTcMdisaWwB4ATCrhsu8JerDwp9s_Ntdn6GIXg7M4pnDWNgfWgfvE6x0tiVkISIwcS5kkXx7fmJWmZo.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/cknN07nY4SIissfHlnr9Gz85f3CQ_sTlRgH7tdpYY7LiF6uKWg7d-cFm0vwv3Io1jrjzTkMz2comiHeMxaJ27F3L.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/dKI6FbCl1uXl8DpfZjQAXqNwOBUMNJWY8lORjZj-h3Dg3oNaM-WBssG6FOXdfsE2pCgRIxKQ3r9Q5niM-_WM0zxB.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/eN6N_JE4l70dJ4UYgdK21y4u4SHWRG8qop4jkufoOCqR4KeLFD66RjzVYQBOwPEkqFZPP6s3Bii4OWB64mz7N-Lx.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/VKOV_Dw4aB-zNe8Ng4dMMGG6pGHjlGvLrPhIRiTcQOCkxk5UE6uJNMuBSCGLHSA_pJIvokQAbLtICF_PAT25VwTG.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/Wvq8Q7cIo02SiUVFj8znCEUWJ9MNIDfbwyQcOQefQkmHMxLKbmyNBccyhPYPhsqB01VViciuFxhFxMbjLzl88B2M.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/XRqtas6Yfdl3YgK5YFlkM2MujDwmTeZ-u7vY-pGPdNIHzMgfRTljokzSOsUSYR_xeoufHaUdsBKOZVQvrsJUHiKb.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/eOGf8MquDqp6XdI0HQA9sIhWd2ad7lhWPGcyTJ-sPswCe_LpoSfL1KhxV0pB89AMEcAd-z53oxlNQ44eMcf7fD0U.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/eaazfVQnQIxO9pIJCaT375kiUNwVSNMDeqNKo1KHpWx57AHXI6Iv64GE-rxcO4WM3pkJoHjK-h1rjW3u9tnW58yW.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/emxZEPxWwOPUcMr42j4pkty27WkMWSA0BbCRhInSyyJlU1cGjSwxQ5f17jGUt8Bs7NNwD7LqTI55QiOok4G4wUg5.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/er1XThH8H9sgtmkeBf2rIAovYb6RT7wfdLUnoYdd_Xqo2A1E8nZ-dDRdGLF6XFPM99niXspAUfFE0ok3NfCozfdb.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/xxB6gGqSejrl3_S6zalVKk4sCQmqwJY8KU2_xTqKmAAfQTtN7jbVElmbl7xsdzrGCnCePaL9Nl1U__olovVD5sZ7.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/f7xVOAdbjI0ZJHtmOt5umo9DPX5eWcf5guHFC4It7bp-pA9wT7-ZpHN-KKXsAzmByFrUXQU77qH-iKDkeVmAndjY.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/fe0_KpjqC_Yg4pvOrUf8evW0oEvhyNPRqL92GcXa1unpA_W00WR9D-iSir6Zm_xS9HI1aY_WnHB7j1OH86g2tCEr%20(1).jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/fv1y9bYNCz5PEuxvSa_wK5uY6dZDKPfa3215c6YG-EY_7371CHuxR_w96xlCFXyVIdWsfT4RIxZQ3aP9zgGMreOz.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/gOkaBYRvKkFdaMr7O5Z3HJ3vSydIbopa2rN5fk1qiwd8lMzLxayQ4nvcpZ2BfNoMoqYRwQ7nIbOAjpHlJrZjEVKW.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/mWbSykGQ6PmTgRjjllvsPmyv9S5qw_67X9bHC1jKn3WhqyCYZpWqhDxis1pKEYp1P9YILzRJ7VmqF0UeEInKc5Ad.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/gRVKCbqk_fGNsIajk0eIv0orSGjuHgKob3vQZr9Bmz2qcqfFJyB7tS-Mz9Ak4fSAleZpFQ7hNcP2ZeZezYj5Reqf.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/iG2QmVP8to9XJuB9GKoEbLUkKK0hlgIEQtFIaM1Yg7mSDLDjVmCMFrSTdwYBOQ93sO3SjJ2ELEAoc85zHTYBxmmh.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/jZqbsNNrPRJZYjf1HZ5vVev--Z1uNxG48jVlmRykD6sW1MLVx9q72iYyzI6T2GZwsWTPHMPAhNjbvrq5wmrDcEsG.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/jfh3BRhs0kjajuhpqU565-DvaVkaA9nvufl716p4DTsYrAl0KkiX4ENZNaq7l2Cx-HRi5-1AEL0ZPBNVwcP_IlSe.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/jo7KtDdyt3mB88hzRf8gtE8zRrKgi7jvhysSVaN_zqMX9vQrLTJ4R31993XtkZDgVgzh2XcRLb6bQHgvGYNz0LIt.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/l5k_qNsThXp0bRoHH9D50hszsZynGNp_ZjSWk0cgGE__3JU4w_IGHCFBotXZBhcy25RsP1-sl78Sj9_QTYfDBwMw.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/lRN-DKwJeUMsEYyyaL_eLrO_CMxgruCO5rSIvVLNZTq5YGDJMEmcgq8HhcpnKUxbv18uOifBFVBenqcoyJVYo89i.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/m5AwjpboK52gkZaZVPSa2GSHOczoI3oJExu6QlU0E04t7jdbYIh_XObNLftPoga3f_D0YJPhOfVDkVu64fw8Q0fX.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/m9Vfioyzvi1tX9Pe9WXju8uZD9hghSAn5i4M7Xgm3wBja-9YQah3yPjsp6RQz3e6ogh5eSoe-Qv966zgG2UjsVZI.jpg', alt: 'Наше фото 9' },
        { url: 'https://storage.yandexcloud.net/jul/mpdX-bDMbUmaCtXKKJQiGNDXi1skoyq7or0hsRq3ITgHMMjOFTgHIvnDKTgDkG04UeCzAv1narPAKXpESinZJWXU.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/mrTuGWQFnXH19ZZ_xWxxeNYG9YBLs25KKtrl2xzIxEcemtbUsmurfhcKuA8YOUXwiGcaV-o6wmo09icsgjq8g_c4.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/n2VHJcyrKwZumQBx_WWuOOYDbIbToT6FEIT_8O-DL-AXKiLc013Fo0PWIoIBtQbNlQVFF7sDbKDepFAFlC5FkW-F.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/nE-N86rvNNF-qHfunP-Tmh695u60f7JA8SrTvXQpN_fIpkstOQ16-xMRQAtANAJAF1OE7ylNsNfZ9DeDeJUBo0Y-.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/nX389Cl_mtTA0fnkl6VJbmO7TjAFUh6hUlalsDYX6pTrdQGODH0WpZ6EkOazU_HmYlH_9SqfX0uQT8OnYMhLdbiB.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/o2djmwsEXUGoFdVkSUKP4xAbCD3xzabWlxBMahUdY4niOAt9WiokcRdTL8UFO1fdmf553SSR2b9IF10oE2djfNuY.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/oj6jP0eTR_PACeIR6uM9y6AaMaO0Ld7FdT7kGCbiMUSOYLD_L8R1RbTZStYex8yS3_FRJEO7ChSXRFYlovxzpahP.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/pKZcXLs6as6vtlR24V7PSgrcqgxgBxQOHBsRIUGlg_Wjxp8y_Pls75MGNR-dA2_9MzWOgYqPTbVn5EFF-oZ6-E_q.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/pz-BECAASekVFpl0kuvEvXE3PS5BDDCyBiHa-0Wz9BLUYUYXhcs1K3va9U8wB_n6ywMJZr5wPxWj6jZl31unmMjF.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/qATIfCpcdB8u2VcSaKz63PLrFoZ9GDaBWUBDkcmd_0z9f2xAl00Qbn8uWhOG-7m7Nmr93Ri6YvMUFZT_1FkGDyNl.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/r2Lf6Zp9D_gYL6vCylDmPZo2CeSer6cvdt7blznhTAXw8ZIzC-2v419l0LVr3xx9o3mKtiNP8X2xVhf31z25rfmg.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/rEpyU85SMxwLFLpy6ZcqQxB2mltqr-x2ss0VdXuFInYlnaqQyCmD6aFmHaU8pNEB2xkuzrtuvzvvG19LHItnH_zs.jpg', alt: 'Наше фото 9' },
    {url: 'https://storage.yandexcloud.net/jul/rQ572mSfWjyCejUqY1CN73GbsFi8LaeyvtmzuX1cjb9af8UbaVB2IKNP94QNS8BjxYkn6g5TLrnbwGv6O0oPGkH9.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/rQ9y2jQktigptRoTzJGeStZscT2z4FO_6bNv8eeYQ8iCOfeSaVNAHirhftAg-PBp_ghzLcuxYx-8_Yaaz1H39HmL.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/suRvJZev70eCcce7bAqu1-2AXPc6VWd64odmN0rF1piGl5qtUuqyI3sUfMl13jY4q5YA-4ELH2UJ6KJ_2u6wfJpG.jpg', alt: 'Наше фото 9' },
        {url: 'https://storage.yandexcloud.net/jul/xmwdN0uifzvhJ5hG_9sZrPDrfS_JCv1yEoUeDfc_o1yoMjXRc1BUxLsxYcrP8v7NMzOuduEUYp7EutGYKetjUksf.jpg', alt: 'Наше фото 9' },
    { url: 'https://storage.yandexcloud.net/jul/yCGp_Am-7ZSeejU1-OByzmlQPVCBJz4KB9LEs0Y6J56Ar6MPhJXBKDaTECUhw7nTFHG1xypeZwGC2Hq2Eodmb_Fr.jpg', alt: 'Наше фото 9' },


    
    
  ];

  return (
    <div style={styles.section}>
      <HeartsBackground count={30} />
      <div style={styles.galleryContainer}>
        <div style={styles.galleryHeader}>
          <button style={{...styles.button, ...styles.backButton}} onClick={onSwitch}>
            ← Назад к причинам
          </button>
          <h1 style={styles.galleryTitle}>📸 Наши моменты</h1>
          <p style={styles.gallerySubtitle}>Самые тёплые воспоминания с тобой ❤️</p>
        </div>
        
        <div style={styles.grid}>
          {photos.map((photo, index) => (
            <div key={index} style={styles.gridItem}>
              <img 
                src={photo.url} 
                alt={photo.alt}
                style={styles.gridImage}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/FFB6C1/FF69B4?text=❤️';
                }}
              />
              {/* Оверлей при наведении */}
              <div style={styles.imageOverlay}>
                <span style={styles.imageHeart}>❤️</span>
              </div>
              {/* Иконка в правом нижнем углу - теперь отдельно от оверлея */}
              <div style={styles.iconBadge}>
                <span style={styles.iconText}>{getRandomIcon()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Основной компонент приложения
const App = () => {
  const [activeSection, setActiveSection] = useState('reasons');

  const switchToGallery = () => setActiveSection('gallery');
  const switchToReasons = () => setActiveSection('reasons');

  return (
    <div style={styles.appContainer}>
      {activeSection === 'reasons' ? (
        <ReasonsSection onSwitch={switchToGallery} />
      ) : (
        <GallerySection onSwitch={switchToReasons} />
      )}
      
      <style>
        {`
          @keyframes floatHeart {
            0% {
              transform: translateY(0) rotate(0deg) scale(1);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            90% {
              opacity: 0.3;
            }
            100% {
              transform: translateY(110vh) rotate(720deg) scale(0.5);
              opacity: 0;
            }
          }

          @media (max-width: 768px) {
            @keyframes floatHeart {
              0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0;
              }
              10% {
                opacity: 0.2;
              }
              90% {
                opacity: 0.2;
              }
              100% {
                transform: translateY(110vh) rotate(360deg) scale(0.3);
                opacity: 0;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  appContainer: {
    width: '100%',
    minHeight: '100vh',
    minHeight: '100dvh',
  },
  section: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    minHeight: '100dvh',
    margin: 0,
    padding: '16px',
    background: 'linear-gradient(135deg, #fce4ec 0%, #e1f5fe 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  heartsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
    overflow: 'hidden',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '28px',
    padding: 'clamp(24px, 4vw, 40px) clamp(16px, 4vw, 30px)',
    maxWidth: '550px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(233, 30, 99, 0.15), 0 10px 20px rgba(3, 169, 244, 0.1)',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    transition: 'all 0.3s ease',
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
    fontWeight: '700',
    color: '#d81b60',
    marginBottom: '20px',
    letterSpacing: '0.5px',
    textShadow: '0 2px 4px rgba(233, 30, 99, 0.1)',
    wordBreak: 'break-word',
    lineHeight: 1.3,
  },
  reasonText: {
    fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
    fontWeight: '500',
    color: '#0277bd',
    margin: '24px 0',
    padding: '16px 12px',
    minHeight: 'clamp(60px, 15vh, 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(225, 245, 254, 0.5)',
    borderRadius: '16px',
    border: '1px dashed #81d4fa',
    lineHeight: 1.6,
    wordBreak: 'break-word',
    transition: 'all 0.3s ease',
  },
  button: {
    backgroundColor: '#f06292',
    color: 'white',
    border: 'none',
    padding: 'clamp(14px, 3vw, 18px) clamp(24px, 5vw, 36px)',
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    fontWeight: '600',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(233, 30, 99, 0.3)',
    letterSpacing: '0.5px',
    marginTop: '10px',
    width: '100%',
    maxWidth: '280px',
    position: 'relative',
    zIndex: 2,
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 28px rgba(233, 30, 99, 0.4)',
    },
    ':active': {
      transform: 'scale(0.95)',
    },
  },
  switchButton: {
    backgroundColor: '#4dd0e1',
    boxShadow: '0 8px 20px rgba(3, 169, 244, 0.3)',
    marginTop: '12px',
    ':hover': {
      boxShadow: '0 12px 28px rgba(3, 169, 244, 0.4)',
    },
  },
  footer: {
    marginTop: '24px',
    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
    color: '#80cbc4',
    fontWeight: '400',
    letterSpacing: '0.3px',
    opacity: '0.8',
  },
  // Стили для галереи
  galleryContainer: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1200px',
    padding: '16px',
  },
  galleryHeader: {
    textAlign: 'center',
    marginBottom: 'clamp(24px, 4vw, 40px)',
  },
  galleryTitle: {
    fontSize: 'clamp(1.8rem, 5vw, 3rem)',
    fontWeight: '700',
    color: '#d81b60',
    margin: '16px 0 21px 0',
    textShadow: '0 2px 4px rgba(233, 30, 99, 0.1)',
  },
  gallerySubtitle: {
    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
    color: '#0277bd',
    opacity: 0.8,
  },
  backButton: {
    backgroundColor: '#4dd0e1',
    maxWidth: '200px',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    padding: '12px 24px',
    boxShadow: '0 8px 20px rgba(3, 169, 244, 0.3)',
    display: 'inline-block',
    width: 'auto',
    ':hover': {
      boxShadow: '0 12px 28px rgba(3, 169, 244, 0.4)',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 20vw, 250px), 1fr))',
    gap: 'clamp(12px, 2vw, 20px)',
    padding: '8px',
  },
  gridItem: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    boxShadow: '0 8px 16px rgba(233, 30, 99, 0.15)',
    transition: 'all 0.3s ease',
    aspectRatio: '1 / 1',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    ':hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 12px 24px rgba(233, 30, 99, 0.25)',
    },
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease',
  },
imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(233, 30, 99, 0.1) 0%, rgba(233, 30, 99, 0.3) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none', // Чтобы не мешать кликам
  },
  imageHeart: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    opacity: 0.9,
    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  // Стиль для иконки в правом нижнем углу
  iconBadge: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    borderRadius: '50%',
    width: 'clamp(32px, 5vw, 45px)',
    height: 'clamp(32px, 5vw, 45px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(4px)',
    border: '2px solid rgba(255, 255, 255, 0.17)',
    transition: 'all 0.3s ease',
    zIndex: 2, // Чтобы иконка была поверх всего
  },
};

export default App;