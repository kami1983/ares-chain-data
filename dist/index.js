"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//Exports all handler functions
(0, tslib_1.__exportStar)(require("./mappings/mappingHandlers"), exports);
require("@polkadot/api-augment");
// import nodemailer from "nodemailer"
// createFun();
// async function createFun() {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.163.com",
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'test@cancanyou.com', // generated ethereal user
//             pass: 'test123456', // generated ethereal password
//         },
//     });
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <cross_chain_request@ares.com>', // sender address
//         to: "630086711@qq.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });
//     logger.info("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview only available when sending through an Ethereal account
//     logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }
