import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { WsMsgsService } from '../../../services/ws-msgs.service'



@Component({
  selector: 'app-send-json-request',
  templateUrl: './send-json-request.component.html',
  styleUrls: ['./send-json-request.component.css'],
  providers: [MessageService]
})
export class SendJsonRequestComponent implements OnInit {

  public msgTextSend: string = '';
  public msgTextRec: string = '';

  msg: 'none' | 'waiting' | 'done' = 'none';

  constructor(public wsMsg: WsMsgsService, public messageService: MessageService) {
    // Indicates online/offline change
    wsMsg.emitorJson$.subscribe( w => { this.MessageBack(w); });  

   }

  ngOnInit() {
    this.msg = 'none';
  }

  MessageBack(msg: any) {
    //console.log('---SendJsonRequestComponent: Message Back---');
    console.log(msg)
    this.msgTextRec = JSON.stringify(msg, null, 1);
    this.msg = 'done';
    //console.log('------------------------------');
  }

  OnSend() {
    
    //console.log(this.msgText);
    let obj;

    try{

      obj = JSON.parse(this.msgTextSend);

      //console.log(JSON.stringify(obj));

    }

    catch(e) {
      console.log('ERROR [SendJsonRequestComponent]: Wrong JSOn format :(');
      //window.alert('wrong JSON format!!!');
      this.messageService.add({severity:'error', summary:'JSON format error!', detail:'Wrong JSON format, please check it!!!'});
      return;
    }


     this.msg = 'waiting';
     const ret = this.wsMsg.sendMessageConfirm(obj, this.wsMsg.emitorJson$);

     if (!ret) {
       //window.alert('Error sending message --- check message...pls!');
       this.messageService.add({severity:'error', summary:'Message contains errors!', detail:'Please check if message parameters are correct.'});
       this.msg = 'none';
     }
    

  }

  OnDocuments() {
    window.open("https://docs.iqrf.org/iqrf-gateway/api.html"); 
  }

}
