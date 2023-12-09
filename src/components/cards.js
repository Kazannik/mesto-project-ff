const myCardsImage_01 = new URL("../images/MyCard_01.jpg", import.meta.url);
const myCardsImage_02 = new URL("../images/MyCard_02.jpg", import.meta.url);
const myCardsImage_03 = new URL("../images/MyCard_03.jpg", import.meta.url);
const myCardsImage_04 = new URL("../images/MyCard_04.jpg", import.meta.url);
const myCardsImage_05 = new URL("../images/MyCard_05.jpg", import.meta.url);
const myCardsImage_06 = new URL("../images/MyCard_06.jpg", import.meta.url);

const initialCards = [
  {
    name: "Столешников переулок",
    link: myCardsImage_01,
  },
  {
    name: "Камчатка",
    link: myCardsImage_02,
  },
  {
    name: "Аэрополе",
    link: myCardsImage_03,
  },
  {
    name: "Киевский",
    link: myCardsImage_04,
  },
  {
    name: "Большой",
    link: myCardsImage_05,
  },
  {
    name: "Нева",
    link: myCardsImage_06,
  },
];

export { initialCards };
