<<<<<<< HEAD
// Счётчик калорий — логика приложения.
// Важно: функции объявлены в глобальной области (window.*), потому что в HTML используются inline-обработчики (onclick/oninput/onkeydown).

const STORAGE_KEY = "calorie_counter_items_v1";

// Мини-база продуктов (значения на 100 г).
// Формат: { cal: ккал, p: белки, f: жиры, c: углеводы }
const foodDB = {
  "огурец": {cal:15,p:0.8,f:0.1,c:3.0}, "помидор": {cal:20,p:1.0,f:0.2,c:4.0}, "томаты": {cal:20,p:1.0,f:0.2,c:4.0}, "картофель": {cal:77,p:2.0,f:0.1,c:17.0}, "морковь": {cal:41,p:0.9,f:0.2,c:9.6},
  "свекла": {cal:43,p:1.6,f:0.2,c:9.6}, "капуста белокочанная": {cal:27,p:1.8,f:0.1,c:6.0}, "капуста цветная": {cal:25,p:1.9,f:0.3,c:5.0}, "брокколи": {cal:34,p:2.8,f:0.4,c:6.6}, "кабачок": {cal:24,p:0.6,f:0.3,c:4.6},
  "баклажан": {cal:25,p:1.0,f:0.2,c:5.9}, "перец болгарский": {cal:27,p:1.0,f:0.2,c:6.0}, "лук репчатый": {cal:40,p:1.1,f:0.1,c:9.3}, "чеснок": {cal:149,p:6.4,f:0.5,c:33.1}, "редис": {cal:16,p:0.7,f:0.1,c:3.4},
  "тыква": {cal:26,p:1.0,f:0.1,c:6.5}, "салат листовой": {cal:15,p:1.4,f:0.2,c:2.9}, "шпинат": {cal:23,p:2.9,f:0.4,c:3.6}, "укроп": {cal:43,p:3.5,f:1.1,c:7.0}, "петрушка": {cal:36,p:3.0,f:0.8,c:6.3},
  "яблоко": {cal:52,p:0.3,f:0.2,c:14.0}, "банан": {cal:89,p:1.1,f:0.3,c:23.0}, "груша": {cal:57,p:0.4,f:0.1,c:15.0}, "апельсин": {cal:47,p:0.9,f:0.1,c:12.0}, "мандарин": {cal:53,p:0.8,f:0.3,c:13.3},
  "лимон": {cal:29,p:1.1,f:0.3,c:9.3}, "киви": {cal:61,p:1.1,f:0.5,c:15.0}, "виноград": {cal:69,p:0.7,f:0.2,c:18.0}, "арбуз": {cal:30,p:0.6,f:0.2,c:7.6}, "дыня": {cal:34,p:0.8,f:0.2,c:8.2},
  "персик": {cal:39,p:0.9,f:0.3,c:10.0}, "нектарин": {cal:44,p:1.1,f:0.3,c:11.0}, "слива": {cal:46,p:0.7,f:0.3,c:11.4}, "абрикос": {cal:48,p:1.4,f:0.4,c:11.1}, "гранат": {cal:83,p:1.7,f:1.2,c:18.7},
  "ананас": {cal:50,p:0.5,f:0.1,c:13.1}, "манго": {cal:60,p:0.8,f:0.4,c:15.0}, "хурма": {cal:67,p:0.5,f:0.4,c:15.3}, "клубника": {cal:32,p:0.7,f:0.3,c:7.7}, "малина": {cal:52,p:1.2,f:0.7,c:12.0},
  "черника": {cal:57,p:0.7,f:0.3,c:14.5}, "смородина": {cal:63,p:1.4,f:0.4,c:15.4}, "вишня": {cal:50,p:1.0,f:0.3,c:12.2}, "черешня": {cal:63,p:1.1,f:0.2,c:16.0}, "клюква": {cal:46,p:0.4,f:0.1,c:12.2},
  "изюм": {cal:299,p:3.1,f:0.5,c:79.2}, "курага": {cal:241,p:3.4,f:0.5,c:63.0}, "чернослив": {cal:240,p:2.2,f:0.4,c:64.0}, "финики": {cal:282,p:2.5,f:0.4,c:75.0}, "инжир сушеный": {cal:249,p:3.3,f:0.9,c:64.0},
  "хлеб белый": {cal:265,p:8.0,f:3.2,c:49.0}, "хлеб ржаной": {cal:210,p:6.6,f:1.2,c:43.0}, "хлеб цельнозерновой": {cal:247,p:13.0,f:4.2,c:41.0}, "батон": {cal:263,p:7.5,f:2.9,c:51.0}, "лаваш": {cal:275,p:9.1,f:1.2,c:56.0},
  "сухари": {cal:350,p:11.0,f:1.5,c:73.0}, "галеты": {cal:393,p:9.7,f:10.2,c:65.0}, "баранки": {cal:336,p:10.0,f:1.3,c:69.0}, "булочка": {cal:310,p:8.0,f:6.0,c:56.0}, "круассан": {cal:406,p:8.2,f:21.0,c:45.0},
  "мука пшеничная": {cal:364,p:10.3,f:1.0,c:76.0}, "мука ржаная": {cal:325,p:9.0,f:1.7,c:68.0}, "овсяные хлопья": {cal:366,p:11.9,f:7.2,c:69.0}, "гречка вареная": {cal:110,p:3.6,f:1.1,c:21.0}, "гречка сухая": {cal:343,p:13.3,f:3.4,c:72.0},
  "рис вареный": {cal:130,p:2.7,f:0.3,c:28.0}, "рис сухой": {cal:365,p:7.1,f:0.7,c:80.0}, "макароны вареные": {cal:131,p:5.0,f:1.1,c:25.0}, "макароны сухие": {cal:350,p:12.0,f:1.5,c:72.0}, "перловка вареная": {cal:109,p:3.1,f:0.4,c:22.0},
  "пшено вареное": {cal:119,p:3.5,f:1.0,c:23.7}, "булгур вареный": {cal:83,p:3.1,f:0.2,c:18.6}, "киноа вареная": {cal:120,p:4.4,f:1.9,c:21.3}, "манка вареная": {cal:80,p:2.5,f:0.2,c:16.8}, "кукурузная каша": {cal:86,p:2.3,f:0.3,c:19.0},
  "молоко 2.5%": {cal:52,p:2.8,f:2.5,c:4.7}, "молоко 3.2%": {cal:60,p:3.0,f:3.2,c:4.7}, "кефир 1%": {cal:40,p:3.0,f:1.0,c:4.0}, "кефир 2.5%": {cal:53,p:3.0,f:2.5,c:4.0}, "ряженка": {cal:67,p:2.8,f:4.0,c:4.2},
  "йогурт натуральный": {cal:61,p:3.5,f:3.3,c:4.7}, "творог 5%": {cal:121,p:17.0,f:5.0,c:2.0}, "творог 9%": {cal:159,p:16.7,f:9.0,c:2.0}, "сметана 10%": {cal:119,p:2.7,f:10.0,c:3.9}, "сметана 20%": {cal:206,p:2.5,f:20.0,c:3.4},
  "сыр российский": {cal:363,p:24.0,f:29.5,c:0.3}, "сыр гауда": {cal:356,p:25.0,f:27.0,c:2.2}, "сыр моцарелла": {cal:280,p:28.0,f:17.0,c:3.1}, "сыр фета": {cal:264,p:14.0,f:21.0,c:4.1}, "сыр плавленый": {cal:257,p:16.8,f:19.0,c:3.5},
  "масло сливочное": {cal:748,p:0.5,f:82.5,c:0.8}, "сливки 10%": {cal:118,p:3.0,f:10.0,c:4.0}, "сливки 20%": {cal:206,p:2.8,f:20.0,c:3.7}, "мороженое пломбир": {cal:232,p:3.7,f:15.0,c:20.4}, "сгущенка": {cal:321,p:7.2,f:8.5,c:56.0},
  "яйцо куриное": {cal:155,p:13.0,f:11.0,c:1.1}, "белок яйца": {cal:52,p:10.9,f:0.2,c:0.7}, "желток яйца": {cal:322,p:15.9,f:26.5,c:3.6}, "омлет": {cal:154,p:10.6,f:11.0,c:2.0}, "яичница": {cal:196,p:13.6,f:15.3,c:0.8},
  "куриная грудка": {cal:165,p:31.0,f:3.6,c:0.0}, "куриное бедро": {cal:209,p:26.0,f:10.9,c:0.0}, "курица вареная": {cal:170,p:25.0,f:7.0,c:0.0}, "индейка": {cal:135,p:29.0,f:1.0,c:0.0}, "говядина": {cal:250,p:26.0,f:15.0,c:0.0},
  "телятина": {cal:172,p:24.0,f:8.0,c:0.0}, "свинина": {cal:297,p:25.7,f:20.8,c:0.0}, "баранина": {cal:294,p:25.0,f:21.0,c:0.0}, "фарш говяжий": {cal:254,p:17.2,f:20.0,c:0.0}, "фарш куриный": {cal:143,p:17.4,f:8.1,c:0.0},
  "печень куриная": {cal:137,p:20.4,f:5.9,c:0.7}, "печень говяжья": {cal:135,p:20.0,f:3.6,c:4.0}, "ветчина": {cal:145,p:21.0,f:6.0,c:1.0}, "колбаса вареная": {cal:257,p:12.8,f:22.2,c:1.5}, "колбаса копченая": {cal:507,p:24.0,f:45.0,c:0.5},
  "сосиски": {cal:266,p:11.0,f:23.9,c:1.6}, "сардельки": {cal:332,p:10.0,f:31.0,c:1.5}, "бекон": {cal:541,p:37.0,f:42.0,c:1.4}, "сало": {cal:797,p:2.4,f:89.0,c:0.0}, "паштет": {cal:319,p:11.0,f:28.0,c:3.0},
  "лосось": {cal:208,p:20.0,f:13.0,c:0.0}, "семга": {cal:208,p:20.0,f:13.0,c:0.0}, "форель": {cal:148,p:20.8,f:6.6,c:0.0}, "тунец": {cal:132,p:28.0,f:1.3,c:0.0}, "треска": {cal:82,p:18.0,f:0.7,c:0.0},
  "минтай": {cal:72,p:16.0,f:0.9,c:0.0}, "хек": {cal:86,p:16.6,f:2.2,c:0.0}, "скумбрия": {cal:205,p:19.0,f:14.0,c:0.0}, "сельдь": {cal:217,p:19.8,f:15.4,c:0.0}, "сардина": {cal:208,p:25.0,f:11.0,c:0.0},
  "креветки": {cal:99,p:24.0,f:0.3,c:0.2}, "кальмар": {cal:92,p:15.6,f:1.4,c:3.1}, "мидии": {cal:86,p:12.0,f:2.2,c:3.7}, "икра красная": {cal:250,p:31.0,f:13.0,c:1.0}, "крабовые палочки": {cal:95,p:7.0,f:1.0,c:15.0},
  "фасоль вареная": {cal:127,p:8.7,f:0.5,c:22.8}, "горох вареный": {cal:118,p:8.3,f:0.4,c:21.1}, "чечевица вареная": {cal:116,p:9.0,f:0.4,c:20.0}, "нут вареный": {cal:164,p:8.9,f:2.6,c:27.4}, "кукуруза вареная": {cal:96,p:3.4,f:1.5,c:21.0},
  "зеленый горошек": {cal:81,p:5.4,f:0.4,c:14.5}, "фасоль стручковая": {cal:31,p:1.8,f:0.1,c:7.0}, "соевый сыр тофу": {cal:76,p:8.0,f:4.8,c:1.9}, "соевое молоко": {cal:54,p:3.3,f:1.8,c:6.3}, "хумус": {cal:166,p:7.9,f:9.6,c:14.3},
  "миндаль": {cal:579,p:21.0,f:50.0,c:22.0}, "грецкий орех": {cal:654,p:15.2,f:65.2,c:13.7}, "фундук": {cal:628,p:15.0,f:61.0,c:17.0}, "кешью": {cal:553,p:18.0,f:44.0,c:30.0}, "арахис": {cal:567,p:25.8,f:49.2,c:16.1},
  "фисташки": {cal:562,p:20.0,f:45.0,c:28.0}, "семечки подсолнечные": {cal:584,p:20.8,f:51.5,c:20.0}, "семена тыквы": {cal:559,p:30.2,f:49.0,c:10.7}, "семена льна": {cal:534,p:18.3,f:42.2,c:28.9}, "семена чиа": {cal:486,p:16.5,f:30.7,c:42.1},
  "масло оливковое": {cal:884,p:0.0,f:100.0,c:0.0}, "масло подсолнечное": {cal:884,p:0.0,f:100.0,c:0.0}, "масло кокосовое": {cal:862,p:0.0,f:100.0,c:0.0}, "майонез": {cal:680,p:1.0,f:75.0,c:2.6}, "кетчуп": {cal:112,p:1.7,f:0.2,c:25.8},
  "горчица": {cal:66,p:4.4,f:4.0,c:5.0}, "соевый соус": {cal:53,p:8.1,f:0.6,c:4.9}, "мед": {cal:304,p:0.3,f:0.0,c:82.4}, "сахар": {cal:387,p:0.0,f:0.0,c:100.0}, "варенье": {cal:260,p:0.3,f:0.1,c:68.0},
  "шоколад молочный": {cal:535,p:7.7,f:30.0,c:59.0}, "шоколад темный": {cal:546,p:4.9,f:31.0,c:61.0}, "печенье": {cal:450,p:7.0,f:18.0,c:66.0}, "вафли": {cal:520,p:5.5,f:30.0,c:60.0}, "зефир": {cal:326,p:0.8,f:0.1,c:79.8},
  "мармелад": {cal:321,p:0.1,f:0.0,c:79.4}, "халва": {cal:516,p:12.7,f:29.9,c:50.6}, "торт бисквитный": {cal:350,p:5.0,f:15.0,c:50.0}, "пирожное": {cal:400,p:5.0,f:22.0,c:47.0}, "мюсли": {cal:340,p:9.0,f:5.0,c:66.0},
  "борщ": {cal:57,p:3.8,f:2.9,c:4.3}, "щи": {cal:35,p:2.0,f:1.5,c:4.0}, "суп куриный": {cal:45,p:4.0,f:2.0,c:3.0}, "суп гороховый": {cal:66,p:4.4,f:2.4,c:8.9}, "окрошка": {cal:60,p:3.5,f:3.0,c:5.0},
  "плов": {cal:180,p:6.0,f:7.0,c:24.0}, "гречка с курицей": {cal:135,p:9.0,f:3.5,c:17.0}, "макароны с сыром": {cal:220,p:8.0,f:9.0,c:27.0}, "пельмени": {cal:275,p:11.0,f:13.0,c:29.0}, "вареники с картошкой": {cal:185,p:5.0,f:3.0,c:35.0},
  "котлета куриная": {cal:190,p:17.0,f:10.0,c:8.0}, "котлета мясная": {cal:240,p:15.0,f:17.0,c:8.0}, "голубцы": {cal:143,p:7.0,f:8.0,c:11.0}, "тефтели": {cal:220,p:12.0,f:14.0,c:10.0}, "омлет с сыром": {cal:210,p:14.0,f:16.0,c:2.0},
  "салат оливье": {cal:198,p:5.0,f:16.0,c:8.0}, "салат винегрет": {cal:130,p:2.0,f:8.0,c:14.0}, "салат цезарь": {cal:190,p:9.0,f:14.0,c:7.0}, "салат греческий": {cal:120,p:4.0,f:9.0,c:6.0}, "пюре картофельное": {cal:90,p:2.0,f:3.0,c:15.0},
  "картофель жареный": {cal:192,p:2.8,f:9.5,c:23.4}, "картофель фри": {cal:312,p:3.4,f:15.0,c:41.0}, "сырники": {cal:220,p:14.0,f:10.0,c:18.0}, "блины": {cal:227,p:6.0,f:10.0,c:28.0}, "оладьи": {cal:230,p:6.0,f:9.0,c:32.0},
  "пицца маргарита": {cal:266,p:11.0,f:10.0,c:33.0}, "пицца пепперони": {cal:298,p:12.0,f:14.0,c:31.0}, "бургер": {cal:295,p:17.0,f:14.0,c:24.0}, "шаурма": {cal:210,p:11.0,f:10.0,c:20.0}, "хот-дог": {cal:290,p:10.0,f:17.0,c:24.0},
  "чай без сахара": {cal:1,p:0.0,f:0.0,c:0.0}, "кофе без сахара": {cal:2,p:0.1,f:0.0,c:0.0}, "капучино": {cal:45,p:2.5,f:2.0,c:4.5}, "латте": {cal:55,p:3.0,f:2.5,c:5.0}, "какао": {cal:77,p:3.5,f:2.3,c:10.0},
  "сок апельсиновый": {cal:45,p:0.7,f:0.2,c:10.4}, "сок яблочный": {cal:46,p:0.1,f:0.1,c:11.3}, "квас": {cal:27,p:0.2,f:0.0,c:5.2}, "компот": {cal:60,p:0.2,f:0.0,c:15.0}, "лимонад": {cal:40,p:0.0,f:0.0,c:10.0}
};

