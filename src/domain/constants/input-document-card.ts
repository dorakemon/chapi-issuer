import {
  DriverCard,
  MovieDocument,
  StudentCard,
  VoucherDocument,
} from "./input-document";

export const InputDocumentCardList = [
  {
    title: "consts.studentCardBound",
    image:
      "https://i.picsum.photos/id/437/600/300.jpg?hmac=rQUOmflNYSK9SMIe8IAB3VfQ6y49xaJSivvhZXym4vk",
    isBound: true,
    inputDoc: StudentCard,
  },
  {
    title: "consts.driverCardBound",
    image:
      "https://i.picsum.photos/id/183/600/300.jpg?hmac=8Dfq2pvVCfdiIo2QBvHfgjeGnBBfvuavw02i9bTUaAs",
    isBound: true,
    inputDoc: DriverCard,
  },
  {
    title: "consts.movieTicketUnbound",
    image: "./static/theatre.jpg",
    isBound: false,
    inputDoc: MovieDocument,
  },
  {
    title: "consts.voucherTicketUnbound",
    image: "./static/voucher.jpg",
    isBound: false,
    inputDoc: VoucherDocument,
  },
];
