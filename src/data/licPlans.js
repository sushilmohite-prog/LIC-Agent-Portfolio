export const licPlans = [
  {
    id: 1,
    name: "एलआयसी जीवन आनंद",
    description: "जीवन आनंद ही दीर्घकालीन विमा योजना आहे जी जीवन विमा आणि बचत एकत्र देते. ही योजना तुमच्या कुटुंबाला आर्थिक सुरक्षा प्रदान करते.",
    ratePerThousand: 55,
    minAge: 18,
    maxAge: 50,
    term: "15-35 वर्षे",
    benefits: [
      "जीवन विमा संरक्षण",
      "परिपक्वता लाभ",
      "कर लाभ (धारा 80C आणि 10(10D) अंतर्गत)",
      "लॉयल्टी अ‍ॅडिशन"
    ],
    englishName: "LIC Jeevan Anand"
  },
  {
    id: 2,
    name: "एलआयसी आधार शिला",
    description: "आधार शिला ही एक आदर्श विमा योजना आहे जी कमी प्रीमियममध्ये जीवन विमा संरक्षण देते.",
    ratePerThousand: 42,
    minAge: 18,
    maxAge: 55,
    term: "10-20 वर्षे",
    benefits: [
      "पूर्ण जीवन विमा संरक्षण",
      "कमी प्रीमियम",
      "अपघात मृत्यू लाभ",
      "कर लाभ"
    ],
    englishName: "LIC Aadhar Shila"
  },
  {
    id: 3,
    name: "एलआयसी टेक टर्म",
    description: "टेक टर्म ही एक ऑनलाइन टर्म इन्शुरन्स प्लान आहे जी सर्वाधिक जीवन विमा संरक्षण कमी प्रीमियममध्ये देते.",
    ratePerThousand: 35,
    minAge: 18,
    maxAge: 65,
    term: "10-40 वर्षे",
    benefits: [
      "ऑनलाइन खरेदी",
      "अत्यंत कमी प्रीमियम",
      "उच्च विमा रक्कम",
      "24x7 ग्राहक सेवा"
    ],
    englishName: "LIC Tech Term"
  },
  {
    id: 4,
    name: "एलआयसी जीवन उमंग",
    description: "जीवन उमंग ही एक व्होल लाइफ प्लान आहे जी संपूर्ण आयुष्यभर विमा संरक्षण देते.",
    ratePerThousand: 68,
    minAge: 90,
    maxAge: 55,
    term: "आजीवन",
    benefits: [
      "आजीवन विमा संरक्षण",
      "गारंटीड रिटर्न",
      "वार्षिक बोनस",
      "टॅक्स बेनिफिट"
    ],
    englishName: "LIC Jeevan Umang"
  },
  {
    id: 5,
    name: "एलआयसी न्यू एंडोमेंट प्लान",
    description: "न्यू एंडोमेंट प्लान ही एक पारंपरिक बचत योजना आहे जी परिपक्वता आणि मृत्यू या दोन्ही परिस्थितीत लाभ देते.",
    ratePerThousand: 50,
    minAge: 18,
    maxAge: 50,
    term: "12-35 वर्षे",
    benefits: [
      "गारंटीड परिपक्वता लाभ",
      "डेथ बेनिफिट",
      "बोनस",
      "लोन सुविधा"
    ],
    englishName: "LIC New Endowment Plan"
  }
];

export const getPlansForCalculator = () => {
  return licPlans.map(plan => ({
    id: plan.id,
    name: plan.name,
    englishName: plan.englishName,
    ratePerThousand: plan.ratePerThousand
  }));
};
