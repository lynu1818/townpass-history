// import React, { useState, useRef, useEffect } from "react";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import LocationTracker from "../location/location";

export const spots = [
    {
        "name": "二二八和平公園",
        "address": "台北市中正區凱達格蘭大道3號",
        "city": "中正區",
        "latitude": "25.040502406798485",
        "longitude": "121.51554449614804",
        "detail": "二二八和平公園建於西元1899年，是臺北市歷史最悠久的公園。民國34年（西元1945年），二戰後國民政府接收臺灣，臺灣人民歡欣鼓舞，但之後因國民政府在臺一連串的措施失當導致民怨沸騰，包括經濟的獨占與壟斷、政風的貪污腐化、民生的凋敝、軍警的作威作福等，加以文化上的差異，使得本省人及外省人間鴻溝漸深。終於在民國36年（西元1947年）2月27日晚上，由於查緝私煙行動，民眾不滿緝私人員打死人而包圍憲警單位，卻遭到士兵開槍射擊。2月28日，民眾齊聚臺北公園（今二二八和平公園），隨後進佔臺灣廣播電台（今臺北二二八紀念館）",
        "question": "228和平紀念公園內有一座「228紀念碑」，其碑文記載了當時的一些事件細節。以下哪一位人物的名字沒有被記載在228紀念碑的碑文中？",
        "option1": "蔣渭水",
        "option2": "陳澄波",
        "option3": "吳振武",
        "option4": "林茂生",
        "src": "./img/228.jpg",
    },
    {
        "name": "大稻埕",
        "address": "台北市大同區迪化街一段44號",
        "city": "大同區",
        "latitude": "25.055186397987633",
        "longitude": "121.5100021826548",
        "detail": "18世紀末的大稻埕，因淡水港的開放後開始大放異彩，讓大稻埕成為商貿繁榮、人文薈萃之地。大稻埕擁有華麗的巴洛克式建築、傳統的閩南平房、明亮的紅磚洋樓，不論是古蹟建築、傳統民俗、茶行、布行、中藥材行、在地美食等，到處都有舊城的歷史軌跡。在這歷史悠久的古老街區中，擁有深厚歷史傳承的百年老舖與創意街區，打造出大稻埕新生活美學。來到這裡，可以漫步在著名的年貨大街——迪化街上，也有許多市定古蹟，如台北霞海城隍廟、慈聖宮、辜宅、新芳春茶行等，保留著歷史的痕跡，值得走訪。",
        "question": "大稻埕曾是台北市區重要的貿易中心。以下哪一種商品在19世紀末和20世紀初時期，讓大稻埕成為國際貿易的重要樞紐？",
        "option1": "茶葉",
        "option2": "煙草",
        "option3": "醬油",
        "option4": "米",
        "src": "./img/dadaocheng.jpg",
    },
    {
        "name": "故宮博物院",
        "address": "台北市士林區至善路二段221號",
        "city": "士林區",
        "latitude": "25.103288085585152",
        "longitude": "121.54855687301571",
        "detail": "一、故宮的歷史國立故宮博物院承載著中國數千年珍貴文化遺產的保存與推廣使命。其珍貴文物來自於熱河、瀋陽行宮以及古物陳列所的舊藏，最終集中於北平、熱河和瀋陽三處清宮。故宮博物院的歷史涵蓋了其在北京的創建、在中國大陸的發展、以及後來播遷至台灣和在台灣的重建與持續發展。1924年，北京發生政變後，清朝最後一位皇帝溥儀被迫離開紫禁城。1925年，清室善後委員會決定成立故宮博物院，並於10月10日舉行了開幕典禮，正式向公眾開放。儘管創院初期受到了政治動盪的影響，但在國民政府接管後，故宮博物院穩步發展。1931年九一八事變後，日本關東軍侵佔中國東北，故宮開始準備將文物南遷。1933年，13427箱文物分五批運送至上海。1937年七七事變爆發後，文物再次南遷至南京及其他地點，以避戰火。抗戰期間，故宮積極參與國內外展覽，並將部分文物運至海外展覽。1948年，隨著國共戰爭局勢逆轉，故宮決定將部分精品文物遷往台灣。1949年，文物經三批運輸到達台灣，並暫時存放於台中。1965年，故宮博物院新館在台北外雙溪落成，並對外開放，展出了大量珍貴文物。1983年起，在秦孝儀院長的領導下，故宮博物院進行了多項改進，包括組織體系重整、藏品擴充和國際展覽等。進入2000年後，故宮持續擴展其在地和國際影響力，進行了多項建設和改善工程，並舉辦了多元展覽和文化活動。2016年，林正儀院長提出了「深耕在地，邁向國際」的願景，進一步推動故宮在地化、多元化和國際化的發展方向。台北故宮博物院作為中華文化的代表之一，不僅肩負著守護和展示文物的使命，也是世界了解和欣賞中國古代藝術與歷史的重要窗口。它的收藏和展覽見證了中國的歷史和文化，並在國際舞台上持續發揮著重要影響力。二、傳說中的「故宮三寶」近年來，旅遊業者以華人民間小吃「酸菜白肉鍋」為靈感，將故宮常態展出的三件文物——翠玉白菜、肉形石和毛公鼎——進行了創意聯結和描述，這種雅俗共賞的介紹方式使得這三件文物在民間人氣急升，被親切地稱為「民間版的故宮三寶」。這三件文物中，毛公鼎被列為國寶級文物，而翠玉白菜和肉形石則被列為重要古物。由於它們在民間享有極高的知名度，故宮特別安排翠玉白菜和肉形石在北部院區和南部院區的獨立展廳中輪流展出；而毛公鼎則作為國寶級文物，固定展出於北部院區第一展覽大樓三樓廊廳。翠玉白菜：由翡翠雕刻而成的翠玉白菜，是國立故宮博物院最受喜愛的藏品之一。工匠利用材料天然色澤，深綠色表現層層包覆的菜葉；白色部分則巧妙地轉化為新鮮的白菜莖部。菜葉頂端的螽斯和蝗蟲，更添了田園氣息。翠玉白菜最初為宮殿陳設盆景，以栽種形式擺放在琺瑯盆景上，下端還設有靈芝木雕。翡翠價值不菲，靈芝象徵長壽吉祥，加上多彩的掐絲琺瑯，翠玉白菜象徵著永保鮮脆。肉形石：看似鮮嫩多汁的肉形石，實際上由堅硬的玉髓類碧石製成。石材的層疊紋理使其形似豐厚的五花肉。工匠利用這一特徵，從上至下染上由深到淺的褐色，達到如醬油深滷的效果。頂面上無數細小的凹點，模擬了毛細孔的效果，讓石材看起來像剛起鍋的東坡肉，表皮鬆軟而富彈性。肉形石完美展現了傳統烹飪文化的精華，也喚起人們的美味記憶。毛公鼎：毛公鼎因其器腹內壁的銘文而成為國寶。銘文全長五百字，是迄今所知最長的青銅器銘文。內容記載了西周宣王中興的歷史，前段為宣王對毛公的訓誥，敘述宣王如何繼承天命，後段詳載宣王贈予毛公的豐厚賞賜。毛公在文末表達了對宣王的感謝，並願以此鼎傳之於後世。鼎器形簡樸，半球形器身立於三蹄足上，口沿有兩個立耳，器身光素，僅於口沿下方飾以簡單的重環紋及凸弦紋，莊重肅穆。三、真正的「鎮院三寶」提到「故宮三寶」，很多人首先想到的是翠玉白菜、肉形石和毛公鼎。然而，故宮博物院還有另外三件被譽為「鎮院三寶」的珍稀國寶——范寬的《溪山行旅圖》、郭熙的《早春圖》和李唐的《萬壑松風》。這三幅北宋山水畫因其在藝術史上的重要地位，於2012年被文化部認定為國寶。這三幅畫作代表了北宋山水畫的經典風格。范寬、郭熙和李唐作為宋代山水畫的三大家，以其卓越的筆墨技法和獨特的山水造境，成為歷代畫家學習的重要範本，影響深遠。這些畫作追求真實感，通過對自然的靜觀和體悟，重新組織並呈現理想的山水景象。范寬的《溪山行旅圖》：運用中軸巨碑式構圖，使畫中的山勢宏偉壯麗，觀賞者彷彿身處山腳下。范寬創立了「雨點皴法」，用密集的筆觸表現山石的堅硬。畫中包含懸絲瀑布、古剎、旅人和驢隊，體現了人在大自然中的渺小。郭熙的《早春圖》：描繪了早春瑞雪消融、萬物復甦的景象。畫中展現了山川、松林、建築物及流水，展示了初春的生機。郭熙巧妙地使用「蟹爪」描繪寒林新芽，以「捲雲皴法」賦予山石靈動感。李唐的《萬壑松風》：不包含人物或建築，縮小了主峰比例，擴大了近景樹石的比例，讓觀賞者彷彿置身於深山幽谷。靜心觀賞時，似乎能聽見風聲和水聲。",
        "question": "請問故宮真正的鎮院三寶是？",
        "option1": "谿山行旅、早春圖、萬壑松風",
        "option2": "翠玉白菜、肉形石、毛公鼎",
        "option3": "肉形石、谿山行旅、早春圖",
        "option4": "早春圖、萬壑松風、毛公鼎",
        "src": "./img/palace_museum.jpg",
    },
    {
        "name": "北投溫泉博物館",
        "address": "台北市北投區中山路2號",
        "city": "北投區",
        "latitude": "25.136697544499594",
        "longitude": "121.50712146345845",
        "detail": "一、女巫傳說「北投」這個地名源自平埔族的「北投社」，其中平埔族語的「北投Kipatauw」意指女巫。對於為何這個地名會與女巫有關，有兩種說法。一種說法認為，由於本區硫磺溫泉的熱氣長年不斷，原住民感到恐懼，認為這是女巫施法的結果；另一種說法則是傳說女巫居住於此，祈求化解硫磺泉所帶來的障礙。不論哪種說法，後來漢人來到此地開發時，將地名音譯為「八頭」，隨後逐漸變為現在的「北投」。凱達格蘭族世居北投，在他們的語言中，「北投」即意為「女巫」，女巫透過占卜和祝禱等祭儀來判斷吉凶和祈求平安。自然賦予北投壯麗的景觀，而女巫的靈力則為這個社區帶來了無限的故事和祝福。傳說中，北投的女巫擁有無比的美麗、智慧和神奇的靈力，她來到了風景如畫的北投。幾百年來，無論是漢人還是日本人，都曾來到北投，開發和居住，形成了北投獨特的人文和產業面貌。在清朝時期，硫磺被視為重要資源；而在日本統治台灣期間，溫泉文化被引入，北投的溫泉開發和利用由此正式開始，成為北投最具代表性的產業。二、北投八景1. 北投溫泉博物館北投溫泉博物館建於1913年，仿照日本靜岡縣伊豆山溫泉的建築風格。一樓設有大、小青磺溫泉浴池，二樓則是觀景台。台灣光復後，改名為「中山堂」，曾作為台北縣會議招待所。建築採用磚木及鋼筋混凝土結構，外觀典雅，與新北投公園融為一體。近期已修復恢復原貌，現為溫泉博物館，供民眾參觀。2. 復興三路櫻花隧道位於大屯里復興三路的櫻花隧道，從白宮山莊上方步行約300公尺，即可欣賞沿途盛開的台灣山櫻花。每到櫻花季，這裡吸引大量遊人拍照留念，仰望繽紛的花朵和地面的草花，讓人彷彿置身於春天的奇幻世界。櫻花在北投人心中具有特殊意義，象徵著短暫而燦爛的人生。3. 台北市立圖書館-北投分館這座圖書館是台灣第一座綠建築圖書館，位於北投公園內，與溫泉博物館為鄰。建築以木結構為主，外觀如同大型高架樹屋，採用自然光線和生態設計。4. 大屯山桶柑果園大屯山的桶柑果園以其香甜的柑橘聞名。果實成熟期在春節前後，這裡的桶柑色澤鮮豔，香氣撲鼻。北投區的大屯里和泉源里的60多戶農家種植這些柑橘，風味獨特。5. 北投公民會館北投公民會館於1996年重新啟用，旨在宣揚本區文化古蹟特色。原為「警備總部北投調查組」的辦公廳舍，解嚴後改建為「公民會館」，成為北投區的文化指標，提供綠色舒活地圖介紹周邊景點。6. 地熱谷地熱谷位於新北投公園旁，是台灣著名的溫泉區之一。由於終年瀰漫硫磺蒸霧，曾被稱為「地獄谷」。泉水清澈，且有「玉泉谷」的美譽，是日據時代台灣八勝十二景之一。7. 梅庭梅庭建於1930年代末，曾是前監察院長于右任的避暑寓所。上層為日式木架結構，下層為西式鋼筋混凝土建造，設有防空避難室。如今為市定歷史性建築。8. 凱達格蘭文化館凱達格蘭文化館落成於北投地區，展示平埔族及原住民族文化藝術。館內收藏14族及平埔族文化，利用數位影音呈現，致力於保存和傳承原住民文化。三、北投溫泉北投是台灣最著名的溫泉區之一，其歷史悠久、泉質多樣，吸引了眾多遊客前來享受。這片溫泉區的獨特之處，源自於大屯山火山爆發所遺留下的豐富熱源，這些熱源加熱了地下水，通過岩層裂縫湧冒而出，形成了豐富的溫泉資源。北投的溫泉水質多樣，其中最主要的三種泉質為青磺、白磺和鐵磺，每種泉質都有其獨特的特點和療效。青磺泉青磺泉位於地熱谷附近，是酸性硫酸鹽氯化物泉。泉水清澈微綠，宛如美玉，這種泉質主要分布在北投公園露天溫泉、瀧乃湯和新秀閣大飯店等地。青磺泉對皮膚病、痛風和肌肉痠痛有顯著療效。白磺泉白磺泉主要分布在硫磺谷地區。由於硫磺氣的存在，這裡的溫泉是由陽明山山泉水注入形成，呈乳白色，並散發淡淡的硫磺味，被譽為「牛奶湯」。白磺泉對慢性皮膚病、關節炎和婦女病有一定療效，適合中年以上的人群使用。鐵磺泉鐵磺泉主要位於頂北投、雙重溪北面及南磺溪上游山谷，以及陽明山後公園附近。這是一種中性碳酸泉，水質透明，含有鐵質沉澱物，因此稱為鐵磺泉。鐵磺泉對神經痛、皮膚病和風濕病具有良好的療效。龍鳳溫泉和鳳凰溫泉皆為鐵磺泉。北投溫泉以其獨特的泉質和療效而聞名，不僅是休閒放鬆的好去處，也是療養保健的理想場所。無論你是喜愛青磺泉的清澈與綠意，還是偏好白磺泉的奶白色湯液或鐵磺泉的透明水質，北投溫泉區都能滿足你的需求。來北投享受這片自然奇蹟，感受溫泉的療效與魅力，無疑是一場身心靈的極致享受。",
        "question": "北投的地名來自於平埔族語，意指「女巫」，請問其平埔族為何？",
        "option1": "凱達格蘭族",
        "option2": "噶瑪蘭族",
        "option3": "西拉雅族",
        "option4": "道卡斯族",
        "src": "../img/beitou.jpg",
    }
]