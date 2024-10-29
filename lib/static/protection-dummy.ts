import { ProtectionType } from "../enums";

export const protections = [
  {
    name: "Basic Cover",
    type: ProtectionType.protection1,
    perks: ["Hire the best value for money protection and cover your car."],
    price: 0,
    icon: "/assets/img/protections/protection-basic.png",
  },
  {
    name: "Totally at Ease Cover",
    type: ProtectionType.protection2,
    perks: [
      "Take out fully comprehensive cover for the car.",
      "Without excess and without charging a deposit to your card.",
      "Possible damage is covered.",
      "Basic roadside assistance.",
    ],
    price: 8,
    icon: "/assets/img/protections/protection-ease.png",
  },

  {
    name: "Supremely Relax Cover",
    type: ProtectionType.protection3,
    perks: [
      "Take out fully comprehensive cover for the car.",
      "Without excess and without charging a deposit to your card.",
      "Possible damage is covered.",
      "Free PREMIUM roadside assistance.",
    ],
    price: 12,
    icon: "/assets/img/protections/protection-basic.png",
  },
];
