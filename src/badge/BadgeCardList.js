import React, { useState, useEffect } from "react";
import { BadgeCard } from "./BadgeCard";
import { ref, get, getDatabase } from "firebase/database"; // Correct Firebase imports
import { database } from "../services/firebaseConfig"; // Import your config

const defaultCard = {
  id: 8,
  name: '未知',
  date: '待收集',
  image: "/img/QuestionMark_-removebg-preview.png",
  info: '收集到才能查看詳細資料！'
};

const cardData = [
    {
      id: 3,
      name: '北投溫泉博物館',
      date: '2024-09-08',
      image: "/img/BearA_1-removebg-preview.png",
      info: '北投」這個地名源自平埔族的「北投社」，其中平埔族語的「北投Kipatauw」意指女巫。對於為何這個地名會與女巫有關，有兩種說法。一種說法認為，由於本區硫磺溫泉的熱氣長年不斷，原住民感到恐懼，認為這是女巫施法的結果；另一種說法則是傳說女巫居住於此，祈求化解硫磺泉所帶來的障礙。不論哪種說法，後來漢人來到此地開發時，將地名音譯為「八頭」，隨後逐漸變為現在的「北投」。凱達格蘭族世居北投，在他們的語言中，「北投」即意為「女巫」，女巫透過占卜和祝禱等祭儀來判斷吉凶和祈求平安。自然賦予北投壯麗的景觀，而女巫的靈力則為這個社區帶來了無限的故事和祝福。傳說中，北投的女巫擁有無比的美麗、智慧和神奇的靈力，她來到了風景如畫的北投。幾百年來，無論是漢人還是日本人，都曾來到北投，開發和居住，形成了北投獨特的人文和產業面貌'
    },
    
    {
      id: 1,
      date: '2024-09-07',
      name: '西門紅樓',
      image: "/img/BearE-removebg-preview.png", 
      info: '西門紅樓建於1908年，由日本建築師近藤十郎設計，是台灣第一座由官方興建的公營市場，也是目前全台保存最完整的三級古蹟建築。西門紅樓由兩大結構組成：八角樓和十字樓。八角樓的「八卦造型」象徵八方雲集，是主要入口，而十字樓的「十字架造型」則構成建築主體。再加上兩旁的南北廣場，整個建築群被統稱為「西門紅樓」。西門紅樓的功能和角色在歷史的變遷中多次轉換，先後作為市場、書場、電影院、劇場使用。自2007年起，臺北市政府文化局將其交由台北市文化基金會營運管理，目標是通過文創平台的推廣，振興西門町街區。經過十多年的經營，西門紅樓已逐漸成為臺北市乃至台灣的指標性文創及藝文據點。'
    },
    {
      id: 2,
      date: '2024-09-08',
      name: '中正紀念堂',
      image: "/img/BearF-removebg-preview.png", 
      info: '中正紀念堂由著名建築師楊卓成設計，他同時也是圓山大飯店的設計者。紀念堂原址是台北市區內最大的軍區——陸軍總部。建築採用藍白兩色，呼應國旗的主要顏色，頂部的天穹裝飾則是象徵「青天白日」的12道光芒。隨著台灣民主化進程的推進，紀念堂前的廣場已成為各類民主運動的重要集會地點。中正紀念堂的建築以其70米高的白牆藍瓦在紀念公園的中央矗立，不論從哪個角度看，都顯得格外雄偉壯觀。對於來台灣的國外遊客來說，中正紀念堂是必訪之地。紀念堂內設有展覽空間，陳列與展示了有關歷史的重要文物，並設有紀念品販售區供遊客購買紀念品。'
    },
    {
      id: 1,
      date: '2024-09-08',
      name: '大稻埕',
      image: "/img/BearC-removebg-preview.png", 
      info: '18世紀末的大稻埕，因淡水港的開放後開始大放異彩，讓大稻埕成為商貿繁榮、人文薈萃之地。大稻埕擁有華麗的巴洛克式建築、傳統的閩南平房、明亮的紅磚洋樓，不論是古蹟建築、傳統民俗、茶行、布行、中藥材行、在地美食等，到處都有舊城的歷史軌跡。在這歷史悠久的古老街區中，擁有深厚歷史傳承的百年老舖與創意街區，打造出大稻埕新生活美學。來到這裡，可以漫步在著名的年貨大街——迪化街上，也有許多市定古蹟，如台北霞海城隍廟、慈聖宮、辜宅、新芳春茶行等，保留著歷史的痕跡，值得走訪。'
    },
    {
      id: 2,
      date: '2024-09-07',
      name: '故宮博物院',
      image: "/img/BearD-removebg-preview.png", 
      info: '國立故宮博物院承載著中國數千年珍貴文化遺產的保存與推廣使命。其珍貴文物來自於熱河、瀋陽行宮以及古物陳列所的舊藏，最終集中於北平、熱河和瀋陽三處清宮。台北故宮博物院作為中華文化的代表之一，不僅肩負著守護和展示文物的使命，也是世界了解和欣賞中國古代藝術與歷史的重要窗口。它的收藏和展覽見證了中國的歷史和文化，並在國際舞台上持續發揮著重要影響力。提到「故宮三寶」，很多人首先想到的是翠玉白菜、肉形石和毛公鼎。然而，故宮博物院還有另外三件被譽為「鎮院三寶」的珍稀國寶——范寬的《溪山行旅圖》、郭熙的《早春圖》和李唐的《萬壑松風》。這三幅北宋山水畫因其在藝術史上的重要地位，於2012年被文化部認定為國寶。這三幅畫作代表了北宋山水畫的經典風格。范寬、郭熙和李唐作為宋代山水畫的三大家，以其卓越的筆墨技法和獨特的山水造境，成為歷代畫家學習的重要範本，影響深遠。'
    },
    {
      id: 6,
      date: '2024-09-07',
      name: '剝皮寮歷史街區',
      image: "/img/BearH_1-removebg-preview.png", 
      info: '在台北市萬華區的老街巷弄中，有一處保留著百餘年前清代街道風貌的歷史街區——剝皮寮。這條街道以其典雅的紅磚牆、拱形騎樓和雕花窗櫺而聞名，散發出一種古樸而純粹的美感。剝皮寮歷史街區位於龍山寺附近，座落在康定路、廣州街和昆明街的交匯處。這裡保留了完整的清代街巷形制和傳統店屋建築，見證了艋舺市街的繁榮發展，擁有獨特的歷史文化意義和建築特色。近年來，剝皮寮街區不僅成為電影文化與活動推廣的熱點，也擴展成為一個藝文展演和文化體驗的多元平台。透過串聯在地特色和創造故事性的互動體驗，剝皮寮被賦予了更多的文化意涵和回憶，使這個歷史空間更加充滿生命力。'
    },
    {
      id: 0,
      name: '二二八和平公園',
      date: '2024-09-08',
      image: "/img/BearB-removebg-preview.png",
      info: '二二八和平公園建於西元1899年，是臺北市歷史最悠久的公園。民國34年（西元1945年），二戰後國民政府接收臺灣，臺灣人民歡欣鼓舞，但之後因國民政府在臺一連串的措施失當導致民怨沸騰，包括經濟的獨占與壟斷、政風的貪污腐化、民生的凋敝、軍警的作威作福等，加以文化上的差異，使得本省人及外省人間鴻溝漸深。終於在民國36年（西元1947年）2月27日晚上，由於查緝私煙行動，民眾不滿緝私人員打死人而包圍憲警單位，卻遭到士兵開槍射擊。2月28日，民眾齊聚臺北公園（今二二八和平公園），隨後進佔臺灣廣播電台（今臺北二二八紀念館)'
    }
  ];
  
const checkBadge = async () => {
    try {
      const db = getDatabase();
      const badgeRef = ref(db, "location/");
      const snapshot = await get(badgeRef);
  
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No badges found");
        return null;
      }
    } catch (error) {
      console.error("Error checking badges", error);
      throw error;
    }
  };
  
  const BadgeCardList = () => {
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const badgeData = await checkBadge();
  
          const updatedCards = cardData.map((card) => {
            // If the badge exists in the Firebase database, return the original card
            if (badgeData && badgeData[card.id]) {
              return card;
            } else {
              // Otherwise, return the default card
              return { ...defaultCard, id: card.id };
            }
          });
  
          setCards(updatedCards);
        } catch (error) {
          console.error("Error fetching card data", error);
        }
      };
  
      fetchData(); // Call the fetch function on component mount
    }, []);
  
    return (
      <div className="margin-top-15 d-flex flex-column align-items-center">
        {cards.map((card) => (
          <BadgeCard
            key={card.id}
            date={card.date}
            name={card.name}
            image={card.image}
            info={card.info}
          />
        ))}
      </div>
    );
  };
  
  export default BadgeCardList;
  