let items = [];
let selectedName = "";

function normalize(str){ return str.trim().toLowerCase().replace(/ё/g,"е"); }

// Загрузка сохранённых данных (с базовой валидацией, чтобы не ломаться на мусоре в localStorage).
function loadItems(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const parsed = JSON.parse(raw);
    if(!Array.isArray(parsed)) return;
    items = parsed.filter(it =>
      it && typeof it.name === "string" && foodDB[it.name] &&
      typeof it.grams === "number" && it.grams > 0 &&
      typeof it.calories === "number" && typeof it.protein === "number" &&
      typeof it.fat === "number" && typeof it.carbs === "number"
    );
  } catch(e) { items = []; }
}

function persistItems(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch(e) {}
}

function findExactProduct(input){
  const n = normalize(input);
  if(!n) return null;
  return Object.keys(foodDB).find(k => normalize(k) === n) || null;
}

function resolveProductKey(typed){
  const t = normalize(typed);
  if(selectedName && foodDB[selectedName] && normalize(selectedName) === t) return selectedName;
  return findExactProduct(typed);
}

// --- UI / обработчики (используются inline-атрибутами в index.html) ---

window.showSuggestions = function showSuggestions(){
  const input = normalize(document.getElementById("name").value);
  const box = document.getElementById("suggestions");
  const nf = document.getElementById("notfound");
  box.innerHTML = ""; nf.textContent = ""; selectedName = "";
  if(input.length < 1) return;

  const keys = Object.keys(foodDB);
  const matches = keys.filter(k => normalize(k).includes(input)).slice(0, 12);
  if(matches.length === 0){
    nf.textContent = "Пока нет в базе. Можно добавить этот продукт в foodDB в коде.";
    return;
  }

  matches.forEach(name => {
    const d = foodDB[name];
    const div = document.createElement("div");
    div.className = "suggestion";
    div.innerHTML = `<strong>${name}</strong><small>${d.cal} ккал · Б ${d.p} · Ж ${d.f} · У ${d.c} / 100 г</small>`;
    div.onclick = () => window.selectProduct(name);
    box.appendChild(div);
  });
};

