import { ProceduralShapeType } from "../services/WordPhysicsPredictor";

const OUTLINE = "#0f172a";

/**
 * High-Craft 2D Vector Sticker Artist ("Sticker Lab Ver 3.0").
 * Draws expressive, multi-layered cartoon illustrations with shading, specular highlights,
 * and distinctive anatomical/structural details for every animal and object, while preserving
 * a single connected silhouette for accurate Matter.js concave polygon extraction.
 */
export class ProceduralStickerArtist {
  static render(
    shapeType: ProceduralShapeType,
    word: string,
    accentColor: string
  ): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 190;
    const ctx = canvas.getContext("2d")!;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    const w = word.trim().toLowerCase();

    // 1. Check word-specific bespoke sub-variants first so each animal/item
    // within a physics category gets its own unmistakable visual design!
    if (this.renderWordSpecificVariant(ctx, w)) {
      return canvas;
    }

    // 2. Render primary shapeType with rich multi-layered details
    switch (shapeType) {
      case "preset_elephant":
        this.drawElephant(ctx);
        break;
      case "giraffe":
        this.drawGiraffe(ctx);
        break;
      case "whale":
        this.drawWhale(ctx);
        break;
      case "turtle":
        this.drawTurtle(ctx);
        break;
      case "snake":
        this.drawSnake(ctx);
        break;
      case "cat":
        this.drawCat(ctx);
        break;
      case "bird":
        this.drawBird(ctx);
        break;
      case "octopus":
        this.drawOctopus(ctx);
        break;
      case "preset_car":
        this.drawCar(ctx, "sedan");
        break;
      case "bus":
        this.drawBus(ctx);
        break;
      case "preset_airplane":
        this.drawAirplane(ctx);
        break;
      case "helicopter":
        this.drawHelicopter(ctx);
        break;
      case "ufo":
        this.drawUfo(ctx);
        break;
      case "boat":
        this.drawBoat(ctx);
        break;
      case "bicycle":
        this.drawBicycle(ctx);
        break;
      case "tank":
        this.drawTank(ctx);
        break;
      case "rocket":
        this.drawRocket(ctx);
        break;
      case "stairs":
        this.drawStairs(ctx);
        break;
      case "chair":
        this.drawChair(ctx);
        break;
      case "table":
        this.drawTable(ctx);
        break;
      case "sofa":
        this.drawSofa(ctx);
        break;
      case "house":
        this.drawHouse(ctx);
        break;
      case "ladder":
        this.drawLadder(ctx);
        break;
      case "plank":
        this.drawPlank(ctx);
        break;
      case "door":
        this.drawDoor(ctx);
        break;
      case "bathtub":
        this.drawBathtub(ctx);
        break;
      case "tv":
        this.drawTv(ctx);
        break;
      case "anvil":
        this.drawAnvil(ctx);
        break;
      case "dumbbell":
        this.drawDumbbell(ctx);
        break;
      case "hammer":
        this.drawHammer(ctx);
        break;
      case "sword":
        this.drawSword(ctx);
        break;
      case "bomb":
        this.drawBomb(ctx);
        break;
      case "spring":
        this.drawSpring(ctx);
        break;
      case "trampoline":
        this.drawTrampoline(ctx);
        break;
      case "magnet":
        this.drawMagnet(ctx);
        break;
      case "spiderweb":
        this.drawSpiderweb(ctx);
        break;
      case "umbrella":
        this.drawUmbrella(ctx);
        break;
      case "shield":
        this.drawShield(ctx);
        break;
      case "preset_hamburger":
        this.drawHamburger(ctx);
        break;
      case "preset_apple":
        this.drawApple(ctx);
        break;
      case "preset_banana":
        this.drawBanana(ctx);
        break;
      case "watermelon":
        this.drawWatermelon(ctx);
        break;
      case "pizza":
        this.drawPizza(ctx);
        break;
      case "donut":
        this.drawDonut(ctx);
        break;
      case "baguette":
        this.drawBaguette(ctx);
        break;
      case "jelly":
        this.drawJelly(ctx);
        break;
      case "icecream":
        this.drawIceCream(ctx);
        break;
      case "cake":
        this.drawCake(ctx);
        break;
      case "boulder":
        this.drawBoulder(ctx);
        break;
      case "cloud":
        this.drawCloud(ctx);
        break;
      case "balloon":
        this.drawBalloon(ctx);
        break;
      case "ice_block":
        this.drawIceBlock(ctx);
        break;
      case "snowman":
        this.drawSnowman(ctx);
        break;
      case "tree":
        this.drawTree(ctx);
        break;
      case "star":
        this.drawStar(ctx);
        break;
      case "ball":
        this.drawBall(ctx, "beach");
        break;
      case "book":
        this.drawBook(ctx);
        break;
      case "custom_sticker":
      default:
        this.drawCrate(ctx, word, accentColor);
        break;
    }

