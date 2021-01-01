import * as functions from 'firebase-functions';
import {Emp} from './emp'
import * as line from '@line/bot-sdk'
import * as crypto from 'crypto'
require('dotenv').config()

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
    channelSecret: process.env.CHANNEL_SECRET!,
}

export const line_webhook = functions.https.onRequest(async (req,res)=>{
    const body = req.body
    const events = body.events;
    const client = new line.Client(config)

    // signature check
    const signature = req.headers['x-line-signature']
    if(validate_signature(signature, body)){
        // get text
        const raw:string =  events[0].message.text
        const keyword:string = raw.charAt(0)

        // dispatch
        switch(keyword){
            case '/':
                res.status(200).json(
                    await reply_text(
                        client,
                        events[0].replyToken, 
                        Emp(raw.slice(1),16)
                    ).then((v)=>functions.logger.info("res:", v))
                )
                break;
            default:
                res.json(null)
                break;
        }
    }else{
        res.status(403).json(null)
    }
 
})

function reply_text(client: line.Client, token: string, msg: string) {
    return client.replyMessage(token, {
        type: 'text',
        text: msg,
    });
}

function validate_signature(signature:string | string[] | undefined, body:any){
    const hmac = crypto.createHmac('sha256', config.channelSecret)
                    .update(Buffer.from(JSON.stringify(body)))
                    .digest('base64')
    return signature == hmac;
}