window.selectProduct = function selectProduct(name){
  selectedName = name;
  document.getElementById("name").value = name;
  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("notfound").textContent = "";
  document.getElementById("grams").focus();
};

window.addItem = function addItem(){
  const nf = document.getElementById("notfound");
  const typed = document.getElementById("name").value;
  const grams = Number(document.getElementById("grams").value);
  nf.textContent = "";

  if(!grams || grams <= 0){
    nf.textContent = "Укажи количество граммов больше нуля.";
    return;
  }

  const key = resolveProductKey(typed);
  if(!key){
    nf.textContent = "Точного совпадения с базой нет. Начни вводить название и выбери продукт из подсказки или введи его точно, как в списке.";
    return;
  }

  const d = foodDB[key];
  const factor = grams / 100;
  items.push({
    name: key, grams,
    calories: Math.round(d.cal * factor),
    protein: +(d.p * factor).toFixed(1),
    fat: +(d.f * factor).toFixed(1),
    carbs: +(d.c * factor).toFixed(1)
  });

  document.getElementById("name").value = "";
  document.getElementById("grams").value = "";
  selectedName = "";
  document.getElementById("suggestions").innerHTML = "";
  nf.textContent = "";
  render();
};

window.deleteItem = function deleteItem(i){ items.splice(i, 1); render(); };