    return canvas;
  }

  // ===========================================================================
  // BESPOKE WORD-SPECIFIC SUB-VARIANTS
  // ===========================================================================
  private static renderWordSpecificVariant(
    ctx: CanvasRenderingContext2D,
    w: string
  ): boolean {
    // -------------------------------------------------------------------------
    // NEW BESPOKE ILLUSTRATIONS (32 methods / 44 visual sub-variants)
    // -------------------------------------------------------------------------
    if (["점", "작은점", "까만점", "도트", "픽셀", "먹물방울", "잉크방울", "바둑돌", "흑돌", "백돌", "공기돌", "공깃돌", "단추", "징", "압정", "구슬알", "알", "dot", "spot", "speck", "pixel", "button", "gostone"].includes(w)) {
      this.drawMarbleDot(ctx, "dot");
      return true;
    }
    if (["구슬", "쇠구슬", "유리구슬", "비비탄", "베어링볼", "옥구슬", "진주알", "구슬치기", "비즈", "타피오카", "펄", "눈알사탕", "marble", "glassmarble", "steelball", "bbpellet", "pearl", "bead"].includes(w)) {
      this.drawMarbleDot(ctx, "marble");
      return true;
    }
    if (["콩", "완두콩", "강낭콩", "검은콩", "서리태", "메주콩", "병아리콩", "렌틸콩", "땅콩알", "원두", "커피콩", "카카오빈", "씨앗", "해바라기씨", "호박씨", "수박씨", "사과씨", "볍씨", "옥수수알", "석류알", "도토리", "알밤", "은행", "은행알", "잣", "피스타치오", "아몬드알", "헤이즐넛", "마카다미아", "bean", "pea", "greenpea", "seed", "coffeebean", "acorn"].includes(w)) {
      this.drawMarbleDot(ctx, "bean");
      return true;
    }
    if (["조약돌", "자갈", "돌멩이", "차돌", "작은돌", "부싯돌", "모래알", "석탄알", "짱돌", "수석", "몽돌", "옥돌", "pebble", "cobble", "gravel", "smallstone"].includes(w)) {
      this.drawMarbleDot(ctx, "pebble");
      return true;
    }
    if (["알약", "캡슐", "비타민", "영양제", "유산균", "오메가3", "타이레놀", "아스피린", "감기약", "소화제", "두통약", "수면제", "만병통치약", "선두", "단약", "환약", "우황청심환", "공진단", "젤리빈", "pill", "capsule", "tablet", "vitamin"].includes(w)) {
      this.drawMarbleDot(ctx, "pill");
      return true;
    }
    if (["용", "드래곤", "이무기", "청룡", "화룡", "흑룡", "황룡", "와이번", "신룡", "골드드래곤", "레드드래곤", "투슬리스", "바하무트", "티아마트", "용왕", "dragon", "wyvern", "shenron"].includes(w)) {
      this.drawDragon(ctx);
      return true;
    }
    if (["다람쥐", "청설모", "하늘다람쥐", "날다람쥐", "칩멍크", "프레리도그", "마멋", "다람이", "집다람쥐", "줄무늬다람쥐", "squirrel", "chipmunk", "flyingsquirrel"].includes(w)) {
      this.drawSquirrel(ctx);
      return true;
    }
    if (["햄스터", "골든햄스터", "정글리안", "로보로브스키", "기니피그", "카피바라", "친칠라", "데구", "저빌", "쥐", "생쥐", "흰쥐", "실험쥐", "들쥐", "미어캣", "수달", "해달", "비버", "족제비", "담비", "오소리", "페럿", "두더지", "오리너구리", "주머니쥐", "레밍", "햄토리", "라따뚜이", "제리", "찍찍이", "hamster", "guineapig", "capybara", "chinchilla", "mouse", "rat", "ferret", "otter", "beaver", "meerkat", "mole"].includes(w)) {
      this.drawHamster(ctx);
      return true;
    }
    if (["고슴도치", "아르마딜로", "호저", "산미치광이", "가시두더지", "에키드나", "천산갑", "소닉", "도치", "바늘두더지", "hedgehog", "porcupine", "armadillo", "echidna", "pangolin"].includes(w)) {
      this.drawHedgehog(ctx);
      return true;
    }
    if (["독수리", "참수리", "흰머리수리", "검독수리", "대머리독수리", "콘도르", "매", "송골매", "참매", "솔개", "말똥가리", "조롱이", "새매", "하피이글", "불사조", "피닉스", "그리핀", "그리폰", "익룡", "프테라노돈", "시조새", "eagle", "hawk", "falcon", "condor", "vulture", "phoenix", "griffin", "pterodactyl"].includes(w)) {
      this.drawEagle(ctx);
      return true;
    }
    if (["플라밍고", "홍학", "학", "두루미", "황새", "백로", "왜가리", "저어새", "따오기", "고니", "펠리컨", "사다새", "타조", "에뮤", "화식조", "키위새", "공작", "공작새", "극락조", "기러기", "청둥오리", "물총새", "해오라기", "flamingo", "crane", "heron", "stork", "pelican", "ostrich", "peacock"].includes(w)) {
      this.drawFlamingo(ctx);
      return true;
    }
    if (["앵무새", "마카우", "금강앵무", "유황앵무", "코카투", "왕관앵무", "사랑앵무", "잉꼬", "카나리아", "십자매", "문조", "구관조", "큰부리새", "토코투칸", "투칸", "딱따구리", "뻐꾸기", "꾀꼬리", "파랑새", "벌새", "직박구리", "제비", "참새", "비둘기", "까치", "까마귀", "갈매기", "퍼핀", "메추라기", "꿩", "parrot", "macaw", "cockatoo", "toucan", "woodpecker", "canary", "sparrow", "pigeon", "seagull", "crow", "magpie", "swallow", "hummingbird"].includes(w)) {
      this.drawParrot(ctx);
      return true;
    }
    if (["새우", "대하", "왕새우", "흰다리새우", "블랙타이거", "독도새우", "꽃새우", "딱새우", "보리새우", "칵테일새우", "깐새우", "생새우", "구운새우", "대하구이", "감바스", "바닷가재", "랍스터", "랍스타", "가재", "민물가재", "크릴새우", "갯가재", "산호새우", "shrimp", "prawn", "lobster", "crayfish", "krill", "scampi"].includes(w)) {
      this.drawShrimp(ctx);
      return true;
    }
    if (["오징어", "갑오징어", "한치", "화살오징어", "대왕오징어", "총알오징어", "산오징어", "마른오징어", "버터구이오징어", "오징어숙회", "낙지", "산낙지", "세발낙지", "쭈꾸미", "주꾸미", "꼴뚜기", "호래기", "크라켄", "앵무조개", "암모나이트", "해삼", "멍게", "개불", "미더덕", "squid", "cuttlefish", "calamari", "kraken", "nautilus", "ammonite"].includes(w)) {
      this.drawSquid(ctx);
      return true;
    }
    if (["성", "궁전", "왕궁", "성곽", "요새", "성채", "신데렐라성", "마법성", "중세성", "경복궁", "창덕궁", "덕수궁", "수원화성", "광화문", "숭례문", "남대문", "동대문", "첨성대", "다보탑", "석가탑", "에펠탑", "피사의사탑", "콜로세움", "만리장성", "타지마할", "오페라하우스", "빅벤", "국회의사당", "백악관", "청와대", "신전", "성당", "교회", "절", "사찰", "대웅전", "한옥", "기와집", "종탑", "감시탑", "등대", "타워", "전망대", "성문", "성벽", "파르테논", "castle", "palace", "fortress", "citadel", "tower", "cathedral", "temple", "pagoda", "lighthouse"].includes(w)) {
      this.drawCastle(ctx);
      return true;
    }
    if (["텐트", "캠핑텐트", "천막", "돔텐트", "인디언텐트", "티피", "유르트", "게르", "몽골텐트", "타프", "그늘막", "비박텐트", "모기장", "군용텐트", "막사", "이글루", "오두막", "움막", "초가집", "원두막", "정자", "파고라", "비닐하우스", "온실", "개집", "새장", "해먹", "침낭", "글램핑", "tent", "camp", "campingtent", "teepee", "igloo", "yurt", "hut", "cabin", "doghouse"].includes(w)) {
      this.drawTent(ctx);
      return true;
    }
    if (["피라미드", "대피라미드", "기자피라미드", "이집트피라미드", "스핑크스", "마야피라미드", "지구라트", "오벨리스크", "고인돌", "사막유적", "파라오", "클레오파트라", "투탕카멘", "미라관", "트라이포스", "프리즘", "사면체", "삼각뿔", "모래성", "모래산", "개미집", "봉분", "고분", "능", "천마총", "불국사", "석굴암", "유적", "유적지", "바벨탑", "비석", "스톤헨지", "모아이", "모아이석상", "아틀란티스", "pyramid", "sphinx", "ziggurat", "obelisk", "sandcastle", "prism", "stonehenge", "ruins"].includes(w)) {
      this.drawPyramid(ctx);
      return true;
    }
    if (["옷", "티셔츠", "반팔티", "긴팔티", "후드티", "맨투맨", "스웨터", "니트", "가디건", "셔츠", "와이셔츠", "남방", "블라우스", "조끼", "패딩", "롱패딩", "숏패딩", "코트", "트렌치코트", "자켓", "재킷", "가죽자켓", "점퍼", "바람막이", "유니폼", "축구유니폼", "야구유니폼", "교복", "체육복", "운동복", "트레이닝복", "츄리닝", "정장", "수트", "턱시도", "드레스", "웨딩드레스", "원피스", "치마", "스커트", "바지", "청바지", "반바지", "멜빵바지", "레깅스", "한복", "기모노", "차이나드레스", "잠옷", "파자마", "수영복", "비키니", "래쉬가드", "우비", "판초", "판초우의", "앞치마", "망토", "갑옷", "전투복", "군복", "경찰복", "소방복", "우주복", "잠수복", "도복", "태권도복", "유도복", "조리복", "의사가운", "실험복", "가운", "목도리", "머플러", "스카프", "넥타이", "벨트", "허리띠", "속옷", "팬티", "런닝셔츠", "빨래", "세탁물", "헌옷", "shirt", "tshirt", "t-shirt", "hoodie", "sweater", "jacket", "coat", "dress", "uniform", "armor", "hanbok", "clothes", "clothing", "jeans", "pants"].includes(w)) {
      this.drawTshirt(ctx);
      return true;
    }
    if (["가방", "책가방", "배낭", "백팩", "등산가방", "여행가방", "캐리어", "트렁크가방", "보스턴백", "더플백", "크로스백", "메신저백", "에코백", "토트백", "숄더백", "핸드백", "명품가방", "클러치백", "서류가방", "브리프케이스", "노트북가방", "신발주머니", "실내화가방", "도시락가방", "보냉백", "장바구니", "비닐봉지", "종이가방", "쇼핑백", "마대자루", "보따리", "괴나리봇짐", "복주머니", "주머니", "파우치", "필통", "화장품파우치", "지갑", "동전지갑", "카드지갑", "머니클립", "힙색", "벨트백", "란도셀", "군장", "구급가방", "배달가방", "우체부가방", "산타주머니", "선물보따리", "모래주머니", "침낭가방", "악기가방", "골프백", "backpack", "bag", "schoolbag", "rucksack", "suitcase", "luggage", "handbag", "purse", "briefcase", "pouch", "wallet", "pencilcase", "totebag"].includes(w)) {
      this.drawBackpack(ctx);
      return true;
    }
    if (["해바라기", "꽃", "노란꽃", "국화", "코스모스", "민들레", "데이지", "개나리", "유채꽃", "민들레꽃", "해바라기꽃", "무궁화", "나팔꽃", "진달래", "철쭉", "동백꽃", "목련", "매화", "수선화", "수국", "아카시아", "라일락", "프리지아", "할미꽃", "안개꽃", "봉선화", "달맞이꽃", "제비꽃", "팬지", "히아신스", "라벤더", "캐모마일", "쟈스민", "연꽃", "수련", "무궁화꽃", "화환", "꽃송이", "야생화", "들꽃", "봄꽃", "조화", "생화", "말린꽃", "드라이플라워", "sunflower", "flower", "daisy", "dandelion", "cosmos", "chrysanthemum", "hibiscus", "lotus", "blossom"].includes(w)) {
      this.drawFlower(ctx, "sunflower");
      return true;
    }
    if (["장미", "빨간장미", "흑장미", "백장미", "장미꽃", "장미꽃다발", "카네이션", "모란", "작약", "양귀비", "꽃다발", "부케", "장미한송이", "사랑의꽃", "가시장미", "rose", "redrose", "carnation", "bouquet", "peony", "poppy"].includes(w)) {
      this.drawFlower(ctx, "rose");
      return true;
    }
    if (["튤립", "벚꽃", "꽃봉오리", "화분", "꽃화분", "식물화분", "난초", "튤립꽃", "백합", "창포", "붓꽃", "아이리스", "글라디올러스", "극락조화", "방울꽃", "초롱꽃", "은방울꽃", "히비스커스", "접시꽃", "동백", "다육이", "식물", "화초", "산세베리아", "몬스테라", "분재", "알로에", "tulip", "cherryblossom", "lily", "iris", "flowerpot", "orchid", "plant"].includes(w)) {
      this.drawFlower(ctx, "tulip");
      return true;
    }
    if (["네잎클로버", "클로버", "세잎클로버", "토끼풀", "새싹", "떡잎", "나뭇잎", "잎사귀", "단풍잎", "은행잎", "낙엽", "월계수잎", "연잎", "파초선", "종려나무잎", "허브", "민트잎", "바질", "캣닢", "쑥", "냉이", "달래", "고사리", "콩나물", "숙주나물", "시금치잎", "상추잎", "깻잎장", "잔디", "수풀", "덤불", "미역", "다시마", "인삼", "산삼", "clover", "fourleafclover", "shamrock", "sprout", "leaf", "mapleleaf", "herb", "mint"].includes(w)) {
      this.drawFlower(ctx, "clover");
      return true;
    }
    if (["해골", "스켈레톤", "두개골", "유골", "백골", "뼈다귀사람", "사신해골", "독극물", "해적기", "졸리로저", "해골바가지", "좀비", "구울", "미라", "언데드", "강시괴물", "프랑켄슈타인", "드라큘라", "뱀파이어", "늑대인간", "처키", "공룡두개골", "화석뼈", "화석", "공룡뼈", "skull", "skeleton", "zombie", "mummy", "undead", "vampire", "reaper", "jollyroger"].includes(w)) {
      this.drawSkull(ctx);
      return true;
    }
    if (["산타", "산타클로스", "산타할아버지", "마법사", "대마법사", "간달프", "덤블도어", "해리포터", "마녀", "왕", "임금님", "대왕", "세종대왕", "파라오왕", "여왕", "왕비", "공주", "왕자", "어린왕자", "기사", "성기사", "이순신", "장군", "병사", "군인", "병정", "호두까기인형", "닌자", "사무라이", "해적", "선장", "바이킹", "카우보이", "보안관", "탐정", "셜록홈즈", "요리사", "셰프", "의사", "간호사", "경찰관", "소방관", "판사", "선생님", "박사", "과학자", "화백", "화가", "가수", "아이돌", "광대", "피에로", "마술사", "도둑", "산적", "신부님", "수녀님", "스님", "도사", "전우치", "홍길동", "사람", "인간", "남자", "여자", "아기", "어린이", "소년", "소녀", "할아버지", "할머니", "아저씨", "아줌마", "선비", "양반", "사또", "목각인형", "피노키오", "인형", "마네킹", "동상", "조각상", "자유의여신상", "불상", "santa", "santaclaus", "wizard", "witch", "king", "queen", "princess", "prince", "knight", "ninja", "pirate", "chef", "doctor", "policeofficer", "firefighter", "human", "person", "baby", "clown"].includes(w)) {
      this.drawSanta(ctx);
      return true;
    }
    if (["외계인", "우주인", "우주비행사", "화성인", "이티", "그레이외계인", "에일리언", "프레데터", "도깨비", "고블린", "오크", "트롤", "오우거", "골렘", "거인", "사이클롭스", "미노타우로스", "가고일", "임프", "악마", "마왕", "사탄", "루시퍼", "천사", "수호천사", "큐피드", "요정", "팅커벨", "엘프", "드워프", "노움", "스머프", "정령", "인어", "인어공주", "포세이돈", "켄타우로스", "외계생물", "뮤턴트", "괴수", "카이주", "고질라", "킹콩", "예티", "설인", "빅풋", "네시", "만드라고라", "돌하르방", "장승", "토템", "부두인형", "허수아비", "병마용", "alien", "astronaut", "spaceman", "martian", "goblin", "orc", "troll", "golem", "giant", "demon", "angel", "fairy", "elf", "mermaid", "yeti", "kaiju", "scarecrow"].includes(w)) {
      this.drawAlien(ctx);
      return true;
    }
    if (["만두", "군만두", "찐만두", "물만두", "왕만두", "김치만두", "고기만두", "갈비만두", "새우만두", "교자", "야끼교자", "딤섬", "샤오롱바오", "하가우", "춘권", "꽃빵", "만두피", "납작만두", "비빔만두", "송편", "꿀송편", "모시송편", "떡", "인절미", "절편", "백설기", "무지개떡", "바람떡", "개피떡", "증편", "기정떡", "경단", "경단떡", "꿀떡", "쑥떡", "찹쌀떡", "모찌", "과일모찌", "당고", "복주머니만두", "만두전골", "전병", "메밀전병", "수제비", "옹심이", "칼만두", "뇨끼", "라비올리", "토르텔리니", "엠파나다", "사모사", "피로시키", "새알심", "dumpling", "gyoza", "dimsum", "mandu", "wonton", "bao", "songpyeon", "tteok", "ricecake", "mochi", "dango", "ravioli"].includes(w)) {
      this.drawDumpling(ctx);
      return true;
    }
    if (["스테이크", "티본스테이크", "등심스테이크", "안심스테이크", "립아이스테이크", "채끝스테이크", "토마호크스테이크", "함박스테이크", "찹스테이크", "비프스테이크", "돈까스", "돈가스", "왕돈까스", "치즈돈까스", "고구마돈까스", "생선까스", "치킨까스", "카츠", "규카츠", "삼겹살", "오겹살", "목살", "항정살", "대패삼겹살", "차돌박이", "소고기", "한우구이", "갈비", "LA갈비", "돼지갈비", "소갈비", "양갈비", "등갈비", "폭립", "떡갈비", "불고기", "제육볶음", "육회", "보쌈", "보쌈고기", "수육", "편육", "족발", "베이컨", "스팸", "런천미트", "햄", "통조림햄", "분홍소시지", "육포", "선지", "곱창", "막창", "대창", "양대창", "훈제연어", "사시미", "회", "참치회", "연어회", "육사시미", "고깃덩어리", "생고기", "정육", "바비큐", "바베큐", "립", "만화고기", "고기", "steak", "t-bone", "ribeye", "sirloin", "porkbelly", "samgyeopsal", "tonkatsu", "cutlet", "porkchop", "bacon", "spam", "ham", "beef", "fillet", "jerky", "meat", "bbq"].includes(w)) {
      this.drawSteak(ctx);
      return true;
    }
    if (["떡볶이", "국물떡볶이", "로제떡볶이", "짜장떡볶이", "치즈떡볶이", "라볶이", "엽기떡볶이", "신전떡볶이", "기름떡볶이", "궁중떡볶이", "어묵", "오뎅", "어묵탕", "오뎅탕", "물오뎅", "빨간오뎅", "유부주머니", "김치", "배추김치", "깍두기", "총각김치", "알타리김치", "열무김치", "파김치", "보쌈김치", "백김치", "동치미", "겉절이", "김장김치", "볶음김치", "단무지", "피클", "할라피뇨", "장아찌", "무말랭이", "순대", "순대볶음", "곱창볶음", "닭발", "무뼈닭발", "불닭", "찜닭", "안동찜닭", "닭갈비", "쭈꾸미볶음", "낙지볶음", "오징어볶음", "아구찜", "해물찜", "갈비찜", "김치찜", "매운탕", "김말이", "야채튀김", "오징어튀김", "고추튀김", "고구마튀김", "새우튀김", "튀김", "고로케", "산적", "분식", "두부", "순두부", "간장게장", "양념게장", "tteokbokki", "topokki", "spicyricecake", "fishcake", "odeng", "eomuk", "kimchi", "kkakdugi", "sundae", "tofu"].includes(w)) {
      this.drawTteokbokki(ctx);
      return true;
    }
    if (["쿠키", "초코칩쿠키", "버터쿠키", "수제쿠키", "르뱅쿠키", "오레오", "비스킷", "크래커", "참크래커", "에이스", "다이제", "마가렛트", "칙촉", "쿠크다스", "웨하스", "건빵", "전병과자", "센베이", "쌀과자", "누룽지", "달고나과자", "약과", "한과", "유과", "다식", "강정", "깨강정", "호두과자", "땅콩과자", "국화빵", "계란빵", "풀빵", "만쥬", "델리만쥬", "밤만쥬", "상투과자", "마들렌", "휘낭시에", "스콘", "브라우니쿠키", "사블레", "진저브레드", "생강쿠키", "포춘쿠키", "cookie", "chocolatechipcookie", "biscuit", "cracker", "oreo", "scone", "madeleine", "yakgwa", "fortunecookie"].includes(w)) {
      this.drawCookieWaffle(ctx, "cookie");
      return true;
    }
    if (["와플", "벨기에와플", "사과잼와플", "크로플", "팬케이크", "핫케이크", "수플레팬케이크", "크레페", "호떡", "씨앗호떡", "꿀호떡", "부침개", "파전", "해물파전", "김치전", "감자전", "녹두전", "빈대떡", "동그랑땡", "동그랑땡전", "육전", "호박전", "생선전", "꼬치전", "계란말이", "타르트", "에그타르트", "치즈타르트", "호두파이", "애플파이", "펌킨파이", "파이", "키쉬", "갈레트", "토르티야", "난", "타코야끼", "waffle", "pancake", "hotcake", "crepe", "hotteok", "pajeon", "tart", "eggtart", "pie", "applepie"].includes(w)) {
      this.drawCookieWaffle(ctx, "waffle");
      return true;
    }
    if (["마카롱", "뚱카롱", "다쿠아즈", "초코파이", "몽쉘", "오예스", "빅파이", "찰떡파이", "카스타드", "슈크림", "에클레어", "프로피트롤", "모나카", "아이스크림샌드", "찐빵", "호빵", "야채호빵", "단팥호빵", "피자호빵", "고기호빵", "술빵", "증편빵", "찹쌀도넛", "슈톨렌", "크림퍼프", "macaron", "macaroon", "chocopie", "creampuff", "steamedbun", "hoppang", "dacquoise"].includes(w)) {
      this.drawCookieWaffle(ctx, "macaron");
      return true;
    }
    if (["오렌지", "귤", "감귤", "제주감귤", "한라봉", "천혜향", "레드향", "황금향", "청견", "밀감", "금귤", "낑깡", "자몽", "메로골드", "포멜로", "유자", "탱자", "감", "단감", "홍시", "연시", "대봉감", "반시", "곶감", "살구", "비파열매", "무화과", "석류", "구아바", "패션후르츠", "망고스틴", "리치", "람부탄", "용안", "열매", "과일", "citrus", "orange", "tangerine", "mandarin", "hallabong", "grapefruit", "persimmon", "apricot", "fig", "pomegranate"].includes(w)) {
      this.drawCitrusFruit(ctx, "orange");
      return true;
    }
    if (["레몬", "라임", "모과", "시트론", "배", "신고배", "꿀배", "돌배", "서양배", "참외", "성주참외", "노란멜론", "망고", "애플망고", "바나나망고", "파파야", "모과열매", "매실", "lemon", "lime", "pear", "mango", "papaya", "quince", "koreanmelon"].includes(w)) {
      this.drawCitrusFruit(ctx, "lemon");
      return true;
    }
    if (["복숭아", "백도", "황도", "천도복숭아", "납작복숭아", "신비복숭아", "자두", "프룬", "매실열매", "살구열매", "앵두열매", "피치", "peach", "plum", "nectarine", "prune"].includes(w)) {
      this.drawCitrusFruit(ctx, "peach");
      return true;
    }
    if (["아보카도", "키위", "골드키위", "그린키위", "참다래", "코코넛", "야자", "야자열매", "멜론", "메론", "머스크멜론", "칸탈로프", "하미과", "구아바열매", "두리안열매", "잭프루트", "감자", "햇감자", "찐감자", "알감자", "토란", "마", "양파", "자색양파", "마늘", "통마늘", "생강", "트러플", "밤", "군밤", "호두", "땅콩", "아몬드", "avocado", "kiwi", "coconut", "melon", "potato", "onion", "garlic", "ginger"].includes(w)) {
      this.drawCitrusFruit(ctx, "avocado");
      return true;
    }
    if (["토마토", "완숙토마토", "대추토마토", "방울토마토", "흑토마토", "찰토마토", "피망", "청피망", "홍피망", "파프리카", "대추", "사과대추", "tomato", "cherrytomato", "bellpepper", "paprika"].includes(w)) {
      this.drawCitrusFruit(ctx, "tomato");
      return true;
    }
    if (["포션", "물약", "빨간포션", "파란포션", "마나포션", "힐링포션", "체력포션", "초록포션", "보라포션", "독약", "해독제", "엘릭서", "불로초물약", "마법물약", "사랑의묘약", "변신물약", "투명물약", "각성제", "스팀팩", "플라스크", "삼각플라스크", "둥근플라스크", "비커", "시험관", "실린더", "눈금실린더", "알코올램프", "화학약품", "산성용액", "용액", "시약", "향수", "향수병", "디퓨저", "오일병", "에센스", "앰플", "스킨", "로션", "선크림", "매니큐어", "물감병", "잉크병", "먹물병", "비눗방울통", "약병", "물약병", "연금술", "성수", "요정가루", "별모래병", "유리병편지", "호리병", "표주박", "potion", "manapotion", "healthpotion", "elixir", "poison", "antidote", "flask", "beaker", "testtube", "perfume", "inkbottle", "vial"].includes(w)) {
      this.drawPotion(ctx);
      return true;
    }
    if (["우유", "흰우유", "서울우유", "초코우유", "딸기우유", "바나나우유", "단지우유", "커피우유", "멜론우유", "저지방우유", "무지방우유", "멸균우유", "산양유", "연유", "생크림", "휘핑크림", "사워크림", "두유", "검은콩두유", "베지밀", "아몬드브리즈", "오트밀크", "코코넛밀크", "요구르트", "야쿠르트", "불가리스", "비요뜨", "요거트", "그릭요거트", "요플레", "쿨피스", "피크닉", "주스", "오렌지주스", "사과주스", "포도주스", "토마토주스", "알로에주스", "주스팩", "우유팩", "종이팩", "두부팩", "계란팩", "세제", "세제통", "섬유유연제", "락스", "샴푸", "샴푸통", "린스", "바디워시", "손세정제", "물비누", "주방세제", "식용유", "참기름", "간장", "식초", "케첩", "마요네즈", "머스타드", "꿀", "꿀병", "꿀단지", "잼", "딸기잼", "땅콩버터", "누텔라", "고추장", "된장", "쌈장", "춘장", "소스병", "핫소스", "타바스코", "굴소스", "돈까스소스", "양념통", "후추통", "소금통", "설탕통", "밀가루포대", "쌀포대", "사료포대", "시멘트포대", "우유병", "milk", "milkcarton", "chocolatemilk", "strawberrymilk", "bananamilk", "soymilk", "yogurt", "yakult", "juice", "juicebox", "cream", "ketchup", "mayonnaise", "syrup", "shampoo", "detergent"].includes(w)) {
      this.drawMilkCarton(ctx);
      return true;
    }
    if (["맥주", "생맥주", "흑맥주", "병맥주", "캔맥주", "맥주캔", "에일", "라거", "하이볼", "소맥", "무알콜맥주", "루트비어", "버터맥주", "버터비어", "맥주잔", "조끼잔", "소주", "참이슬", "처음처럼", "진로", "새로", "소주병", "소주잔", "막걸리", "동동주", "모주", "식혜", "수정과", "청주", "사케", "정종", "고량주", "백주", "와인", "레드와인", "화이트와인", "로제와인", "포도주", "샴페인", "스파클링와인", "위스키", "양주", "꼬냑", "브랜디", "보드카", "럼", "진", "데킬라", "칵테일", "모히또", "마가리타", "마티니", "코스모폴리탄", "피나콜라다", "뱅쇼", "복분자주", "매실주", "인삼주", "담금주", "술", "술병", "술잔", "건배", "치맥", "안주", "호프", "와인잔", "샴페인잔", "칵테일잔", "맥주병", "밀크쉐이크", "파르페", "플로트", "체리콕", "에이드", "레몬에이드", "자몽에이드", "스무디", "슬러시", "프라푸치노", "아이스티", "밀크티", "버블티", "공차", "타로밀크티", "흑당버블티", "맥주거품", "beer", "draftbeer", "beermug", "pint", "ale", "lager", "soju", "makgeolli", "wine", "champagne", "whiskey", "cocktail", "highball", "milkshake", "parfait", "boba", "bubbletea"].includes(w)) {
      this.drawBeerMug(ctx);
      return true;
    }
    if (["건전지", "배터리", "AA건전지", "AAA건전지", "보조배터리", "충전기", "초고속충전기", "무선충전기", "어댑터", "멀티탭", "콘센트", "플러그", "코드", "전선", "케이블", "USB", "USB메모리", "외장하드", "SD카드", "유심", "반도체", "칩", "CPU", "그래픽카드", "메인보드", "램", "트랜지스터", "축전지", "자동차배터리", "태양전지", "연료전지", "핵연료", "우라늄", "플루토늄", "원자로", "발전기", "변압기", "두꺼비집", "차단기", "퓨즈", "부탄가스", "이소가스", "스프레이", "에프킬라", "락카", "소화기", "산소통", "가스통", "건전지팩", "에너지셀", "파워뱅크", "battery", "aabattery", "powerbank", "charger", "plug", "usb", "capacitor", "fuelcell", "energycell"].includes(w)) {
      this.drawBattery(ctx);
      return true;
    }
    if (["마법지팡이", "요술봉", "지팡이", "마법봉", "마법스태프", "스태프", "체리요술봉", "세일러문요술봉", "별봉", "하트봉", "왕홀", "셉터", "룬지팡이", "현자의지팡이", "모세의지팡이", "단장", "목발", "등산스틱", "지휘봉", "바통", "응원봉", "아이돌응원봉", "야광봉", "경광봉", "신호봉", "곤봉", "경봉", "삼단봉", "쌍절곤", "여의봉", "봉", "장대", "당구큐대", "큐대", "스키폴대", "안테나", "셀카봉", "삼각대", "깃대", "토템폴", "마법빗자루", "캔디케인", "지팡이사탕", "회오리사탕", "바람개비봉", "비눗방울봉", "효자손", "안마봉", "마법소녀", "wand", "magicwand", "fairywand", "staff", "magicstaff", "scepter", "lightstick", "baton", "cane", "walkingstick", "candycane"].includes(w)) {
      this.drawMagicWand(ctx);
      return true;
    }
    if (["야구방망이", "방망이", "배트", "야구배트", "알루미늄배트", "나무배트", "소프트볼배트", "크리켓배트", "도깨비방망이", "가시방망이", "철퇴", "메이스", "모닝스타", "다듬이방망이", "빨래방망이", "홍두깨", "밀대방망이", "절구공이", "떡메", "나무망치", "뿅망치", "골프채", "드라이버채", "아이언채", "퍼터", "하키채", "아이스하키채", "필드하키채", "게이트볼채", "크로케채", "폴로채", "라크로스채", "당구채", "몽둥이", "각목", "통나무봉", "볼링핀", "곤봉채", "bat", "baseballbat", "club", "mace", "spikedclub", "golfclub", "hockeystick", "cricketbat", "rollingpin", "bowlingpin"].includes(w)) {
      this.drawBaseballBat(ctx);
      return true;
    }
    if (["활", "석궁", "양궁", "국궁", "각궁", "장궁", "단궁", "컴파운드보우", "크로스보우", "발리스타", "신기전", "큐피드의활", "엘프의활", "사냥활", "활과화살", "화살", "불화살", "독화살", "얼음화살", "마법화살", "화살통", "표창", "수리검", "다트", "다트화살", "투창", "작살", "부메랑", "새총", "투석구", "채찍", "올가미", "바람총", "블로우건", "작살총", "신호탄", "폭죽화살", "궁수", "아처", "로빈후드", "주몽", "bow", "bowandarrow", "longbow", "crossbow", "archery", "arrow", "quiver", "dart", "shuriken", "slingshot", "harpoon"].includes(w)) {
      this.drawBowArrow(ctx);
      return true;
    }
    if (["주사기", "주사", "주사바늘", "백신", "예방접종", "링거", "수액", "헌혈", "체온계", "수은체온계", "귀체온계", "스포이드", "피펫", "마이크로피펫", "청진기", "메스", "수술칼", "핀셋", "겸자", "붕대", "압박붕대", "거즈", "반창고", "밴드", "파스", "약봉지", "구급약", "안약", "점안액", "인공눈물", "연고", "후시딘", "마데카솔", "물파스", "멘소래담", "치약", "치약튜브", "칫솔", "전동칫솔", "치실", "가글", "면봉", "귀이개", "손톱깎이", "손톱줄", "족집게", "면도기", "전기면도기", "바리깡", "고데기", "빗", "브러쉬", "머리빗", "롤빗", "립스틱", "립밤", "립글로스", "립틴트", "마스카라", "아이라이너", "화장붓", "메이크업브러쉬", "팩트", "쿠션팩트", "파운데이션", "물감튜브", "본드", "순간접착제", "풀", "딱풀", "물풀", "목공풀", "수정액", "화이트", "실리콘총", "글루건", "부항", "침", "한의원침", "syringe", "vaccine", "injection", "needle", "thermometer", "pipette", "dropper", "stethoscope", "scalpel", "toothbrush", "toothpaste", "lipstick", "comb", "razor", "gluestick"].includes(w)) {
      this.drawSyringe(ctx);
      return true;
    }

    if (["하마", "hippo"].includes(w)) {
      this.drawHippo(ctx);
      return true;
    }
    if (["코뿔소", "물소", "버팔로", "들소", "rhino"].includes(w)) {
      this.drawRhino(ctx);
      return true;
    }
    if (["사자", "라이온", "lion"].includes(w)) {
      this.drawLion(ctx);
      return true;
    }
    if (["호랑이", "범", "백호", "치타", "표범", "재규어", "tiger"].includes(w)) {
      this.drawTiger(ctx);
      return true;
    }
    if (["공룡", "티라노", "트리케라톱스", "브라키오사우루스", "랩터", "용", "드래곤", "dino", "dragon"].includes(w)) {
      this.drawDino(ctx);
      return true;
    }
    if (["여우", "사막여우", "불여우", "구미호", "너구리", "라쿤", "랫서판다", "fox"].includes(w)) {
      this.drawFox(ctx);
      return true;
    }
    if (["강아지", "개", "멍멍이", "백구", "진돗개", "시바견", "푸들", "웰시코기", "늑대", "하이에나", "dog", "puppy", "wolf"].includes(w)) {
      this.drawDog(ctx);
      return true;
    }
    if (["원숭이", "고릴라", "침팬지", "오랑우탄", "손오공", "monkey", "gorilla"].includes(w)) {
      this.drawMonkey(ctx);
      return true;
    }
    if (["토끼", "산토끼", "집토끼", "바니", "다람쥐", "청설모", "햄스터", "쥐", "생쥐", "기니피그", "고슴도치", "수달", "비버", "두더지", "미어캣", "rabbit", "bunny", "hamster", "mouse"].includes(w)) {
      this.drawRabbit(ctx);
      return true;
    }
    if (["곰", "불곰", "북극곰", "판다", "팬더", "반달곰", "테디베어", "곰인형", "코알라", "나무늘보", "bear", "panda", "koala"].includes(w)) {
      this.drawBear(ctx, w === "판다" || w === "팬더" || w === "panda" || w === "북극곰");
      return true;
    }
    if (["돼지", "멧돼지", "아기돼지", "꽃돼지", "pig", "boar"].includes(w)) {
      this.drawPig(ctx);
      return true;
    }
    if (["양", "염소", "산양", "알파카", "라마", "sheep", "goat", "alpaca"].includes(w)) {
      this.drawSheep(ctx);
      return true;
    }
    if (["소", "젖소", "황소", "한우", "송아지", "cow", "bull"].includes(w)) {
      this.drawCow(ctx);
      return true;
    }
    if (["말", "조랑말", "얼룩말", "유니콘", "페가수스", "당나귀", "노새", "사슴", "순록", "루돌프", "낙타", "타조", "horse", "unicorn", "zebra", "deer"].includes(w)) {
      this.drawHorse(ctx, w === "유니콘" || w === "페가수스" || w === "unicorn");
      return true;
    }
    if (["캥거루", "왈라비", "kangaroo"].includes(w)) {
      this.drawKangaroo(ctx);
      return true;
    }
    if (["악어", "크로커다일", "도마뱀", "카멜레온", "이구아나", "crocodile", "alligator", "lizard"].includes(w)) {
      this.drawCrocodile(ctx);
      return true;
    }
    if (["개구리", "두꺼비", "청개구리", "올챙이", "맹꽁이", "frog", "toad"].includes(w)) {
      this.drawFrog(ctx);
      return true;
    }
    if (["박쥐", "흡혈박쥐", "bat"].includes(w)) {
      this.drawBat(ctx);
      return true;
    }
    if (["부엉이", "올빼미", "독수리", "매", "갈매기", "까마귀", "앵무새", "비둘기", "참새", "제비", "까치", "학", "두루미", "플라밍고", "홍학", "공작", "공작새", "owl", "eagle", "parrot"].includes(w)) {
      this.drawOwl(ctx);
      return true;
    }
    if (["나비", "호랑나비", "나방", "잠자리", "고추잠자리", "반딧불이", "개똥벌레", "butterfly", "dragonfly"].includes(w)) {
      this.drawButterfly(ctx);
      return true;
    }
    if (["벌", "꿀벌", "말벌", "호박벌", "모기", "파리", "메뚜기", "사마귀", "귀뚜라미", "매미", "bee", "wasp"].includes(w)) {
      this.drawBee(ctx);
      return true;
    }
    if (["무당벌레", "풍뎅이", "장수풍뎅이", "사슴벌레", "쇠똥구리", "개미", "전갈", "지네", "공벌레", "ladybug", "beetle", "ant"].includes(w)) {
      this.drawLadybug(ctx);
      return true;
    }
    if (["상어", "죠스", "백상아리", "범고래", "일각고래", "철갑상어", "가오리", "만타가오리", "shark", "orca"].includes(w)) {
      this.drawShark(ctx);
      return true;
    }
    if (["물고기", "참치", "연어", "잉어", "금붕어", "고등어", "갈치", "광어", "우럭", "복어", "열대어", "니모", "멸치", "명태", "아귀", "해마", "붕어빵", "잉어빵", "fish", "goldfish", "salmon"].includes(w)) {
      this.drawFish(ctx, w === "붕어빵" || w === "잉어빵");
      return true;
    }
    if (["해파리", "말미잘", "산호", "jellyfish"].includes(w)) {
      this.drawJellyfish(ctx);
      return true;
    }
    if (["불가사리", "성게", "조개", "소라", "전복", "굴", "진주조개", "홍합", "바지락", "starfish", "clam", "shell"].includes(w)) {
      this.drawStarfish(ctx);
      return true;
    }
    if (["달팽이", "소라게", "우렁이", "다슬기", "민달팽이", "snail"].includes(w)) {
      this.drawSnail(ctx);
      return true;
    }
    if (["오리", "병아리", "닭", "수탉", "암탉", "백조", "거위", "오리배", "러버덕", "duck", "chick", "swan"].includes(w)) {
      this.drawDuck(ctx);
      return true;
    }
    if (["펭귄", "황제펭귄", "물개", "물범", "바다표범", "바다코끼리", "바다사자", "매너티", "듀공", "penguin", "seal"].includes(w)) {
      this.drawPenguin(ctx);
      return true;
    }
    if (["게", "꽃게", "대게", "킹크랩", "랍스터", "바닷가재", "가재", "새우", "대하", "랍스타", "crab", "lobster", "shrimp"].includes(w)) {
      this.drawCrab(ctx);
      return true;
    }
    if (["택시", "카카오택시", "taxi"].includes(w)) {
      this.drawCar(ctx, "taxi");
      return true;
    }
    if (["경찰차", "순찰차", "경찰", "police"].includes(w)) {
      this.drawCar(ctx, "police");
      return true;
    }
    if (["소방차", "펌프차", "사다리차", "firetruck", "fireengine"].includes(w)) {
      this.drawFiretruck(ctx);
      return true;
    }
    if (["구급차", "앰뷸런스", "응급차", "ambulance"].includes(w)) {
      this.drawAmbulance(ctx);
      return true;
    }
    if (["트럭", "덤프트럭", "화물차", "택배차", "탑차", "용달차", "레미콘", "청소차", "트랙터", "경운기", "truck", "tractor"].includes(w)) {
      this.drawTruck(ctx);
      return true;
    }
    if (["포크레인", "굴착기", "불도저", "지게차", "크레인", "기중기", "로드롤러", "중장비", "excavator", "bulldozer", "forklift"].includes(w)) {
      this.drawExcavator(ctx);
      return true;
    }
    if (["기차", "지하철", "전철", "열차", "증기기관차", "기관차", "ktx", "srt", "모노레일", "케이블카", "트램", "train", "subway"].includes(w)) {
      this.drawTrain(ctx);
      return true;
    }
    if (["잠수함", "노틸러스", "잠수정", "submarine"].includes(w)) {
      this.drawSubmarine(ctx);
      return true;
    }
    if (["오토바이", "바이크", "스쿠터", "베스파", "배달오토바이", "전동킥보드", "킥보드", "세그웨이", "외발자전거", "motorcycle", "scooter"].includes(w)) {
      this.drawMotorcycle(ctx);
      return true;
    }
    if (["스케이트보드", "롱보드", "보드", "스케이트", "롤러스케이트", "인라인", "인라인스케이트", "썰매", "눈썰매", "스키", "스노우보드", "서핑보드", "skateboard", "sled"].includes(w)) {
      this.drawSkateboard(ctx);
      return true;
    }
    if (["쇼핑카트", "카트", "유모차", "수레", "손수레", "리어카", "휠체어", "웨건", "cart", "stroller"].includes(w)) {
      this.drawShoppingCart(ctx);
      return true;
    }
    if (["냉장고", "김치냉장고", "냉동고", "아이스박스", "금고", "옷장", "장롱", "서랍장", "찬장", "사물함", "캐비닛", "자판기", "엘리베이터", "공중전화", "fridge", "refrigerator", "safe"].includes(w)) {
      this.drawFridge(ctx);
      return true;
    }
    if (["세탁기", "건조기", "드럼세탁기", "식기세척기", "정수기", "가습기", "제습기", "공기청정기", "에어컨", "보일러", "난로", "히터", "라디에이터", "washer", "washingmachine"].includes(w)) {
      this.drawWasher(ctx);
      return true;
    }
    if (["전자레인지", "오븐", "에어프라이어", "토스터", "토스터기", "밥솥", "전기밥솥", "가스레인지", "인덕션", "프린터", "복사기", "라디오", "스피커", "앰프", "microwave", "oven", "toaster"].includes(w)) {
      this.drawMicrowave(ctx);
      return true;
    }
    if (["선풍기", "손풍기", "환풍기", "서큘레이터", "바람개비", "프로펠러", "풍차", "fan", "windmill"].includes(w)) {
      this.drawFan(ctx);
      return true;
    }
    if (["전구", "알전구", "형광등", "조명", "램프", "스탠드", "가로등", "손전등", "랜턴", "촛불", "양초", "초", "호롱불", "신호등", "네온사인", "lightbulb", "lamp", "candle"].includes(w)) {
      this.drawLightbulb(ctx);
      return true;
    }
    if (["시계", "알람시계", "자명종", "벽시계", "손목시계", "회중시계", "초시계", "스톱워치", "타이머", "모래시계", "괘종시계", "나침반", "온도계", "체중계", "저울", "clock", "watch", "timer"].includes(w)) {
      this.drawClock(ctx);
      return true;
    }
    if (["스마트폰", "핸드폰", "휴대폰", "전화기", "아이폰", "갤럭시", "태블릿", "아이패드", "계산기", "리모컨", "보조배터리", "무전기", "삐삐", "smartphone", "phone", "iphone", "ipad"].includes(w)) {
      this.drawSmartphone(ctx);
      return true;
    }
    if (["노트북", "맥북", "랩탑", "컴퓨터", "데스크탑", "피씨", "키보드", "타자기", "모니터", "전광판", "칠판", "화이트보드", "액자", "거울", "창문", "laptop", "computer", "pc", "macbook"].includes(w)) {
      this.drawLaptop(ctx);
      return true;
    }
    if (["카메라", "사진기", "캠코더", "폴라로이드", "망원경", "쌍안경", "현미경", "돋보기", "프로젝터", "cctv", "camera"].includes(w)) {
      this.drawCamera(ctx);
      return true;
    }
    if (["게임기", "닌텐도", "스위치", "플스", "플레이스테이션", "엑스박스", "게임패드", "조이스틱", "오락기", "다마고치", "마우스", "이어폰", "헤드셋", "헤드폰", "에어팟", "드론", "RC카", "gamepad", "switch", "console"].includes(w)) {
      this.drawGamepad(ctx);
      return true;
    }
    if (["변기", "양변기", "좌변기", "소변기", "세면대", "싱크대", "비데", "요강", "toilet"].includes(w)) {
      this.drawToilet(ctx);
      return true;
    }
    if (["컵", "머그컵", "유리컵", "종이컵", "맥주잔", "와인잔", "찻잔", "텀블러", "보온병", "물병", "물통", "주전자", "약탕기", "호리병", "꽃병", "항아리", "장독대", "옹기", "도자기", "커피", "아메리카노", "라떼", "차", "녹차", "홍차", "코코아", "핫초코", "cup", "mug", "coffee", "tea"].includes(w)) {
      this.drawMug(ctx);
      return true;
    }
    if (["냄비", "솥", "가마솥", "뚝배기", "프라이팬", "후라이팬", "웍", "양은냄비", "대야", "다라이", "양동이", "바케스", "세숫대야", "밥그릇", "국그릇", "접시", "쟁반", "도시락", "식판", "pot", "pan", "bucket"].includes(w)) {
      this.drawPot(ctx);
      return true;
    }
    if (["쓰레기통", "휴지통", "분리수거함", "드럼통", "오크통", "술통", "우체통", "소화전", "소화기", "가스통", "산소통", "생수통", "페트병", "유리병", "빈병", "소주병", "맥주병", "우유병", "약병", "향수", "향수병", "샴푸", "세제", "치약", "trashcan", "barrel", "bottle"].includes(w)) {
      this.drawTrashcan(ctx);
      return true;
    }
    if (["드럼", "북", "큰북", "작은북", "장구", "소고", "탬버린", "심벌즈", "팀파니", "실로폰", "징", "꽹과리", "목탁", "종", "방울", "마이크", "나팔", "트럼펫", "색소폰", "호루라기", "피리", "리코더", "단소", "플루트", "하모니카", "아코디언", "하프", "우쿨렐레", "만돌린", "가야금", "거문고", "비파", "메트로놈", "오르골", "drum", "bell", "mic", "trumpet"].includes(w)) {
      this.drawDrum(ctx);
      return true;
    }
    if (["연필", "볼펜", "만년필", "사인펜", "형광펜", "크레파스", "색연필", "분필", "붓", "지우개", "자", "막대기", "나뭇가지", "대나무", "젓가락", "빨대", "이쑤시개", "면봉", "바늘", "꼬치", "회초리", "립스틱", "칫솔", "주사기", "체온계", "지팡이", "마법지팡이", "요술봉", "응원봉", "야구방망이", "방망이", "배트", "골프채", "당구채", "낚싯대", "연", "로켓연필", "화살", "pencil", "pen", "wand", "ruler", "stick", "arrow"].includes(w)) {
      this.drawPencil(ctx);
      return true;
    }
    if (["도끼", "전투도끼", "손도끼", "벌목도끼", "토마호크", "할버드", "언월도", "낫", "사신낫", "axe", "scythe"].includes(w)) {
      this.drawAxe(ctx);
      return true;
    }
    if (["곡괭이", "다이아곡괭이", "철곡괭이", "괭이", "호미", "갈퀴", "쇠스랑", "삼지창", "창", "작살", "pickaxe", "trident", "spear"].includes(w)) {
      this.drawPickaxe(ctx);
      return true;
    }
    if (["삽", "야전삽", "모종삽", "눈삽", "주걱", "밥주걱", "뒤집개", "국자", "뜰채", "잠자리채", "파리채", "라켓", "테니스라켓", "배드민턴라켓", "탁구채", "빗자루", "마법빗자루", "대걸레", "밀대", "뚫어뻥", "효자손", "구두주걱", "부채", "숟가락", "포크", "나이프", "젓가락", "shovel", "spoon", "fork", "broom", "racket"].includes(w)) {
      this.drawShovel(ctx);
      return true;
    }
    if (["가위", "쪽가위", "전지가위", "집게", "고깃집게", "펜치", "플라이어", "니퍼", "스패너", "렌치", "몽키스패너", "드라이버", "송곳", "컴퍼스", "손톱깎이", "핀셋", "옷걸이", "클립", "빨래집게", "호치키스", "스테이플러", "커터칼", "주머니칼", "맥가이버칼", "톱", "전기톱", "대패", "끌", "줄", "인두", "용접기", "글루건", "타카", "드릴", "전동드릴", "착암기", "scissors", "pliers", "wrench", "saw", "drill"].includes(w)) {
      this.drawScissors(ctx);
      return true;
    }
    if (["열쇠", "황금열쇠", "차키", "마스터키", "만능열쇠", "key"].includes(w)) {
      this.drawKey(ctx);
      return true;
    }
    if (["자물쇠", "번호자물쇠", "수갑", "족쇄", "케틀벨", "추", "저울추", "핸드백", "가방", "책가방", "배낭", "백팩", "캐리어", "여행가방", "서류가방", "도시락가방", "장바구니", "복주머니", "지갑", "padlock", "lock", "bag", "backpack", "kettlebell"].includes(w)) {
      this.drawPadlock(ctx);
      return true;
    }
    if (["닻", "앵커", "낚시바늘", "갈고리", "후크", "크레인후크", "anchor", "hook"].includes(w)) {
      this.drawAnchor(ctx);
      return true;
    }
    if (["대포", "캐논", "박격포", "투석기", "화차", "신기전", "cannon", "mortar"].includes(w)) {
      this.drawCannon(ctx);
      return true;
    }
    if (["총", "권총", "소총", "기관총", "산탄총", "샷건", "저격총", "스나이퍼", "물총", "레이저총", "광선총", "리볼버", "새총", "활", "석궁", "드라이기", "주유기", "호스", "gun", "pistol", "rifle", "watergun"].includes(w)) {
      this.drawGun(ctx);
      return true;
    }
    if (["안경", "선글라스", "물안경", "고글", "안대", "가면", "마스크", "리본", "나비넥타이", "glasses", "sunglasses", "goggles"].includes(w)) {
      this.drawGlasses(ctx);
      return true;
    }
    if (["신발", "운동화", "구두", "부츠", "장화", "슬리퍼", "샌들", "하이힐", "고무신", "짚신", "축구화", "스케이트화", "인라인스케이트화", "양말", "크리스마스양말", "장갑", "권투글러브", "발", "발바닥", "다리미", "shoe", "sneaker", "boot", "sock"].includes(w)) {
      this.drawShoe(ctx);
      return true;
    }
    if (["모자", "마법모자", "마녀모자", "마법사모자", "밀짚모자", "야구모자", "캡모자", "중절모", "산타모자", "요리사모자", "학사모", "헬멧", "안전모", "철모", "투구", "갓", "삿갓", "고깔모자", "고깔", "라바콘", "텐트", "피라미드", "한복", "드레스", "치마", "티셔츠", "옷", "바지", "정장", "유니폼", "갑옷", "망토", "판초", "우비", "앞치마", "조끼", "패딩", "코트", "스웨터", "후드티", "hat", "cap", "helmet", "wizardhat", "tent"].includes(w)) {
      this.drawHat(ctx);
      return true;
    }
    if (["피아노", "그랜드피아노", "오르간", "전자피아노", "신디사이저", "건반", "piano", "organ"].includes(w)) {
      this.drawPiano(ctx);
      return true;
    }
    if (["로봇", "안드로이드", "건담", "메카", "트랜스포머", "터미네이터", "사이보그", "장난감로봇", "아이언맨", "외계인", "우주인", "우주비행사", "사람", "남자", "여자", "아기", "어린이", "군인", "경찰관", "소방관", "요리사", "의사", "간호사", "닌자", "해적", "기사", "왕", "여왕", "공주", "왕자", "산타", "산타클로스", "마녀", "마법사", "좀비", "미라", "프랑켄슈타인", "드라큘라", "뱀파이어", "해골", "스켈레톤", "골렘", "거인", "천사", "악마", "도깨비", "요정", "엘프", "오크", "고블린", "인형", "마네킹", "허수아비", "동상", "조각상", "자유의여신상", "돌하르방", "불상", "모아이", "스핑크스", "장승", "로봇청소기", "robot", "human", "person", "knight", "santa", "zombie"].includes(w)) {
      this.drawRobot(ctx);
      return true;
    }
    if (["기타", "일렉기타", "통기타", "베이스기타", "바이올린", "첼로", "콘트라베이스", "비올라", "류트", "해금", "guitar", "violin", "cello", "ukulele"].includes(w)) {
      this.drawGuitar(ctx);
      return true;
    }
    if (["버섯", "독버섯", "송이버섯", "팽이버섯", "표고버섯", "느타리버섯", "양송이버섯", "새송이버섯", "영지버섯", "트러플", "파라솔", "야자수", "브로콜리", "콜리플라워", "mushroom", "broccoli"].includes(w)) {
      this.drawMushroom(ctx);
      return true;
    }
    if (["왕관", "크라운", "면류관", "티아라", "월계관", "금관", "crown", "tiara"].includes(w)) {
      this.drawCrown(ctx);
      return true;
    }
    if (["선인장", "화분", "다육이", "식물", "화초", "난초", "산세베리아", "몬스테라", "분재", "장미", "해바라기", "튤립", "민들레", "무궁화", "연꽃", "벚꽃", "코스모스", "국화", "카네이션", "꽃", "꽃다발", "네잎클로버", "클로버", "대나무", "알로에", "산호초", "미역", "다시마", "새싹", "잔디", "수풀", "덤불", "인삼", "산삼", "cactus", "flower", "rose", "sunflower", "plant"].includes(w)) {
      this.drawCactus(ctx);
      return true;
    }
    if (["초밥", "스시", "생선초밥", "연어초밥", "참치초밥", "새우초밥", "계란초밥", "장어초밥", "회", "사시미", "만두", "군만두", "찐만두", "물만두", "왕만두", "교자", "딤섬", "송편", "인절미", "떡", "찹쌀떡", "모찌", "생선까스", "돈까스", "스테이크", "삼겹살", "베이컨", "스팸", "햄", "두부", "순두부", "김치", "깍두기", "단무지", "계란말이", "어묵", "오뎅", "떡볶이", "김말이", "튀김", "새우튀김", "오징어튀김", "고로케", "산적", "꼬치", "장어구이", "생선구이", "고등어구이", "갈치구이", "조기구이", "굴비", "간장게장", "양념게장", "sushi", "dumpling", "steak", "bacon", "tofu", "kimchi", "tteokbokki"].includes(w)) {
      this.drawSushi(ctx);
      return true;
    }
    if (["라면", "컵라면", "신라면", "짜파게티", "불닭볶음면", "우동", "짜장면", "짬뽕", "칼국수", "국수", "잔치국수", "비빔국수", "냉면", "물냉면", "비빔냉면", "쫄면", "막국수", "콩국수", "소바", "메밀소바", "파스타", "스파게티", "쌀국수", "마라탕", "마라샹궈", "떡국", "만둣국", "미역국", "김치찌개", "된장찌개", "순두부찌개", "부대찌개", "청국장", "갈비탕", "설렁탕", "곰탕", "삼계탕", "감자탕", "해장국", "육개장", "국밥", "순대국밥", "돼지국밥", "콩나물국밥", "비빔밥", "돌솥비빔밥", "덮밥", "제육덮밥", "오징어덮밥", "카레", "카레라이스", "하이라이스", "짜장밥", "짬뽕밥", "볶음밥", "김치볶음밥", "새우볶음밥", "오므라이스", "죽", "전복죽", "호박죽", "팥죽", "수프", "옥수수수프", "양송이스프", "시리얼", "콘푸로스트", "콘플레이크", "오트밀", "요거트볼", "아사이볼", "샐러드", "과일샐러드", "화채", "수박화채", "팥빙수", "빙수", "망고빙수", "공기밥", "밥", "쌀밥", "잡곡밥", "개밥", "사료", "ramen", "noodle", "noodles", "udon", "pasta", "spaghetti", "soup", "curry", "bibimbap", "rice", "salad"].includes(w)) {
      this.drawRamen(ctx);
      return true;
    }
    if (["김밥", "삼각김밥", "충무김밥", "꼬마김밥", "참치김밥", "치즈김밥", "주먹밥", "오니기리", "유부초밥", "누드김밥", "캘리포니아롤", "김", "도시락김", "kimbap", "gimbap", "onigiri", "riceball"].includes(w)) {
      this.drawKimbap(ctx);
      return true;
    }
    if (["핫도그", "콘도그", "명랑핫도그", "소시지", "비엔나", "후랑크소시지", "소시지빵", "샌드위치", "서브웨이", "바게트샌드위치", "타코", "부리또", "케밥", "핫바", "어묵바", "츄러스", "꽈배기", "에클레어", "롤케이크", "순대", "가래떡", "떡꼬치", "소떡소떡", "양꼬치", "닭꼬치", "오이", "가지", "애호박", "옥수수", "고구마", "군고구마", "고추", "청양고추", "대파", "연근", "우엉", "더덕", "도라지", "참외", "hotdog", "corndog", "sausage", "sandwich", "cucumber", "eggplant", "corn", "sweetpotato"].includes(w)) {
      this.drawHotdog(ctx);
      return true;
    }
    if (["치킨", "닭다리", "통닭", "후라이드치킨", "양념치킨", "간장치킨", "뿌링클", "백숙", "훈제오리", "칠면조", "립", "바베큐", "족발", "보쌈", "뼈다귀", "갈비", "양갈비", "등갈비", "티본스테이크", "만화고기", "고기", "뼈", "화석", "공룡뼈", "chicken", "drumstick", "meat", "bone", "bbq"].includes(w)) {
      this.drawChickenLeg(ctx);
      return true;
    }
    if (["감자튀김", "포테이토", "후렌치후라이", "양념감자", "웨지감자", "해시브라운", "감자칩", "포카칩", "프링글스", "새우깡", "과자", "스낵", "나초", "팝콘", "강냉이", "뻥튀기", "맛동산", "빼빼로", "포키", "초코송이", "홈런볼", "칸쵸", "고래밥", "오징어땅콩", "땅콩", "아몬드", "호두", "밤", "군밤", "알밤", "은행", "도토리", "씨앗", "너겟", "치킨너겟", "치즈스틱", "콜팝", "fries", "frenchfries", "popcorn", "chips", "snack", "pepero"].includes(w)) {
      this.drawFries(ctx);
      return true;
    }
    if (["계란", "달걀", "계란프라이", "계란후라이", "후라이", "삶은계란", "삶은달걀", "구운계란", "맥반석계란", "메추리알", "타조알", "공룡알", "황금알", "날계란", "수란", "오믈렛", "스크램블에그", "계란빵", "찐빵", "호빵", "만쥬", "델리만쥬", "호두과자", "땅콩과자", "국화빵", "찹쌀도넛", "호떡", "씨앗호떡", "빈대떡", "부침개", "파전", "김치전", "감자전", "팬케이크", "핫케이크", "크레페", "와플", "마들렌", "휘낭시에", "스콘", "비스킷", "쿠키", "초코칩쿠키", "크래커", "마카롱", "다쿠아즈", "타르트", "에그타르트", "파이", "초코파이", "몽쉘", "오예스", "카스타드", "슈크림", "술빵", "찐감자", "감자", "양파", "마늘", "생강", "토마토", "자두", "살구", "복숭아", "감", "홍시", "단감", "귤", "오렌지", "한라봉", "레몬", "라임", "자몽", "키위", "망고", "멜론", "메론", "코코넛", "아보카도", "무화과", "석류", "조약돌", "짱돌", "egg", "friedegg", "pancake", "waffle", "cookie", "macaron", "potato", "onion", "garlic", "tomato", "lemon", "orange", "peach", "mango", "kiwi", "avocado"].includes(w)) {
      this.drawFriedEgg(ctx);
      return true;
    }
    if (["식빵", "토스트", "빵", "모닝빵", "단팥빵", "크림빵", "소보로빵", "소금빵", "피자빵", "마늘빵", "카스테라", "브라우니", "벽돌빵", "건빵", "약식", "시루떡", "치즈케이크", "티라미수", "길거리토스트", "프렌치토스트", "버터", "스펀지", "수세미", "비누", "메모지", "포스트잇", "toast", "bread"].includes(w)) {
      this.drawToast(ctx);
      return true;
    }
    if (["크로와상", "크루아상", "소라빵", "초코소라빵", "프레즐", "베이글", "초승달빵", "croissant", "pretzel", "bagel"].includes(w)) {
      this.drawCroissant(ctx);
      return true;
    }
    if (["사탕", "캔디", "알사탕", "막대사탕", "롤리팝", "츄파춥스", "박하사탕", "눈깔사탕", "별사탕", "솜사탕", "달고나", "뽑기", "엿", "호박엿", "가락엿", "껌", "풍선껌", "캐러멜", "카라멜", "마시멜로", "마시멜로우", "젤리빈", "마이구미", "하리보", "탕후루", "사과사탕", "아이스크림바", "하드", "메로나", "스크류바", "죠스바", "수박바", "쌍쌍바", "누가바", "돼지바", "보석바", "폴라포", "쭈쭈바", "설레임", "더위사냥", "빵빠레", "월드콘", "부라보콘", "구구콘", "투게더", "베스킨라빈스", "회오리감자", "candy", "lollipop", "cottoncandy", "marshmallow", "popsicle", "tanghulu"].includes(w)) {
      this.drawCandy(ctx);
      return true;
    }
    if (["초콜릿", "초코", "초콜렛", "초코바", "가나초콜릿", "크런키", "트윅스", "스니커즈", "핫브레이크", "자유시간", "페레로로쉐", "키세스", "엠앤엠즈", "몰티져스", "양갱", "연양갱", "누텔라", "코코아", "카카오", "벽돌", "금괴", "골드바", "은괴", "빨래판", "태양광패널", "립밤", "다이어리", "수첩", "공책", "노트", "앨범", "신문", "지도", "보물지도", "메뉴판", "달력", "포스터", "초대장", "상장", "졸업장", "여권", "통장", "신분증", "면허증", "신용카드", "체크카드", "교통카드", "기프트카드", "상품권", "지폐", "만원", "오만원", "천원", "오천원", "달러", "엔화", "유로", "수표", "복권", "로또", "티켓", "영화표", "비행기표", "기차표", "우표", "부적", "반창고", "밴드", "파스", "핫팩", "아이스팩", "chocolate", "choco", "goldbar", "brick", "notebook", "passport", "card", "money", "ticket"].includes(w)) {
      this.drawChocolate(ctx);
      return true;
    }
    if (["콜라", "코카콜라", "펩시", "사이다", "칠성사이다", "스프라이트", "환타", "밀키스", "암바사", "웰치스", "닥터페퍼", "마운틴듀", "음료수", "탄산음료", "캔", "캔음료", "맥주", "맥주캔", "생맥주", "소주", "막걸리", "와인", "포도주", "샴페인", "위스키", "보드카", "칵테일", "주스", "오렌지주스", "사과주스", "포도주스", "토마토주스", "알로에주스", "식혜", "수정과", "두유", "우유", "흰우유", "초코우유", "딸기우유", "바나나우유", "커피우유", "요구르트", "야쿠르트", "요거트", "쿨피스", "피크닉", "박카스", "비타500", "비타민음료", "에너지드링크", "핫식스", "레드불", "몬스터", "이온음료", "포카리스웨트", "게토레이", "파워에이드", "토레타", "생수", "물", "얼음물", "탄산수", "트레비", "씨그램", "보리차", "옥수수수염차", "밀크티", "버블티", "공차", "에이드", "레몬에이드", "자몽에이드", "스무디", "밀크쉐이크", "슬러시", "프라푸치노", "아이스티", "참치캔", "스팸캔", "통조림", "복숭아통조림", "옥수수캔", "건전지", "배터리", "부탄가스", "스프레이", "에프킬라", "락카", "페인트통", "기름통", "우유팩", "주스팩", "물약", "포션", "빨간포션", "파란포션", "엘릭서", "케첩", "마요네즈", "머스타드", "고추장", "된장", "간장", "식용유", "참기름", "꿀병", "꿀", "잼", "딸기잼", "땅콩버터", "soda", "cola", "coke", "pepsi", "sprite", "juice", "milk", "beer", "wine", "water", "potion", "can", "battery"].includes(w)) {
      this.drawSoda(ctx);
      return true;
    }
    if (["포도", "청포도", "거봉", "샤인머스캣", "블루베리", "라즈베리", "블랙베리", "크랜베리", "오디", "복분자", "리치", "람부탄", "용안", "매실", "옥수수알", "완두콩", "콩", "강낭콩", "검은콩", "진주알", "비눗방울", "알약", "풍선다발", "물방울", "이슬", "포도송이", "grape", "grapes", "blueberry", "berry"].includes(w)) {
      this.drawGrapes(ctx);
      return true;
    }
    if (["딸기", "산딸기", "논산딸기", "체리", "앵두", "방울토마토", "피망", "대추", "딸기모찌", "딸기탕후루", "strawberry", "cherry"].includes(w)) {
      this.drawStrawberry(ctx);
      return true;
    }
    if (["파인애플", "두리안", "용과", "야자열매", "솔방울", "선인장열매", "수류탄", "배추", "양배추", "상추", "시금치", "깻잎", "파", "샐러리", "아스파라거스", "순무", "비트", "죽순", "pineapple", "durian", "cabbage"].includes(w)) {
      this.drawPineapple(ctx);
      return true;
    }
    if (["호박", "단호박", "늙은호박", "잭오랜턴", "할로윈호박", "파프리카", "곶감", "천혜향", "pumpkin", "paprika", "tangerine", "persimmon"].includes(w)) {
      this.drawPumpkin(ctx);
      return true;
    }
    if (["치즈", "에멘탈치즈", "체다치즈", "모짜렐라치즈", "조각케이크", "피자조각", "수박조각", "삼각자", "쐐기", "미끄럼틀", "경사로", "점프대", "cheese"].includes(w)) {
      this.drawCheese(ctx);
      return true;
    }
    if (["타이어", "바퀴", "굴렁쇠", "수레바퀴", "자동차바퀴", "자전거바퀴", "핸들", "운전대", "조타륜", "튜브", "구명튜브", "도넛방석", "훌라후프", "원판", "바벨원판", "팽이", "요요", "시디", "cd", "dvd", "레코드판", "LP판", "다트판", "과녁", "맨홀뚜껑", "맨홀", "동전", "금화", "은화", "백원", "오백원", "십원", "오십원", "원형방패", "캡틴아메리카방패", "냄비뚜껑", "원반", "프리스비", "부메랑", "손거울", "카메라렌즈", "눈알", "포털", "소용돌이", "도르래", "톱니바퀴", "기어", "베어링", "와셔", "반지", "금반지", "다이아반지", "팔찌", "머리끈", "고무줄", "테이프", "스카치테이프", "청테이프", "두루마리휴지", "휴지", "실타래", "모기향", "양파링", "오징어링", "tire", "wheel", "coin", "cd", "gear", "ring"].includes(w)) {
      this.drawTire(ctx);
      return true;
    }
    if (["당근", "무", "홍당무", "고드름", "확성기", "메가폰", "당근칼", "carrot", "radish", "chili"].includes(w)) {
      this.drawCarrot(ctx);
      return true;
    }
    if (["다이아몬드", "다이아", "보석", "루비", "사파이어", "에메랄드", "자수정", "토파즈", "오팔", "진주", "수정", "크리스탈", "크리스털", "유리", "얼음조각", "광석", "철광석", "금광석", "운석", "보석반지", "큐빅", "샹들리에", "diamond", "gem", "ruby", "sapphire", "emerald", "crystal", "jewel"].includes(w)) {
      this.drawDiamond(ctx);
      return true;
    }
    if (["하트", "심장", "사랑", "마음", "러브", "생명", "목숨", "체력", "피", "키스", "입술", "발렌타인", "좋아요", "하트풍선", "엉덩이", "heart", "love", "kiss"].includes(w)) {
      this.drawHeart(ctx);
      return true;
    }
    if (["태양", "해", "햇님", "햇빛", "태양열", "낮", "아침", "여름", "폭염", "초신성", "항성", "불덩이", "해바라기꽃", "폭발", "섬광", "후광", "sun", "sunshine"].includes(w)) {
      this.drawSun(ctx);
      return true;
    }
    if (["달", "초승달", "그믐달", "반달", "보름달", "달님", "달빛", "밤", "자장가", "잠", "꿈", "바나나보트", "moon", "crescent"].includes(w)) {
      this.drawMoon(ctx);
      return true;
    }
    if (["토성", "행성", "목성", "화성", "지구", "수성", "금성", "천왕성", "해왕성", "명왕성", "외계행성", "우주", "은하", "은하수", "성운", "블랙홀", "화이트홀", "웜홀", "인공위성", "위성", "우주정거장", "태양계", "지구본", "유리구슬", "드래곤볼", "몬스터볼", "포켓몬볼", "마법구슬", "수정구슬", "여의주", "아톰", "원자", "planet", "saturn", "earth", "mars", "jupiter", "galaxy", "blackhole"].includes(w)) {
      this.drawPlanet(ctx);
      return true;
    }
    if (["불", "모닥불", "캠프파이어", "불꽃", "화염", "횃불", "성화", "용암", "마그마", "화산", "산불", "화재", "가스불", "라이터불", "성냥불", "도깨비불", "태양불", "열정", "분노", "지옥불", "장작불", "숯불", "연탄불", "fire", "flame", "campfire", "torch", "lava", "volcano"].includes(w)) {
      this.drawFire(ctx);
      return true;
    }
    if (["번개", "벼락", "낙뢰", "천둥", "천둥번개", "전기", "전류", "감전", "백만볼트", "피카츄", "스파크", "정전기", "번개맨", "토르", "제우스", "에너지", "파워", "충전", "빛", "레이저", "광선", "초능력", "마법", "주문", "비", "소나기", "폭풍", "태풍", "허리케인", "토네이도", "회오리", "바람", "강풍", "돌풍", "눈보라", "우박", "안개", "무지개", "오로라", "노을", "파도", "해일", "쓰나미", "지진", "균열", "lightning", "thunder", "electricity", "spark", "storm"].includes(w)) {
      this.drawLightning(ctx);
      return true;
    }
    if (["유령", "귀신", "처녀귀신", "몽달귀신", "달걀귀신", "강시", "사신", "악령", "영혼", "혼령", "원혼", "폴터가이스트", "할로윈", "캐스퍼", "부우", "요괴", "괴물", "몬스터", "그레이", "슬라임", "액체괴물", "메타몽", "구름괴물", "연기", "한숨", "방귀", "트림", "이불귀신", "만두귀신", "ghost", "spirit", "spook", "halloween", "monster"].includes(w)) {
      this.drawGhost(ctx);
      return true;
    }
    if (["선물", "선물상자", "생일선물", "크리스마스선물", "깜짝선물", "경품", "기념품", "보너스", "축하", "파티", "생일", "기념일", "크리스마스", "화이트데이", "빼빼로데이", "당첨", "행운", "럭키박스", "랜덤박스", "가챠", "보급품", "에어드랍", "gift", "present", "giftbox"].includes(w)) {
      this.drawGift(ctx);
      return true;
    }
    if (["보물", "보물상자", "해적상자", "비밀금고", "보석함", "판도라의상자", "미믹", "유물", "유산", "노다지", "엘도라도", "부자", "재벌", "돈가방", "007가방", "트렁크", "공구함", "구급상자", "약상자", "반짇고리", "도시락통", "찬합", "반찬통", "김치통", "쌀통", "장독", "관", "석관", "모금함", "투표함", "저금통", "돼지저금통", "treasure", "chest", "treasurechest", "vault", "toolbox", "firstaid"].includes(w)) {
      this.drawTreasureChest(ctx);
      return true;
    }
    if (["트로피", "우승컵", "월드컵", "상패", "우승", "1등", "일등", "챔피언", "승리", "성공", "합격", "졸업", "명예", "영광", "금메달", "은메달", "동메달", "메달", "훈장", "성배", "샴페인잔", "칵테일잔", "보물컵", "촛대", "성화대", "화로", "향로", "신전", "기둥", "파르테논", "체스퀸", "체스킹", "전등갓", "trophy", "award", "champion", "winner", "grail"].includes(w)) {
      this.drawTrophy(ctx);
      return true;
    }
    if (["축구공", "축구", "배구공", "배구", "핸드볼", "피구공", "족구공", "골프공", "야구공", "야구", "테니스공", "탁구공", "당구공", "볼링공", "볼링", "포환", "쇠구슬", "구슬", "눈덩이", "눈뭉치", "동그랑땡", "타코야끼", "새알심", "경단", "골프", "soccer", "football", "volleyball", "baseball", "golf", "bowling"].includes(w)) {
      this.drawBall(ctx, "soccer");
      return true;
    }
    if (["농구공", "농구", "럭비공", "럭비", "미식축구공", "탱탱볼", "짐볼", "약공", "메디신볼", "털실", "basketball", "rugby"].includes(w)) {
      this.drawBall(ctx, "basketball");
      return true;
    }
    if (["박스", "상자", "택배", "택배상자", "종이상자", "나무상자", "사과상자", "라면박스", "이삿짐", "이삿짐박스", "수납함", "정리함", "서랍", "블록", "레고", "큐브", "루빅스큐브", "주사위", "마인크래프트", "잔디블록", "TNT", "각설탕", "각얼음", "콘크리트", "시멘트", "컨테이너", "화물", "팔레트", "box", "crate", "cube", "dice", "block", "lego", "package"].includes(w)) {
      this.drawCrate(ctx, w, "#d97706");
      return true;
    }
    return false;
  }

  // ===========================================================================
  // 1. ANIMALS & CREATURES (동물 / 생물)
  // ===========================================================================

  private static drawElephant(ctx: CanvasRenderingContext2D) {
    // Connected body + raised curved trunk + sturdy legs + tail tuft
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(60, 48);
    ctx.quadraticCurveTo(124, 38, 178, 52);
    ctx.quadraticCurveTo(208, 62, 208, 102);
    // Tail on right
    ctx.lineTo(222, 118);
    ctx.lineTo(206, 126);
    // Rear leg
    ctx.lineTo(204, 168);
    ctx.lineTo(164, 168);
    ctx.lineTo(162, 134);
    // Belly curve
    ctx.quadraticCurveTo(132, 140, 106, 134);
    // Front leg
    ctx.lineTo(104, 168);
    ctx.lineTo(64, 168);
    ctx.lineTo(64, 122);
    // Curved trunk on left
    ctx.lineTo(44, 122);
    ctx.quadraticCurveTo(14, 122, 14, 88);
    ctx.quadraticCurveTo(14, 66, 34, 66);
    ctx.lineTo(36, 88);
    ctx.lineTo(46, 88);
    ctx.quadraticCurveTo(44, 54, 60, 48);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Back glossy highlight & lower belly shadow
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.ellipse(134, 58, 34, 8, 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.roundRect(70, 118, 126, 14, 7);
    ctx.fill();

    // Ivory toenails on both feet
    ctx.fillStyle = "#f8fafc";
    for (const nx of [69, 82, 95, 169, 182, 195]) {
      ctx.beginPath();
      ctx.arc(nx, 165, 5.5, Math.PI, 0, false);
      ctx.fill();
      ctx.stroke();
    }

    // Gleaming Ivory Tusk
    ctx.fillStyle = "#fefce8";
    ctx.beginPath();
    ctx.moveTo(68, 108);
    ctx.quadraticCurveTo(38, 116, 30, 96);
    ctx.quadraticCurveTo(48, 94, 68, 96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Large Floppy Ear with inner pink fold
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.ellipse(110, 88, 26, 32, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.ellipse(107, 91, 14, 20, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Trunk wrinkles
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(24, 96);
    ctx.lineTo(38, 96);
    ctx.moveTo(26, 106);
    ctx.lineTo(42, 106);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    this.drawCuteEye(ctx, 64, 78, 6.5);
    this.drawCheek(ctx, 74, 90, 7.5);
  }

  private static drawHippo(ctx: CanvasRenderingContext2D) {
    // Chubby lavender-gray hippo with huge snout & nostrils
    this.drawUnion(ctx, "#a78bfa", (emit) => {
      // Ears on top
      ctx.beginPath();
      ctx.arc(88, 42, 14, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(132, 42, 14, 0, Math.PI * 2);
      emit();
      // Big body + legs
      ctx.beginPath();
      ctx.roundRect(68, 44, 144, 98, 34);
      emit();
      ctx.beginPath();
      ctx.roundRect(80, 128, 36, 38, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(160, 128, 36, 38, 10);
      emit();
      // Big bulbous snout on left
      ctx.beginPath();
      ctx.roundRect(20, 68, 76, 68, 28);
      emit();
    });

    // Pinkish muzzle front
    ctx.fillStyle = "#c4b5fd";
    ctx.beginPath();
    ctx.roundRect(20, 68, 72, 66, 26);
    ctx.fill();
    ctx.stroke();

    // Two big nostrils on snout
    ctx.fillStyle = "#4c1d95";
    ctx.beginPath();
    ctx.ellipse(42, 88, 6, 9, -0.2, 0, Math.PI * 2);
    ctx.ellipse(66, 88, 6, 9, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Cute square hippo teeth
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(34, 122, 12, 10);
    ctx.strokeRect(34, 122, 12, 10);
    ctx.fillRect(56, 122, 12, 10);
    ctx.strokeRect(56, 122, 12, 10);

    this.drawCuteEye(ctx, 94, 72, 6);
    this.drawCheek(ctx, 106, 86, 7);
  }

  private static drawRhino(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    // Front horn + second horn + armored body
    ctx.moveTo(16, 88);
    ctx.lineTo(28, 42);
    ctx.lineTo(48, 72);
    ctx.lineTo(56, 54);
    ctx.lineTo(70, 70);
    ctx.lineTo(94, 42);
    ctx.lineTo(196, 48);
    ctx.quadraticCurveTo(218, 56, 214, 118);
    ctx.lineTo(204, 166);
    ctx.lineTo(166, 166);
    ctx.lineTo(164, 136);
    ctx.lineTo(106, 136);
    ctx.lineTo(104, 166);
    ctx.lineTo(66, 166);
    ctx.lineTo(64, 126);
    ctx.lineTo(22, 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ivory horns
    ctx.fillStyle = "#fefce8";
    ctx.beginPath();
    ctx.moveTo(18, 86);
    ctx.lineTo(28, 42);
    ctx.lineTo(48, 76);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Armor fold lines
    ctx.strokeStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(112, 50);
    ctx.lineTo(108, 128);
    ctx.moveTo(166, 52);
    ctx.lineTo(168, 128);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;

    this.drawCuteEye(ctx, 68, 92, 6);
  }

  private static drawGiraffe(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    // Snout left
    ctx.moveTo(28, 34);
    ctx.lineTo(54, 22);
    // Ossicone horns
    ctx.lineTo(58, 8);
    ctx.lineTo(72, 8);
    ctx.lineTo(74, 22);
    // Ear
    ctx.lineTo(96, 20);
    ctx.lineTo(88, 36);
    // Long neck down to back
    ctx.lineTo(96, 90);
    ctx.lineTo(188, 90);
    ctx.quadraticCurveTo(208, 90, 208, 112);
    ctx.lineTo(208, 174);
    ctx.lineTo(176, 174);
    ctx.lineTo(174, 134);
    ctx.lineTo(106, 134);
    ctx.lineTo(104, 174);
    ctx.lineTo(70, 174);
    ctx.lineTo(68, 52);
    ctx.lineTo(28, 48);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cream muzzle
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.roundRect(26, 30, 28, 20, 8);
    ctx.fill();
    ctx.stroke();

    // Horn tips
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.arc(65, 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Brown Mane along neck
    ctx.fillStyle = "#92400e";
    for (let y = 38; y <= 80; y += 14) {
      ctx.beginPath();
      ctx.roundRect(88, y, 11, 11, 3);
      ctx.fill();
      ctx.stroke();
    }

    // Chestnut Giraffe Patches
    ctx.fillStyle = "#b45309";
    for (const [sx, sy, sr] of [
      [78, 54, 6.5],
      [80, 74, 7.5],
      [82, 98, 7],
      [84, 120, 6.5],
      [116, 108, 11],
      [148, 104, 9.5],
      [180, 110, 9],
      [134, 122, 7],
      [164, 122, 6.5],
    ]) {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dark Hooves
    ctx.fillStyle = "#78350f";
    ctx.fillRect(70, 162, 34, 12);
    ctx.strokeRect(70, 162, 34, 12);
    ctx.fillRect(176, 162, 32, 12);
    ctx.strokeRect(176, 162, 32, 12);

    this.drawCuteEye(ctx, 60, 34, 5.5);
    this.drawCheek(ctx, 50, 43, 5.5);
  }

  private static drawWhale(ctx: CanvasRenderingContext2D) {
    // Ocean-blue whale with water spout & raised tail fluke
    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.moveTo(20, 128);
    ctx.quadraticCurveTo(16, 52, 96, 50);
    // Connected water spout puff on top
    ctx.lineTo(94, 30);
    ctx.quadraticCurveTo(76, 12, 104, 14);
    ctx.quadraticCurveTo(132, 12, 114, 30);
    ctx.lineTo(114, 52);
    ctx.quadraticCurveTo(148, 58, 168, 92);
    // Tail fluke
    ctx.lineTo(194, 44);
    ctx.lineTo(222, 54);
    ctx.lineTo(206, 98);
    ctx.lineTo(224, 124);
    ctx.lineTo(194, 136);
    ctx.lineTo(168, 118);
    ctx.quadraticCurveTo(135, 148, 20, 128);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cyan water fountain puff
    this.drawUnion(ctx, "#bae6fd", (emit) => {
      ctx.beginPath();
      ctx.arc(94, 24, 12, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(114, 24, 12, 0, Math.PI * 2);
      emit();
    });

    // Glossy back highlight
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.ellipse(68, 66, 24, 7, -0.25, 0, Math.PI * 2);
    ctx.fill();

    // Pleated cream-white belly
    ctx.fillStyle = "#e0f2fe";
    ctx.beginPath();
    ctx.moveTo(22, 126);
    ctx.quadraticCurveTo(88, 104, 152, 122);
    ctx.quadraticCurveTo(96, 144, 22, 126);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(38, 121);
    ctx.quadraticCurveTo(86, 114, 134, 123);
    ctx.moveTo(48, 129);
    ctx.quadraticCurveTo(88, 124, 122, 130);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Pectoral flipper
    ctx.fillStyle = "#0369a1";
    ctx.beginPath();
    ctx.ellipse(102, 128, 20, 10, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 56, 90, 6.5);
    this.drawCheek(ctx, 68, 100, 7);
  }

  private static drawShark(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.moveTo(16, 104);
    ctx.quadraticCurveTo(54, 62, 104, 64);
    // Tall Dorsal Fin
    ctx.lineTo(124, 20);
    ctx.lineTo(148, 66);
    ctx.lineTo(186, 84);
    // Tail Fin
    ctx.lineTo(218, 46);
    ctx.lineTo(206, 98);
    ctx.lineTo(220, 140);
    ctx.lineTo(184, 114);
    ctx.quadraticCurveTo(115, 144, 16, 104);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // White counter-shaded belly
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(22, 104);
    ctx.quadraticCurveTo(96, 94, 176, 112);
    ctx.quadraticCurveTo(106, 138, 22, 104);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Sharp toothy grin
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(34, 104);
    ctx.lineTo(42, 115);
    ctx.lineTo(50, 104);
    ctx.lineTo(58, 115);
    ctx.lineTo(66, 104);
    ctx.lineTo(74, 115);
    ctx.lineTo(82, 104);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 3 Gill slits
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 3.5;
    for (const gx of [94, 104, 114]) {
      ctx.beginPath();
      ctx.moveTo(gx, 82);
      ctx.lineTo(gx - 3, 102);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    this.drawCuteEye(ctx, 56, 82, 6);
  }

  private static drawFish(ctx: CanvasRenderingContext2D, isTaiyaki: boolean) {
    if (isTaiyaki) {
      // Golden waffle mold frame for Bungeoppang (붕어빵)
      ctx.fillStyle = "#fde68a";
      ctx.beginPath();
      ctx.roundRect(18, 34, 204, 122, 26);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = isTaiyaki ? "#d97706" : "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(22, 96);
    ctx.quadraticCurveTo(64, 42, 114, 46);
    // Dorsal fin
    ctx.lineTo(132, 26);
    ctx.lineTo(154, 58);
    ctx.lineTo(176, 76);
    // Tail fin
    ctx.lineTo(218, 44);
    ctx.lineTo(206, 96);
    ctx.lineTo(218, 148);
    ctx.lineTo(176, 116);
    ctx.quadraticCurveTo(126, 148, 66, 140);
    ctx.quadraticCurveTo(36, 128, 22, 96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (isTaiyaki) {
      // Sweet red bean (팥) peek + waffle grill lines
      ctx.fillStyle = "#7f1d1d";
      ctx.beginPath();
      ctx.ellipse(122, 96, 28, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      // Coral orange pectoral fin & scale arcs
      ctx.fillStyle = "#fb923c";
      ctx.beginPath();
      ctx.ellipse(116, 100, 22, 14, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(82, 96, 28, -0.7, 0.7, false);
      ctx.stroke();
    }

    this.drawCuteEye(ctx, 56, 86, 7);
    this.drawCheek(ctx, 68, 98, 6.5);
  }

  private static drawTurtle(ctx: CanvasRenderingContext2D) {
    // Connected body + raised cute head + dome shell + flippers
    ctx.fillStyle = "#4ade80";
    ctx.beginPath();
    ctx.moveTo(16, 128);
    ctx.lineTo(36, 118);
    ctx.arc(106, 122, 68, Math.PI, 0, false);
    // Head poking out right
    ctx.lineTo(198, 88);
    ctx.quadraticCurveTo(226, 88, 226, 112);
    ctx.quadraticCurveTo(226, 134, 196, 134);
    ctx.lineTo(174, 134);
    // Front leg
    ctx.lineTo(172, 164);
    ctx.lineTo(138, 164);
    ctx.lineTo(136, 144);
    ctx.lineTo(84, 144);
    // Back leg
    ctx.lineTo(82, 164);
    ctx.lineTo(48, 164);
    ctx.lineTo(46, 140);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Emerald Dome Shell
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.arc(106, 124, 66, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Hexagonal scute plates on shell
    ctx.fillStyle = "#166534";
    ctx.beginPath();
    ctx.roundRect(82, 72, 48, 28, 8);
    ctx.roundRect(48, 86, 28, 24, 6);
    ctx.roundRect(136, 86, 28, 24, 6);
    ctx.fill();
    ctx.stroke();

    // Golden Shell Rim
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.roundRect(34, 116, 144, 16, 8);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 204, 104, 6);
    this.drawCheek(ctx, 196, 116, 5.5);
  }

  private static drawSnail(ctx: CanvasRenderingContext2D) {
    // Soft snail foot + eye stalks
    this.drawUnion(ctx, "#86efac", (emit) => {
      ctx.beginPath();
      ctx.roundRect(18, 116, 198, 38, 18);
      emit();
      ctx.beginPath();
      ctx.roundRect(174, 52, 14, 72, 7);
      emit();
      ctx.beginPath();
      ctx.roundRect(196, 58, 14, 66, 7);
      emit();
    });

    // Spiral shell
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(104, 92, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#fef3c7";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(104, 92, 34, 0, Math.PI * 1.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(104, 92, 16, 0, Math.PI * 1.5);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    this.drawCuteEye(ctx, 181, 52, 5);
    this.drawCuteEye(ctx, 203, 58, 5);
  }

  private static drawSnake(ctx: CanvasRenderingContext2D) {
    // Undulating S-curve snake with raised head & forked tongue
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.moveTo(22, 82);
    ctx.quadraticCurveTo(22, 42, 60, 42);
    ctx.quadraticCurveTo(92, 42, 92, 78);
    ctx.lineTo(192, 78);
    ctx.quadraticCurveTo(224, 78, 224, 104);
    ctx.quadraticCurveTo(224, 128, 192, 128);
    ctx.lineTo(46, 128);
    ctx.quadraticCurveTo(22, 128, 22, 82);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ribbed yellow belly stripe
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.roundRect(36, 108, 172, 16, 8);
    ctx.fill();
    ctx.stroke();

    // Diamond dorsal spots
    ctx.fillStyle = "#15803d";
    for (let x = 98; x <= 188; x += 28) {
      ctx.beginPath();
      ctx.arc(x, 92, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    this.drawCuteEye(ctx, 48, 64, 6.5);
    this.drawCheek(ctx, 62, 74, 6);
  }

  private static drawCat(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    // Pointy ears + plump body + upright curled tail
    ctx.moveTo(46, 68);
    ctx.lineTo(52, 20);
    ctx.lineTo(86, 46);
    ctx.lineTo(132, 46);
    ctx.lineTo(166, 20);
    ctx.lineTo(172, 68);
    ctx.quadraticCurveTo(186, 92, 178, 122);
    // Upright tail connected on right
    ctx.lineTo(196, 62);
    ctx.quadraticCurveTo(216, 52, 216, 78);
    ctx.lineTo(198, 158);
    ctx.lineTo(42, 158);
    ctx.quadraticCurveTo(32, 108, 46, 68);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Pink inner ears
    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.moveTo(55, 56);
    ctx.lineTo(58, 32);
    ctx.lineTo(76, 50);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(163, 56);
    ctx.lineTo(160, 32);
    ctx.lineTo(142, 50);
    ctx.closePath();
    ctx.fill();

    // Tabby forehead stripes
    ctx.fillStyle = "#c2410c";
    ctx.fillRect(104, 48, 10, 18);
    ctx.fillRect(88, 52, 8, 13);
    ctx.fillRect(122, 52, 8, 13);

    // Fluffy white chest patch & paws
    ctx.fillStyle = "#fff7ed";
    ctx.beginPath();
    ctx.ellipse(109, 134, 36, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 80, 84, 7.5);
    this.drawCuteEye(ctx, 138, 84, 7.5);
    this.drawCheek(ctx, 66, 96, 7.5);
    this.drawCheek(ctx, 152, 96, 7.5);

    // Pink nose & ω mouth
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.moveTo(102, 92);
    ctx.lineTo(116, 92);
    ctx.lineTo(109, 100);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(103, 102, 6, 0, Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(115, 102, 6, 0, Math.PI, false);
    ctx.stroke();

    // Whiskers
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(48, 90);
    ctx.lineTo(68, 93);
    ctx.moveTo(46, 100);
    ctx.lineTo(68, 100);
    ctx.moveTo(150, 93);
    ctx.lineTo(170, 90);
    ctx.moveTo(150, 100);
    ctx.lineTo(172, 100);
    ctx.stroke();
    ctx.lineWidth = 5.5;
  }

  private static drawDog(ctx: CanvasRenderingContext2D) {
    // Plump golden-tan puppy body & perky wagging tail (unified outline)
    this.drawUnion(ctx, "#f59e0b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(170, 68, 36, 26, 13);
      emit();
      ctx.beginPath();
      ctx.roundRect(46, 40, 136, 118, 34);
      emit();
    });

    // Floppy dark-brown ears (each on its own path)
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.ellipse(46, 80, 17, 34, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(182, 80, 17, 34, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Soft cream Shiba eyebrow spots (separate subpaths, unstroked so no black line connects them)
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.ellipse(88, 62, 8.5, 5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(140, 62, 8.5, 5, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Plump cream muzzle (its own clean path)
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.ellipse(114, 106, 34, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Red Collar + Gold Bell
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(60, 132, 108, 14, 7);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(114, 146, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Rosy cheeks & sparkling eyes
    this.drawCheek(ctx, 68, 94, 7.5);
    this.drawCheek(ctx, 160, 94, 7.5);
    this.drawCuteEye(ctx, 86, 80, 7);
    this.drawCuteEye(ctx, 142, 80, 7);

    // Happy pink tongue peeking out + ω puppy smile + nose
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(114, 111, 8, 0, Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(107, 104, 7, 0, Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(121, 104, 7, 0, Math.PI, false);
    ctx.stroke();
    ctx.lineWidth = 5.5;

    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.ellipse(114, 96, 9, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawRabbit(ctx: CanvasRenderingContext2D) {
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(72, 10, 30, 74, 15);
      emit();
      ctx.beginPath();
      ctx.roundRect(130, 10, 30, 74, 15);
      emit();
      ctx.beginPath();
      ctx.arc(184, 138, 20, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(50, 62, 132, 104, 44);
      emit();
    });

    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.roundRect(80, 20, 14, 46, 7);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(138, 20, 14, 46, 7);
    ctx.fill();

    this.drawCuteEye(ctx, 90, 104, 7);
    this.drawCuteEye(ctx, 142, 104, 7);
    this.drawCheek(ctx, 74, 116, 8.5);
    this.drawCheek(ctx, 158, 116, 8.5);

    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(116, 112, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawBear(ctx: CanvasRenderingContext2D, isPanda: boolean) {
    const mainColor = isPanda ? "#f8fafc" : "#92400e";
    const earColor = isPanda ? "#0f172a" : "#78350f";

    ctx.fillStyle = earColor;
    ctx.beginPath();
    ctx.arc(62, 40, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(178, 40, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.arc(62, 40, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(178, 40, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.roundRect(40, 38, 160, 128, 46);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPanda ? "#e2e8f0" : "#fde68a";
    ctx.beginPath();
    ctx.ellipse(120, 104, 30, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (isPanda) {
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.ellipse(88, 82, 15, 19, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(152, 82, 15, 19, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    this.drawCuteEye(ctx, 88, 82, 6.5);
    this.drawCuteEye(ctx, 152, 82, 6.5);
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.ellipse(120, 96, 9, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawPig(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.moveTo(52, 46);
    ctx.lineTo(42, 20);
    ctx.lineTo(78, 36);
    ctx.lineTo(162, 36);
    ctx.lineTo(198, 20);
    ctx.lineTo(188, 46);
    ctx.quadraticCurveTo(208, 95, 192, 158);
    ctx.lineTo(48, 158);
    ctx.quadraticCurveTo(32, 95, 52, 46);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Prominent Pig Snout
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.ellipse(120, 104, 30, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#881337";
    ctx.beginPath();
    ctx.ellipse(109, 104, 5.5, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(131, 104, 5.5, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    this.drawCuteEye(ctx, 82, 76, 7);
    this.drawCuteEye(ctx, 158, 76, 7);
    this.drawCheek(ctx, 68, 92, 7.5);
    this.drawCheek(ctx, 172, 92, 7.5);
  }

  private static drawCow(ctx: CanvasRenderingContext2D) {
    // Horns + White Cow Body + Black Spots + Pink Muzzle
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(68, 32, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(172, 32, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(42, 38, 156, 124, 38);
    ctx.fill();
    ctx.stroke();

    // Black Holstein spots
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(70, 68, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(168, 86, 22, 0, Math.PI * 2);
    ctx.fill();

    // Big Pink Muzzle
    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.roundRect(66, 102, 108, 44, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#881337";
    ctx.beginPath();
    ctx.arc(96, 122, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(144, 122, 5, 0, Math.PI * 2);
    ctx.fill();

    this.drawCuteEye(ctx, 88, 78, 6.5);
    this.drawCuteEye(ctx, 152, 78, 6.5);
  }

  private static drawFrog(ctx: CanvasRenderingContext2D) {
    this.drawUnion(ctx, "#22c55e", (emit) => {
      ctx.beginPath();
      ctx.arc(82, 46, 26, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(158, 46, 26, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(36, 54, 168, 104, 44);
      emit();
    });

    ctx.fillStyle = "#bbf7d0";
    ctx.beginPath();
    ctx.ellipse(120, 124, 56, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(82, 46, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(158, 46, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 82, 46, 8.5);
    this.drawCuteEye(ctx, 158, 46, 8.5);
    this.drawCheek(ctx, 62, 94, 9);
    this.drawCheek(ctx, 178, 94, 9);

    ctx.beginPath();
    ctx.arc(120, 88, 38, 0.2, Math.PI - 0.2, false);
    ctx.stroke();
  }

  private static drawDino(ctx: CanvasRenderingContext2D) {
    // T-Rex with orange dorsal plates & teeth
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(118, 28);
    ctx.lineTo(136, 12);
    ctx.lineTo(142, 38);
    ctx.lineTo(164, 28);
    ctx.lineTo(162, 58);
    ctx.lineTo(186, 54);
    ctx.lineTo(176, 88);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.moveTo(42, 30);
    ctx.lineTo(126, 30);
    ctx.lineTo(172, 88);
    ctx.lineTo(216, 134);
    ctx.lineTo(166, 166);
    ctx.lineTo(72, 166);
    ctx.lineTo(72, 96);
    ctx.lineTo(42, 96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Teeth
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(46, 70);
    ctx.lineTo(54, 82);
    ctx.lineTo(62, 70);
    ctx.lineTo(70, 82);
    ctx.lineTo(78, 70);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Belly patch
    ctx.fillStyle = "#86efac";
    ctx.beginPath();
    ctx.roundRect(76, 102, 38, 54, 14);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 76, 50, 7);
  }

  private static drawBird(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(12, 76);
    ctx.quadraticCurveTo(64, 34, 120, 64);
    ctx.quadraticCurveTo(176, 34, 228, 76);
    ctx.quadraticCurveTo(190, 124, 148, 116);
    ctx.lineTo(120, 146);
    ctx.lineTo(92, 116);
    ctx.quadraticCurveTo(50, 124, 12, 76);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#e0f2fe";
    ctx.beginPath();
    ctx.arc(120, 94, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(108, 88);
    ctx.lineTo(132, 88);
    ctx.lineTo(120, 108);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 98, 80, 6);
    this.drawCuteEye(ctx, 142, 80, 6);
  }

  private static drawDuck(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(46, 68);
    ctx.quadraticCurveTo(46, 22, 92, 22);
    ctx.quadraticCurveTo(136, 22, 128, 72);
    ctx.lineTo(188, 72);
    ctx.lineTo(206, 54);
    ctx.quadraticCurveTo(214, 118, 178, 154);
    ctx.lineTo(56, 154);
    ctx.quadraticCurveTo(32, 122, 46, 68);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.roundRect(16, 52, 40, 24, 11);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#eab308";
    ctx.beginPath();
    ctx.ellipse(128, 112, 36, 20, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 76, 50, 7);
    this.drawCheek(ctx, 88, 62, 6.5);
  }

  private static drawPenguin(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(54, 20, 132, 146, 58);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(74, 56, 92, 100, 42);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.roundRect(66, 152, 38, 16, 8);
    ctx.roundRect(136, 152, 38, 16, 8);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(106, 62);
    ctx.lineTo(134, 62);
    ctx.lineTo(120, 78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 94, 50, 6.5);
    this.drawCuteEye(ctx, 146, 50, 6.5);
    this.drawCheek(ctx, 80, 62, 6.5);
    this.drawCheek(ctx, 160, 62, 6.5);
  }

  private static drawOctopus(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(120, 78, 56, Math.PI, 0, false);
    ctx.lineTo(200, 146);
    ctx.quadraticCurveTo(178, 164, 156, 146);
    ctx.quadraticCurveTo(138, 164, 120, 146);
    ctx.quadraticCurveTo(102, 164, 84, 146);
    ctx.quadraticCurveTo(62, 164, 40, 146);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.ellipse(90, 46, 18, 10, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fecdd3";
    for (const sx of [62, 94, 120, 146, 178]) {
      ctx.beginPath();
      ctx.arc(sx, 140, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    this.drawCuteEye(ctx, 96, 82, 7.5);
    this.drawCuteEye(ctx, 144, 82, 7.5);

    ctx.fillStyle = "#be123c";
    ctx.beginPath();
    ctx.arc(120, 98, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawCrab(ctx: CanvasRenderingContext2D) {
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.arc(48, 50, 26, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(192, 50, 26, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(40, 56, 160, 92, 38);
      emit();
    });

    this.drawCuteEye(ctx, 94, 82, 7.5);
    this.drawCuteEye(ctx, 146, 82, 7.5);
    this.drawCheek(ctx, 78, 96, 7.5);
    this.drawCheek(ctx, 162, 96, 7.5);
  }

  // ===========================================================================
  // 2. VEHICLES & MACHINES (탈것 / 기계)
  // ===========================================================================

  private static drawCar(
    ctx: CanvasRenderingContext2D,
    mode: "sedan" | "taxi" | "police"
  ) {
    // Roof sign / siren if taxi or police
    if (mode === "taxi" || mode === "police") {
      ctx.fillStyle = mode === "taxi" ? "#facc15" : "#ef4444";
      ctx.beginPath();
      ctx.roundRect(102, 28, 38, 18, 6);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle =
      mode === "taxi" ? "#facc15" : mode === "police" ? "#1e293b" : "#ef4444";
    ctx.beginPath();
    ctx.moveTo(16, 128);
    ctx.lineTo(16, 90);
    ctx.lineTo(54, 82);
    ctx.lineTo(80, 44);
    ctx.lineTo(164, 44);
    ctx.lineTo(190, 82);
    ctx.lineTo(224, 90);
    ctx.lineTo(224, 128);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (mode === "police") {
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(76, 84, 92, 42);
      ctx.strokeRect(76, 84, 92, 42);
    }

    // Dual Tinted Windows with diagonal shine
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(80, 54, 38, 28, 5);
    ctx.roundRect(124, 54, 42, 28, 5);
    ctx.fill();
    ctx.stroke();

    // Headlight & Taillight
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.roundRect(208, 96, 14, 14, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.roundRect(16, 96, 12, 14, 4);
    ctx.fill();
    ctx.stroke();

    this.drawWheel(ctx, 68, 132, 25);
    this.drawWheel(ctx, 172, 132, 25);
  }

  private static drawBus(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(12, 40, 216, 98, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.fillRect(15, 102, 210, 14);
    ctx.strokeRect(15, 102, 210, 14);

    ctx.fillStyle = "#bae6fd";
    for (let x = 26; x <= 176; x += 48) {
      ctx.beginPath();
      ctx.roundRect(x, 54, 36, 36, 6);
      ctx.fill();
      ctx.stroke();
    }

    this.drawWheel(ctx, 60, 140, 23);
    this.drawWheel(ctx, 180, 140, 23);
  }

  private static drawTrain(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(14, 136);
    ctx.lineTo(14, 46);
    ctx.lineTo(176, 46);
    ctx.quadraticCurveTo(226, 46, 228, 136);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#2563eb";
    ctx.fillRect(16, 98, 206, 18);
    ctx.strokeRect(16, 98, 206, 18);

    ctx.fillStyle = "#38bdf8";
    for (let x = 28; x <= 148; x += 46) {
      ctx.beginPath();
      ctx.roundRect(x, 58, 34, 28, 5);
      ctx.fill();
      ctx.stroke();
    }

    this.drawWheel(ctx, 56, 142, 20);
    this.drawWheel(ctx, 168, 142, 20);
  }

  private static drawAirplane(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(16, 92);
    ctx.lineTo(46, 36);
    ctx.lineTo(74, 72);
    ctx.lineTo(176, 72);
    ctx.quadraticCurveTo(226, 72, 226, 98);
    ctx.quadraticCurveTo(226, 120, 176, 120);
    ctx.lineTo(146, 150);
    ctx.lineTo(94, 150);
    ctx.lineTo(106, 120);
    ctx.lineTo(28, 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath();
    ctx.moveTo(26, 80);
    ctx.lineTo(46, 40);
    ctx.lineTo(68, 72);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(182, 82, 30, 14, 6);
    ctx.fill();
    ctx.stroke();

    for (let x = 86; x <= 162; x += 24) {
      ctx.beginPath();
      ctx.arc(x, 90, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawHelicopter(ctx: CanvasRenderingContext2D) {
    this.drawUnion(ctx, "#0ea5e9", (emit) => {
      ctx.beginPath();
      ctx.roundRect(22, 22, 196, 12, 6);
      emit();
      ctx.beginPath();
      ctx.rect(112, 32, 16, 22);
      emit();
      ctx.beginPath();
      ctx.roundRect(16, 74, 66, 22, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(62, 50, 138, 84, 38);
      emit();
      ctx.beginPath();
      ctx.rect(86, 130, 12, 22);
      emit();
      ctx.beginPath();
      ctx.rect(152, 130, 12, 22);
      emit();
      ctx.beginPath();
      ctx.roundRect(56, 148, 140, 12, 6);
      emit();
    });

    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(128, 60, 62, 46, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(28, 85, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawUfo(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#67e8f9";
    ctx.beginPath();
    ctx.arc(120, 84, 52, Math.PI, 0, false);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#4ade80";
    ctx.beginPath();
    ctx.arc(120, 66, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    this.drawCuteEye(ctx, 111, 64, 5);
    this.drawCuteEye(ctx, 129, 64, 5);

    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.ellipse(120, 98, 104, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const lights = [
      [52, 98, "#facc15"],
      [86, 106, "#ec4899"],
      [120, 108, "#22c55e"],
      [154, 106, "#ec4899"],
      [188, 98, "#facc15"],
    ] as const;
    for (const [lx, ly, col] of lights) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(lx, ly, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawBoat(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(66, 36, 98, 46, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(102, 14, 28, 24);
    ctx.strokeRect(102, 14, 28, 24);

    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.moveTo(14, 78);
    ctx.lineTo(226, 78);
    ctx.lineTo(188, 154);
    ctx.lineTo(52, 154);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    for (const px of [78, 120, 162]) {
      ctx.beginPath();
      ctx.arc(px, 112, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawBicycle(ctx: CanvasRenderingContext2D) {
    // Two bicycle wheels with light sky-blue inner wheel rims so the silhouette is solid
    for (const wx of [66, 174]) {
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(wx, 124, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(wx, 124, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Sporty emerald diamond frame tubes + fork + chainstay
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const drawFrame = () => {
      ctx.beginPath();
      // Rear triangle: rear hub (66,124) -> bottom bracket (114,124) -> seat post (90,64) -> rear hub
      ctx.moveTo(66, 124);
      ctx.lineTo(114, 124);
      ctx.lineTo(90, 64);
      ctx.closePath();
      // Main triangle: seat post (90,64) -> head tube (154,64) -> bottom bracket (114,124)
      ctx.moveTo(90, 64);
      ctx.lineTo(154, 64);
      ctx.lineTo(114, 124);
      // Front fork + stem: front hub (174,124) -> head tube (154,64) -> handlebars (148,42)
      ctx.moveTo(174, 124);
      ctx.lineTo(154, 64);
      ctx.lineTo(148, 42);
      // Seat post up to saddle
      ctx.moveTo(90, 64);
      ctx.lineTo(84, 46);
      ctx.stroke();
    };
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 18;
    drawFrame();
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 8.5;
    drawFrame();
    ctx.restore();

    // Saddle, handlebars & crankset gear
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(66, 38, 36, 12, 6);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(136, 34, 28, 11, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.arc(114, 124, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawTank(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.roundRect(20, 108, 196, 54, 26);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    for (let x = 52; x <= 184; x += 44) {
      ctx.beginPath();
      ctx.arc(x, 135, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = "#4d7c0f";
    ctx.beginPath();
    ctx.moveTo(16, 112);
    ctx.lineTo(36, 80);
    ctx.lineTo(200, 80);
    ctx.lineTo(220, 112);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawUnion(ctx, "#3f6212", (emit) => {
      ctx.beginPath();
      ctx.roundRect(60, 40, 98, 44, 14);
      emit();
      ctx.beginPath();
      ctx.rect(154, 52, 74, 16);
      emit();
      ctx.beginPath();
      ctx.roundRect(216, 48, 14, 24, 4);
      emit();
    });

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(110, 62, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawRocket(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(80, 110);
    ctx.lineTo(42, 164);
    ctx.lineTo(84, 158);
    ctx.moveTo(160, 110);
    ctx.lineTo(198, 164);
    ctx.lineTo(156, 158);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(120, 12);
    ctx.quadraticCurveTo(164, 54, 160, 160);
    ctx.lineTo(80, 160);
    ctx.quadraticCurveTo(76, 54, 120, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(120, 12);
    ctx.quadraticCurveTo(148, 38, 150, 56);
    ctx.lineTo(90, 56);
    ctx.quadraticCurveTo(92, 38, 120, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(120, 92, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // ===========================================================================
  // 3. FURNITURE, HOUSEHOLD & ARCHITECTURE
  // ===========================================================================

  private static drawStairs(ctx: CanvasRenderingContext2D) {
    // 4-step stone & oak staircase polygon
    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.moveTo(20, 168);
    ctx.lineTo(20, 130);
    ctx.lineTo(70, 130);
    ctx.lineTo(70, 94);
    ctx.lineTo(120, 94);
    ctx.lineTo(120, 58);
    ctx.lineTo(170, 58);
    ctx.lineTo(170, 22);
    ctx.lineTo(220, 22);
    ctx.lineTo(220, 168);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Brick/stone mortar lines inside the body
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(70, 130);
    ctx.lineTo(220, 130);
    ctx.moveTo(120, 94);
    ctx.lineTo(220, 94);
    ctx.moveTo(170, 58);
    ctx.lineTo(220, 58);
    ctx.moveTo(120, 130);
    ctx.lineTo(120, 168);
    ctx.moveTo(170, 94);
    ctx.lineTo(170, 130);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Overhanging golden oak tread planks on each step
    ctx.fillStyle = "#fde047";
    for (const [sx, sy] of [
      [18, 128],
      [68, 92],
      [118, 56],
      [168, 20],
    ]) {
      ctx.beginPath();
      ctx.roundRect(sx, sy, 54, 13, 4);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawChair(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#9333ea";
    ctx.beginPath();
    ctx.moveTo(46, 22);
    ctx.lineTo(84, 22);
    ctx.lineTo(84, 96);
    ctx.lineTo(186, 96);
    ctx.lineTo(186, 168);
    ctx.lineTo(154, 168);
    ctx.lineTo(154, 136);
    ctx.lineTo(80, 136);
    ctx.lineTo(80, 168);
    ctx.lineTo(46, 168);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Finial knob on backrest post & wood grain highlight
    ctx.fillStyle = "#c084fc";
    ctx.beginPath();
    ctx.arc(65, 20, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(54, 34, 8, 56);

    // Plush tufted pink seat cushion
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.roundRect(76, 82, 112, 20, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fbcfe8";
    ctx.fillRect(90, 86, 80, 5);
  }

  private static drawTable(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.moveTo(14, 46);
    ctx.lineTo(226, 46);
    ctx.lineTo(226, 90);
    ctx.lineTo(202, 90);
    ctx.lineTo(202, 166);
    ctx.lineTo(172, 166);
    ctx.lineTo(172, 90);
    ctx.lineTo(68, 90);
    ctx.lineTo(68, 166);
    ctx.lineTo(38, 166);
    ctx.lineTo(38, 90);
    ctx.lineTo(14, 90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Beveled oak tabletop
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(12, 44, 216, 18, 6);
    ctx.fill();
    ctx.stroke();

    // Two drawers with brass knobs
    ctx.fillStyle = "#92400e";
    ctx.fillRect(46, 66, 68, 18);
    ctx.strokeRect(46, 66, 68, 18);
    ctx.fillRect(126, 66, 68, 18);
    ctx.strokeRect(126, 66, 68, 18);

    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(80, 75, 4, 0, Math.PI * 2);
    ctx.arc(160, 75, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawSofa(ctx: CanvasRenderingContext2D) {
    // Wooden bun feet + sofa body
    for (const fx of [28, 188]) {
      ctx.fillStyle = "#78350f";
      ctx.beginPath();
      ctx.roundRect(fx, 142, 24, 20, 6);
      ctx.fill();
      ctx.stroke();
    }

    this.drawUnion(ctx, "#10b981", (emit) => {
      ctx.beginPath();
      ctx.roundRect(38, 36, 164, 82, 24);
      emit();
      ctx.beginPath();
      ctx.roundRect(14, 72, 212, 78, 24);
      emit();
    });

    // Tufted button dimples on backrest
    ctx.fillStyle = "#047857";
    for (const bx of [76, 120, 164]) {
      ctx.beginPath();
      ctx.arc(bx, 64, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Two plump bouncy seat cushions
    ctx.fillStyle = "#34d399";
    for (const cx of [42, 122]) {
      ctx.beginPath();
      ctx.roundRect(cx, 92, 76, 38, 14);
      ctx.fill();
      ctx.stroke();
    }

    // Rolled armrests (each in its own subpath)
    ctx.fillStyle = "#059669";
    for (const ax of [32, 208]) {
      ctx.beginPath();
      ctx.arc(ax, 92, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawHouse(ctx: CanvasRenderingContext2D) {
    // Brick Chimney + Stucco Walls + Tiled Roof
    ctx.fillStyle = "#b91c1c";
    ctx.fillRect(156, 20, 28, 46);
    ctx.strokeRect(156, 20, 28, 46);

    ctx.fillStyle = "#fef3c7";
    ctx.fillRect(36, 76, 168, 92);
    ctx.strokeRect(36, 76, 168, 92);

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(120, 14);
    ctx.lineTo(220, 82);
    ctx.lineTo(20, 82);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Round attic window in roof gable
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.arc(120, 54, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Arched wooden front door + brass knob
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.roundRect(58, 104, 44, 64, [20, 20, 0, 0]);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(92, 138, 4, 0, Math.PI * 2);
    ctx.fill();

    // Paned window + flower box
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(126, 100, 50, 40);
    ctx.strokeRect(126, 100, 50, 40);
    ctx.beginPath();
    ctx.moveTo(151, 100);
    ctx.lineTo(151, 140);
    ctx.moveTo(126, 120);
    ctx.lineTo(176, 120);
    ctx.stroke();

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.roundRect(122, 138, 58, 12, 5);
    ctx.fill();
    ctx.stroke();
  }

  private static drawLadder(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.roundRect(10, 64, 220, 56, 12);
    ctx.fill();
    ctx.stroke();

    // Top & bottom rail highlights
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(18, 68, 204, 6);

    ctx.fillStyle = "#fef3c7";
    for (let x = 28; x <= 192; x += 32) {
      ctx.beginPath();
      ctx.roundRect(x, 76, 18, 32, 4);
      ctx.fill();
      ctx.stroke();

      // Silver bolt rivets
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(x + 9, 70, 3, 0, Math.PI * 2);
      ctx.arc(x + 9, 114, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fef3c7";
    }
  }

  private static drawPlank(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.roundRect(10, 72, 220, 42, 16);
    ctx.fill();
    ctx.stroke();

    // Bark ridges
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(32, 86);
    ctx.lineTo(118, 86);
    ctx.moveTo(64, 100);
    ctx.lineTo(168, 100);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Cut wood end ring
    ctx.fillStyle = "#fde68a";
    ctx.beginPath();
    ctx.ellipse(212, 93, 10, 19, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(212, 93, 5, 9, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawPencil(ctx: CanvasRenderingContext2D) {
    // Sleek, slender pencil: pink eraser + silver ferrule + hexagonal yellow body + wood cone + lead tip
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.roundRect(10, 79, 34, 30, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(36, 79, 16, 30);
    ctx.strokeRect(36, 79, 16, 30);

    ctx.fillStyle = "#facc15";
    ctx.fillRect(52, 79, 134, 30);
    ctx.strokeRect(52, 79, 134, 30);

    // Hexagonal barrel facet line
    ctx.fillStyle = "#eab308";
    ctx.fillRect(52, 94, 134, 15);
    ctx.strokeRect(52, 94, 134, 15);

    // Wood cone + graphite tip
    ctx.fillStyle = "#fde68a";
    ctx.beginPath();
    ctx.moveTo(186, 79);
    ctx.lineTo(230, 94);
    ctx.lineTo(186, 109);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.moveTo(212, 88);
    ctx.lineTo(230, 94);
    ctx.lineTo(212, 100);
    ctx.closePath();
    ctx.fill();
  }

  private static drawDoor(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#7c3aed";
    ctx.beginPath();
    ctx.roundRect(66, 10, 108, 170, 10);
    ctx.fill();
    ctx.stroke();

    // 4 Recessed Door Panels
    ctx.fillStyle = "#6d28d9";
    ctx.fillRect(82, 26, 34, 54);
    ctx.strokeRect(82, 26, 34, 54);
    ctx.fillRect(124, 26, 34, 54);
    ctx.strokeRect(124, 26, 34, 54);
    ctx.fillRect(82, 104, 34, 58);
    ctx.strokeRect(82, 104, 34, 58);
    ctx.fillRect(124, 104, 34, 58);
    ctx.strokeRect(124, 104, 34, 58);

    // Golden lever handle & keyhole plate
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(142, 86, 24, 12, 5);
    ctx.fill();
    ctx.stroke();
  }

  private static drawBathtub(ctx: CanvasRenderingContext2D) {
    // Golden faucet + foamy soap bubbles + clawfoot tub
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(26, 30, 22, 32, 8);
    ctx.fill();
    ctx.stroke();

    this.drawUnion(ctx, "#ffffff", (emit) => {
      for (const [bx, by, br] of [
        [68, 54, 18],
        [102, 46, 24],
        [138, 50, 21],
        [172, 56, 17],
      ] as const) {
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        emit();
      }
    });

    // Golden claw feet
    ctx.fillStyle = "#facc15";
    for (const fx of [44, 168]) {
      ctx.beginPath();
      ctx.roundRect(fx, 148, 28, 18, 8);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = "#e0f2fe";
    ctx.beginPath();
    ctx.moveTo(20, 62);
    ctx.lineTo(220, 62);
    ctx.lineTo(198, 152);
    ctx.lineTo(42, 152);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rolled porcelain lip
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(12, 54, 216, 18, 9);
    ctx.fill();
    ctx.stroke();
  }

  private static drawTv(ctx: CanvasRenderingContext2D) {
    // V-Antenna with round tips + retro cabinet
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(94, 40);
    ctx.lineTo(64, 12);
    ctx.lineTo(120, 36);
    ctx.lineTo(176, 12);
    ctx.lineTo(146, 40);
    ctx.roundRect(28, 36, 184, 128, 18);
    ctx.fill();
    ctx.stroke();

    // Glowing Cyan Screen
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(44, 50, 124, 98, 14);
    ctx.fill();
    ctx.stroke();

    // Screen Glare Streak
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.beginPath();
    ctx.moveTo(58, 56);
    ctx.lineTo(86, 56);
    ctx.lineTo(58, 112);
    ctx.closePath();
    ctx.fill();

    // Rotary Dials & Speaker Grille
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(190, 70, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(190, 98, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(180, 120, 20, 4);
    ctx.fillRect(180, 130, 20, 4);
  }

  private static drawPiano(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(26, 28, 188, 136, 16);
    ctx.fill();
    ctx.stroke();

    // White sheet music stand on top
    ctx.fillStyle = "#fefce8";
    ctx.fillRect(78, 42, 84, 38);
    ctx.strokeRect(78, 42, 84, 38);

    // Full Piano Keyboard (White + Black keys)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(40, 92, 160, 44);
    ctx.strokeRect(40, 92, 160, 44);

    ctx.lineWidth = 2.5;
    for (let x = 60; x < 200; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 92);
      ctx.lineTo(x, 136);
      ctx.stroke();
    }
    ctx.lineWidth = 5.5;

    ctx.fillStyle = "#0f172a";
    for (const bx of [54, 74, 114, 134, 154, 174]) {
      ctx.fillRect(bx, 92, 12, 26);
    }

    // Golden pedals
    ctx.fillStyle = "#facc15";
    ctx.fillRect(104, 148, 32, 10);
  }

  private static drawRobot(ctx: CanvasRenderingContext2D) {
    // Antenna + Ears + Boxy Mecha Body
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(120, 14, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawUnion(ctx, "#64748b", (emit) => {
      ctx.beginPath();
      ctx.rect(114, 22, 12, 18);
      emit();
      ctx.beginPath();
      ctx.roundRect(38, 66, 164, 42, 12);
      emit();
      ctx.beginPath();
      ctx.roundRect(52, 38, 136, 132, 22);
      emit();
    });

    // Dark Visor + Glowing Cyan Eyes
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.roundRect(68, 54, 104, 42, 12);
    ctx.fill();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(96, 75, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(144, 75, 10, 0, Math.PI * 2);
    ctx.fill();

    // Chest Gauge & Buttons
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.roundRect(74, 110, 92, 42, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(94, 131, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(120, 131, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(146, 131, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // ===========================================================================
  // 4. TOOLS, WEAPONS & LAB GEAR
  // ===========================================================================

  private static drawAnvil(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.moveTo(18, 54);
    ctx.lineTo(198, 54);
    ctx.lineTo(222, 80);
    ctx.lineTo(158, 98);
    ctx.lineTo(154, 136);
    ctx.lineTo(194, 150);
    ctx.lineTo(194, 168);
    ctx.lineTo(46, 168);
    ctx.lineTo(46, 150);
    ctx.lineTo(86, 136);
    ctx.lineTo(82, 98);
    ctx.lineTo(18, 76);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Specular steel top highlight
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(30, 58, 162, 10);

    // Dark embossed weight badge
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(84, 72, 72, 34, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.font = "900 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("100t", 120, 96);
  }

  private static drawDumbbell(ctx: CanvasRenderingContext2D) {
    // Chrome center bar
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(68, 78, 104, 34);
    ctx.strokeRect(68, 78, 104, 34);

    // Dual stacked cast-iron weight plates on both ends
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(18, 30, 32, 130, 10);
    ctx.roundRect(46, 44, 26, 102, 8);
    ctx.roundRect(168, 44, 26, 102, 8);
    ctx.roundRect(190, 30, 32, 130, 10);
    ctx.fill();
    ctx.stroke();

    // Metallic bevel highlights on plates
    ctx.fillStyle = "#475569";
    ctx.fillRect(24, 40, 8, 110);
    ctx.fillRect(196, 40, 8, 110);
  }

  private static drawHammer(ctx: CanvasRenderingContext2D) {
    // Hickory wood handle with leather grip wrap
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.roundRect(102, 70, 36, 106, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#78350f";
    ctx.fillRect(102, 126, 36, 36);
    ctx.strokeRect(102, 126, 36, 36);

    // Forged steel warhammer head with beveled striking faces
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.roundRect(28, 22, 184, 60, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(40, 30, 160, 12);
  }

  private static drawSword(ctx: CanvasRenderingContext2D) {
    // Pommel + Leather Hilt + Winged Golden Crossguard + Broad Blade
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.roundRect(16, 80, 46, 30, 8);
    ctx.fill();
    ctx.stroke();

    // Two-tone Steel Blade
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(74, 70);
    ctx.lineTo(188, 70);
    ctx.lineTo(230, 95);
    ctx.lineTo(188, 120);
    ctx.lineTo(74, 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lower blade shadow bevel & fuller groove
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(76, 95);
    ctx.lineTo(226, 95);
    ctx.lineTo(188, 118);
    ctx.lineTo(76, 118);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#64748b";
    ctx.beginPath();
    ctx.moveTo(80, 95);
    ctx.lineTo(192, 95);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;

    // Golden Crossguard + Pommel + Ruby Gem (sleek profile so sword fits narrow slots)
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(54, 64, 22, 62, 7);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(16, 95, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(66, 95, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawGuitar(ctx: CanvasRenderingContext2D) {
    // Figure-8 guitar body + neck + headstock (unified without interior seams)
    this.drawUnion(ctx, "#d97706", (emit) => {
      ctx.beginPath();
      ctx.arc(64, 95, 48, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(116, 95, 36, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(136, 80, 92, 30, 8);
      emit();
    });

    // Cream pickguard & dark sound hole
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(98, 95, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(98, 95, 16, 0, Math.PI * 2);
    ctx.fill();

    // Bridge & strings
    ctx.fillStyle = "#78350f";
    ctx.fillRect(46, 76, 12, 38);
    ctx.strokeRect(46, 76, 12, 38);
  }

  private static drawBomb(ctx: CanvasRenderingContext2D) {
    // Blazing spark star + fuse cap + glossy black iron sphere
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(120, 22, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.roundRect(98, 36, 44, 22, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(120, 110, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glossy specular shine on bomb
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.ellipse(90, 84, 18, 11, -0.55, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(84, 80, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawSpring(ctx: CanvasRenderingContext2D) {
    // Dark core + chrome coils + red/yellow bounce pads
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(54, 34, 132, 122, 18);
    ctx.fill();
    ctx.stroke();

    // Top & bottom bounce pads
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(36, 22, 168, 28, 12);
    ctx.roundRect(36, 142, 168, 26, 12);
    ctx.fill();
    ctx.stroke();

    // Chrome coil zig-zag
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(64, 58);
    ctx.lineTo(176, 76);
    ctx.lineTo(64, 96);
    ctx.lineTo(176, 116);
    ctx.lineTo(64, 134);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawTrampoline(ctx: CanvasRenderingContext2D) {
    // Angled steel legs
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.roundRect(36, 94, 24, 62, 6);
    ctx.roundRect(180, 94, 24, 62, 6);
    ctx.fill();
    ctx.stroke();

    // Outer safety pad + elastic jump mat
    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath();
    ctx.roundRect(12, 58, 216, 46, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.roundRect(30, 64, 180, 32, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#bbf7d0";
    ctx.beginPath();
    ctx.roundRect(56, 72, 128, 12, 6);
    ctx.fill();
  }

  private static drawMagnet(ctx: CanvasRenderingContext2D) {
    // Classic Red & Blue Horseshoe Magnet with Silver N/S Poles
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(40, 158);
    ctx.lineTo(40, 86);
    ctx.arc(120, 86, 80, Math.PI, 0, false);
    ctx.lineTo(200, 158);
    ctx.lineTo(150, 158);
    ctx.lineTo(150, 86);
    ctx.arc(120, 86, 30, 0, Math.PI, true);
    ctx.lineTo(90, 158);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Silver Pole Tips
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(40, 124, 50, 34);
    ctx.strokeRect(40, 124, 50, 34);
    ctx.fillRect(150, 124, 50, 34);
    ctx.strokeRect(150, 124, 50, 34);

    // N / S labels
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("N", 65, 114);
    ctx.fillText("S", 175, 114);
  }

  private static drawSpiderweb(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fdf2f8";
    ctx.beginPath();
    ctx.arc(120, 95, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#db2777";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(120, 95, 46, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(120, 95, 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    for (let a = 0; a < Math.PI; a += Math.PI / 4) {
      ctx.moveTo(120 - Math.cos(a) * 68, 95 - Math.sin(a) * 68);
      ctx.lineTo(120 + Math.cos(a) * 68, 95 + Math.sin(a) * 68);
    }
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Cute tiny spider in center
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(120, 95, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(116, 94, 2.5, 0, Math.PI * 2);
    ctx.arc(124, 94, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawUmbrella(ctx: CanvasRenderingContext2D) {
    // Top finial + Canopy + J-hook handle
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(112, 6, 16, 18, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#a855f7";
    ctx.beginPath();
    ctx.arc(120, 98, 82, Math.PI, 0, false);
    ctx.lineTo(132, 98);
    ctx.lineTo(132, 166);
    ctx.lineTo(96, 166);
    ctx.lineTo(96, 146);
    ctx.lineTo(108, 146);
    ctx.lineTo(108, 98);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center pink gore panel
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(120, 98, 82, Math.PI * 1.32, Math.PI * 1.68, false);
    ctx.lineTo(120, 98);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawMushroom(ctx: CanvasRenderingContext2D) {
    // Plump cream stem with cute eyes
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.roundRect(80, 86, 80, 80, 24);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 104, 128, 5.5);
    this.drawCuteEye(ctx, 136, 128, 5.5);
    this.drawCheek(ctx, 92, 138, 6);
    this.drawCheek(ctx, 148, 138, 6);

    // Vibrant Red Toadstool Cap
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(120, 98, 80, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // White Polka Dots
    ctx.fillStyle = "#ffffff";
    for (const [dx, dy, dr] of [
      [78, 64, 15],
      [122, 44, 18],
      [164, 66, 14],
    ]) {
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawShield(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(42, 20);
    ctx.lineTo(198, 20);
    ctx.lineTo(198, 98);
    ctx.quadraticCurveTo(198, 154, 120, 174);
    ctx.quadraticCurveTo(42, 154, 42, 98);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Royal blue inner field
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.moveTo(58, 36);
    ctx.lineTo(182, 36);
    ctx.lineTo(182, 96);
    ctx.quadraticCurveTo(182, 138, 120, 154);
    ctx.quadraticCurveTo(58, 138, 58, 96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden Cross Crest
    ctx.fillStyle = "#fde047";
    ctx.fillRect(110, 48, 20, 90);
    ctx.fillRect(74, 78, 92, 20);
  }

  private static drawCrown(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(30, 152);
    ctx.lineTo(20, 48);
    ctx.lineTo(74, 94);
    ctx.lineTo(120, 28);
    ctx.lineTo(166, 94);
    ctx.lineTo(220, 48);
    ctx.lineTo(210, 152);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Base band & Royal Jewels (each jewel in its own subpath)
    ctx.fillStyle = "#eab308";
    ctx.fillRect(30, 126, 180, 26);
    ctx.strokeRect(30, 126, 180, 26);

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(120, 106, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    for (const jx of [68, 172]) {
      ctx.beginPath();
      ctx.arc(jx, 112, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  // ===========================================================================
  // 5. FOOD, DESSERTS & FRUITS
  // ===========================================================================

  private static drawHamburger(ctx: CanvasRenderingContext2D) {
    // Toasted Bottom Bun
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(32, 128, 176, 32, 14);
    ctx.fill();
    ctx.stroke();

    // Thick Grilled Beef Patty
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.roundRect(22, 102, 196, 28, 13);
    ctx.fill();
    ctx.stroke();

    // Tomato Slices & Ruffled Lettuce
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(36, 90, 168, 14, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.roundRect(24, 80, 192, 14, 7);
    ctx.fill();
    ctx.stroke();

    // Melted Cheddar Cheese Corners
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(46, 94);
    ctx.lineTo(78, 120);
    ctx.lineTo(114, 94);
    ctx.lineTo(156, 120);
    ctx.lineTo(190, 94);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Domed Top Bun + Sesame Seeds
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(120, 84, 86, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fef3c7";
    for (const [sx, sy] of [
      [82, 42],
      [120, 32],
      [156, 44],
      [98, 60],
      [142, 60],
      [64, 64],
      [174, 64],
    ]) {
      ctx.beginPath();
      ctx.ellipse(sx, sy, 6.5, 3.5, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private static drawApple(ctx: CanvasRenderingContext2D) {
    // Wood Stem + Green Leaf
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.roundRect(113, 18, 14, 34, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.ellipse(146, 32, 22, 12, -0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Indented Apple Contour
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.moveTo(120, 52);
    ctx.bezierCurveTo(155, 34, 194, 64, 184, 114);
    ctx.bezierCurveTo(174, 158, 138, 170, 120, 158);
    ctx.bezierCurveTo(102, 170, 66, 158, 56, 114);
    ctx.bezierCurveTo(46, 64, 85, 34, 120, 52);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Two-part glossy white highlight
    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.ellipse(84, 82, 12, 22, -0.35, 0, Math.PI * 2);
    ctx.arc(76, 112, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawStrawberry(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.roundRect(74, 22, 92, 28, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.moveTo(62, 46);
    ctx.lineTo(178, 46);
    ctx.quadraticCurveTo(190, 118, 120, 170);
    ctx.quadraticCurveTo(50, 118, 62, 46);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fde047";
    for (const [sx, sy] of [
      [92, 76],
      [120, 84],
      [148, 76],
      [104, 112],
      [136, 112],
      [120, 140],
    ]) {
      ctx.beginPath();
      ctx.ellipse(sx, sy, 3.5, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private static drawBanana(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(26, 66);
    ctx.quadraticCurveTo(120, 124, 214, 66);
    ctx.quadraticCurveTo(178, 164, 120, 160);
    ctx.quadraticCurveTo(62, 164, 26, 66);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Peel ridge line
    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(42, 86);
    ctx.quadraticCurveTo(120, 142, 198, 86);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawWatermelon(ctx: CanvasRenderingContext2D) {
    // Curly green vine stem on top
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.roundRect(112, 12, 16, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.arc(120, 98, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Wavy Tiger Stripes
    ctx.strokeStyle = "#14532d";
    ctx.lineWidth = 9;
    for (const dx of [-38, 0, 38]) {
      ctx.beginPath();
      ctx.moveTo(120 + dx, 34);
      ctx.quadraticCurveTo(120 + dx + 14, 98, 120 + dx, 162);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Glossy shine
    ctx.fillStyle = "#86efac";
    ctx.beginPath();
    ctx.ellipse(86, 64, 12, 20, -0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawPumpkin(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.roundRect(108, 16, 24, 30, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.ellipse(120, 104, 78, 62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Ribbed pumpkin segments (separate subpaths so no connecting line is drawn)
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.ellipse(120, 104, 46, 62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fdba74";
    ctx.beginPath();
    ctx.ellipse(120, 104, 18, 62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawPizza(ctx: CanvasRenderingContext2D) {
    // Triangular ramp wedge + puffy crust + pepperoni + basil
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(20, 158);
    ctx.lineTo(206, 34);
    ctx.lineTo(206, 158);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Puffy Golden Crust
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.roundRect(184, 32, 28, 128, 14);
    ctx.fill();
    ctx.stroke();

    // Shaded Pepperoni Slices
    ctx.fillStyle = "#ef4444";
    for (const [px, py, pr] of [
      [148, 114, 16],
      [162, 76, 14],
      [102, 134, 13],
    ]) {
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Green Basil Leaf
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.ellipse(134, 88, 10, 6, -0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawCheese(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(20, 158);
    ctx.lineTo(208, 40);
    ctx.lineTo(208, 158);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ca8a04";
    for (const [hx, hy, hr] of [
      [152, 122, 16],
      [182, 86, 13],
      [102, 136, 12],
      [142, 88, 9],
    ]) {
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawDonut(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(120, 95, 68, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Strawberry Pink Icing
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(120, 95, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Rainbow Sprinkles
    const sprinkles = [
      [84, 62, "#fde047"],
      [148, 60, "#38bdf8"],
      [72, 104, "#ffffff"],
      [164, 102, "#4ade80"],
      [96, 134, "#38bdf8"],
      [144, 132, "#fde047"],
    ] as const;
    for (const [sx, sy, col] of sprinkles) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect(sx - 6, sy - 3, 12, 6, 3);
      ctx.fill();
    }

    // Center hole
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(120, 95, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawTire(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(120, 95, 68, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.arc(120, 95, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.arc(120, 95, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawBaguette(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.roundRect(10, 68, 220, 52, 26);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(16, 72, 208, 34, 18);
    ctx.fill();

    // Score slashes
    ctx.fillStyle = "#fef3c7";
    for (let x = 46; x <= 190; x += 36) {
      ctx.beginPath();
      ctx.ellipse(x, 92, 8, 15, 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawCarrot(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.roundRect(12, 64, 44, 62, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(46, 62);
    ctx.lineTo(224, 95);
    ctx.lineTo(46, 128);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Root indent lines
    ctx.strokeStyle = "#c2410c";
    ctx.lineWidth = 3.5;
    for (const rx of [82, 118, 154]) {
      ctx.beginPath();
      ctx.moveTo(rx, 76);
      ctx.lineTo(rx, 96);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawJelly(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.moveTo(38, 158);
    ctx.quadraticCurveTo(36, 40, 120, 40);
    ctx.quadraticCurveTo(204, 40, 202, 158);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Caramel sauce top with drips
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.arc(120, 82, 50, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 96, 114, 6.5);
    this.drawCuteEye(ctx, 144, 114, 6.5);
    this.drawCheek(ctx, 82, 126, 7);
    this.drawCheek(ctx, 158, 126, 7);
  }

  private static drawIceCream(ctx: CanvasRenderingContext2D) {
    // Waffle Cone with criss-cross lines
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(72, 86);
    ctx.lineTo(168, 86);
    ctx.lineTo(120, 176);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#b45309";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(88, 96);
    ctx.lineTo(136, 144);
    ctx.moveTo(152, 96);
    ctx.lineTo(104, 144);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Strawberry Ice Cream Scoop + Drips + Cherry
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(120, 72, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(120, 20, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawCake(ctx: CanvasRenderingContext2D) {
    // Lit candle on top + 2-tier strawberry cake
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.rect(112, 26, 16, 26);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(120, 18, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fbcfe8";
    ctx.beginPath();
    ctx.moveTo(26, 164);
    ctx.lineTo(26, 102);
    ctx.lineTo(54, 102);
    ctx.lineTo(54, 50);
    ctx.lineTo(186, 50);
    ctx.lineTo(186, 102);
    ctx.lineTo(214, 102);
    ctx.lineTo(214, 164);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Whipped cream frosting layers
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(54, 50, 132, 16);
    ctx.strokeRect(54, 50, 132, 16);
    ctx.fillRect(26, 102, 188, 16);
    ctx.strokeRect(26, 102, 188, 16);

    // Strawberries
    ctx.fillStyle = "#ef4444";
    for (const sx of [76, 120, 164]) {
      ctx.beginPath();
      ctx.arc(sx, 44, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  // ===========================================================================
  // 6. NATURE, WEATHER & OBJECTS
  // ===========================================================================

  private static drawBoulder(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.moveTo(40, 160);
    ctx.lineTo(20, 104);
    ctx.lineTo(52, 40);
    ctx.lineTo(124, 22);
    ctx.lineTo(194, 52);
    ctx.lineTo(216, 118);
    ctx.lineTo(186, 160);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Multi-faceted rock planes
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(52, 40);
    ctx.lineTo(124, 22);
    ctx.lineTo(144, 78);
    ctx.lineTo(66, 92);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.moveTo(144, 78);
    ctx.lineTo(194, 52);
    ctx.lineTo(216, 118);
    ctx.lineTo(186, 160);
    ctx.lineTo(116, 160);
    ctx.closePath();
    ctx.fill();

    // Re-stroke outer contour
    ctx.beginPath();
    ctx.moveTo(40, 160);
    ctx.lineTo(20, 104);
    ctx.lineTo(52, 40);
    ctx.lineTo(124, 22);
    ctx.lineTo(194, 52);
    ctx.lineTo(216, 118);
    ctx.lineTo(186, 160);
    ctx.closePath();
    ctx.stroke();
  }

  private static drawCloud(ctx: CanvasRenderingContext2D) {
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.arc(70, 96, 38, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(120, 74, 48, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(170, 96, 38, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(38, 82, 164, 56, 28);
      emit();
    });

    // Soft sky-blue under-shadow
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(48, 118, 144, 14, 7);
    ctx.fill();

    this.drawCuteEye(ctx, 98, 94, 6);
    this.drawCuteEye(ctx, 142, 94, 6);
    this.drawCheek(ctx, 84, 104, 6.5);
    this.drawCheek(ctx, 156, 104, 6.5);
  }

  private static drawBalloon(ctx: CanvasRenderingContext2D) {
    // Hot-air balloon with striped gore panels & wicker basket
    this.drawUnion(ctx, "#38bdf8", (emit) => {
      ctx.beginPath();
      ctx.ellipse(120, 80, 70, 58, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(94, 128, 52, 40, 8);
      emit();
    });

    // Red center gore panel
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.ellipse(120, 80, 32, 58, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Wicker Basket
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.roundRect(94, 134, 52, 34, 8);
    ctx.fill();
    ctx.stroke();
  }

  private static drawIceBlock(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#7dd3fc";
    ctx.beginPath();
    ctx.roundRect(30, 40, 180, 110, 18);
    ctx.fill();
    ctx.stroke();

    // Inner crystal bevel & shine streaks
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(46, 54, 148, 82, 12);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(54, 60, 132, 16, 8);
    ctx.fill();
  }

  private static drawSnowman(ctx: CanvasRenderingContext2D) {
    // Top Hat + Head + Body + Scarf + Carrot Nose
    this.drawUnion(ctx, "#1e293b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(94, 8, 52, 26, 4);
      emit();
      ctx.beginPath();
      ctx.roundRect(80, 28, 80, 10, 5);
      emit();
    });

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(120, 130, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(120, 66, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Red Knitted Scarf
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.roundRect(84, 86, 72, 16, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(132, 92, 18, 34, 6);
      emit();
    });

    // Carrot Nose & Coal Buttons
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(120, 62);
    ctx.lineTo(150, 68);
    ctx.lineTo(120, 74);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(114, 122, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(114, 142, 5, 0, Math.PI * 2);
    ctx.fill();

    this.drawCuteEye(ctx, 106, 56, 5);
    this.drawCuteEye(ctx, 132, 56, 5);
  }

  private static drawTree(ctx: CanvasRenderingContext2D) {
    // Sturdy trunk
    ctx.fillStyle = "#92400e";
    ctx.fillRect(94, 92, 52, 80);
    ctx.strokeRect(94, 92, 52, 80);

    // Lush layered foliage canopy (unified cloud without internal circle strokes)
    this.drawUnion(ctx, "#22c55e", (emit) => {
      ctx.beginPath();
      ctx.arc(74, 74, 44, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(166, 74, 44, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(120, 48, 50, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(34, 56, 172, 56, 28);
      emit();
    });

    // Red apples in tree
    ctx.fillStyle = "#ef4444";
    for (const [ax, ay] of [
      [78, 72],
      [124, 48],
      [158, 78],
    ]) {
      ctx.beginPath();
      ctx.arc(ax, ay, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawCactus(ctx: CanvasRenderingContext2D) {
    // Pink cactus flower on top + saguaro arms
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(120, 18, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawUnion(ctx, "#16a34a", (emit) => {
      ctx.beginPath();
      ctx.roundRect(92, 24, 56, 148, 28);
      emit();
      ctx.beginPath();
      ctx.roundRect(42, 66, 56, 28, 14);
      emit();
      ctx.beginPath();
      ctx.roundRect(42, 42, 28, 50, 14);
      emit();
      ctx.beginPath();
      ctx.roundRect(142, 78, 56, 28, 14);
      emit();
      ctx.beginPath();
      ctx.roundRect(170, 52, 28, 52, 14);
      emit();
    });

    this.drawCuteEye(ctx, 108, 76, 5.5);
    this.drawCuteEye(ctx, 132, 76, 5.5);
    this.drawCheek(ctx, 100, 88, 5.5);
    this.drawCheek(ctx, 140, 88, 5.5);
  }

  private static drawStar(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    const cx = 120;
    const cy = 95;
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 74 : 36;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 104, 92, 6);
    this.drawCuteEye(ctx, 136, 92, 6);
    this.drawCheek(ctx, 92, 102, 6);
    this.drawCheek(ctx, 148, 102, 6);
  }

  private static drawDiamond(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(68, 32);
    ctx.lineTo(172, 32);
    ctx.lineTo(210, 78);
    ctx.lineTo(120, 170);
    ctx.lineTo(30, 78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Facet highlights
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.moveTo(68, 32);
    ctx.lineTo(172, 32);
    ctx.lineTo(152, 78);
    ctx.lineTo(88, 78);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(30, 78);
    ctx.lineTo(210, 78);
    ctx.moveTo(68, 32);
    ctx.lineTo(88, 78);
    ctx.lineTo(120, 170);
    ctx.lineTo(152, 78);
    ctx.lineTo(172, 32);
    ctx.stroke();
  }

  private static drawHeart(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.moveTo(120, 166);
    ctx.bezierCurveTo(26, 112, 32, 26, 86, 26);
    ctx.bezierCurveTo(108, 26, 120, 46, 120, 56);
    ctx.bezierCurveTo(120, 46, 132, 26, 154, 26);
    ctx.bezierCurveTo(208, 26, 214, 112, 120, 166);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.ellipse(72, 58, 12, 20, -0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawBall(
    ctx: CanvasRenderingContext2D,
    type: "beach" | "soccer" | "basketball"
  ) {
    ctx.fillStyle =
      type === "soccer"
        ? "#f8fafc"
        : type === "basketball"
        ? "#f97316"
        : "#fde047";
    ctx.beginPath();
    ctx.arc(120, 95, 66, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (type === "soccer") {
      // Classic soccer ball pentagons + seam lines (each pentagon/patch in its own subpath)
      ctx.lineWidth = 3.5;
      for (const [tx, ty] of [
        [120, 38],
        [68, 76],
        [172, 76],
        [86, 138],
        [154, 138],
      ] as const) {
        ctx.beginPath();
        ctx.moveTo(120, 95);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      ctx.lineWidth = 5.5;

      ctx.fillStyle = "#0f172a";
      for (const [px, py, pr] of [
        [120, 95, 19],
        [120, 38, 11],
        [68, 76, 11],
        [172, 76, 11],
        [86, 138, 11],
        [154, 138, 11],
      ] as const) {
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === "beach") {
      // Colorful 6-panel beach ball (red, blue, yellow panels + white center circle)
      const panels = [
        [0, Math.PI / 3, "#ef4444"],
        [(2 * Math.PI) / 3, Math.PI, "#38bdf8"],
        [(4 * Math.PI) / 3, (5 * Math.PI) / 3, "#22c55e"],
      ] as const;
      for (const [a0, a1, col] of panels) {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(120, 95);
        ctx.arc(120, 95, 66, a0, a1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(120, 95, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      // Basketball curved ribs
      ctx.beginPath();
      ctx.moveTo(54, 95);
      ctx.lineTo(186, 95);
      ctx.moveTo(120, 29);
      ctx.lineTo(120, 161);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(54, 95, 46, -Math.PI / 3, Math.PI / 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(186, 95, 46, (2 * Math.PI) / 3, (4 * Math.PI) / 3);
      ctx.stroke();
    }
  }

  private static drawBook(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#6366f1";
    ctx.beginPath();
    ctx.roundRect(30, 34, 180, 122, 16);
    ctx.fill();
    ctx.stroke();

    // Golden emblem on cover
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(120, 74, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Paper pages block & bookmark
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(46, 122, 152, 22);
    ctx.strokeRect(46, 122, 152, 22);

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(82, 134, 18, 22);
    ctx.strokeRect(82, 134, 18, 22);
  }

  private static drawCrate(
    ctx: CanvasRenderingContext2D,
    word: string,
    accentColor: string
  ) {
    ctx.fillStyle = accentColor || "#d97706";
    ctx.beginPath();
    ctx.roundRect(30, 34, 180, 122, 16);
    ctx.fill();
    ctx.stroke();

    // Inner wood frame & diagonal cross braces
    ctx.fillStyle = "rgba(15, 23, 42, 0.16)";
    ctx.fillRect(46, 50, 148, 90);
    ctx.strokeRect(46, 50, 148, 90);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(word.slice(0, 6), 120, 95);
  }

  // ===========================================================================
  // EXPANDED BESPOKE STICKER PACK (ANIMALS, VEHICLES, HOUSEHOLD, TOOLS, FOODS)
  // ===========================================================================

  private static drawLion(ctx: CanvasRenderingContext2D) {
    // Golden body + legs + tufted tail
    this.drawUnion(ctx, "#f59e0b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(78, 72, 112, 66, 28);
      emit();
      ctx.beginPath();
      ctx.roundRect(86, 124, 24, 42, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(156, 124, 24, 42, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(182, 84, 34, 14, 7);
      emit();
    });

    // Brown tail tuft
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.arc(216, 90, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Fluffy scalloped brown mane around head (unified without internal petal strokes)
    const maneCx = 74;
    const maneCy = 84;
    this.drawUnion(ctx, "#b45309", (emit) => {
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI * 2) / 12;
        ctx.beginPath();
        ctx.arc(
          maneCx + Math.cos(a) * 34,
          maneCy + Math.sin(a) * 34,
          15,
          0,
          Math.PI * 2
        );
        emit();
      }
      ctx.beginPath();
      ctx.arc(maneCx, maneCy, 38, 0, Math.PI * 2);
      emit();
    });

    // Round golden ears & face
    this.drawUnion(ctx, "#fbbf24", (emit) => {
      ctx.beginPath();
      ctx.arc(48, 52, 12, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(100, 52, 12, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(maneCx, maneCy, 30, 0, Math.PI * 2);
      emit();
    });

    // Cream muzzle + nose + whiskers
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.ellipse(66, 94, 16, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.arc(66, 88, 5, 0, Math.PI * 2);
    ctx.fill();

    this.drawCuteEye(ctx, 58, 76, 5.5);
    this.drawCuteEye(ctx, 82, 76, 5.5);
    this.drawCheek(ctx, 50, 88, 5);
    this.drawCheek(ctx, 90, 88, 5);
  }

  private static drawTiger(ctx: CanvasRenderingContext2D) {
    // Vibrant orange tiger body + legs + striped tail + head
    this.drawUnion(ctx, "#f97316", (emit) => {
      ctx.beginPath();
      ctx.roundRect(72, 68, 118, 68, 28);
      emit();
      ctx.beginPath();
      ctx.roundRect(80, 122, 26, 44, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(154, 122, 26, 44, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(182, 76, 38, 16, 8);
      emit();
      ctx.beginPath();
      ctx.arc(54, 48, 13, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(98, 48, 13, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(76, 80, 34, 0, Math.PI * 2);
      emit();
    });

    // White belly & cheek ruff (separate subpaths so no diagonal line connects them)
    ctx.fillStyle = "#fff7ed";
    ctx.beginPath();
    ctx.ellipse(134, 120, 36, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(72, 92, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Bold black tiger stripes on back & forehead
    ctx.fillStyle = "#0f172a";
    for (const sx of [116, 138, 160]) {
      ctx.beginPath();
      ctx.moveTo(sx - 6, 70);
      ctx.lineTo(sx + 6, 70);
      ctx.lineTo(sx, 98);
      ctx.closePath();
      ctx.fill();
    }
    // Forehead '왕' (King) mark
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(68, 56);
    ctx.lineTo(84, 56);
    ctx.moveTo(70, 62);
    ctx.lineTo(82, 62);
    ctx.moveTo(76, 54);
    ctx.lineTo(76, 66);
    ctx.stroke();
    ctx.lineWidth = 5.5;

    // Pink nose
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(72, 86, 5, 0, Math.PI * 2);
    ctx.fill();

    this.drawCuteEye(ctx, 60, 74, 5.5);
    this.drawCuteEye(ctx, 86, 74, 5.5);
  }

  private static drawFox(ctx: CanvasRenderingContext2D) {
    // Red-orange fox body + big bushy tail + pointy ears
    this.drawUnion(ctx, "#ea580c", (emit) => {
      ctx.beginPath();
      ctx.ellipse(186, 94, 38, 22, -0.35, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(74, 78, 96, 56, 24);
      emit();
      ctx.beginPath();
      ctx.roundRect(82, 122, 20, 42, 7);
      emit();
      ctx.beginPath();
      ctx.roundRect(140, 122, 20, 42, 7);
      emit();
      ctx.beginPath();
      ctx.moveTo(46, 68);
      ctx.lineTo(38, 28);
      ctx.lineTo(68, 52);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.moveTo(82, 52);
      ctx.lineTo(108, 28);
      ctx.lineTo(100, 68);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.arc(74, 76, 32, 0, Math.PI * 2);
      emit();
    });

    // Cream white tail tip, chest & cheek fur (each in its own subpath)
    ctx.fillStyle = "#fffbeb";
    ctx.beginPath();
    ctx.arc(212, 82, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(84, 112, 13, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(74, 88, 25, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 60, 72, 5.5);
    this.drawCuteEye(ctx, 86, 72, 5.5);
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.arc(73, 86, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawMonkey(ctx: CanvasRenderingContext2D) {
    // Curly tail + brown body + big round side ears
    this.drawUnion(ctx, "#92400e", (emit) => {
      ctx.beginPath();
      ctx.roundRect(156, 108, 48, 16, 8);
      emit();
      ctx.beginPath();
      ctx.arc(200, 100, 16, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(78, 86, 84, 72, 30);
      emit();
      ctx.beginPath();
      ctx.arc(62, 68, 18, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(178, 68, 18, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(120, 68, 44, 0, Math.PI * 2);
      emit();
    });

    // Tan inner ears & belly
    ctx.fillStyle = "#fde68a";
    for (const ex of [62, 178]) {
      ctx.beginPath();
      ctx.arc(ex, 68, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(120, 126, 24, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Heart-shaped tan face mask (unified without internal circle lines)
    this.drawUnion(ctx, "#fde68a", (emit) => {
      ctx.beginPath();
      ctx.arc(106, 62, 19, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(134, 62, 19, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(120, 80, 28, 18, 0, 0, Math.PI * 2);
      emit();
    });

    this.drawCuteEye(ctx, 106, 64, 5.5);
    this.drawCuteEye(ctx, 134, 64, 5.5);
    this.drawCheek(ctx, 92, 76, 5.5);
    this.drawCheek(ctx, 148, 76, 5.5);

    ctx.beginPath();
    ctx.arc(120, 78, 12, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  private static drawSheep(ctx: CanvasRenderingContext2D) {
    // Dark legs
    this.drawUnion(ctx, "#334155", (emit) => {
      ctx.beginPath();
      ctx.roundRect(80, 118, 22, 46, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(148, 118, 22, 46, 8);
      emit();
    });

    // Fluffy scalloped white wool body cloud (unified without interior overlapping circle lines)
    const puffs = [
      [84, 72, 28],
      [120, 62, 32],
      [158, 70, 28],
      [180, 96, 26],
      [156, 120, 28],
      [118, 124, 30],
      [82, 116, 26],
    ] as const;
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      for (const [px, py, pr] of puffs) {
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        emit();
      }
      ctx.beginPath();
      ctx.roundRect(76, 68, 106, 56, 24);
      emit();
    });

    // Golden curved ram horns & dark cute head
    for (const hx of [46, 90]) {
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(hx, 64, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.ellipse(68, 82, 26, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Fluffy top wool tuft
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(68, 58, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 58, 80, 5);
    this.drawCuteEye(ctx, 78, 80, 5);
    this.drawCheek(ctx, 50, 90, 4.5);
    this.drawCheek(ctx, 86, 90, 4.5);
  }

  private static drawHorse(ctx: CanvasRenderingContext2D, isUnicorn: boolean) {
    // Flowing mane & tail
    this.drawUnion(ctx, isUnicorn ? "#f472b6" : "#78350f", (emit) => {
      ctx.beginPath();
      ctx.ellipse(196, 98, 24, 16, 0.4, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(68, 42, 28, 52, 12);
      emit();
    });

    // Unicorn golden spiral horn
    if (isUnicorn) {
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.moveTo(48, 44);
      ctx.lineTo(24, 16);
      ctx.lineTo(64, 34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Body + neck + snout + legs
    this.drawUnion(ctx, isUnicorn ? "#ffffff" : "#d97706", (emit) => {
      ctx.beginPath();
      ctx.roundRect(76, 80, 112, 54, 24);
      emit();
      ctx.beginPath();
      ctx.roundRect(84, 122, 22, 44, 7);
      emit();
      ctx.beginPath();
      ctx.roundRect(156, 122, 22, 44, 7);
      emit();
      ctx.beginPath();
      ctx.roundRect(52, 42, 34, 62, 16);
      emit();
      ctx.beginPath();
      ctx.roundRect(30, 46, 48, 32, 14);
      emit();
    });

    // Saddle blanket
    ctx.fillStyle = isUnicorn ? "#38bdf8" : "#ef4444";
    ctx.beginPath();
    ctx.roundRect(114, 78, 44, 28, 10);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 58, 58, 5);
    this.drawCheek(ctx, 48, 68, 4.5);
  }

  private static drawKangaroo(ctx: CanvasRenderingContext2D) {
    // Warm kangaroo body + long tail + upright ears + big hind feet
    this.drawUnion(ctx, "#d97706", (emit) => {
      ctx.beginPath();
      ctx.roundRect(142, 118, 68, 22, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(74, 144, 76, 22, 10);
      emit();
      ctx.beginPath();
      ctx.ellipse(118, 106, 38, 48, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(88, 20, 14, 36, 7);
      emit();
      ctx.beginPath();
      ctx.roundRect(114, 20, 14, 36, 7);
      emit();
      ctx.beginPath();
      ctx.arc(108, 56, 24, 0, Math.PI * 2);
      emit();
    });

    // Cream belly pouch + cute baby joey head peeking out!
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.ellipse(104, 114, 24, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(96, 98, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 100, 54, 5);
    this.drawCuteEye(ctx, 92, 96, 3.5);
  }

  private static drawCrocodile(ctx: CanvasRenderingContext2D) {
    // Dorsal scutes along back
    ctx.fillStyle = "#15803d";
    for (let x = 84; x <= 196; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x - 10, 82);
      ctx.lineTo(x, 62);
      ctx.lineTo(x + 10, 82);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Long green crocodile body + snout + stubby legs + eye ridge
    this.drawUnion(ctx, "#22c55e", (emit) => {
      ctx.beginPath();
      ctx.roundRect(22, 78, 196, 54, 24);
      emit();
      ctx.beginPath();
      ctx.roundRect(64, 122, 24, 32, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(152, 122, 24, 32, 8);
      emit();
      ctx.beginPath();
      ctx.arc(82, 72, 16, 0, Math.PI * 2);
      emit();
    });

    // Zig-zag white teeth on snout
    ctx.fillStyle = "#ffffff";
    for (let x = 32; x <= 68; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, 104);
      ctx.lineTo(x + 5, 114);
      ctx.lineTo(x + 10, 104);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    this.drawCuteEye(ctx, 80, 70, 5.5);
  }

  private static drawBat(ctx: CanvasRenderingContext2D) {
    // Spread scalloped wings + round purple body + pointy ears
    ctx.fillStyle = "#6d28d9";
    ctx.beginPath();
    ctx.moveTo(120, 68);
    ctx.lineTo(22, 44);
    ctx.lineTo(34, 124);
    ctx.quadraticCurveTo(64, 104, 88, 128);
    ctx.lineTo(152, 128);
    ctx.quadraticCurveTo(176, 104, 206, 124);
    ctx.lineTo(218, 44);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawUnion(ctx, "#8b5cf6", (emit) => {
      ctx.beginPath();
      ctx.moveTo(92, 58);
      ctx.lineTo(84, 24);
      ctx.lineTo(112, 48);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.moveTo(128, 48);
      ctx.lineTo(156, 24);
      ctx.lineTo(148, 58);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.arc(120, 92, 40, 0, Math.PI * 2);
      emit();
    });

    this.drawCuteEye(ctx, 104, 84, 6);
    this.drawCuteEye(ctx, 136, 84, 6);
    this.drawCheek(ctx, 92, 96, 5);
    this.drawCheek(ctx, 148, 96, 5);

    // Cute tiny white fangs
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(110, 102);
    ctx.lineTo(114, 112);
    ctx.lineTo(118, 102);
    ctx.moveTo(122, 102);
    ctx.lineTo(126, 112);
    ctx.lineTo(130, 102);
    ctx.fill();
  }

  private static drawOwl(ctx: CanvasRenderingContext2D) {
    // Plump brown owl with ear tufts + wings + talons
    this.drawUnion(ctx, "#f59e0b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(92, 148, 20, 18, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(128, 148, 20, 18, 6);
      emit();
    });

    this.drawUnion(ctx, "#92400e", (emit) => {
      ctx.beginPath();
      ctx.moveTo(76, 52);
      ctx.lineTo(62, 24);
      ctx.lineTo(98, 40);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.moveTo(142, 40);
      ctx.lineTo(178, 24);
      ctx.lineTo(164, 52);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.ellipse(120, 94, 58, 60, 0, 0, Math.PI * 2);
      emit();
    });

    // Cream belly & big spectacle eye rings (each in its own subpath)
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.ellipse(120, 118, 36, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    for (const ex of [98, 142]) {
      ctx.beginPath();
      ctx.arc(ex, 72, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    this.drawCuteEye(ctx, 98, 72, 7.5);
    this.drawCuteEye(ctx, 142, 72, 7.5);

    // Golden beak
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(112, 80);
    ctx.lineTo(128, 80);
    ctx.lineTo(120, 96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawButterfly(ctx: CanvasRenderingContext2D) {
    // 4 vibrant wings + central body
    this.drawUnion(ctx, "#ec4899", (emit) => {
      ctx.beginPath();
      ctx.ellipse(72, 68, 46, 36, -0.3, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(168, 68, 46, 36, 0.3, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(80, 122, 36, 28, 0.3, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(160, 122, 36, 28, -0.3, 0, Math.PI * 2);
      emit();
    });

    // Golden wing spots
    ctx.fillStyle = "#fde047";
    for (const [wx, wy, wr] of [
      [66, 66, 16],
      [174, 66, 16],
      [80, 122, 11],
      [160, 122, 11],
    ] as const) {
      ctx.beginPath();
      ctx.arc(wx, wy, wr, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Body
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(108, 38, 24, 114, 12);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 114, 48, 3.5);
    this.drawCuteEye(ctx, 126, 48, 3.5);
  }

  private static drawBee(ctx: CanvasRenderingContext2D) {
    // Top translucent-style cyan wings overlapping body
    this.drawUnion(ctx, "#bae6fd", (emit) => {
      ctx.beginPath();
      ctx.ellipse(104, 48, 24, 30, -0.3, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(138, 48, 24, 30, 0.3, 0, Math.PI * 2);
      emit();
    });

    // Plump yellow bee body + stinger on right
    this.drawUnion(ctx, "#facc15", (emit) => {
      ctx.beginPath();
      ctx.moveTo(180, 88);
      ctx.lineTo(214, 102);
      ctx.lineTo(180, 116);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.ellipse(120, 102, 68, 46, 0, 0, Math.PI * 2);
      emit();
    });

    // Black stripes
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(106, 58, 18, 88);
    ctx.fillRect(142, 62, 18, 80);

    this.drawCuteEye(ctx, 76, 94, 6);
    this.drawCheek(ctx, 68, 108, 5.5);
  }

  private static drawLadybug(ctx: CanvasRenderingContext2D) {
    // Black head & legs (overlapping the red shell at y=118..148 so 1 connected component!)
    this.drawUnion(ctx, "#1e293b", (emit) => {
      ctx.beginPath();
      ctx.arc(62, 106, 28, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(76, 116, 18, 30, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(120, 116, 18, 30, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(162, 116, 18, 30, 6);
      emit();
    });

    // Red domed shell extending down to y=126 to overlap legs & head
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(132, 120, 66, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Black spots on shell
    ctx.fillStyle = "#0f172a";
    for (const [sx, sy] of [
      [104, 88],
      [134, 74],
      [164, 90],
      [122, 104],
      [152, 106],
    ] as const) {
      ctx.beginPath();
      ctx.arc(sx, sy, 9, 0, Math.PI * 2);
      ctx.fill();
    }

    this.drawCuteEye(ctx, 52, 100, 5.5);
  }

  private static drawJellyfish(ctx: CanvasRenderingContext2D) {
    // Trailing tentacles + pink dome bell (unified without internal stroke lines)
    this.drawUnion(ctx, "#f472b6", (emit) => {
      for (let x = 72; x <= 168; x += 24) {
        ctx.beginPath();
        ctx.roundRect(x - 8, 96, 16, 66, 8);
        emit();
      }
      ctx.beginPath();
      ctx.arc(120, 88, 64, Math.PI, 0, false);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.roundRect(56, 82, 128, 22, 10);
      emit();
    });

    // Glossy spots
    ctx.fillStyle = "#fbcfe8";
    ctx.beginPath();
    ctx.arc(92, 56, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(146, 60, 9, 0, Math.PI * 2);
    ctx.fill();

    this.drawCuteEye(ctx, 98, 82, 5.5);
    this.drawCuteEye(ctx, 142, 82, 5.5);
    this.drawCheek(ctx, 84, 90, 5);
    this.drawCheek(ctx, 156, 90, 5);
  }

  private static drawStarfish(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    const cx = 120;
    const cy = 98;
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 74 : 36;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dotted starfish texture
    ctx.fillStyle = "#fecdd3";
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * 44, cy + Math.sin(a) * 44, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    this.drawCuteEye(ctx, 106, 92, 5.5);
    this.drawCuteEye(ctx, 134, 92, 5.5);
    this.drawCheek(ctx, 94, 102, 5);
    this.drawCheek(ctx, 146, 102, 5);
  }

  private static drawFiretruck(ctx: CanvasRenderingContext2D) {
    // White roof ladder + siren + red fire engine body
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(38, 34, 132, 18, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(178, 36, 18, 16, 6);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(28, 50, 184, 88, 16);
    ctx.fill();
    ctx.stroke();

    // Cabin window & yellow stripe
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(156, 62, 44, 34, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.fillRect(30, 104, 180, 12);

    this.drawWheel(ctx, 72, 140, 22);
    this.drawWheel(ctx, 168, 140, 22);
  }

  private static drawAmbulance(ctx: CanvasRenderingContext2D) {
    // Red siren + crisp white ambulance body
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(112, 30, 24, 16, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(28, 44, 184, 94, 18);
    ctx.fill();
    ctx.stroke();

    // Window
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(154, 58, 46, 36, 8);
    ctx.fill();
    ctx.stroke();

    // Red Cross (+) emblem
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(82, 66, 16, 44);
    ctx.fillRect(68, 80, 44, 16);
    ctx.fillRect(30, 114, 180, 10);

    this.drawWheel(ctx, 72, 140, 22);
    this.drawWheel(ctx, 168, 140, 22);
  }

  private static drawTruck(ctx: CanvasRenderingContext2D) {
    // Ribbed yellow dump/cargo bed + blue cab
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(24, 46, 122, 88, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.roundRect(140, 62, 74, 72, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(156, 72, 46, 32, 8);
    ctx.fill();
    ctx.stroke();

    this.drawWheel(ctx, 68, 138, 22);
    this.drawWheel(ctx, 174, 138, 22);
  }

  private static drawExcavator(ctx: CanvasRenderingContext2D) {
    // Jointed digging arm + bucket + yellow cab + caterpillar tracks
    this.drawUnion(ctx, "#f59e0b", (emit) => {
      // Arm & bucket on right
      ctx.beginPath();
      ctx.moveTo(136, 68);
      ctx.lineTo(192, 34);
      ctx.lineTo(222, 88);
      ctx.lineTo(194, 114);
      ctx.lineTo(176, 94);
      ctx.lineTo(186, 58);
      ctx.lineTo(136, 88);
      ctx.closePath();
      emit();
      // Cab
      ctx.beginPath();
      ctx.roundRect(44, 52, 98, 70, 14);
      emit();
    });

    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.roundRect(82, 62, 48, 36, 8);
    ctx.fill();
    ctx.stroke();

    // Caterpillar tracks
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.roundRect(34, 118, 124, 38, 19);
    ctx.fill();
    ctx.stroke();

    for (const wx of [58, 96, 134]) {
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(wx, 137, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawSubmarine(ctx: CanvasRenderingContext2D) {
    // Yellow submarine with conning tower, periscope & rear propeller
    this.drawUnion(ctx, "#facc15", (emit) => {
      ctx.beginPath();
      ctx.roundRect(108, 24, 14, 28, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(108, 24, 28, 12, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(88, 44, 64, 34, 12);
      emit();
      ctx.beginPath();
      ctx.roundRect(22, 82, 24, 36, 8);
      emit();
      ctx.beginPath();
      ctx.ellipse(124, 102, 88, 42, 0, 0, Math.PI * 2);
      emit();
    });

    // Porthole windows
    ctx.fillStyle = "#38bdf8";
    for (const px of [84, 124, 164]) {
      ctx.beginPath();
      ctx.arc(px, 102, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawMotorcycle(ctx: CanvasRenderingContext2D) {
    // Sporty red scooter/motorbike body + handlebars + seat
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.roundRect(148, 38, 18, 56, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(54, 78, 124, 48, 20);
      emit();
    });

    // Black leather seat & headlight
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(68, 66, 56, 20, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(170, 56, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawWheel(ctx, 68, 130, 24);
    this.drawWheel(ctx, 168, 130, 24);
  }

  private static drawSkateboard(ctx: CanvasRenderingContext2D) {
    // Curved maple deck + grip tape
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.roundRect(22, 74, 196, 28, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(42, 76, 156, 8);

    this.drawWheel(ctx, 68, 114, 18);
    this.drawWheel(ctx, 172, 114, 18);
  }

  private static drawShoppingCart(ctx: CanvasRenderingContext2D) {
    // Connected basket + frame + red handle
    this.drawUnion(ctx, "#cbd5e1", (emit) => {
      ctx.beginPath();
      ctx.roundRect(34, 42, 24, 18, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(52, 48, 142, 68, 12);
      emit();
      ctx.beginPath();
      ctx.roundRect(62, 112, 118, 22, 8);
      emit();
    });

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(32, 40, 24, 16, 8);
    ctx.fill();
    ctx.stroke();

    // Grid lines inside cart basket
    ctx.lineWidth = 3.5;
    for (let x = 80; x <= 168; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 52);
      ctx.lineTo(x, 112);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(56, 82);
    ctx.lineTo(190, 82);
    ctx.stroke();
    ctx.lineWidth = 5.5;

    this.drawWheel(ctx, 76, 142, 18);
    this.drawWheel(ctx, 162, 142, 18);
  }

  private static drawFridge(ctx: CanvasRenderingContext2D) {
    // Sleek mint/silver two-door refrigerator
    ctx.fillStyle = "#67e8f9";
    ctx.beginPath();
    ctx.roundRect(68, 18, 104, 154, 14);
    ctx.fill();
    ctx.stroke();

    // Door seam
    ctx.beginPath();
    ctx.moveTo(68, 78);
    ctx.lineTo(172, 78);
    ctx.stroke();

    // Chrome handles & water dispenser
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(80, 42, 10, 26, 5);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(80, 92, 10, 42, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.roundRect(132, 96, 24, 30, 6);
    ctx.fill();
  }

  private static drawWasher(ctx: CanvasRenderingContext2D) {
    // Front-load washing machine
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(56, 22, 128, 146, 16);
    ctx.fill();
    ctx.stroke();

    // Top control panel & dial
    ctx.beginPath();
    ctx.moveTo(56, 54);
    ctx.lineTo(184, 54);
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(156, 38, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Round porthole drum window with soapy water wave
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(120, 108, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(120, 108, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.arc(110, 98, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawMicrowave(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.roundRect(30, 42, 180, 106, 14);
    ctx.fill();
    ctx.stroke();

    // Glowing yellow oven window
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.roundRect(44, 56, 112, 78, 10);
    ctx.fill();
    ctx.stroke();

    // Keypad buttons & green timer display
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(168, 58, 28, 16);
    ctx.strokeRect(168, 58, 28, 16);

    ctx.fillStyle = "#475569";
    for (let y = 86; y <= 118; y += 16) {
      ctx.beginPath();
      ctx.arc(174, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(190, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private static drawFan(ctx: CanvasRenderingContext2D) {
    // Stand base + neck + round wire-caged head
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(78, 148, 84, 22, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(108, 114, 24, 38, 6);
      emit();
      ctx.beginPath();
      ctx.arc(120, 72, 52, 0, Math.PI * 2);
      emit();
    });

    // 3 cyan fan blades
    ctx.fillStyle = "#38bdf8";
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI * 2) / 3 - Math.PI / 2;
      ctx.beginPath();
      ctx.ellipse(
        120 + Math.cos(a) * 22,
        72 + Math.sin(a) * 22,
        18,
        11,
        a,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = "#0284c7";
    ctx.beginPath();
    ctx.arc(120, 72, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawLightbulb(ctx: CanvasRenderingContext2D) {
    // Screw base
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.roundRect(94, 124, 52, 42, 12);
    ctx.fill();
    ctx.stroke();

    // Glowing yellow glass bulb
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(120, 78, 54, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Bright inner filament glow
    ctx.fillStyle = "#fef9c3";
    ctx.beginPath();
    ctx.arc(102, 62, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ea580c";
    ctx.beginPath();
    ctx.moveTo(108, 122);
    ctx.lineTo(108, 82);
    ctx.arc(120, 82, 12, Math.PI, 0, false);
    ctx.lineTo(132, 122);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
  }

  private static drawClock(ctx: CanvasRenderingContext2D) {
    // Twin bells on top + legs + red alarm clock body
    ctx.fillStyle = "#facc15";
    for (const bx of [76, 164]) {
      ctx.beginPath();
      ctx.arc(bx, 38, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    for (const lx of [80, 144]) {
      ctx.beginPath();
      ctx.roundRect(lx, 144, 16, 22, 6);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(120, 98, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(120, 98, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Clock hands
    ctx.beginPath();
    ctx.moveTo(120, 98);
    ctx.lineTo(120, 68);
    ctx.moveTo(120, 98);
    ctx.lineTo(144, 108);
    ctx.stroke();
  }

  private static drawSmartphone(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(72, 18, 96, 154, 18);
    ctx.fill();
    ctx.stroke();

    // Glowing cyan screen
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(82, 32, 76, 122, 10);
    ctx.fill();
    ctx.stroke();

    // Colorful app icons
    const apps = [
      [94, 48, "#ef4444"],
      [116, 48, "#22c55e"],
      [138, 48, "#facc15"],
      [94, 72, "#a855f7"],
      [116, 72, "#f97316"],
      [138, 72, "#ec4899"],
    ] as const;
    for (const [ax, ay, col] of apps) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect(ax, ay, 14, 14, 4);
      ctx.fill();
    }
  }

  private static drawLaptop(ctx: CanvasRenderingContext2D) {
    // Open laptop screen + keyboard deck
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.roundRect(44, 28, 152, 98, 12);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(24, 122, 192, 26, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(56, 40, 128, 74, 6);
    ctx.fill();
    ctx.stroke();

    // Screen glare
    ctx.fillStyle = "#bae6fd";
    ctx.beginPath();
    ctx.moveTo(66, 48);
    ctx.lineTo(112, 48);
    ctx.lineTo(84, 106);
    ctx.lineTo(66, 106);
    ctx.closePath();
    ctx.fill();
  }

  private static drawCamera(ctx: CanvasRenderingContext2D) {
    // Top flash housing + shutter button + camera body
    this.drawUnion(ctx, "#334155", (emit) => {
      ctx.beginPath();
      ctx.roundRect(52, 38, 32, 18, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(92, 32, 56, 24, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(34, 52, 172, 106, 20);
      emit();
    });

    // Retro silver top stripe
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(36, 54, 168, 24);
    ctx.strokeRect(36, 54, 168, 24);

    // Big camera lens rings
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.arc(120, 108, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0ea5e9";
    ctx.beginPath();
    ctx.arc(120, 108, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#e0f2fe";
    ctx.beginPath();
    ctx.arc(110, 98, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawGamepad(ctx: CanvasRenderingContext2D) {
    // Handheld console / controller with cyan & red grips
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(22, 48, 52, 94, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(166, 48, 52, 94, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(64, 48, 112, 94, 12);
    ctx.fill();
    ctx.stroke();

    // Joysticks & screen (each in its own subpath)
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(46, 80, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(194, 108, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(76, 60, 88, 70, 6);
    ctx.fill();
    ctx.stroke();
  }

  private static drawToilet(ctx: CanvasRenderingContext2D) {
    // Porcelain tank + seat + bowl + pedestal
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(52, 22, 56, 78, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(52, 92, 134, 34, 16);
      emit();
      ctx.beginPath();
      ctx.roundRect(78, 118, 86, 48, 14);
      emit();
    });

    // Seat line & flush handle
    ctx.beginPath();
    ctx.moveTo(56, 96);
    ctx.lineTo(182, 96);
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(60, 38, 20, 8, 4);
    ctx.fill();
    ctx.stroke();
  }

  private static drawMug(ctx: CanvasRenderingContext2D) {
    // Rising steam cloud connected on top
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.arc(108, 38, 16, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(132, 34, 18, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(96, 42, 48, 18, 8);
      emit();
    });

    // C-handle + warm ceramic mug body
    this.drawUnion(ctx, "#f97316", (emit) => {
      ctx.beginPath();
      ctx.arc(174, 106, 28, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(62, 54, 108, 108, 18);
      emit();
    });

    // Inner handle cutout look
    ctx.fillStyle = "#fed7aa";
    ctx.beginPath();
    ctx.arc(172, 106, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 98, 106, 5.5);
    this.drawCuteEye(ctx, 134, 106, 5.5);
    this.drawCheek(ctx, 84, 116, 5);
    this.drawCheek(ctx, 148, 116, 5);
  }

  private static drawPot(ctx: CanvasRenderingContext2D) {
    // Golden cooking pot (양은냄비/가마솥) with handles & lid knob
    this.drawUnion(ctx, "#facc15", (emit) => {
      ctx.beginPath();
      ctx.arc(120, 38, 14, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(26, 82, 188, 22, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(48, 50, 144, 106, 24);
      emit();
    });

    // Lid rim line
    ctx.beginPath();
    ctx.moveTo(48, 76);
    ctx.lineTo(192, 76);
    ctx.stroke();
  }

  private static drawTrashcan(ctx: CanvasRenderingContext2D) {
    // Ribbed steel trash can / drum barrel with lid handle
    this.drawUnion(ctx, "#94a3b8", (emit) => {
      ctx.beginPath();
      ctx.roundRect(98, 20, 44, 18, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(54, 34, 132, 20, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(64, 50, 112, 116, 12);
      emit();
    });

    ctx.beginPath();
    ctx.moveTo(64, 54);
    ctx.lineTo(176, 54);
    ctx.stroke();

    // Vertical ribs
    for (const rx of [88, 120, 152]) {
      ctx.beginPath();
      ctx.moveTo(rx, 66);
      ctx.lineTo(rx, 150);
      ctx.stroke();
    }
  }

  private static drawDrum(ctx: CanvasRenderingContext2D) {
    // Crossed drumsticks on top + red-and-white snare drum
    ctx.fillStyle = "#fde68a";
    ctx.beginPath();
    ctx.roundRect(54, 28, 132, 14, 7);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(48, 42, 144, 114, 18);
    ctx.fill();
    ctx.stroke();

    // White zig-zag cord triangles
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(52, 64);
    ctx.lineTo(84, 134);
    ctx.lineTo(120, 64);
    ctx.lineTo(156, 134);
    ctx.lineTo(188, 64);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawAxe(ctx: CanvasRenderingContext2D) {
    // Sturdy wooden shaft + silver battle axe crescent blade
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.roundRect(108, 22, 24, 146, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(108, 36);
    ctx.quadraticCurveTo(38, 22, 34, 76);
    ctx.quadraticCurveTo(38, 128, 108, 104);
    ctx.lineTo(148, 86);
    ctx.lineTo(148, 54);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawPickaxe(ctx: CanvasRenderingContext2D) {
    // Wooden handle + diamond/cyan curved dual pickaxe head
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.roundRect(108, 34, 24, 134, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.moveTo(28, 82);
    ctx.quadraticCurveTo(120, 14, 212, 82);
    ctx.lineTo(196, 98);
    ctx.quadraticCurveTo(120, 48, 44, 98);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawShovel(ctx: CanvasRenderingContext2D) {
    // D-grip handle + wooden shaft + pointed steel scoop blade
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(92, 18, 56, 24, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.roundRect(110, 38, 20, 74, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(82, 104);
    ctx.lineTo(158, 104);
    ctx.lineTo(154, 144);
    ctx.lineTo(120, 172);
    ctx.lineTo(86, 144);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawScissors(ctx: CanvasRenderingContext2D) {
    // Crossed silver blades + red finger loops
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(92, 98);
    ctx.lineTo(48, 22);
    ctx.lineTo(120, 76);
    ctx.lineTo(192, 22);
    ctx.lineTo(148, 98);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    for (const lx of [84, 156]) {
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(lx, 132, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#fecaca";
      ctx.beginPath();
      ctx.arc(lx, 132, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawKey(ctx: CanvasRenderingContext2D) {
    // Ornate golden key with bow, shaft & notched bit
    this.drawUnion(ctx, "#facc15", (emit) => {
      ctx.beginPath();
      ctx.arc(74, 95, 44, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(110, 82, 98, 26, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(156, 102, 18, 32, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(184, 102, 18, 24, 6);
      emit();
    });

    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(74, 95, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawPadlock(ctx: CanvasRenderingContext2D) {
    // Heavy steel U-shackle + brass padlock body + keyhole
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.arc(120, 68, 38, Math.PI, 0, false);
    ctx.lineTo(158, 94);
    ctx.lineTo(82, 94);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(62, 76, 116, 90, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(120, 114, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(114, 118, 12, 24, 4);
    ctx.fill();
  }

  private static drawAnchor(ctx: CanvasRenderingContext2D) {
    // Navy iron ship anchor with top ring, cross stock & curved flukes
    this.drawUnion(ctx, "#475569", (emit) => {
      ctx.beginPath();
      ctx.arc(120, 34, 16, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(78, 54, 84, 18, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(108, 44, 24, 112, 10);
      emit();
      ctx.beginPath();
      ctx.arc(120, 108, 62, 0.15 * Math.PI, 0.85 * Math.PI, false);
      ctx.lineTo(120, 144);
      ctx.closePath();
      emit();
    });
  }

  private static drawCannon(ctx: CanvasRenderingContext2D) {
    // Heavy black iron cannon barrel + wooden carriage + wheels
    this.drawUnion(ctx, "#334155", (emit) => {
      ctx.beginPath();
      ctx.arc(40, 82, 12, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(122, 76, 76, 34, -0.22, 0, Math.PI * 2);
      emit();
    });

    ctx.fillStyle = "#b45309";
    ctx.beginPath();
    ctx.roundRect(64, 96, 104, 42, 12);
    ctx.fill();
    ctx.stroke();

    this.drawWheel(ctx, 88, 140, 24);
    this.drawWheel(ctx, 152, 140, 24);
  }

  private static drawGun(ctx: CanvasRenderingContext2D) {
    // Bright cartoon water/laser blaster
    this.drawUnion(ctx, "#38bdf8", (emit) => {
      ctx.beginPath();
      ctx.roundRect(44, 52, 142, 48, 18);
      emit();
      ctx.beginPath();
      ctx.roundRect(54, 90, 42, 64, 14);
      emit();
    });

    // Orange nozzle & tank
    this.drawUnion(ctx, "#f97316", (emit) => {
      ctx.beginPath();
      ctx.roundRect(178, 62, 26, 28, 8);
      emit();
      ctx.beginPath();
      ctx.roundRect(74, 34, 72, 26, 12);
      emit();
    });
  }

  private static drawGlasses(ctx: CanvasRenderingContext2D) {
    // Bold cool sunglasses frame + cyan tinted lenses
    this.drawUnion(ctx, "#1e293b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(22, 62, 196, 22, 10);
      emit();
      ctx.beginPath();
      ctx.roundRect(32, 62, 78, 64, 18);
      emit();
      ctx.beginPath();
      ctx.roundRect(130, 62, 78, 64, 18);
      emit();
    });

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.roundRect(42, 72, 58, 44, 12);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(140, 72, 58, 44, 12);
    ctx.fill();
    ctx.stroke();
  }

  private static drawShoe(ctx: CanvasRenderingContext2D) {
    // High-top red sneaker with white rubber sole & toe cap
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.roundRect(42, 34, 68, 96, 16);
      emit();
      ctx.beginPath();
      ctx.roundRect(42, 82, 156, 56, 24);
      emit();
    });

    // White rubber sole & toe cap
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.arc(174, 114, 26, -Math.PI / 2, Math.PI / 2);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.roundRect(38, 128, 166, 24, 10);
      emit();
    });

    // White laces
    ctx.strokeStyle = "#ffffff";
    for (let y = 56; y <= 88; y += 16) {
      ctx.beginPath();
      ctx.moveTo(96, y);
      ctx.lineTo(122, y + 8);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
  }

  private static drawHat(ctx: CanvasRenderingContext2D) {
    // Star-spangled wizard/party hat with wide brim & golden buckle band
    this.drawUnion(ctx, "#7c3aed", (emit) => {
      ctx.beginPath();
      ctx.moveTo(120, 18);
      ctx.lineTo(176, 134);
      ctx.lineTo(64, 134);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.ellipse(120, 138, 92, 24, 0, 0, Math.PI * 2);
      emit();
    });

    // Golden hat band
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(74, 112, 92, 20, 8);
    ctx.fill();
    ctx.stroke();
  }

  private static drawSushi(ctx: CanvasRenderingContext2D) {
    // Fluffy white rice pillow
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(42, 84, 156, 62, 28);
    ctx.fill();
    ctx.stroke();

    // Rich salmon fillet draped on top
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.roundRect(26, 52, 188, 52, 24);
    ctx.fill();
    ctx.stroke();

    // White salmon marbling stripes
    ctx.strokeStyle = "#ffe4e6";
    ctx.lineWidth = 4.5;
    for (const sx of [68, 108, 148, 182]) {
      ctx.beginPath();
      ctx.moveTo(sx, 58);
      ctx.lineTo(sx - 22, 98);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Nori seaweed belt in center
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(104, 50, 32, 98);
  }

  private static drawRamen(ctx: CanvasRenderingContext2D) {
    // Golden noodles + boiled egg half + narutomaki peeking above rim
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.ellipse(120, 74, 68, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(90, 62, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.arc(90, 62, 10, 0, Math.PI * 2);
    ctx.fill();

    // Red ceramic ramen bowl + foot ring (unified without diagonal connecting line)
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.roundRect(86, 142, 68, 20, 8);
      emit();
      ctx.beginPath();
      ctx.arc(120, 78, 76, 0, Math.PI, false);
      ctx.closePath();
      emit();
    });

    // Golden wave pattern on bowl
    ctx.fillStyle = "#fde047";
    ctx.fillRect(50, 88, 140, 12);
  }

  private static drawKimbap(ctx: CanvasRenderingContext2D) {
    // Triangular onigiri / samgak-kimbap with nori seaweed wrap & cute face
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(120, 24);
    ctx.quadraticCurveTo(212, 146, 188, 160);
    ctx.lineTo(52, 160);
    ctx.quadraticCurveTo(28, 146, 120, 24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dark nori seaweed sheet at bottom center
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(82, 102, 76, 60, 10);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 100, 80, 5.5);
    this.drawCuteEye(ctx, 140, 80, 5.5);
    this.drawCheek(ctx, 86, 90, 5);
    this.drawCheek(ctx, 154, 90, 5);
  }

  private static drawHotdog(ctx: CanvasRenderingContext2D) {
    // Golden hotdog bun + longer savory red-brown sausage + wavy yellow mustard
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(38, 56, 164, 84, 42);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#b91c1c";
    ctx.beginPath();
    ctx.roundRect(20, 74, 200, 44, 22);
    ctx.fill();
    ctx.stroke();

    // Wavy yellow mustard drizzle
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(42, 96);
    for (let x = 58; x <= 194; x += 22) {
      ctx.quadraticCurveTo(x - 11, x % 44 === 0 ? 78 : 114, x, 96);
    }
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawChickenLeg(ctx: CanvasRenderingContext2D) {
    // White bone handle with double knuckle ends
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(142, 86, 62, 24, 10);
      emit();
      ctx.beginPath();
      ctx.arc(204, 86, 14, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(204, 110, 14, 0, Math.PI * 2);
      emit();
    });

    // Plump crispy golden fried chicken drumstick
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.ellipse(98, 96, 66, 46, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Crispy highlight
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.ellipse(84, 78, 32, 16, -0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawFries(ctx: CanvasRenderingContext2D) {
    // Tall golden French fries sticks sticking up out of carton
    ctx.fillStyle = "#facc15";
    for (const [fx, fy, fh] of [
      [66, 32, 68],
      [88, 20, 80],
      [110, 26, 74],
      [132, 18, 82],
      [154, 28, 72],
    ] as const) {
      ctx.beginPath();
      ctx.roundRect(fx, fy, 20, fh, 6);
      ctx.fill();
      ctx.stroke();
    }

    // Iconic red fry carton
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(52, 76);
    ctx.lineTo(188, 76);
    ctx.lineTo(170, 166);
    ctx.lineTo(70, 166);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden arch smile emblem on carton
    ctx.strokeStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(120, 116, 24, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
  }

  private static drawFriedEgg(ctx: CanvasRenderingContext2D) {
    // Organic wavy white egg albumen
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.ellipse(120, 98, 84, 58, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glossy orange-gold sunny yolk
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.arc(124, 94, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fed7aa";
    ctx.beginPath();
    ctx.arc(114, 84, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawToast(ctx: CanvasRenderingContext2D) {
    // Golden-brown Pullman loaf crust (unified without internal circle lines)
    this.drawUnion(ctx, "#b45309", (emit) => {
      ctx.beginPath();
      ctx.arc(88, 56, 38, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(152, 56, 38, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(54, 56, 132, 108, 18);
      emit();
    });

    // Cream crumb interior
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(92, 60, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(148, 60, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(66, 62, 108, 90, 12);
    ctx.fill();

    // Melting yellow butter square in center
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.roundRect(102, 86, 36, 36, 6);
    ctx.fill();
    ctx.stroke();
  }

  private static drawCroissant(ctx: CanvasRenderingContext2D) {
    // Layered flaky crescent croissant (each segment drawn back-to-front in its own subpath)
    const segments = [
      [52, 114, 28, 20, -0.6, "#b45309"],
      [188, 114, 28, 20, 0.6, "#b45309"],
      [78, 86, 36, 26, -0.35, "#d97706"],
      [162, 86, 36, 26, 0.35, "#d97706"],
      [120, 74, 46, 34, 0, "#f59e0b"],
    ] as const;
    for (const [cx, cy, rx, ry, rot, col] of segments) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Golden highlight on center segment
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.ellipse(120, 66, 24, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawCandy(ctx: CanvasRenderingContext2D) {
    // White lollipop stick + big swirl candy head
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(112, 104, 16, 66, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ec4899";
    ctx.beginPath();
    ctx.arc(120, 74, 54, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // White spiral swirl inside candy
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 7;
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 3.8; a += 0.2) {
      const r = a * 3.8;
      const x = 120 + Math.cos(a) * r;
      const y = 74 + Math.sin(a) * r;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawChocolate(ctx: CanvasRenderingContext2D) {
    // Rich brown chocolate bar with 6 embossed squares + red wrapper band
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.roundRect(38, 36, 164, 118, 14);
    ctx.fill();
    ctx.stroke();

    // Chocolate squares
    ctx.fillStyle = "#92400e";
    for (const sx of [52, 98]) {
      for (const sy of [50, 98]) {
        ctx.fillRect(sx, sy, 36, 38);
        ctx.strokeRect(sx, sy, 36, 38);
      }
    }

    // Bright red foil wrapper on right third
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(142, 34, 62, 122, 12);
    ctx.fill();
    ctx.stroke();
  }

  private static drawSoda(ctx: CanvasRenderingContext2D) {
    // Iconic red soda can with silver top/bottom rims & white wave stripe
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.roundRect(72, 20, 96, 150, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(72, 34, 96, 122);
    ctx.strokeRect(72, 34, 96, 122);

    // White wave ribbon
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(76, 102);
    ctx.bezierCurveTo(104, 72, 136, 122, 164, 86);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawGrapes(ctx: CanvasRenderingContext2D) {
    // Stem + green leaf + pyramid cluster of juicy purple grapes
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.roundRect(114, 16, 12, 28, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#65a30d";
    ctx.beginPath();
    ctx.ellipse(144, 34, 24, 14, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#9333ea";
    const berries = [
      [90, 62],
      [120, 62],
      [150, 62],
      [76, 90],
      [105, 90],
      [135, 90],
      [164, 90],
      [90, 118],
      [120, 118],
      [150, 118],
      [105, 144],
      [135, 144],
      [120, 164],
    ] as const;
    for (const [bx, by] of berries) {
      ctx.beginPath();
      ctx.arc(bx, by, 21, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawPineapple(ctx: CanvasRenderingContext2D) {
    // Spiky green crown leaves
    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.moveTo(92, 62);
    ctx.lineTo(74, 22);
    ctx.lineTo(108, 46);
    ctx.lineTo(120, 14);
    ctx.lineTo(132, 46);
    ctx.lineTo(166, 22);
    ctx.lineTo(148, 62);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden oval pineapple body with diamond cross-hatching
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.ellipse(120, 112, 54, 58, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(86, 76);
    ctx.lineTo(154, 144);
    ctx.moveTo(106, 62);
    ctx.lineTo(166, 122);
    ctx.moveTo(74, 98);
    ctx.lineTo(134, 158);
    ctx.moveTo(154, 76);
    ctx.lineTo(86, 144);
    ctx.moveTo(134, 62);
    ctx.lineTo(74, 122);
    ctx.moveTo(166, 98);
    ctx.lineTo(106, 158);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawSun(ctx: CanvasRenderingContext2D) {
    // Radiant golden sun with 12 triangular sunbeams & cheerful face
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    const cx = 120;
    const cy = 95;
    for (let i = 0; i < 24; i++) {
      const r = i % 2 === 0 ? 78 : 54;
      const a = (i * Math.PI) / 12;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 102, 88, 6);
    this.drawCuteEye(ctx, 138, 88, 6);
    this.drawCheek(ctx, 88, 100, 5.5);
    this.drawCheek(ctx, 152, 100, 5.5);

    ctx.beginPath();
    ctx.arc(120, 100, 14, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  private static drawMoon(ctx: CanvasRenderingContext2D) {
    // Glowing golden crescent moon
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(126, 95, 68, 0.45 * Math.PI, 1.55 * Math.PI, false);
    ctx.quadraticCurveTo(86, 95, 146, 156);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 88, 88, 5.5);
    this.drawCheek(ctx, 80, 102, 5.5);
  }

  private static drawPlanet(ctx: CanvasRenderingContext2D) {
    // Wide tilted planetary ring + purple/blue gas giant sphere
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.ellipse(120, 95, 96, 26, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#6366f1";
    ctx.beginPath();
    ctx.arc(120, 95, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Front ring arc crossing over planet
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.ellipse(120, 95, 92, 24, -0.25, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawFire(ctx: CanvasRenderingContext2D) {
    // Crossed campfire logs + roaring red/orange/yellow flame tongues
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.roundRect(48, 134, 144, 28, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(64, 140);
    ctx.quadraticCurveTo(44, 84, 88, 48);
    ctx.lineTo(100, 74);
    ctx.lineTo(120, 18);
    ctx.lineTo(142, 74);
    ctx.lineTo(156, 48);
    ctx.quadraticCurveTo(196, 84, 176, 140);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(88, 140);
    ctx.quadraticCurveTo(84, 96, 120, 56);
    ctx.quadraticCurveTo(156, 96, 152, 140);
    ctx.closePath();
    ctx.fill();
  }

  private static drawLightning(ctx: CanvasRenderingContext2D) {
    // High-voltage jagged golden lightning bolt
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.moveTo(138, 16);
    ctx.lineTo(62, 102);
    ctx.lineTo(116, 102);
    ctx.lineTo(94, 174);
    ctx.lineTo(178, 84);
    ctx.lineTo(124, 84);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawGhost(ctx: CanvasRenderingContext2D) {
    // Cute floating sheet ghost with wavy hem & raised arms
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(120, 72, 48, Math.PI, 0, false);
    ctx.lineTo(186, 84);
    ctx.lineTo(168, 108);
    ctx.lineTo(168, 162);
    ctx.lineTo(144, 144);
    ctx.lineTo(120, 162);
    ctx.lineTo(96, 144);
    ctx.lineTo(72, 162);
    ctx.lineTo(72, 108);
    ctx.lineTo(54, 84);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    this.drawCuteEye(ctx, 102, 74, 6.5);
    this.drawCuteEye(ctx, 138, 74, 6.5);
    this.drawCheek(ctx, 88, 86, 5.5);
    this.drawCheek(ctx, 152, 86, 5.5);

    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.ellipse(120, 94, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawGift(ctx: CanvasRenderingContext2D) {
    // Top ribbon bow loops + red gift box + golden cross ribbon
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.ellipse(98, 34, 24, 14, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(142, 34, 24, 14, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(56, 68, 128, 96, 12);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(48, 44, 144, 28, 8);
    ctx.fill();
    ctx.stroke();

    // Vertical & horizontal gold ribbon
    ctx.fillStyle = "#facc15";
    ctx.fillRect(106, 44, 28, 120);
    ctx.strokeRect(106, 44, 28, 120);
    ctx.fillRect(56, 102, 128, 24);
    ctx.strokeRect(56, 102, 128, 24);
  }

  private static drawTreasureChest(ctx: CanvasRenderingContext2D) {
    // Domed wooden pirate treasure chest with gold bands & keyhole lock
    this.drawUnion(ctx, "#92400e", (emit) => {
      ctx.beginPath();
      ctx.arc(120, 82, 72, Math.PI, 0, false);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.roundRect(48, 80, 144, 82, 14);
      emit();
    });

    // Gold trim bands & center lock plate
    ctx.fillStyle = "#facc15";
    ctx.fillRect(68, 36, 18, 126);
    ctx.strokeRect(68, 36, 18, 126);
    ctx.fillRect(154, 36, 18, 126);
    ctx.strokeRect(154, 36, 18, 126);
    ctx.fillRect(48, 82, 144, 14);
    ctx.strokeRect(48, 82, 144, 14);

    ctx.beginPath();
    ctx.roundRect(104, 74, 32, 38, 8);
    ctx.fill();
    ctx.stroke();
  }

  private static drawTrophy(ctx: CanvasRenderingContext2D) {
    // Golden championship trophy cup with side handles & dark pedestal
    this.drawUnion(ctx, "#facc15", (emit) => {
      ctx.beginPath();
      ctx.arc(68, 66, 22, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(172, 66, 22, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(72, 24, 96, 76, 36);
      emit();
      ctx.beginPath();
      ctx.roundRect(108, 96, 24, 42, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(84, 132, 72, 16, 6);
      emit();
    });

    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.roundRect(72, 144, 96, 24, 8);
    ctx.fill();
    ctx.stroke();

    // Inner star emblem on trophy cup
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(120, 60, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  // ===========================================================================
  // 8. EXPANDED BESPOKE ILLUSTRATIONS (32 NEW METHODS / 44 VISUAL DESIGNS)
  // ===========================================================================

  private static drawMarbleDot(
    ctx: CanvasRenderingContext2D,
    variant: "dot" | "marble" | "bean" | "pebble" | "pill"
  ) {
    if (variant === "dot") {
      // Glossy obsidian-indigo rolling orb / dot / Go stone
      this.drawUnion(ctx, "#1e293b", (emit) => {
        ctx.beginPath();
        ctx.arc(120, 96, 56, 0, Math.PI * 2);
        emit();
      });

      // Smooth crescent shadow at bottom-right (using two arcs, no flat chord!)
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(120, 96, 52, -0.15, Math.PI * 0.85, false);
      ctx.arc(108, 84, 52, Math.PI * 0.75, -0.05, true);
      ctx.closePath();
      ctx.fill();

      // Rosy cheeks & sparkling eyes (white ring around eyes so they pop on dark body)
      this.drawCheek(ctx, 86, 108, 9);
      this.drawCheek(ctx, 154, 108, 9);

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(100, 95, 9.5, 0, Math.PI * 2);
      ctx.arc(140, 95, 9.5, 0, Math.PI * 2);
      ctx.fill();
      this.drawCuteEye(ctx, 100, 95, 6.5);
      this.drawCuteEye(ctx, 140, 95, 6.5);

      // Cute white smile
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(120, 102, 8, 0.2, Math.PI - 0.2);
      ctx.stroke();
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 5.5;

      // Specular gleam
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(92, 62, 15, 7.5, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(78, 76, 4.5, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (variant === "marble") {
      // Translucent aqua-cyan glass marble with cat's-eye ribbon swirl
      this.drawUnion(ctx, "#38bdf8", (emit) => {
        ctx.beginPath();
        ctx.arc(120, 96, 58, 0, Math.PI * 2);
        emit();
      });

      // Deep ocean inner rim shading
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.arc(125, 101, 49, 0, Math.PI * 2);
      ctx.fill();

      // Bright cyan inner core
      ctx.fillStyle = "#7dd3fc";
      ctx.beginPath();
      ctx.arc(116, 92, 42, 0, Math.PI * 2);
      ctx.fill();

      // Smooth S-curved cat's-eye ribbons (no stroke line inside!)
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.moveTo(96, 58);
      ctx.bezierCurveTo(138, 68, 102, 120, 144, 132);
      ctx.bezierCurveTo(118, 134, 86, 92, 96, 58);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.moveTo(110, 56);
      ctx.bezierCurveTo(148, 76, 114, 114, 150, 124);
      ctx.bezierCurveTo(132, 126, 102, 86, 110, 56);
      ctx.closePath();
      ctx.fill();

      // Cute eyes with white halo & cheeks
      this.drawCheek(ctx, 86, 106, 8.5);
      this.drawCheek(ctx, 154, 106, 8.5);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(100, 94, 8.5, 0, Math.PI * 2);
      ctx.arc(140, 94, 8.5, 0, Math.PI * 2);
      ctx.fill();
      this.drawCuteEye(ctx, 100, 94, 6);
      this.drawCuteEye(ctx, 140, 94, 6);

      // Curved glass window highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.ellipse(92, 62, 17, 8, -0.52, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(78, 77, 5, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (variant === "bean") {
      // Plump emerald kidney bean / green pea
      this.drawUnion(ctx, "#22c55e", (emit) => {
        ctx.beginPath();
        ctx.moveTo(64, 86);
        ctx.bezierCurveTo(60, 52, 102, 48, 120, 62);
        ctx.bezierCurveTo(138, 48, 180, 52, 176, 86);
        ctx.bezierCurveTo(182, 132, 148, 152, 120, 150);
        ctx.bezierCurveTo(92, 152, 58, 132, 64, 86);
        ctx.closePath();
        emit();
      });

      // Smooth curved crescent shading along bottom belly (no flat chord!)
      ctx.fillStyle = "#16a34a";
      ctx.beginPath();
      ctx.moveTo(70, 114);
      ctx.quadraticCurveTo(120, 136, 170, 114);
      ctx.quadraticCurveTo(156, 146, 120, 146);
      ctx.quadraticCurveTo(84, 146, 70, 114);
      ctx.closePath();
      ctx.fill();

      // Pale cream hilum notch at top concave indent
      ctx.fillStyle = "#dcfce7";
      ctx.beginPath();
      ctx.ellipse(120, 62, 14, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cute face
      this.drawCheek(ctx, 86, 108, 9);
      this.drawCheek(ctx, 154, 108, 9);
      this.drawCuteEye(ctx, 100, 96, 6);
      this.drawCuteEye(ctx, 140, 96, 6);

      ctx.beginPath();
      ctx.arc(120, 102, 7, 0.15, Math.PI - 0.15);
      ctx.stroke();

      // Glossy highlight on left lobe
      ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
      ctx.beginPath();
      ctx.ellipse(86, 72, 12, 6, -0.4, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (variant === "pebble") {
      // Smooth river-worn cobble pebble with mineral speckles
      this.drawUnion(ctx, "#94a3b8", (emit) => {
        ctx.beginPath();
        ctx.moveTo(58, 104);
        ctx.bezierCurveTo(54, 64, 92, 46, 130, 50);
        ctx.bezierCurveTo(170, 54, 188, 78, 182, 110);
        ctx.bezierCurveTo(176, 140, 142, 148, 106, 146);
        ctx.bezierCurveTo(72, 144, 60, 128, 58, 104);
        ctx.closePath();
        emit();
      });

      // Smooth curved lower crescent shadow (below the face!)
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.moveTo(64, 114);
      ctx.quadraticCurveTo(120, 134, 176, 112);
      ctx.quadraticCurveTo(162, 143, 114, 143);
      ctx.quadraticCurveTo(72, 142, 64, 114);
      ctx.closePath();
      ctx.fill();

      // Mineral quartz speckles
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.arc(86, 74, 5, 0, Math.PI * 2);
      ctx.arc(152, 76, 4, 0, Math.PI * 2);
      ctx.arc(160, 112, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#475569";
      ctx.beginPath();
      ctx.arc(76, 116, 4, 0, Math.PI * 2);
      ctx.arc(138, 130, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Cute face
      this.drawCheek(ctx, 88, 106, 8);
      this.drawCheek(ctx, 152, 106, 8);
      this.drawCuteEye(ctx, 102, 95, 6);
      this.drawCuteEye(ctx, 138, 95, 6);
      ctx.beginPath();
      ctx.arc(120, 102, 6, 0.2, Math.PI - 0.2);
      ctx.stroke();

      // Smooth river sheen
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.beginPath();
      ctx.ellipse(104, 64, 15, 5.5, -0.25, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    // variant === "pill": Two-tone tilted medicine capsule
    ctx.save();
    ctx.translate(120, 96);
    ctx.rotate(-0.35);

    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(-64, -32, 128, 64, 32);
      emit();
    });

    // Left crimson half of the capsule
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(-64, -32, 64, 64, [32, 0, 0, 32]);
    ctx.fill();
    ctx.stroke();

    // Lower shading band across capsule
    ctx.fillStyle = "rgba(15, 23, 42, 0.12)";
    ctx.beginPath();
    ctx.roundRect(-56, 12, 112, 14, 7);
    ctx.fill();

    // Specular capsule reflection
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.beginPath();
    ctx.roundRect(-48, -22, 34, 8, 4);
    ctx.roundRect(12, -22, 34, 8, 4);
    ctx.fill();

    // Cute eyes with white halo on the red side so both eyes pop!
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(-22, 2, 8, 0, Math.PI * 2);
    ctx.fill();
    this.drawCuteEye(ctx, -22, 2, 5.5);
    this.drawCuteEye(ctx, 22, 2, 5.5);
    ctx.restore();
  }

  private static drawDragon(ctx: CanvasRenderingContext2D) {
    // Majestic & cute emerald-teal winged dragon with golden horns, belly scales & flame puff
    // 1. Back wings
    this.drawUnion(ctx, "#059669", (emit) => {
      ctx.beginPath();
      ctx.moveTo(106, 86);
      ctx.quadraticCurveTo(126, 24, 178, 28);
      ctx.quadraticCurveTo(166, 54, 186, 68);
      ctx.quadraticCurveTo(156, 74, 146, 96);
      ctx.closePath();
      emit();
    });

    // Inner wing membrane
    ctx.fillStyle = "#34d399";
    ctx.beginPath();
    ctx.moveTo(114, 84);
    ctx.quadraticCurveTo(132, 40, 168, 38);
    ctx.quadraticCurveTo(156, 58, 174, 68);
    ctx.quadraticCurveTo(148, 74, 140, 90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden horns on head
    this.drawUnion(ctx, "#fbbf24", (emit) => {
      ctx.beginPath();
      ctx.moveTo(86, 48);
      ctx.quadraticCurveTo(96, 18, 116, 22);
      ctx.quadraticCurveTo(106, 40, 100, 52);
      ctx.closePath();
      emit();

      ctx.beginPath();
      ctx.moveTo(102, 52);
      ctx.quadraticCurveTo(116, 24, 134, 28);
      ctx.quadraticCurveTo(122, 44, 112, 56);
      ctx.closePath();
      emit();
    });

    // Fiery orange-gold breath puff connected to snout on the left
    this.drawUnion(ctx, "#f97316", (emit) => {
      ctx.beginPath();
      ctx.moveTo(58, 66);
      ctx.quadraticCurveTo(32, 46, 22, 64);
      ctx.quadraticCurveTo(14, 82, 34, 90);
      ctx.quadraticCurveTo(48, 92, 60, 78);
      ctx.closePath();
      emit();
    });
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(36, 70, 9, 0, Math.PI * 2);
    ctx.fill();

    // Main dragon body, snout, legs & spiked curling tail
    this.drawUnion(ctx, "#10b981", (emit) => {
      // Snout & head
      ctx.beginPath();
      ctx.ellipse(80, 64, 30, 22, -0.1, 0, Math.PI * 2);
      emit();
      // Neck & chubby torso
      ctx.beginPath();
      ctx.ellipse(116, 112, 38, 42, 0.1, 0, Math.PI * 2);
      emit();
      // Curling tail on right
      ctx.beginPath();
      ctx.moveTo(144, 122);
      ctx.quadraticCurveTo(192, 118, 198, 86);
      ctx.quadraticCurveTo(212, 116, 184, 146);
      ctx.quadraticCurveTo(160, 156, 138, 144);
      ctx.closePath();
      emit();
      // Sturdy feet
      ctx.beginPath();
      ctx.roundRect(84, 140, 26, 26, 10);
      ctx.roundRect(120, 140, 26, 26, 10);
      emit();
    });

    // Golden ridged belly plate
    ctx.fillStyle = "#fde68a";
    ctx.beginPath();
    ctx.ellipse(104, 118, 19, 28, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Belly horizontal scale lines (strictly inside belly plate!)
    ctx.lineWidth = 3.5;
    for (const [y, hw] of [
      [102, 13],
      [113, 16],
      [124, 16],
      [135, 13],
    ]) {
      ctx.beginPath();
      ctx.moveTo(104 - hw, y);
      ctx.quadraticCurveTo(104, y + 3, 104 + hw, y);
      ctx.stroke();
    }
    ctx.lineWidth = 5.5;

    // Cute front arm drawn cleanly over torso edge
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.ellipse(122, 106, 15, 8.5, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Dorsal golden spikes along tail
    ctx.fillStyle = "#fbbf24";
    for (const [sx, sy] of [
      [150, 104],
      [166, 116],
      [182, 112],
    ]) {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 8, sy - 12);
      ctx.lineTo(sx + 14, sy + 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Eye, nostril & fang
    this.drawCheek(ctx, 88, 72, 6.5);
    this.drawCuteEye(ctx, 82, 56, 6);
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.arc(60, 60, 3, 0, Math.PI * 2);
    ctx.fill();

    // Cute white fang
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(64, 78);
    ctx.lineTo(69, 87);
    ctx.lineTo(74, 78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawSquirrel(ctx: CanvasRenderingContext2D) {
    // Cinnamon-brown squirrel with giant fluffy curled tail & oak acorn
    // 1. Giant S-curved bushy tail on the right
    this.drawUnion(ctx, "#b45309", (emit) => {
      ctx.beginPath();
      ctx.moveTo(126, 138);
      ctx.bezierCurveTo(128, 70, 150, 24, 186, 34);
      ctx.bezierCurveTo(218, 44, 216, 106, 192, 136);
      ctx.bezierCurveTo(174, 156, 144, 154, 126, 138);
      ctx.closePath();
      emit();
    });

    // Warm golden inner fur swirl on tail
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(176, 86, 20, 34, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // 2. Squirrel head, perky ears, body & feet
    this.drawUnion(ctx, "#d97706", (emit) => {
      // Ears
      ctx.beginPath();
      ctx.ellipse(76, 42, 9, 16, -0.2, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(108, 42, 9, 16, 0.2, 0, Math.PI * 2);
      emit();
      // Round head
      ctx.beginPath();
      ctx.ellipse(92, 72, 30, 26, 0, 0, Math.PI * 2);
      emit();
      // Body
      ctx.beginPath();
      ctx.ellipse(106, 120, 32, 34, 0.12, 0, Math.PI * 2);
      emit();
      // Feet
      ctx.beginPath();
      ctx.ellipse(88, 154, 18, 9, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(122, 154, 18, 9, 0, 0, Math.PI * 2);
      emit();
    });

    // Cream belly patch
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.ellipse(98, 122, 18, 24, 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Two cute eyes, rosy cheeks & button nose
    this.drawCheek(ctx, 72, 78, 6);
    this.drawCheek(ctx, 110, 78, 6);
    this.drawCuteEye(ctx, 78, 68, 5.5);
    this.drawCuteEye(ctx, 102, 68, 5.5);
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.ellipse(90, 74, 4.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Upright oak acorn held on the left
    this.drawUnion(ctx, "#92400e", (emit) => {
      ctx.beginPath();
      ctx.ellipse(58, 118, 15, 17, 0, 0, Math.PI * 2);
      emit();
    });
    // Acorn dome cap & stem
    this.drawUnion(ctx, "#451a03", (emit) => {
      ctx.beginPath();
      ctx.roundRect(55, 86, 6, 12, 3);
      emit();
      ctx.beginPath();
      ctx.ellipse(58, 102, 18, 9, 0, 0, Math.PI * 2);
      emit();
    });
    // Paw holding the acorn
    this.drawUnion(ctx, "#d97706", (emit) => {
      ctx.beginPath();
      ctx.ellipse(78, 116, 12, 8, -0.15, 0, Math.PI * 2);
      emit();
    });
  }

  private static drawHamster(ctx: CanvasRenderingContext2D) {
    // Chubby golden-cream pudding hamster with puffed cheeks & sunflower seed
    this.drawUnion(ctx, "#fef3c7", (emit) => {
      // Round ears
      ctx.beginPath();
      ctx.arc(76, 46, 16, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(164, 46, 16, 0, Math.PI * 2);
      emit();
      // Main chubby potato-shaped body
      ctx.beginPath();
      ctx.ellipse(120, 102, 54, 52, 0, 0, Math.PI * 2);
      emit();
      // Extra-puffy lower cheeks
      ctx.beginPath();
      ctx.arc(78, 100, 26, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(162, 100, 26, 0, Math.PI * 2);
      emit();
      // Tiny stubby feet
      ctx.beginPath();
      ctx.ellipse(90, 152, 14, 8, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(150, 152, 14, 8, 0, 0, Math.PI * 2);
      emit();
    });

    // Pink inner ears
    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.arc(76, 46, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(164, 46, 9, 0, Math.PI * 2);
    ctx.fill();

    // Golden-amber top head hood patch
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(68, 82);
    ctx.quadraticCurveTo(74, 46, 120, 46);
    ctx.quadraticCurveTo(166, 46, 172, 82);
    ctx.quadraticCurveTo(146, 68, 120, 76);
    ctx.quadraticCurveTo(94, 68, 68, 82);
    ctx.closePath();
    ctx.fill();

    // Rosy cheeks & big glossy eyes
    this.drawCheek(ctx, 78, 96, 10);
    this.drawCheek(ctx, 162, 96, 10);
    this.drawCuteEye(ctx, 96, 82, 6.5);
    this.drawCuteEye(ctx, 144, 82, 6.5);

    // Pink nose & w-mouth
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.ellipse(120, 89, 5, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(114, 94, 6, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(126, 94, 6, 0, Math.PI);
    ctx.stroke();

    // Plump golden-brown acorn/nut held between pink paws
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.ellipse(120, 126, 14, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.ellipse(120, 114, 16, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cute pink paws holding the nut on left & right
    ctx.fillStyle = "#fda4af";
    ctx.beginPath();
    ctx.ellipse(102, 126, 9, 6.5, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(138, 126, 9, 6.5, -0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawHedgehog(ctx: CanvasRenderingContext2D) {
    // Spiky cocoa-brown quill back with 11 distinct radial spikes & soft tan snout
    this.drawUnion(ctx, "#57534e", (emit) => {
      ctx.beginPath();
      const cx = 132;
      const cy = 98;
      const spikes = 11;
      for (let i = 0; i <= spikes * 2; i++) {
        const t = -Math.PI * 0.78 + (i / (spikes * 2)) * Math.PI * 1.45;
        const r = i % 2 === 0 ? 64 : 46;
        const x = cx + Math.cos(t) * r * 1.05;
        const y = cy + Math.sin(t) * r * 0.92;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      emit();
    });

    // Soft tan face, snout, ear & belly drawn BEFORE quill highlights so nothing overlaps face
    this.drawUnion(ctx, "#fde68a", (emit) => {
      // Snout & head cone on left
      ctx.beginPath();
      ctx.moveTo(106, 62);
      ctx.quadraticCurveTo(64, 68, 46, 92);
      ctx.quadraticCurveTo(62, 126, 108, 134);
      ctx.quadraticCurveTo(144, 138, 156, 126);
      ctx.quadraticCurveTo(126, 98, 106, 62);
      ctx.closePath();
      emit();
      // Round ear
      ctx.beginPath();
      ctx.arc(106, 66, 12, 0, Math.PI * 2);
      emit();
      // Stubby paws
      ctx.beginPath();
      ctx.ellipse(88, 138, 14, 8, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(138, 138, 14, 8, 0, 0, Math.PI * 2);
      emit();
    });

    // Inner quill texture lines strictly on the right spiky mantle (-0.85..+0.55 rad)
    ctx.strokeStyle = "#d6d3d1";
    ctx.lineWidth = 3.5;
    for (const a of [-0.85, -0.5, -0.15, 0.2, 0.55]) {
      ctx.beginPath();
      ctx.moveTo(134 + Math.cos(a) * 28, 96 + Math.sin(a) * 24);
      ctx.lineTo(134 + Math.cos(a) * 46, 96 + Math.sin(a) * 40);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Dark berry nose tip on left snout
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(46, 90, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Cute eye, rosy cheek & smile
    this.drawCheek(ctx, 84, 106, 7.5);
    this.drawCuteEye(ctx, 80, 88, 6);
    ctx.beginPath();
    ctx.arc(68, 102, 7, 0.1, Math.PI * 0.85);
    ctx.stroke();
  }

  private static drawEagle(ctx: CanvasRenderingContext2D) {
    // Regal bald eagle with spread chocolate wings, snow-white head & hooked golden beak
    // 1. Spread wings & brown body + talons
    this.drawUnion(ctx, "#78350f", (emit) => {
      // Left wing
      ctx.beginPath();
      ctx.moveTo(96, 86);
      ctx.quadraticCurveTo(42, 40, 22, 62);
      ctx.quadraticCurveTo(26, 98, 56, 112);
      ctx.quadraticCurveTo(78, 120, 96, 112);
      ctx.closePath();
      emit();
      // Right wing
      ctx.beginPath();
      ctx.moveTo(144, 86);
      ctx.quadraticCurveTo(198, 40, 218, 62);
      ctx.quadraticCurveTo(214, 98, 184, 112);
      ctx.quadraticCurveTo(162, 120, 144, 112);
      ctx.closePath();
      emit();
      // Central chest & body
      ctx.beginPath();
      ctx.ellipse(120, 110, 34, 36, 0, 0, Math.PI * 2);
      emit();
    });

    // Warm bronze secondary wing feathers
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.ellipse(62, 86, 26, 14, 0.3, 0, Math.PI * 2);
    ctx.ellipse(178, 86, 26, 14, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // 2. Snow-white head hood with jagged neck ruff
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.moveTo(86, 84);
      ctx.quadraticCurveTo(84, 34, 120, 34);
      ctx.quadraticCurveTo(156, 34, 154, 84);
      ctx.lineTo(140, 96);
      ctx.lineTo(128, 88);
      ctx.lineTo(120, 98);
      ctx.lineTo(112, 88);
      ctx.lineTo(100, 96);
      ctx.closePath();
      emit();
    });

    // Eyes & heroic brow ridge
    this.drawCuteEye(ctx, 102, 60, 5.5);
    this.drawCuteEye(ctx, 138, 60, 5.5);
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(90, 50);
    ctx.lineTo(111, 56);
    ctx.moveTo(150, 50);
    ctx.lineTo(129, 56);
    ctx.stroke();
    ctx.lineWidth = 5.5;

    // 3. Hooked golden eagle beak & talons
    this.drawUnion(ctx, "#fbbf24", (emit) => {
      // Left & right talons
      ctx.beginPath();
      ctx.ellipse(100, 148, 14, 9, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(140, 148, 14, 9, 0, 0, Math.PI * 2);
      emit();
    });

    // Sharp hooked golden beak on face
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.moveTo(107, 64);
    ctx.quadraticCurveTo(120, 56, 133, 64);
    ctx.quadraticCurveTo(132, 80, 120, 88);
    ctx.quadraticCurveTo(108, 80, 107, 64);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawFlamingo(ctx: CanvasRenderingContext2D) {
    // Graceful coral-pink flamingo with S-curved neck, black-tipped beak & figure-4 legs
    // 1. Long pink legs with clear open figure-4 knee loop
    this.drawUnion(ctx, "#f43f5e", (emit) => {
      // Standing straight leg + webbed foot base
      ctx.beginPath();
      ctx.roundRect(124, 112, 8, 52, 4);
      ctx.roundRect(110, 158, 30, 8, 4);
      emit();
    });

    // Bent figure-4 leg drawn with clean double-stroked path so triangle gap stays open!
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(114, 114);
    ctx.lineTo(92, 136);
    ctx.lineTo(126, 140);
    ctx.stroke();
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(114, 114);
    ctx.lineTo(92, 136);
    ctx.lineTo(126, 140);
    ctx.stroke();
    ctx.restore();

    // 2. Flamingo S-neck, head & plumed body
    this.drawUnion(ctx, "#fb7185", (emit) => {
      // Head
      ctx.beginPath();
      ctx.arc(82, 42, 18, 0, Math.PI * 2);
      emit();
      // S-curved neck
      ctx.beginPath();
      ctx.moveTo(88, 54);
      ctx.bezierCurveTo(64, 82, 68, 114, 102, 112);
      ctx.lineTo(106, 96);
      ctx.bezierCurveTo(84, 98, 82, 76, 98, 52);
      ctx.closePath();
      emit();
      // Plump body & drooped tail feathers
      ctx.beginPath();
      ctx.moveTo(96, 94);
      ctx.bezierCurveTo(118, 76, 166, 80, 184, 112);
      ctx.bezierCurveTo(164, 128, 114, 128, 96, 110);
      ctx.closePath();
      emit();
    });

    // Layered deep-rose wing panel
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.ellipse(138, 102, 26, 14, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Characteristic downward-bent two-tone flamingo beak
    this.drawUnion(ctx, "#ffe4e6", (emit) => {
      ctx.beginPath();
      ctx.moveTo(68, 38);
      ctx.quadraticCurveTo(46, 40, 46, 58);
      ctx.quadraticCurveTo(58, 60, 70, 48);
      ctx.closePath();
      emit();
    });
    // Black tip of beak
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.arc(51, 54, 7, 0, Math.PI * 2);
    ctx.fill();

    // Cute eye & cheek
    this.drawCheek(ctx, 86, 48, 5.5);
    this.drawCuteEye(ctx, 78, 40, 5);
  }

  private static drawParrot(ctx: CanvasRenderingContext2D) {
    // Tropical scarlet macaw with feather crest, hooked beak & rainbow wing
    // 1. Curved two-part hooked macaw beak on left
    this.drawUnion(ctx, "#1e293b", (emit) => {
      // Lower dark mandible
      ctx.beginPath();
      ctx.ellipse(82, 68, 14, 9, 0.2, 0, Math.PI * 2);
      emit();
    });
    this.drawUnion(ctx, "#fef08a", (emit) => {
      // Upper hooked ivory mandible
      ctx.beginPath();
      ctx.moveTo(94, 48);
      ctx.quadraticCurveTo(60, 46, 62, 72);
      ctx.quadraticCurveTo(72, 64, 92, 64);
      ctx.closePath();
      emit();
    });

    // 2. Scarlet head, crest, body & tail feathers
    this.drawUnion(ctx, "#ef4444", (emit) => {
      // Three-feather top crest
      ctx.beginPath();
      ctx.ellipse(106, 30, 6, 14, -0.35, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(118, 28, 6, 15, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(130, 32, 6, 13, 0.35, 0, Math.PI * 2);
      emit();
      // Head & breast
      ctx.beginPath();
      ctx.arc(114, 62, 26, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(120, 108, 32, 36, -0.1, 0, Math.PI * 2);
      emit();
      // Tail feathers extending bottom-right
      ctx.beginPath();
      ctx.moveTo(132, 132);
      ctx.lineTo(168, 166);
      ctx.lineTo(142, 166);
      ctx.lineTo(118, 140);
      ctx.closePath();
      emit();
    });

    // White macaw facial patch around eye
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.ellipse(104, 60, 14, 12, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Multi-tiered rainbow wing (gold -> green -> cobalt blue)
    this.drawUnion(ctx, "#3b82f6", (emit) => {
      ctx.beginPath();
      ctx.ellipse(138, 112, 22, 32, -0.22, 0, Math.PI * 2);
      emit();
    });
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.ellipse(136, 104, 20, 22, -0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.ellipse(134, 94, 17, 13, -0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Perch branch under feet
    this.drawUnion(ctx, "#78350f", (emit) => {
      ctx.beginPath();
      ctx.roundRect(74, 142, 88, 12, 6);
      emit();
    });

    // Eye & cheek
    this.drawCheek(ctx, 112, 72, 6);
    this.drawCuteEye(ctx, 103, 59, 5.5);
  }

  private static drawShrimp(ctx: CanvasRenderingContext2D) {
    // Plump C-curved coral-orange prawn with segmented shell & crimson tail fan
    // 1. Flared crimson 3-lobed tail fan at bottom-left
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.ellipse(80, 138, 20, 9, -0.4, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(84, 150, 20, 9, 0.1, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(96, 156, 18, 8, 0.5, 0, Math.PI * 2);
      emit();
    });

    // 2. Curved segmented prawn body & head + tucked swimmeret legs
    this.drawUnion(ctx, "#fb923c", (emit) => {
      // Tucked little shrimp legs along inner curve
      for (const [lx, ly] of [
        [106, 84],
        [120, 92],
        [126, 108],
      ]) {
        ctx.beginPath();
        ctx.ellipse(lx, ly, 10, 5, -0.4, 0, Math.PI * 2);
        emit();
      }
      // Curved prawn body
      ctx.beginPath();
      ctx.moveTo(54, 58);
      ctx.quadraticCurveTo(88, 32, 134, 42);
      ctx.quadraticCurveTo(178, 52, 182, 96);
      ctx.quadraticCurveTo(184, 138, 140, 154);
      ctx.quadraticCurveTo(106, 162, 94, 142);
      ctx.quadraticCurveTo(118, 132, 134, 116);
      ctx.quadraticCurveTo(144, 92, 122, 80);
      ctx.quadraticCurveTo(90, 84, 54, 58);
      ctx.closePath();
      emit();
    });

    // Darker orange shell segment bands
    ctx.strokeStyle = "#ea580c";
    ctx.lineWidth = 4.5;
    for (const [x1, y1, x2, y2] of [
      [124, 44, 116, 78],
      [152, 56, 132, 86],
      [174, 82, 138, 100],
      [172, 114, 134, 116],
      [152, 140, 118, 128],
    ]) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Swept feeler antenna along top
    ctx.beginPath();
    ctx.moveTo(74, 48);
    ctx.quadraticCurveTo(114, 22, 164, 36);
    ctx.stroke();

    // Cute eye & cheek on prawn head
    this.drawCheek(ctx, 98, 68, 6.5);
    this.drawCuteEye(ctx, 88, 56, 6);
  }

  private static drawSquid(ctx: CanvasRenderingContext2D) {
    // Arrow-headed rose-coral squid with triangular top fins & 10 tentacles
    // 1. Tentacles at the bottom
    this.drawUnion(ctx, "#f472b6", (emit) => {
      for (const tx of [78, 94, 110, 126, 142, 158]) {
        ctx.beginPath();
        ctx.roundRect(tx - 6, 116, 12, 46, 6);
        emit();
      }
      // Two longer outer feeding clubs
      ctx.beginPath();
      ctx.moveTo(76, 120);
      ctx.quadraticCurveTo(54, 144, 64, 168);
      ctx.quadraticCurveTo(78, 166, 84, 132);
      ctx.closePath();
      ctx.moveTo(164, 120);
      ctx.quadraticCurveTo(186, 144, 176, 168);
      ctx.quadraticCurveTo(162, 166, 156, 132);
      ctx.closePath();
      emit();
    });

    // 2. Diamond arrow fin + torpedo mantle + head
    this.drawUnion(ctx, "#fb7185", (emit) => {
      // Triangular top fins
      ctx.beginPath();
      ctx.moveTo(120, 18);
      ctx.lineTo(176, 58);
      ctx.lineTo(120, 74);
      ctx.lineTo(64, 58);
      ctx.closePath();
      emit();
      // Torpedo mantle body & head
      ctx.beginPath();
      ctx.moveTo(88, 52);
      ctx.lineTo(152, 52);
      ctx.lineTo(146, 126);
      ctx.lineTo(94, 126);
      ctx.closePath();
      emit();
    });

    // Mantle collar ridge
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.roundRect(86, 88, 68, 10, 5);
    ctx.fill();
    ctx.stroke();

    // Cute squid eyes below the collar & smile
    this.drawCheek(ctx, 88, 116, 6.5);
    this.drawCheek(ctx, 152, 116, 6.5);
    this.drawCuteEye(ctx, 102, 109, 6);
    this.drawCuteEye(ctx, 138, 109, 6);
    ctx.beginPath();
    ctx.arc(120, 114, 5, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Specular highlight on mantle
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.beginPath();
    ctx.ellipse(104, 58, 6, 18, -0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawCastle(ctx: CanvasRenderingContext2D) {
    // Fairytale stone castle with twin blue conical tower roofs, battlements & arched gate
    // 1. Unified single stone castle wall + battlements + twin towers
    this.drawUnion(ctx, "#cbd5e1", (emit) => {
      ctx.beginPath();
      // Left tower
      ctx.moveTo(44, 162);
      ctx.lineTo(44, 56);
      ctx.lineTo(80, 56);
      ctx.lineTo(80, 78);
      // Battlement 1
      ctx.lineTo(88, 78);
      ctx.lineTo(88, 64);
      ctx.lineTo(104, 64);
      ctx.lineTo(104, 78);
      // Battlement 2
      ctx.lineTo(112, 78);
      ctx.lineTo(112, 64);
      ctx.lineTo(128, 64);
      ctx.lineTo(128, 78);
      // Battlement 3
      ctx.lineTo(136, 78);
      ctx.lineTo(136, 64);
      ctx.lineTo(152, 64);
      ctx.lineTo(152, 78);
      // Right tower
      ctx.lineTo(160, 78);
      ctx.lineTo(160, 56);
      ctx.lineTo(196, 56);
      ctx.lineTo(196, 162);
      ctx.closePath();
      emit();
    });

    // Stone base plinth & brick accents
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(47, 148, 146, 11);
    ctx.beginPath();
    ctx.moveTo(44, 148);
    ctx.lineTo(196, 148);
    ctx.stroke();

    // 2. Blue conical roofs on twin towers + red flags
    this.drawUnion(ctx, "#3b82f6", (emit) => {
      ctx.beginPath();
      ctx.moveTo(38, 58);
      ctx.lineTo(62, 20);
      ctx.lineTo(86, 58);
      ctx.closePath();
      ctx.moveTo(154, 58);
      ctx.lineTo(178, 20);
      ctx.lineTo(202, 58);
      ctx.closePath();
      emit();
    });

    // Fluttering red pennants at tower peaks
    ctx.fillStyle = "#ef4444";
    for (const tx of [62, 178]) {
      ctx.beginPath();
      ctx.moveTo(tx, 20);
      ctx.lineTo(tx + 18, 25);
      ctx.lineTo(tx, 31);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // 3. Arched wooden portcullis gate in center
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.moveTo(98, 162);
    ctx.lineTo(98, 120);
    ctx.arc(120, 120, 22, Math.PI, 0);
    ctx.lineTo(142, 162);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Portcullis iron grille bars
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(110, 100);
    ctx.lineTo(110, 162);
    ctx.moveTo(120, 98);
    ctx.lineTo(120, 162);
    ctx.moveTo(130, 100);
    ctx.lineTo(130, 162);
    ctx.moveTo(98, 132);
    ctx.lineTo(142, 132);
    ctx.stroke();
    ctx.lineWidth = 5.5;

    // Tower arched windows
    ctx.fillStyle = "#1e293b";
    for (const wx of [62, 178]) {
      ctx.beginPath();
      ctx.roundRect(wx - 6, 82, 12, 20, [6, 6, 2, 2]);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawTent(ctx: CanvasRenderingContext2D) {
    // Cozy A-frame orange camping tent with crossed apex poles & hanging lantern
    // 1. Green ground base
    this.drawUnion(ctx, "#22c55e", (emit) => {
      ctx.beginPath();
      ctx.roundRect(34, 148, 172, 16, 8);
      emit();
    });

    // 2. Main A-frame orange canvas body
    this.drawUnion(ctx, "#f97316", (emit) => {
      // Crossed poles at apex
      ctx.beginPath();
      ctx.moveTo(106, 22);
      ctx.lineTo(126, 48);
      ctx.moveTo(126, 22);
      ctx.lineTo(106, 48);
      emit();
      // Tent triangle body
      ctx.beginPath();
      ctx.moveTo(116, 32);
      ctx.lineTo(196, 150);
      ctx.lineTo(44, 150);
      ctx.closePath();
      emit();
    });

    // Darker orange 3D side wall on right
    ctx.fillStyle = "#ea580c";
    ctx.beginPath();
    ctx.moveTo(116, 32);
    ctx.lineTo(196, 150);
    ctx.lineTo(146, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Open triangular doorway revealing dark night interior
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.moveTo(96, 68);
    ctx.lineTo(134, 150);
    ctx.lineTo(58, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Hanging camp lantern with cord & warm glow halo inside doorway
    ctx.beginPath();
    ctx.moveTo(96, 68);
    ctx.lineTo(96, 102);
    ctx.stroke();
    ctx.fillStyle = "rgba(251, 191, 36, 0.35)";
    ctx.beginPath();
    ctx.arc(96, 112, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.roundRect(88, 102, 16, 20, 6);
    ctx.fill();
    ctx.stroke();

    // Rolled-back light-orange entrance flaps
    ctx.fillStyle = "#fdba74";
    ctx.beginPath();
    ctx.moveTo(96, 68);
    ctx.lineTo(58, 150);
    ctx.lineTo(44, 150);
    ctx.closePath();
    ctx.moveTo(96, 68);
    ctx.lineTo(134, 150);
    ctx.lineTo(146, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawPyramid(ctx: CanvasRenderingContext2D) {
    // 3D golden Egyptian stepped/limestone pyramid with gleaming capstone
    // 1. Desert sand dune base + main pyramid triangle
    this.drawUnion(ctx, "#f59e0b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(30, 146, 180, 16, 8);
      emit();
      ctx.beginPath();
      ctx.moveTo(120, 26);
      ctx.lineTo(202, 150);
      ctx.lineTo(38, 150);
      ctx.closePath();
      emit();
    });

    // Shadowed right face in 3D perspective (ridge from (120,26) to (134,150))
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.moveTo(120, 26);
    ctx.lineTo(202, 150);
    ctx.lineTo(134, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Gleaming golden capstone at apex (exact ridge intersection at t=0.34 -> (124.76, 68.16))
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.moveTo(120, 26);
    ctx.lineTo(92.1, 68.2);
    ctx.lineTo(124.8, 68.2);
    ctx.lineTo(147.9, 68.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 26);
    ctx.lineTo(124.8, 68.2);
    ctx.stroke();

    // Limestone block courses & mortar joints
    ctx.lineWidth = 4;
    for (const [y, lx, cx, rx] of [
      [96, 73.7, 127.9, 166.3],
      [123, 55.8, 131.0, 184.1],
    ]) {
      ctx.beginPath();
      ctx.moveTo(lx, y);
      ctx.lineTo(cx, y);
      ctx.lineTo(rx, y);
      ctx.stroke();
    }
    ctx.lineWidth = 5.5;

    // Mysterious dark pharaoh entrance portal at base
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(76, 122, 26, 28, [4, 4, 0, 0]);
    ctx.fill();
    ctx.stroke();
  }

  private static drawTshirt(ctx: CanvasRenderingContext2D) {
    // Sporty sky-blue T-shirt with ribbed collar, yellow cuffs & golden chest star
    this.drawUnion(ctx, "#3b82f6", (emit) => {
      ctx.beginPath();
      ctx.moveTo(88, 36);
      ctx.lineTo(34, 68);
      ctx.lineTo(54, 102);
      ctx.lineTo(74, 88);
      ctx.lineTo(74, 158);
      ctx.lineTo(166, 158);
      ctx.lineTo(166, 88);
      ctx.lineTo(186, 102);
      ctx.lineTo(206, 68);
      ctx.lineTo(152, 36);
      ctx.closePath();
      emit();
    });

    // Darker blue side torso shading
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(148, 86, 15, 69);

    // Contrasting yellow sleeve cuff bands
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.moveTo(34, 68);
    ctx.lineTo(44, 62);
    ctx.lineTo(64, 95);
    ctx.lineTo(54, 102);
    ctx.closePath();
    ctx.moveTo(206, 68);
    ctx.lineTo(196, 62);
    ctx.lineTo(176, 95);
    ctx.lineTo(186, 102);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ribbed crew neck collar
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(120, 36, 26, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(120, 36, 31, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Golden 5-pointed star emblem on chest
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 === 0 ? 22 : 10;
      const x = 120 + Math.cos(a) * r;
      const y = 102 + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawBackpack(ctx: CanvasRenderingContext2D) {
    // Rounded crimson adventurer backpack with top handle, leather straps & front zipper pocket
    // 1. Top haul loop, side pockets & main body dome
    this.drawUnion(ctx, "#ef4444", (emit) => {
      // Top webbing handle loop
      ctx.beginPath();
      ctx.arc(120, 36, 18, Math.PI, 0);
      emit();
      // Left & right side bottle pockets
      ctx.beginPath();
      ctx.roundRect(54, 98, 20, 48, 8);
      ctx.roundRect(166, 98, 20, 48, 8);
      emit();
      // Main rounded backpack body
      ctx.beginPath();
      ctx.roundRect(68, 40, 104, 120, [44, 44, 18, 18]);
      emit();
    });

    // Cutout inside top handle loop
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(120, 38, 9, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Darker crimson top flap
    ctx.fillStyle = "#b91c1c";
    ctx.beginPath();
    ctx.roundRect(68, 40, 104, 46, [44, 44, 14, 14]);
    ctx.fill();
    ctx.stroke();

    // Front zippered pouch pocket
    ctx.fillStyle = "#f87171";
    ctx.beginPath();
    ctx.roundRect(82, 100, 76, 48, 12);
    ctx.fill();
    ctx.stroke();

    // Horizontal zipper line & golden pull tab on front pocket
    ctx.beginPath();
    ctx.moveTo(88, 114);
    ctx.lineTo(152, 114);
    ctx.stroke();
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.roundRect(114, 110, 12, 14, 4);
    ctx.fill();
    ctx.stroke();

    // Twin brown leather buckle straps on top flap
    for (const sx of [94, 134]) {
      ctx.fillStyle = "#92400e";
      ctx.beginPath();
      ctx.roundRect(sx, 62, 12, 32, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.roundRect(sx - 2, 74, 16, 10, 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  private static drawFlower(
    ctx: CanvasRenderingContext2D,
    variant: "sunflower" | "rose" | "tulip" | "clover"
  ) {
    if (variant === "sunflower") {
      // Stem & serrated green leaves
      this.drawUnion(ctx, "#16a34a", (emit) => {
        ctx.beginPath();
        ctx.roundRect(114, 96, 12, 68, 6);
        emit();
        ctx.beginPath();
        ctx.ellipse(90, 136, 24, 12, -0.4, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(150, 132, 24, 12, 0.4, 0, Math.PI * 2);
        emit();
      });

      // 12 golden sunflower petals around center
      this.drawUnion(ctx, "#fbbf24", (emit) => {
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI * 2) / 12;
          const px = 120 + Math.cos(a) * 38;
          const py = 72 + Math.sin(a) * 38;
          ctx.beginPath();
          ctx.ellipse(px, py, 18, 10, a, 0, Math.PI * 2);
          emit();
        }
      });

      // Rich chocolate seed disk center
      ctx.fillStyle = "#78350f";
      ctx.beginPath();
      ctx.arc(120, 72, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cute smiling face on sunflower disk
      this.drawCheek(ctx, 102, 78, 6);
      this.drawCheek(ctx, 138, 78, 6);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(108, 68, 6.5, 0, Math.PI * 2);
      ctx.arc(132, 68, 6.5, 0, Math.PI * 2);
      ctx.fill();
      this.drawCuteEye(ctx, 108, 68, 5);
      this.drawCuteEye(ctx, 132, 68, 5);
      ctx.strokeStyle = "#fde047";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(120, 75, 6, 0.2, Math.PI - 0.2);
      ctx.stroke();
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 5.5;
      return;
    }

    if (variant === "rose") {
      // Thorny green stem, pointed calyx sepals & rose leaves
      this.drawUnion(ctx, "#15803d", (emit) => {
        ctx.beginPath();
        ctx.roundRect(115, 92, 10, 72, 5);
        emit();
        ctx.beginPath();
        ctx.ellipse(90, 134, 23, 11, -0.45, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(150, 126, 23, 11, 0.45, 0, Math.PI * 2);
        emit();
        // Green calyx leaves cupping the rose base
        ctx.beginPath();
        ctx.ellipse(96, 92, 18, 7, -0.5, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(144, 92, 18, 7, 0.5, 0, Math.PI * 2);
        emit();
      });

      // Lush layered crimson rose petals
      this.drawUnion(ctx, "#e11d48", (emit) => {
        ctx.beginPath();
        ctx.arc(92, 62, 24, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.arc(148, 62, 24, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.arc(106, 44, 22, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.arc(134, 44, 22, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(120, 72, 38, 28, 0, 0, Math.PI * 2);
        emit();
      });

      // Cupped inner rose petals & spiral bud
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(104, 62, 18, 0.2, Math.PI * 1.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(136, 62, 18, -Math.PI * 0.3, Math.PI * 0.8);
      ctx.stroke();

      ctx.fillStyle = "#fb7185";
      ctx.beginPath();
      ctx.ellipse(120, 50, 22, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Spiral swirl in bud top
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(120, 50, 10, 0, Math.PI * 1.45);
      ctx.stroke();
      ctx.lineWidth = 5.5;

      // Cute eyes on rose cup
      this.drawCheek(ctx, 100, 82, 6);
      this.drawCheek(ctx, 140, 82, 6);
      this.drawCuteEye(ctx, 108, 75, 4.8);
      this.drawCuteEye(ctx, 132, 75, 4.8);
      return;
    }

    if (variant === "tulip") {
      // Potted magenta tulip in smiling terracotta pot
      // 1. Stem & sweeping leaves nestled right above pot rim
      this.drawUnion(ctx, "#22c55e", (emit) => {
        ctx.beginPath();
        ctx.roundRect(114, 72, 12, 42, 5);
        emit();
        ctx.beginPath();
        ctx.ellipse(90, 96, 26, 11, 0.55, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(150, 96, 26, 11, -0.55, 0, Math.PI * 2);
        emit();
      });

      // 2. Full three-lobed magenta tulip blossom
      this.drawUnion(ctx, "#ec4899", (emit) => {
        ctx.beginPath();
        ctx.ellipse(100, 54, 21, 30, -0.25, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(140, 54, 21, 30, 0.25, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(120, 52, 20, 32, 0, 0, Math.PI * 2);
        emit();
      });
      ctx.fillStyle = "#f472b6";
      ctx.beginPath();
      ctx.ellipse(120, 54, 17, 29, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 3. Terracotta flowerpot at bottom with cute face
      this.drawUnion(ctx, "#ea580c", (emit) => {
        ctx.beginPath();
        ctx.moveTo(84, 114);
        ctx.lineTo(156, 114);
        ctx.lineTo(144, 164);
        ctx.lineTo(96, 164);
        ctx.closePath();
        emit();
        ctx.beginPath();
        ctx.roundRect(76, 106, 88, 14, 6);
        emit();
      });
      this.drawCheek(ctx, 100, 146, 6);
      this.drawCheek(ctx, 140, 146, 6);
      this.drawCuteEye(ctx, 108, 138, 4.8);
      this.drawCuteEye(ctx, 132, 138, 4.8);
      ctx.beginPath();
      ctx.arc(120, 144, 5, 0.2, Math.PI - 0.2);
      ctx.stroke();
      return;
    }

    // variant === "clover": Lucky 4-heart-leaf emerald clover with clear notches
    this.drawUnion(ctx, "#15803d", (emit) => {
      // Curved stem
      ctx.beginPath();
      ctx.moveTo(122, 92);
      ctx.quadraticCurveTo(126, 136, 144, 164);
      ctx.lineTo(132, 166);
      ctx.quadraticCurveTo(114, 136, 114, 92);
      ctx.closePath();
      emit();
    });

    // 4 distinct heart-shaped clover leaflets rotated at 45, 135, 225, 315 deg
    this.drawUnion(ctx, "#22c55e", (emit) => {
      for (const deg of [45, 135, 225, 315]) {
        const rad = (deg * Math.PI) / 180;
        ctx.save();
        ctx.translate(120, 82);
        ctx.rotate(rad);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-24, -14, -30, -44, -11, -50);
        ctx.bezierCurveTo(-2, -52, 0, -42, 0, -38);
        ctx.bezierCurveTo(0, -42, 2, -52, 11, -50);
        ctx.bezierCurveTo(30, -44, 24, -14, 0, 0);
        ctx.closePath();
        ctx.restore();
        emit();
      }
    });

    // Leaf vein lines radiating from center
    ctx.strokeStyle = "#15803d";
    ctx.lineWidth = 3.5;
    for (const deg of [45, 135, 225, 315]) {
      const rad = ((deg - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(120 + Math.cos(rad) * 8, 82 + Math.sin(rad) * 8);
      ctx.lineTo(120 + Math.cos(rad) * 28, 82 + Math.sin(rad) * 28);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // Cute face in center of clover
    this.drawCuteEye(ctx, 108, 80, 5);
    this.drawCuteEye(ctx, 132, 80, 5);
    ctx.beginPath();
    ctx.arc(120, 86, 5.5, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  private static drawSkull(ctx: CanvasRenderingContext2D) {
    // Spooky-cute cartoon bone skull with thick crossed femur bones & glowing cyan pupils
    // 1. Thick crossed femur bone shafts + double-knobbed bone ends behind cranium
    this.drawUnion(ctx, "#e2e8f0", (emit) => {
      for (const ang of [0.62, -0.62]) {
        const emitInRot = (drawShape: () => void) => {
          ctx.save();
          ctx.translate(120, 96);
          ctx.rotate(ang);
          ctx.beginPath();
          drawShape();
          ctx.restore();
          emit();
        };
        emitInRot(() => ctx.roundRect(-86, -8, 172, 16, 6));
        emitInRot(() => ctx.arc(-86, -9, 10, 0, Math.PI * 2));
        emitInRot(() => ctx.arc(-86, 9, 10, 0, Math.PI * 2));
        emitInRot(() => ctx.arc(86, -9, 10, 0, Math.PI * 2));
        emitInRot(() => ctx.arc(86, 9, 10, 0, Math.PI * 2));
      }
    });

    // 2. Main rounded cranium dome & jaw block
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.ellipse(120, 78, 52, 45, 0, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(88, 102, 64, 44, 14);
      emit();
    });

    // Subtle temple shadow
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.arc(154, 80, 15, -0.5, Math.PI * 0.5);
    ctx.fill();

    // Big dark eye sockets with glowing cyan pinpoints
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.ellipse(98, 82, 15, 16, -0.1, 0, Math.PI * 2);
    ctx.ellipse(142, 82, 15, 16, 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(98, 82, 5, 0, Math.PI * 2);
    ctx.arc(142, 82, 5, 0, Math.PI * 2);
    ctx.fill();

    // Inverted heart nasal cavity
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.moveTo(120, 95);
    ctx.lineTo(111, 110);
    ctx.lineTo(129, 110);
    ctx.closePath();
    ctx.fill();

    // Grinning teeth grid along jaw
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(92, 128);
    ctx.lineTo(148, 128);
    for (const tx of [104, 115, 125, 136]) {
      ctx.moveTo(tx, 118);
      ctx.lineTo(tx, 142);
    }
    ctx.stroke();
    ctx.lineWidth = 5.5;
  }

  private static drawSanta(ctx: CanvasRenderingContext2D) {
    // Cheerful Santa / Royal character with red hat, peach face, mustache & fluffy beard
    // 1. Red tunic torso & arms at bottom
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.roundRect(72, 114, 96, 48, [22, 22, 12, 12]);
      emit();
      ctx.beginPath();
      ctx.ellipse(66, 134, 16, 12, -0.3, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(174, 134, 16, 12, 0.3, 0, Math.PI * 2);
      emit();
    });

    // Black belt & gold buckle
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(74, 142, 92, 12);
    ctx.strokeRect(74, 142, 92, 12);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.roundRect(110, 139, 20, 18, 3);
    ctx.fill();
    ctx.stroke();

    // 2. Warm peach face
    this.drawUnion(ctx, "#fed7aa", (emit) => {
      ctx.beginPath();
      ctx.ellipse(120, 78, 36, 28, 0, 0, Math.PI * 2);
      emit();
    });

    // 3. Fluffy cloud-white beard
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.arc(90, 102, 18, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(150, 102, 18, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(102, 118, 20, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(138, 118, 20, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(120, 124, 22, 0, Math.PI * 2);
      emit();
    });

    // Mustache lobes under nose
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.ellipse(106, 92, 16, 8, -0.2, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(134, 92, 16, 8, 0.2, 0, Math.PI * 2);
      emit();
    });

    // Rosy nose, cheeks & twinkling eyes
    this.drawCheek(ctx, 92, 80, 6.5);
    this.drawCheek(ctx, 148, 80, 6.5);
    this.drawCuteEye(ctx, 104, 72, 5.5);
    this.drawCuteEye(ctx, 136, 72, 5.5);
    ctx.fillStyle = "#fb7185";
    ctx.beginPath();
    ctx.arc(120, 83, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 4. Festive red Santa hat + white fur brim & pom-pom
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.moveTo(82, 52);
      ctx.quadraticCurveTo(114, 16, 166, 34);
      ctx.quadraticCurveTo(156, 52, 158, 52);
      ctx.closePath();
      emit();
    });
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(76, 44, 88, 16, 8);
      emit();
      ctx.beginPath();
      ctx.arc(170, 38, 12, 0, Math.PI * 2);
      emit();
    });
  }

  private static drawAlien(ctx: CanvasRenderingContext2D) {
    // Cosmic lime-green 3-eyed alien with bobble antennae & silver space suit
    // 1. Silver-blue space suit torso
    this.drawUnion(ctx, "#e2e8f0", (emit) => {
      ctx.beginPath();
      ctx.roundRect(74, 114, 92, 48, [24, 24, 14, 14]);
      emit();
    });
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.roundRect(82, 114, 76, 16, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.arc(120, 142, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 2. Lime-green head, pointed ears, twin antennae & connected waving arms
    this.drawUnion(ctx, "#84cc16", (emit) => {
      // Twin antennae stalks & bobbles
      ctx.beginPath();
      ctx.roundRect(96, 26, 8, 28, 4);
      emit();
      ctx.beginPath();
      ctx.roundRect(136, 26, 8, 28, 4);
      emit();
      ctx.beginPath();
      ctx.arc(100, 24, 10, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(140, 24, 10, 0, Math.PI * 2);
      emit();
      // Pointed ears
      ctx.beginPath();
      ctx.ellipse(60, 82, 18, 9, -0.35, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(180, 82, 18, 9, 0.35, 0, Math.PI * 2);
      emit();
      // Wide oval alien head
      ctx.beginPath();
      ctx.ellipse(120, 82, 52, 36, 0, 0, Math.PI * 2);
      emit();
      // Connected green arms & hands on left and right of suit
      ctx.beginPath();
      ctx.ellipse(68, 134, 16, 12, -0.3, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(172, 134, 16, 12, 0.3, 0, Math.PI * 2);
      emit();
    });

    // Three expressive glossy eyes arranged in a gentle arc!
    this.drawCheek(ctx, 82, 96, 7.5);
    this.drawCheek(ctx, 158, 96, 7.5);
    for (const [ex, ey] of [
      [92, 79],
      [120, 72],
      [148, 79],
    ]) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(ex, ey, 9.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      this.drawCuteEye(ctx, ex, ey, 5.8);
    }

    // Wide cheerful alien grin
    ctx.beginPath();
    ctx.arc(120, 93, 14, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  private static drawDumpling(ctx: CanvasRenderingContext2D) {
    // Plump pleated half-moon dumpling (Mandu / Gyoza) with curved golden pan-seared base
    this.drawUnion(ctx, "#fef3c7", (emit) => {
      // Scalloped pinched pleats along top arch (deeply overlapping belly so zero interior gap!)
      for (const [px, py] of [
        [62, 82],
        [80, 68],
        [100, 58],
        [120, 54],
        [140, 58],
        [160, 68],
        [178, 82],
      ]) {
        ctx.beginPath();
        ctx.arc(px, py, 18, 0, Math.PI * 2);
        emit();
      }
      // Plump crescent dumpling belly
      ctx.beginPath();
      ctx.moveTo(46, 100);
      ctx.bezierCurveTo(46, 44, 194, 44, 194, 100);
      ctx.bezierCurveTo(196, 138, 164, 148, 120, 148);
      ctx.bezierCurveTo(76, 148, 44, 138, 46, 100);
      ctx.closePath();
      emit();
    });

    // Smooth curved golden pan-seared bottom crust (no flat top chord!)
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(58, 124);
    ctx.quadraticCurveTo(120, 138, 182, 124);
    ctx.quadraticCurveTo(166, 145, 120, 145);
    ctx.quadraticCurveTo(74, 145, 58, 124);
    ctx.closePath();
    ctx.fill();

    // Pleat fold creases along upper rim
    ctx.lineWidth = 4;
    for (const [x1, y1, x2, y2] of [
      [72, 68, 80, 82],
      [90, 58, 96, 76],
      [110, 54, 113, 74],
      [130, 54, 127, 74],
      [150, 58, 144, 76],
      [168, 68, 160, 82],
    ]) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.lineWidth = 5.5;

    // Cute smiling face on dumpling belly
    this.drawCheek(ctx, 84, 114, 9);
    this.drawCheek(ctx, 156, 114, 9);
    this.drawCuteEye(ctx, 98, 104, 6);
    this.drawCuteEye(ctx, 142, 104, 6);
    ctx.beginPath();
    ctx.arc(120, 110, 7, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  private static drawSteak(ctx: CanvasRenderingContext2D) {
    // Sizzling 3D ribeye / T-bone steak with char-grill cross-hatch & herb butter pat
    // 1. Thick seared crust side wall (3D thickness)
    this.drawUnion(ctx, "#991b1b", (emit) => {
      ctx.beginPath();
      ctx.moveTo(42, 88);
      ctx.bezierCurveTo(38, 136, 86, 156, 138, 152);
      ctx.bezierCurveTo(186, 148, 204, 122, 198, 86);
      ctx.bezierCurveTo(196, 54, 152, 42, 104, 46);
      ctx.bezierCurveTo(62, 50, 44, 64, 42, 88);
      ctx.closePath();
      emit();
    });

    // 2. Creamy white fat rim & top meat face
    ctx.fillStyle = "#fef2f2";
    ctx.beginPath();
    ctx.ellipse(120, 86, 76, 44, -0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.ellipse(120, 86, 65, 35, -0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Diagonal char-grill marks across the steak surface
    ctx.strokeStyle = "#7f1d1d";
    ctx.lineWidth = 4.5;
    for (const [x1, y1, x2, y2] of [
      [82, 62, 68, 102],
      [104, 58, 88, 110],
      [128, 58, 112, 112],
      [152, 62, 136, 110],
      [172, 68, 158, 104],
    ]) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // White bone marrow ring on left
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(82, 84, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fca5a5";
    ctx.beginPath();
    ctx.arc(82, 84, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Melting golden herb butter pat + twin green rosemary leaves on right
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.roundRect(124, 68, 30, 22, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.ellipse(135, 79, 8, 4.5, -0.4, 0, Math.PI * 2);
    ctx.ellipse(145, 79, 8, 4.5, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawTteokbokki(ctx: CanvasRenderingContext2D) {
    // Spicy Korean Tteokbokki bowl with glossy red rice cakes, fish cake & boiled egg
    // 1. Top rice cakes, fish cake skewer & boiled egg protruding above bowl rim
    this.drawUnion(ctx, "#dc2626", (emit) => {
      ctx.beginPath();
      ctx.ellipse(120, 88, 72, 28, 0, 0, Math.PI * 2);
      ctx.roundRect(62, 54, 48, 22, 11);
      ctx.roundRect(96, 44, 52, 22, 11);
      emit();
    });

    // Glazed orange-red highlight on rice cakes
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.roundRect(64, 56, 44, 18, 9);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.roundRect(98, 46, 48, 18, 9);
    ctx.fill();
    ctx.stroke();

    // Halved hard-boiled egg on right
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.ellipse(154, 68, 22, 18, 0.2, 0, Math.PI * 2);
      emit();
    });
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(154, 69, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Wavy golden fish cake (Odeng) on left
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.roundRect(74, 72, 42, 16, 6);
    ctx.fill();
    ctx.stroke();

    // Green scallion rings
    ctx.fillStyle = "#22c55e";
    for (const [sx, sy] of [
      [118, 76],
      [130, 82],
      [96, 86],
    ]) {
      ctx.beginPath();
      ctx.arc(sx, sy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 2. Melamine snack bowl at bottom
    this.drawUnion(ctx, "#1e293b", (emit) => {
      ctx.beginPath();
      ctx.moveTo(42, 92);
      ctx.lineTo(198, 92);
      ctx.quadraticCurveTo(190, 152, 148, 158);
      ctx.lineTo(92, 158);
      ctx.quadraticCurveTo(50, 152, 42, 92);
      ctx.closePath();
      emit();
      ctx.beginPath();
      ctx.roundRect(88, 152, 64, 12, 5);
      emit();
    });

    // Red decorative band around bowl
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(52, 106, 136, 10);
  }

  private static drawCookieWaffle(
    ctx: CanvasRenderingContext2D,
    variant: "cookie" | "waffle" | "macaron"
  ) {
    if (variant === "cookie") {
      // Scalloped golden-baked chocolate chip cookie (seamless golden dough, no inner circle ring!)
      this.drawUnion(ctx, "#f59e0b", (emit) => {
        ctx.beginPath();
        ctx.arc(120, 96, 58, 0, Math.PI * 2);
        emit();
        for (let i = 0; i < 10; i++) {
          const a = (i * Math.PI * 2) / 10;
          ctx.beginPath();
          ctx.arc(
            120 + Math.cos(a) * 46,
            96 + Math.sin(a) * 46,
            18,
            0,
            Math.PI * 2
          );
          emit();
        }
      });

      // Chunky dark chocolate chips
      ctx.fillStyle = "#451a03";
      for (const [cx, cy, r] of [
        [92, 62, 9],
        [136, 58, 10],
        [156, 86, 8.5],
        [80, 90, 8],
        [120, 76, 7.5],
        [92, 130, 9.5],
        [144, 128, 9],
        [120, 138, 7],
      ]) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Cute cookie face
      this.drawCheek(ctx, 88, 110, 8.5);
      this.drawCheek(ctx, 152, 110, 8.5);
      this.drawCuteEye(ctx, 102, 100, 6);
      this.drawCuteEye(ctx, 138, 100, 6);
      ctx.beginPath();
      ctx.arc(120, 106, 7, 0.2, Math.PI - 0.2);
      ctx.stroke();
      return;
    }

    if (variant === "waffle") {
      // Golden Belgian grid waffle with melting butter pat & maple syrup
      this.drawUnion(ctx, "#f59e0b", (emit) => {
        ctx.beginPath();
        ctx.roundRect(52, 34, 136, 124, 34);
        emit();
      });

      // Recessed darker golden waffle pockets (3x3 grid)
      ctx.fillStyle = "#b45309";
      for (const gx of [70, 106, 142]) {
        for (const gy of [50, 84, 118]) {
          ctx.beginPath();
          ctx.roundRect(gx, gy, 26, 24, 5);
          ctx.fill();
        }
      }

      // Glossy amber maple syrup puddle in center
      ctx.fillStyle = "#92400e";
      ctx.beginPath();
      ctx.ellipse(120, 92, 38, 28, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Melting yellow butter square on top
      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.roundRect(102, 72, 36, 30, 6);
      ctx.fill();
      ctx.stroke();
      return;
    }

    // variant === "macaron": Pastel strawberry-pink Parisian macaron
    // 1. Bottom shell + vanilla cream filling
    this.drawUnion(ctx, "#fb7185", (emit) => {
      ctx.beginPath();
      ctx.ellipse(120, 126, 66, 22, 0, 0, Math.PI * 2);
      emit();
    });

    this.drawUnion(ctx, "#fef3c7", (emit) => {
      ctx.beginPath();
      ctx.roundRect(48, 92, 144, 26, 13);
      emit();
    });

    // 2. Ruffled pied feet at y=91 + top domed shell at y=68 (bottom at 92) so ruffled feet poke out along bottom rim!
    this.drawUnion(ctx, "#fb7185", (emit) => {
      for (const fx of [62, 81, 100, 120, 140, 159, 178]) {
        ctx.beginPath();
        ctx.arc(fx, 91, 9, 0, Math.PI * 2);
        emit();
      }
      ctx.beginPath();
      ctx.ellipse(120, 68, 66, 24, 0, 0, Math.PI * 2);
      emit();
    });

    // Cute face & glossy highlight on top shell
    this.drawCheek(ctx, 86, 74, 8);
    this.drawCheek(ctx, 154, 74, 8);
    this.drawCuteEye(ctx, 102, 66, 5.5);
    this.drawCuteEye(ctx, 138, 66, 5.5);
    ctx.beginPath();
    ctx.arc(120, 72, 6, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
    ctx.beginPath();
    ctx.ellipse(92, 52, 16, 6, -0.25, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawCitrusFruit(
    ctx: CanvasRenderingContext2D,
    variant: "orange" | "lemon" | "peach" | "avocado" | "tomato"
  ) {
    if (variant === "orange") {
      // Jeju Hallabong / Tangerine with top bump & green leaf
      this.drawUnion(ctx, "#f97316", (emit) => {
        ctx.beginPath();
        ctx.arc(120, 48, 22, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(120, 104, 62, 52, 0, 0, Math.PI * 2);
        emit();
      });

      this.drawUnion(ctx, "#22c55e", (emit) => {
        ctx.beginPath();
        ctx.ellipse(142, 36, 20, 10, -0.35, 0, Math.PI * 2);
        emit();
      });

      ctx.fillStyle = "#ea580c";
      for (const [dx, dy] of [
        [78, 86],
        [72, 102],
        [164, 92],
        [158, 110],
      ]) {
        ctx.beginPath();
        ctx.arc(dx, dy, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
      this.drawCheek(ctx, 88, 114, 9);
      this.drawCheek(ctx, 152, 114, 9);
      this.drawCuteEye(ctx, 102, 102, 6);
      this.drawCuteEye(ctx, 138, 102, 6);
      ctx.beginPath();
      ctx.arc(120, 108, 7, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.ellipse(90, 74, 14, 6, -0.4, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (variant === "lemon") {
      // Bright yellow lemon with pointed ends & green leaf
      this.drawUnion(ctx, "#facc15", (emit) => {
        ctx.beginPath();
        ctx.arc(58, 100, 18, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.arc(182, 100, 18, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(120, 100, 62, 48, 0, 0, Math.PI * 2);
        emit();
      });

      this.drawUnion(ctx, "#22c55e", (emit) => {
        ctx.beginPath();
        ctx.ellipse(128, 46, 22, 10, -0.25, 0, Math.PI * 2);
        emit();
      });

      this.drawCheek(ctx, 88, 110, 8.5);
      this.drawCheek(ctx, 152, 110, 8.5);
      this.drawCuteEye(ctx, 102, 98, 6);
      this.drawCuteEye(ctx, 138, 98, 6);
      ctx.beginPath();
      ctx.arc(120, 104, 7, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.ellipse(92, 72, 16, 6, -0.3, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    if (variant === "peach") {
      // Heart-shaped blushing pink peach with pointed crown tip & twin green leaves
      this.drawUnion(ctx, "#22c55e", (emit) => {
        ctx.beginPath();
        ctx.ellipse(96, 48, 22, 10, 0.35, 0, Math.PI * 2);
        emit();
        ctx.beginPath();
        ctx.ellipse(144, 48, 22, 10, -0.35, 0, Math.PI * 2);
        emit();
      });

      this.drawUnion(ctx, "#fda4af", (emit) => {
        ctx.beginPath();
        ctx.moveTo(120, 32);
        ctx.bezierCurveTo(156, 46, 182, 76, 178, 112);
        ctx.bezierCurveTo(174, 146, 146, 156, 120, 150);
        ctx.bezierCurveTo(94, 156, 66, 146, 62, 112);
        ctx.bezierCurveTo(58, 76, 84, 46, 120, 32);
        ctx.closePath();
        emit();
      });

      // Soft peach cleft curve on upper right
      ctx.beginPath();
      ctx.moveTo(120, 34);
      ctx.quadraticCurveTo(138, 56, 134, 80);
      ctx.stroke();

      this.drawCheek(ctx, 88, 118, 9.5);
      this.drawCheek(ctx, 152, 118, 9.5);
      this.drawCuteEye(ctx, 100, 106, 6);
      this.drawCuteEye(ctx, 140, 106, 6);
      ctx.beginPath();
      ctx.arc(120, 112, 6.5, 0.2, Math.PI - 0.2);
      ctx.stroke();
      return;
    }

    if (variant === "avocado") {
      // Smooth pear-shaped halved green avocado with glossy brown pit in center
      this.drawUnion(ctx, "#15803d", (emit) => {
        ctx.beginPath();
        ctx.moveTo(120, 26);
        ctx.bezierCurveTo(154, 26, 166, 66, 172, 106);
        ctx.bezierCurveTo(176, 142, 152, 164, 120, 164);
        ctx.bezierCurveTo(88, 164, 64, 142, 68, 106);
        ctx.bezierCurveTo(74, 66, 86, 26, 120, 26);
        ctx.closePath();
        emit();
      });

      // Smooth pear-shaped creamy lime-yellow avocado flesh
      ctx.fillStyle = "#d9f99d";
      ctx.beginPath();
      ctx.moveTo(120, 35);
      ctx.bezierCurveTo(146, 35, 156, 70, 162, 106);
      ctx.bezierCurveTo(166, 136, 146, 154, 120, 154);
      ctx.bezierCurveTo(94, 154, 74, 136, 78, 106);
      ctx.bezierCurveTo(84, 70, 94, 35, 120, 35);
      ctx.closePath();
      ctx.fill();

      // Glossy round mahogany pit with cute face
      this.drawUnion(ctx, "#78350f", (emit) => {
        ctx.beginPath();
        ctx.arc(120, 114, 26, 0, Math.PI * 2);
        emit();
      });
      this.drawCheek(ctx, 104, 120, 5.5);
      this.drawCheek(ctx, 136, 120, 5.5);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(110, 112, 6, 0, Math.PI * 2);
      ctx.arc(130, 112, 6, 0, Math.PI * 2);
      ctx.fill();
      this.drawCuteEye(ctx, 110, 112, 4.5);
      this.drawCuteEye(ctx, 130, 112, 4.5);
      return;
    }

    // variant === "tomato": Plump crimson tomato with 5-pointed star calyx
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.ellipse(120, 104, 62, 52, 0, 0, Math.PI * 2);
      emit();
    });

    // Green 5-pointed star calyx & stem on top
    this.drawUnion(ctx, "#16a34a", (emit) => {
      ctx.beginPath();
      ctx.roundRect(115, 34, 10, 22, 5);
      emit();
      ctx.beginPath();
      ctx.ellipse(96, 56, 20, 7, -0.25, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(144, 56, 20, 7, 0.25, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(120, 60, 10, 16, 0, 0, Math.PI * 2);
      emit();
    });

    this.drawCheek(ctx, 88, 114, 9);
    this.drawCheek(ctx, 152, 114, 9);
    this.drawCuteEye(ctx, 102, 102, 6);
    this.drawCuteEye(ctx, 138, 102, 6);
    ctx.beginPath();
    ctx.arc(120, 108, 7, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.ellipse(86, 80, 14, 6, -0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawPotion(ctx: CanvasRenderingContext2D) {
    // Round glass alchemist potion flask with cork stopper & glowing magenta liquid
    // 1. Cork stopper at top
    this.drawUnion(ctx, "#d97706", (emit) => {
      ctx.beginPath();
      ctx.moveTo(104, 22);
      ctx.lineTo(136, 22);
      ctx.lineTo(131, 46);
      ctx.lineTo(109, 46);
      ctx.closePath();
      emit();
    });

    // 2. Glass neck, lip & round bulb
    this.drawUnion(ctx, "#e0f2fe", (emit) => {
      ctx.beginPath();
      ctx.roundRect(96, 40, 48, 12, 6);
      emit();
      ctx.beginPath();
      ctx.roundRect(104, 48, 32, 32, 4);
      emit();
      ctx.beginPath();
      ctx.arc(120, 114, 48, 0, Math.PI * 2);
      emit();
    });

    // Glowing crimson-magenta magic liquid filling lower 75% of bulb
    ctx.fillStyle = "#ec4899";
    ctx.beginPath();
    ctx.arc(120, 114, 41, -0.15, Math.PI + 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lighter wavy liquid surface meniscus
    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.ellipse(120, 108, 40, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Effervescent magic bubbles & curved glass reflection
    ctx.fillStyle = "#ffffff";
    for (const [bx, by, br] of [
      [104, 132, 6],
      [136, 126, 5],
      [122, 94, 4.5],
      [112, 80, 3.5],
    ]) {
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.ellipse(90, 102, 6, 16, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawMilkCarton(ctx: CanvasRenderingContext2D) {
    // 3D gable-top blue & white milk carton
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      // Top sealing fin
      ctx.beginPath();
      ctx.roundRect(88, 20, 56, 14, 4);
      emit();
      // Pitched gable roof
      ctx.beginPath();
      ctx.moveTo(88, 32);
      ctx.lineTo(144, 32);
      ctx.lineTo(168, 62);
      ctx.lineTo(72, 62);
      ctx.closePath();
      emit();
      // Rectangular carton body
      ctx.beginPath();
      ctx.roundRect(72, 58, 96, 104, 8);
      emit();
    });

    // 3D right side panel shading
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(140, 62, 25, 97);
    ctx.beginPath();
    ctx.moveTo(140, 62);
    ctx.lineTo(140, 162);
    ctx.stroke();

    // Blue roof gable + 3D recessed side gable triangle
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.moveTo(88, 32);
    ctx.lineTo(144, 32);
    ctx.lineTo(140, 62);
    ctx.lineTo(72, 62);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.moveTo(144, 32);
    ctx.lineTo(168, 62);
    ctx.lineTo(140, 62);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Horizontal fresh-milk wave band
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(75, 118, 90, 24);
    ctx.strokeRect(75, 118, 90, 24);

    // Cute face on front panel of milk carton
    this.drawCheek(ctx, 86, 98, 6.5);
    this.drawCheek(ctx, 126, 98, 6.5);
    this.drawCuteEye(ctx, 94, 88, 5.5);
    this.drawCuteEye(ctx, 118, 88, 5.5);
    ctx.beginPath();
    ctx.arc(106, 94, 5, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  private static drawBeerMug(ctx: CanvasRenderingContext2D) {
    // Frothy golden glass beer stein with D-handle & overflowing white foam head
    // 1. Thick glass D-handle on the right + mug cylinder
    this.drawUnion(ctx, "#fef08a", (emit) => {
      ctx.beginPath();
      ctx.roundRect(146, 74, 38, 62, 16);
      ctx.roundRect(64, 56, 92, 108, 12);
      emit();
    });

    // Cutout inside handle
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(156, 86, 16, 38, 8);
    ctx.fill();
    ctx.stroke();

    // Rich golden amber beer fill inside mug
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect(72, 64, 76, 90, 8);
    ctx.fill();

    // Vertical glass flute ridges
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 4;
    for (const fx of [92, 110, 128]) {
      ctx.beginPath();
      ctx.moveTo(fx, 78);
      ctx.lineTo(fx, 144);
      ctx.stroke();
    }
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;

    // 2. Billowing cloud of creamy white foam overflowing the top rim
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.arc(78, 54, 20, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(106, 44, 24, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.arc(138, 52, 20, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.roundRect(122, 54, 16, 32, 8);
      emit();
    });

    // Cute face on beer mug
    this.drawCheek(ctx, 86, 116, 7);
    this.drawCheek(ctx, 134, 116, 7);
    this.drawCuteEye(ctx, 96, 106, 5.5);
    this.drawCuteEye(ctx, 124, 106, 5.5);
  }

  private static drawBattery(ctx: CanvasRenderingContext2D) {
    // Copper-top & obsidian cylindrical AA battery with terminal nub & lightning bolt
    this.drawUnion(ctx, "#cbd5e1", (emit) => {
      ctx.beginPath();
      ctx.roundRect(102, 22, 36, 18, 6);
      emit();
    });

    this.drawUnion(ctx, "#1e293b", (emit) => {
      ctx.beginPath();
      ctx.roundRect(74, 36, 92, 128, 14);
      emit();
    });

    // Metallic copper top band (upper 38% of cylinder)
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.roundRect(74, 36, 92, 48, [14, 14, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Copper specular stripe on left
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(82, 40, 14, 40);

    // Plus (+) sign on copper band
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(120, 50);
    ctx.lineTo(120, 68);
    ctx.moveTo(111, 59);
    ctx.lineTo(129, 59);
    ctx.stroke();
    ctx.lineWidth = 5.5;

    // Glowing yellow lightning bolt emblem on dark body
    ctx.fillStyle = "#fde047";
    ctx.beginPath();
    ctx.moveTo(126, 94);
    ctx.lineTo(104, 122);
    ctx.lineTo(120, 122);
    ctx.lineTo(112, 148);
    ctx.lineTo(138, 116);
    ctx.lineTo(122, 116);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private static drawMagicWand(ctx: CanvasRenderingContext2D) {
    // Star-topped magical girl wand with feathery angel wings & heart gem (shifted up for clean margin)
    // 1. Feathery white angel wings flanking wand neck (each lobe emitted separately!)
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      // Left two-lobed wing
      ctx.beginPath();
      ctx.ellipse(78, 68, 30, 12, -0.25, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(84, 80, 24, 10, -0.1, 0, Math.PI * 2);
      emit();
      // Right two-lobed wing
      ctx.beginPath();
      ctx.ellipse(162, 68, 30, 12, 0.25, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.ellipse(156, 80, 24, 10, 0.1, 0, Math.PI * 2);
      emit();
    });

    // 2. Rose-pink wand shaft & golden pommel
    this.drawUnion(ctx, "#ec4899", (emit) => {
      ctx.beginPath();
      ctx.roundRect(111, 66, 18, 86, 9);
      emit();
    });
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.roundRect(106, 78, 28, 12, 6);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(120, 152, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Large 5-pointed golden star head at top
    this.drawUnion(ctx, "#fde047", (emit) => {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const r = i % 2 === 0 ? 40 : 19;
        const x = 120 + Math.cos(a) * r;
        const y = 50 + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      emit();
    });

    // Pink gem in center of star
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(120, 50, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private static drawBaseballBat(ctx: CanvasRenderingContext2D) {
    // Tapered wooden baseball bat with white taped grip & stitched baseball
    // 1. Diagonal tapered wooden bat + pommel knob
    this.drawUnion(ctx, "#d97706", (emit) => {
      ctx.beginPath();
      ctx.arc(54, 152, 13, 0, Math.PI * 2);
      emit();
      ctx.beginPath();
      ctx.moveTo(48, 144);
      ctx.lineTo(164, 26);
      ctx.arc(176, 38, 17, -Math.PI * 0.75, Math.PI * 0.25);
      ctx.lineTo(60, 156);
      ctx.closePath();
      emit();
    });

    // White taped handle grip on lower-left third
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(54, 138);
    ctx.lineTo(94, 98);
    ctx.lineTo(106, 110);
    ctx.lineTo(66, 150);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 2. Classic white baseball with proper outer red seam arcs beside bat
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.arc(156, 124, 28, 0, Math.PI * 2);
      emit();
    });
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3.5;
    // Left seam curve & right seam curve spaced cleanly apart!
    ctx.beginPath();
    ctx.arc(127, 124, 21, -0.7, 0.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(185, 124, 21, Math.PI - 0.7, Math.PI + 0.7);
    ctx.stroke();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 5.5;
  }

  private static drawBowArrow(ctx: CanvasRenderingContext2D) {
    // Curved wooden recurve bow with taut open bowstring & nocked feathered arrow
    // 1. Taut open bowstring connected directly to bow tips (93, 28) and (93, 162)
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(93, 28);
    ctx.lineTo(62, 110);
    ctx.lineTo(93, 162);
    ctx.stroke();
    ctx.restore();

    // 2. Crimson feather fletching at bottom-left
    this.drawUnion(ctx, "#ef4444", (emit) => {
      ctx.beginPath();
      ctx.moveTo(46, 112);
      ctx.lineTo(74, 100);
      ctx.lineTo(62, 124);
      ctx.closePath();
      emit();
    });

    // 3. Wooden arrow shaft & steel broadhead pointing top-right
    this.drawUnion(ctx, "#d97706", (emit) => {
      ctx.beginPath();
      ctx.moveTo(58, 110);
      ctx.lineTo(176, 62);
      ctx.lineTo(180, 70);
      ctx.lineTo(62, 118);
      ctx.closePath();
      emit();
    });
    this.drawUnion(ctx, "#94a3b8", (emit) => {
      ctx.beginPath();
      ctx.moveTo(198, 56);
      ctx.lineTo(166, 52);
      ctx.lineTo(172, 66);
      ctx.lineTo(178, 80);
      ctx.closePath();
      emit();
    });

    // 4. Curved wooden recurve bow arc
    this.drawUnion(ctx, "#92400e", (emit) => {
      ctx.beginPath();
      ctx.arc(82, 95, 70, -Math.PI * 0.44, Math.PI * 0.44);
      ctx.arc(70, 95, 58, Math.PI * 0.44, -Math.PI * 0.44, true);
      ctx.closePath();
      emit();
    });

    // Red leather riser grip in center of bow
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.roundRect(138, 78, 16, 34, 6);
    ctx.fill();
    ctx.stroke();
  }

  private static drawSyringe(ctx: CanvasRenderingContext2D) {
    // Angled clear medical syringe with cyan serum, graduations, plunger & needle
    ctx.save();
    ctx.translate(122, 92);
    ctx.rotate(-0.65);

    // 1. Plunger rod + finger flange wings + barrel + needle hub & tip
    this.drawUnion(ctx, "#cbd5e1", (emit) => {
      ctx.beginPath();
      ctx.roundRect(-88, -20, 12, 40, 5);
      ctx.roundRect(-78, -8, 32, 16, 4);
      ctx.roundRect(46, -10, 16, 20, 4);
      ctx.roundRect(60, -3, 28, 6, 3);
      emit();
    });

    // 2. Clear glass syringe barrel & finger flange
    this.drawUnion(ctx, "#f8fafc", (emit) => {
      ctx.beginPath();
      ctx.roundRect(-50, -32, 14, 64, 6);
      ctx.roundRect(-40, -21, 90, 42, 8);
      emit();
    });

    // Glowing cyan healing serum inside barrel
    ctx.fillStyle = "#22d3ee";
    ctx.beginPath();
    ctx.roundRect(-14, -16, 58, 32, 4);
    ctx.fill();
    ctx.stroke();

    // Rubber plunger stopper inside barrel
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(-26, -17, 12, 34, 3);
    ctx.fill();

    // Volume graduation tick marks along barrel
    ctx.lineWidth = 3.5;
    for (const gx of [-4, 10, 24, 38]) {
      ctx.beginPath();
      ctx.moveTo(gx, -19);
      ctx.lineTo(gx, -7);
      ctx.stroke();
    }
    ctx.restore();
    ctx.lineWidth = 5.5;
  }

  // ===========================================================================
  // SHARED DETAIL HELPERS
  // ===========================================================================

  /**
   * Draws a unified compound silhouette from multiple overlapping sub-shapes:
   * First strokes each sub-shape with a thick outer border (`lineWidth = 11`,
   * i.e. `5.5px` outside + `5.5px` inside), then fills all sub-shapes on top
   * so interior overlapping stroke lines are completely hidden.
   */
  private static drawUnion(
    ctx: CanvasRenderingContext2D,
    fillStyle: string,
    drawParts: (emit: () => void) => void
  ) {
    ctx.save();
    ctx.strokeStyle = OUTLINE;
    ctx.lineWidth = 11;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    drawParts(() => ctx.stroke());
    ctx.fillStyle = fillStyle;
    drawParts(() => ctx.fill());
    ctx.restore();
  }

  private static drawCuteEye(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number
  ) {
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawCheek(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number
  ) {
    ctx.fillStyle = "rgba(251, 113, 133, 0.65)";
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.25, r * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  private static drawWheel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number
  ) {
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.arc(x, y, r * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}
