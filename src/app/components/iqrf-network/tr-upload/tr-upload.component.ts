import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tr-upload',
  templateUrl: './tr-upload.component.html',
  styleUrls: ['./tr-upload.component.css'],
  providers: [MessageService]
})
export class TrUploadComponent implements OnInit {

  public dpaVersions: SelectItem [];
  public dpaVer: string = '3.03'; 
  
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {
    this.dpaVersions = [
      {label:'3.03', value: '3.03'},
      {label:'4.00', value: '4.00'},
      {label:'4.01', value: '4.01'},
      {label:'4.02', value: '4.02'},
      {label:'4.03', value: '4.03'},
      {label:'4.10', value: '4.10'},
      {label:'4.11', value: '4.11'}
    ]; 
   }

  ngOnInit() {
  }

  onUpload(event) {
    window.alert('upp');
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}  

}
