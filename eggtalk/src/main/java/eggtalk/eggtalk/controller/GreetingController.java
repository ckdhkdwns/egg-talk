package eggtalk.eggtalk.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import org.springframework.web.util.HtmlUtils;
import eggtalk.eggtalk.chat.Greeting;
import eggtalk.eggtalk.chat.HelloMessage;

@Controller
public class GreetingController {
    
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(10);
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
}