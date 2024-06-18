import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrl: './support-chat.component.css'
})
export class SupportChatComponent implements OnInit {

  query: string = '';
  response:string = '';
  messages = [
    
      {
        "role": "system",
        "content": "You are a helpful assistant. You are working for our web app called dishdash which help people to order food online from restuarant online. You will only answers queries realted to our application not of general life and your response will be maximum 50-100words only not more than that and if users ask you questions which you don't know about just say, You query is sent to our team, one of your represeantaive will contact you, fix the type in the previous sentance."
      }
    
  ]

  ngOnInit(): void {
  }

  constructor(private chatService:ChatServiceService) {}

  generateMessages() {
    let msg = {
      "role":"user",
      "content":this.query
    }

    this.messages.push(msg);
    this.query = ''

    this.chatService.generateSupportQuery(this.messages).subscribe({
      next:data => {
        console.log("data fetch success")
        console.log(data);

        this.response = data.choices[0].message.content;

        
        let chatMessage =  {
          "role":"assistant",
          "content":this.response
        }

        console.log(chatMessage);

        this.messages.push(chatMessage);
       
      },
      error:e => {
        console.log("Error while fetching response")
        console.log(e);

      }
    })

  }




}
