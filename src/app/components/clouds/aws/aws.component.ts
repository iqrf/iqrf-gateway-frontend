import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css'],
  providers: [MessageService]
})
export class AwsComponent implements OnInit {

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onUpload(event) {
    window.alert('upp');
    /*
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    */
  }   

}