window.clearAll = function clearAll(){
  if(!confirm("Очистить весь список? Данные будут удалены из сохранения.")) return;
  items = [];
  render();
};

window.handleEnter = function handleEnter(e){ if(e.key === "Enter") window.addItem(); };

function render(){
  const list = document.getElementById("list");
  list.innerHTML = "";

  let tc = 0, tp = 0, tf = 0, tcar = 0;
  items.forEach((it, i) => {
    tc += it.calories; tp += it.protein; tf += it.fat; tcar += it.carbs;
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<div><b>${it.name}</b> — ${it.grams} г<div class="meta">${it.calories} ккал · Белки ${it.protein} г · Жиры ${it.fat} г · Углеводы ${it.carbs} г</div></div><button type="button" class="delete" onclick="deleteItem(${i})" title="Удалить" aria-label="Удалить из списка">✕</button>`;
    list.appendChild(div);
  });

  if(items.length === 0){
    list.innerHTML = "<div class=\"empty\">Пока ничего не добавлено. Начни с огурца — он парень скромный, но полезный.</div>";
  }

  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("totalCalories").textContent = Math.round(tc);
  document.getElementById("totalProtein").textContent = tp.toFixed(1) + " г";
  document.getElementById("totalFat").textContent = tf.toFixed(1) + " г";
  document.getElementById("totalCarbs").textContent = tcar.toFixed(1) + " г";

  // Сохраняем текущее состояние после любого изменения списка.
  persistItems();
}

// Старт приложения.
loadItems();
render();

=======
// Счётчик калорий — логика приложения.
// Важно: функции объявлены в глобальной области (window.*), потому что в HTML используются inline-обработчики (onclick/oninput/onkeydown).

const STORAGE_KEY = "calorie_counter_items_v1";

// Мини-база продуктов (значения на 100 г).
// Формат: { cal: ккал, p: белки, f: жиры, c: углеводы }
const foodDB = {
  "огурец": {cal:15,p:0.8,f:0.1,c:3.0}, "помидор": {cal:20,p:1.0,f:0.2,c:4.0}, "томаты": {cal:20,p:1.0,f:0.2,c:4.0}, "картофель": {cal:77,p:2.0,f:0.1,c:17.0}, "морковь": {cal:41,p:0.9,f:0.2,c:9.6},
  "свекла": {cal:43,p:1.6,f:0.2,c:9.6}, "капуста белокочанная": {cal:27,p:1.8,f:0.1,c:6.0}, "капуста цветная": {cal:25,p:1.9,f:0.3,c:5.0}, "брокколи": {cal:34,p:2.8,f:0.4,c:6.6}, "кабачок": {cal:24,p:0.6,f:0.3,c:4.6},
  "баклажан": {cal:25,p:1.0,f:0.2,c:5.9}, "перец болгарский": {cal:27,p:1.0,f:0.2,c:6.0}, "лук репчатый": {cal:40,p:1.1,f:0.1,c:9.3}, "чеснок": {cal:149,p:6.4,f:0.5,c:33.1}, "редис": {cal:16,p:0.7,f:0.1,c:3.4},
  "тыква": {cal:26,p:1.0,f:0.1,c:6.5}, "салат листовой": {cal:15,p:1.4,f:0.2,c:2.9}, "шпинат": {cal:23,p:2.9,f:0.4,c:3.6}, "укроп": {cal:43,p:3.5,f:1.1,c:7.0}, "петрушка": {cal:36,p:3.0,f:0.8,c:6.3},
  "яблоко": {cal:52,p:0.3,f:0.2,c:14.0}, "банан": {cal:89,p:1.1,f:0.3,c:23.0}, "груша": {cal:57,p:0.4,f:0.1,c:15.0}, "апельсин": {cal:47,p:0.9,f:0.1,c:12.0}, "мандарин": {cal:53,p:0.8,f:0.3,c:13.3},
  "лимон": {cal:29,p:1.1,f:0.3,c:9.3}, "киви": {cal:61,p:1.1,f:0.5,c:15.0}, "виноград": {cal:69,p:0.7,f:0.2,c:18.0}, "арбуз": {cal:30,p:0.6,f:0.2,c:7.6}, "дыня": {cal:34,p:0.8,f:0.2,c:8.2},
  "персик": {cal:39,p:0.9,f:0.3,c:10.0}, "нектарин": {cal:44,p:1.1,f:0.3,c:11.0}, "слива": {cal:46,p:0.7,f:0.3,c:11.4}, "абрикос": {cal:48,p:1.4,f:0.4,c:11.1}, "гранат": {cal:83,p:1.7,f:1.2,c:18.7},
  "ананас": {cal:50,p:0.5,f:0.1,c:13.1}, "манго": {cal:60,p:0.8,f:0.4,c:15.0}, "хурма": {cal:67,p:0.5,f:0.4,c:15.3}, "клубника": {cal:32,p:0.7,f:0.3,c:7.7}, "малина": {cal:52,p:1.2,f:0.7,c:12.0},
  "черника": {cal:57,p:0.7,f:0.3,c:14.5}, "смородина": {cal:63,p:1.4,f:0.4,c:15.4}, "вишня": {cal:50,p:1.0,f:0.3,c:12.2}, "черешня": {cal:63,p:1.1,f:0.2,c:16.0}, "клюква": {cal:46,p:0.4,f:0.1,c:12.2},
  "изюм": {cal:299,p:3.1,f:0.5,c:79.2}, "курага": {cal:241,p:3.4,f:0.5,c:63.0}, "чернослив": {cal:240,p:2.2,f:0.4,c:64.0}, "финики": {cal:282,p:2.5,f:0.4,c:75.0}, "инжир сушеный": {cal:249,p:3.3,f:0.9,c:64.0},
  "хлеб белый": {cal:265,p:8.0,f:3.2,c:49.0}, "хлеб ржаной": {cal:210,p:6.6,f:1.2,c:43.0}, "хлеб цельнозерновой": {cal:247,p:13.0,f:4.2,c:41.0}, "батон": {cal:263,p:7.5,f:2.9,c:51.0}, "лаваш": {cal:275,p:9.1,f:1.2,c:56.0},
  "сухари": {cal:350,p:11.0,f:1.5,c:73.0}, "галеты": {cal:393,p:9.7,f:10.2,c:65.0}, "баранки": {cal:336,p:10.0,f:1.3,c:69.0}, "булочка": {cal:310,p:8.0,f:6.0,c:56.0}, "круассан": {cal:406,p:8.2,f:21.0,c:45.0},
  "мука пшеничная": {cal:364,p:10.3,f:1.0,c:76.0}, "мука ржаная": {cal:325,p:9.0,f:1.7,c:68.0}, "овсяные хлопья": {cal:366,p:11.9,f:7.2,c:69.0}, "гречка вареная": {cal:110,p:3.6,f:1.1,c:21.0}, "гречка сухая": {cal:343,p:13.3,f:3.4,c:72.0},
  "рис вареный": {cal:130,p:2.7,f:0.3,c:28.0}, "рис сухой": {cal:365,p:7.1,f:0.7,c:80.0}, "макароны вареные": {cal:131,p:5.0,f:1.1,c:25.0}, "макароны сухие": {cal:350,p:12.0,f:1.5,c:72.0}, "перловка вареная": {cal:109,p:3.1,f:0.4,c:22.0},
  "пшено вареное": {cal:119,p:3.5,f:1.0,c:23.7}, "булгур вареный": {cal:83,p:3.1,f:0.2,c:18.6}, "киноа вареная": {cal:120,p:4.4,f:1.9,c:21.3}, "манка вареная": {cal:80,p:2.5,f:0.2,c:16.8}, "кукурузная каша": {cal:86,p:2.3,f:0.3,c:19.0},
  "молоко 2.5%": {cal:52,p:2.8,f:2.5,c:4.7}, "молоко 3.2%": {cal:60,p:3.0,f:3.2,c:4.7}, "кефир 1%": {cal:40,p:3.0,f:1.0,c:4.0}, "кефир 2.5%": {cal:53,p:3.0,f:2.5,c:4.0}, "ряженка": {cal:67,p:2.8,f:4.0,c:4.2},
  "йогурт натуральный": {cal:61,p:3.5,f:3.3,c:4.7}, "творог 5%": {cal:121,p:17.0,f:5.0,c:2.0}, "творог 9%": {cal:159,p:16.7,f:9.0,c:2.0}, "сметана 10%": {cal:119,p:2.7,f:10.0,c:3.9}, "сметана 20%": {cal:206,p:2.5,f:20.0,c:3.4},
  "сыр российский": {cal:363,p:24.0,f:29.5,c:0.3}, "сыр гауда": {cal:356,p:25.0,f:27.0,c:2.2}, "сыр моцарелла": {cal:280,p:28.0,f:17.0,c:3.1}, "сыр фета": {cal:264,p:14.0,f:21.0,c:4.1}, "сыр плавленый": {cal:257,p:16.8,f:19.0,c:3.5},
  "масло сливочное": {cal:748,p:0.5,f:82.5,c:0.8}, "сливки 10%": {cal:118,p:3.0,f:10.0,c:4.0}, "сливки 20%": {cal:206,p:2.8,f:20.0,c:3.7}, "мороженое пломбир": {cal:232,p:3.7,f:15.0,c:20.4}, "сгущенка": {cal:321,p:7.2,f:8.5,c:56.0},
  "яйцо куриное": {cal:155,p:13.0,f:11.0,c:1.1}, "белок яйца": {cal:52,p:10.9,f:0.2,c:0.7}, "желток яйца": {cal:322,p:15.9,f:26.5,c:3.6}, "омлет": {cal:154,p:10.6,f:11.0,c:2.0}, "яичница": {cal:196,p:13.6,f:15.3,c:0.8},
  "куриная грудка": {cal:165,p:31.0,f:3.6,c:0.0}, "куриное бедро": {cal:209,p:26.0,f:10.9,c:0.0}, "курица вареная": {cal:170,p:25.0,f:7.0,c:0.0}, "индейка": {cal:135,p:29.0,f:1.0,c:0.0}, "говядина": {cal:250,p:26.0,f:15.0,c:0.0},
  "телятина": {cal:172,p:24.0,f:8.0,c:0.0}, "свинина": {cal:297,p:25.7,f:20.8,c:0.0}, "баранина": {cal:294,p:25.0,f:21.0,c:0.0}, "фарш говяжий": {cal:254,p:17.2,f:20.0,c:0.0}, "фарш куриный": {cal:143,p:17.4,f:8.1,c:0.0},
  "печень куриная": {cal:137,p:20.4,f:5.9,c:0.7}, "печень говяжья": {cal:135,p:20.0,f:3.6,c:4.0}, "ветчина": {cal:145,p:21.0,f:6.0,c:1.0}, "колбаса вареная": {cal:257,p:12.8,f:22.2,c:1.5}, "колбаса копченая": {cal:507,p:24.0,f:45.0,c:0.5},
  "сосиски": {cal:266,p:11.0,f:23.9,c:1.6}, "сардельки": {cal:332,p:10.0,f:31.0,c:1.5}, "бекон": {cal:541,p:37.0,f:42.0,c:1.4}, "сало": {cal:797,p:2.4,f:89.0,c:0.0}, "паштет": {cal:319,p:11.0,f:28.0,c:3.0},
  "лосось": {cal:208,p:20.0,f:13.0,c:0.0}, "семга": {cal:208,p:20.0,f:13.0,c:0.0}, "форель": {cal:148,p:20.8,f:6.6,c:0.0}, "тунец": {cal:132,p:28.0,f:1.3,c:0.0}, "треска": {cal:82,p:18.0,f:0.7,c:0.0},
  "минтай": {cal:72,p:16.0,f:0.9,c:0.0}, "хек": {cal:86,p:16.6,f:2.2,c:0.0}, "скумбрия": {cal:205,p:19.0,f:14.0,c:0.0}, "сельдь": {cal:217,p:19.8,f:15.4,c:0.0}, "сардина": {cal:208,p:25.0,f:11.0,c:0.0},
  "креветки": {cal:99,p:24.0,f:0.3,c:0.2}, "кальмар": {cal:92,p:15.6,f:1.4,c:3.1}, "мидии": {cal:86,p:12.0,f:2.2,c:3.7}, "икра красная": {cal:250,p:31.0,f:13.0,c:1.0}, "крабовые палочки": {cal:95,p:7.0,f:1.0,c:15.0},
  "фасоль вареная": {cal:127,p:8.7,f:0.5,c:22.8}, "горох вареный": {cal:118,p:8.3,f:0.4,c:21.1}, "чечевица вареная": {cal:116,p:9.0,f:0.4,c:20.0}, "нут вареный": {cal:164,p:8.9,f:2.6,c:27.4}, "кукуруза вареная": {cal:96,p:3.4,f:1.5,c:21.0},
  "зеленый горошек": {cal:81,p:5.4,f:0.4,c:14.5}, "фасоль стручковая": {cal:31,p:1.8,f:0.1,c:7.0}, "соевый сыр тофу": {cal:76,p:8.0,f:4.8,c:1.9}, "соевое молоко": {cal:54,p:3.3,f:1.8,c:6.3}, "хумус": {cal:166,p:7.9,f:9.6,c:14.3},
  "миндаль": {cal:579,p:21.0,f:50.0,c:22.0}, "грецкий орех": {cal:654,p:15.2,f:65.2,c:13.7}, "фундук": {cal:628,p:15.0,f:61.0,c:17.0}, "кешью": {cal:553,p:18.0,f:44.0,c:30.0}, "арахис": {cal:567,p:25.8,f:49.2,c:16.1},
  "фисташки": {cal:562,p:20.0,f:45.0,c:28.0}, "семечки подсолнечные": {cal:584,p:20.8,f:51.5,c:20.0}, "семена тыквы": {cal:559,p:30.2,f:49.0,c:10.7}, "семена льна": {cal:534,p:18.3,f:42.2,c:28.9}, "семена чиа": {cal:486,p:16.5,f:30.7,c:42.1},
  "масло оливковое": {cal:884,p:0.0,f:100.0,c:0.0}, "масло подсолнечное": {cal:884,p:0.0,f:100.0,c:0.0}, "масло кокосовое": {cal:862,p:0.0,f:100.0,c:0.0}, "майонез": {cal:680,p:1.0,f:75.0,c:2.6}, "кетчуп": {cal:112,p:1.7,f:0.2,c:25.8},
  "горчица": {cal:66,p:4.4,f:4.0,c:5.0}, "соевый соус": {cal:53,p:8.1,f:0.6,c:4.9}, "мед": {cal:304,p:0.3,f:0.0,c:82.4}, "сахар": {cal:387,p:0.0,f:0.0,c:100.0}, "варенье": {cal:260,p:0.3,f:0.1,c:68.0},
  "шоколад молочный": {cal:535,p:7.7,f:30.0,c:59.0}, "шоколад темный": {cal:546,p:4.9,f:31.0,c:61.0}, "печенье": {cal:450,p:7.0,f:18.0,c:66.0}, "вафли": {cal:520,p:5.5,f:30.0,c:60.0}, "зефир": {cal:326,p:0.8,f:0.1,c:79.8},
  "мармелад": {cal:321,p:0.1,f:0.0,c:79.4}, "халва": {cal:516,p:12.7,f:29.9,c:50.6}, "торт бисквитный": {cal:350,p:5.0,f:15.0,c:50.0}, "пирожное": {cal:400,p:5.0,f:22.0,c:47.0}, "мюсли": {cal:340,p:9.0,f:5.0,c:66.0},
  "борщ": {cal:57,p:3.8,f:2.9,c:4.3}, "щи": {cal:35,p:2.0,f:1.5,c:4.0}, "суп куриный": {cal:45,p:4.0,f:2.0,c:3.0}, "суп гороховый": {cal:66,p:4.4,f:2.4,c:8.9}, "окрошка": {cal:60,p:3.5,f:3.0,c:5.0},
  "плов": {cal:180,p:6.0,f:7.0,c:24.0}, "гречка с курицей": {cal:135,p:9.0,f:3.5,c:17.0}, "макароны с сыром": {cal:220,p:8.0,f:9.0,c:27.0}, "пельмени": {cal:275,p:11.0,f:13.0,c:29.0}, "вареники с картошкой": {cal:185,p:5.0,f:3.0,c:35.0},
  "котлета куриная": {cal:190,p:17.0,f:10.0,c:8.0}, "котлета мясная": {cal:240,p:15.0,f:17.0,c:8.0}, "голубцы": {cal:143,p:7.0,f:8.0,c:11.0}, "тефтели": {cal:220,p:12.0,f:14.0,c:10.0}, "омлет с сыром": {cal:210,p:14.0,f:16.0,c:2.0},
  "салат оливье": {cal:198,p:5.0,f:16.0,c:8.0}, "салат винегрет": {cal:130,p:2.0,f:8.0,c:14.0}, "салат цезарь": {cal:190,p:9.0,f:14.0,c:7.0}, "салат греческий": {cal:120,p:4.0,f:9.0,c:6.0}, "пюре картофельное": {cal:90,p:2.0,f:3.0,c:15.0},
  "картофель жареный": {cal:192,p:2.8,f:9.5,c:23.4}, "картофель фри": {cal:312,p:3.4,f:15.0,c:41.0}, "сырники": {cal:220,p:14.0,f:10.0,c:18.0}, "блины": {cal:227,p:6.0,f:10.0,c:28.0}, "оладьи": {cal:230,p:6.0,f:9.0,c:32.0},
  "пицца маргарита": {cal:266,p:11.0,f:10.0,c:33.0}, "пицца пепперони": {cal:298,p:12.0,f:14.0,c:31.0}, "бургер": {cal:295,p:17.0,f:14.0,c:24.0}, "шаурма": {cal:210,p:11.0,f:10.0,c:20.0}, "хот-дог": {cal:290,p:10.0,f:17.0,c:24.0},
  "чай без сахара": {cal:1,p:0.0,f:0.0,c:0.0}, "кофе без сахара": {cal:2,p:0.1,f:0.0,c:0.0}, "капучино": {cal:45,p:2.5,f:2.0,c:4.5}, "латте": {cal:55,p:3.0,f:2.5,c:5.0}, "какао": {cal:77,p:3.5,f:2.3,c:10.0},
  "сок апельсиновый": {cal:45,p:0.7,f:0.2,c:10.4}, "сок яблочный": {cal:46,p:0.1,f:0.1,c:11.3}, "квас": {cal:27,p:0.2,f:0.0,c:5.2}, "компот": {cal:60,p:0.2,f:0.0,c:15.0}, "лимонад": {cal:40,p:0.0,f:0.0,c:10.0}
};

let items = [];
let selectedName = "";

function normalize(str){ return str.trim().toLowerCase().replace(/ё/g,"е"); }

// Загрузка сохранённых данных (с базовой валидацией, чтобы не ломаться на мусоре в localStorage).
function loadItems(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const parsed = JSON.parse(raw);
    if(!Array.isArray(parsed)) return;
    items = parsed.filter(it =>
      it && typeof it.name === "string" && foodDB[it.name] &&
      typeof it.grams === "number" && it.grams > 0 &&
      typeof it.calories === "number" && typeof it.protein === "number" &&
      typeof it.fat === "number" && typeof it.carbs === "number"
    );
  } catch(e) { items = []; }
}

function persistItems(){
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch(e) {}
}

function findExactProduct(input){
  const n = normalize(input);
  if(!n) return null;
  return Object.keys(foodDB).find(k => normalize(k) === n) || null;
}

function resolveProductKey(typed){
  const t = normalize(typed);
  if(selectedName && foodDB[selectedName] && normalize(selectedName) === t) return selectedName;
  return findExactProduct(typed);
}

// --- UI / обработчики (используются inline-атрибутами в index.html) ---

window.showSuggestions = function showSuggestions(){
  const input = normalize(document.getElementById("name").value);
  const box = document.getElementById("suggestions");
  const nf = document.getElementById("notfound");
  box.innerHTML = ""; nf.textContent = ""; selectedName = "";
  if(input.length < 1) return;

  const keys = Object.keys(foodDB);
  const matches = keys.filter(k => normalize(k).includes(input)).slice(0, 12);
  if(matches.length === 0){
    nf.textContent = "Пока нет в базе. Можно добавить этот продукт в foodDB в коде.";
    return;
  }

  matches.forEach(name => {
    const d = foodDB[name];
    const div = document.createElement("div");
    div.className = "suggestion";
    div.innerHTML = `<strong>${name}</strong><small>${d.cal} ккал · Б ${d.p} · Ж ${d.f} · У ${d.c} / 100 г</small>`;
    div.onclick = () => window.selectProduct(name);
    box.appendChild(div);
  });
};

window.selectProduct = function selectProduct(name){
  selectedName = name;
  document.getElementById("name").value = name;
  document.getElementById("suggestions").innerHTML = "";
  document.getElementById("notfound").textContent = "";
  document.getElementById("grams").focus();
};

window.addItem = function addItem(){
  const nf = document.getElementById("notfound");
  const typed = document.getElementById("name").value;
  const grams = Number(document.getElementById("grams").value);
  nf.textContent = "";

  if(!grams || grams <= 0){
    nf.textContent = "Укажи количество граммов больше нуля.";
    return;
  }

  const key = resolveProductKey(typed);
  if(!key){
    nf.textContent = "Точного совпадения с базой нет. Начни вводить название и выбери продукт из подсказки или введи его точно, как в списке.";
    return;
  }

  const d = foodDB[key];
  const factor = grams / 100;
  items.push({
    name: key, grams,
    calories: Math.round(d.cal * factor),
    protein: +(d.p * factor).toFixed(1),
    fat: +(d.f * factor).toFixed(1),
    carbs: +(d.c * factor).toFixed(1)
  });

  document.getElementById("name").value = "";
  document.getElementById("grams").value = "";
  selectedName = "";
  document.getElementById("suggestions").innerHTML = "";
  nf.textContent = "";
  render();
};

window.deleteItem = function deleteItem(i){ items.splice(i, 1); render(); };

window.clearAll = function clearAll(){
  if(!confirm("Очистить весь список? Данные будут удалены из сохранения.")) return;
  items = [];
  render();
};

window.handleEnter = function handleEnter(e){ if(e.key === "Enter") window.addItem(); };

function render(){
  const list = document.getElementById("list");
  list.innerHTML = "";

  let tc = 0, tp = 0, tf = 0, tcar = 0;
  items.forEach((it, i) => {
    tc += it.calories; tp += it.protein; tf += it.fat; tcar += it.carbs;
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<div><b>${it.name}</b> — ${it.grams} г<div class="meta">${it.calories} ккал · Белки ${it.protein} г · Жиры ${it.fat} г · Углеводы ${it.carbs} г</div></div><button type="button" class="delete" onclick="deleteItem(${i})" title="Удалить" aria-label="Удалить из списка">✕</button>`;
    list.appendChild(div);
  });

  if(items.length === 0){
    list.innerHTML = "<div class=\"empty\">Пока ничего не добавлено. Начни с огурца — он парень скромный, но полезный.</div>";
  }

  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("totalCalories").textContent = Math.round(tc);
  document.getElementById("totalProtein").textContent = tp.toFixed(1) + " г";
  document.getElementById("totalFat").textContent = tf.toFixed(1) + " г";
  document.getElementById("totalCarbs").textContent = tcar.toFixed(1) + " г";

  // Сохраняем текущее состояние после любого изменения списка.
  persistItems();
}

// Старт приложения.
loadItems();
render();

>>>>>>> 8b845e621dcb75626d9986666da5f0221e8b0524
