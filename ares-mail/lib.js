
var nodemailer = require('nodemailer');
const { Pool, Client } = require('pg')
require('dotenv').config();

module.exports.checkAndSendCrossChainEmails = function () {

    const pool = createDbPool()

    let result = {
        status_info: 'failed',
        message: 'Null'
    }

    return new Promise(function (resolve, reject) {
        pool.query(`select * from app.cross_chain_request_events where status is null `,
            async (db_err, db_res) => {

            if (db_err) {
                result.message = db_err.toString();
                result.status_info = 'failed'
            } else {
                for (const idx in db_res.rows) {
                    const db_data = db_res.rows[idx]
                    if (!db_data.status) {
                        const emailId = await sendEmail('test@cancanyou.com', '630086711@qq.com',  db_data)
                        if("" != emailId) {
                            updateEventStatus(db_data.id, emailId)
                        }
                    }
                    result.message = JSON.stringify(db_res.rows)
                    result.status_info = 'success'
                }
                pool.end()
                // res.render('msg', result)
            }
            resolve(result)
        })
    });
}

function createDbPool() {
    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASS,
        port:  process.env.PG_PORT,
    })
    return pool
}

function updateEventStatus(db_id, email_id) {
    const update_sql = `UPDATE app.cross_chain_request_events SET status = '${email_id}' WHERE id='${db_id}'`;

    //
    const pool = createDbPool()

    pool.query(update_sql, (db_err, db_res) => {
        if(db_err) {
            console.log("########### ERROR = ", db_err)
            throw new Error(db_err.toString())
        }else{
            console.log("########### UPDATE = ", db_id)
        }})

}

async function sendEmail(sender, to, dbData) {
    try{

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_SMTP_PORT,
            secure: process.env.MAIL_SMTP_SECURE, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_AUTH_USER, // generated ethereal user
                pass: process.env.MAIL_AUTH_PASS,// generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: '"Cross chain service ????" <test@cancanyou.com>', // sender address
            to: process.env.MAIL_TO, // list of receivers
            subject: `On cross chain event - ${dbData.iden}`, // Subject line
            text: `On cross chain event - ${dbData.iden}`, // plain text body
            html: `
<p>??????HASH???${dbData.tx_hash}</p>
<p>???????????????${dbData.acc}</p>
<p>??????ID???${dbData.id}</p>
<p>??????ID???${dbData.iden}</p>
<p>???????????????${dbData.create_bn}</p>
<p>?????????${dbData.kind}</p>
<p>???????????????${dbData.dest}</p>
<p>??????(?????????)???${dbData.amount} ?????????????????????????????????????????????10???12?????????</p>
<p>??????(??????10???12??????)???${dbData.amount/10**12} ARES</p>
<hr/>
<p>???????????????</p>
<p><b>${dbData.acc},${dbData.iden},${dbData.kind},${dbData.dest},${dbData.amount}</b></p>
`, // html body
        });

        console.info("Message sent: %s", info.messageId);
        // console.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return info.messageId
    }catch(e){
        return ""
    }
}