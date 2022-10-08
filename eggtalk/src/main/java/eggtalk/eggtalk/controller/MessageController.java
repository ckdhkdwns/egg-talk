package eggtalk.eggtalk.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.Header;

import eggtalk.eggtalk.entity.ChatMessage;
import eggtalk.eggtalk.jwt.TokenProvider;
import eggtalk.eggtalk.service.ChatService;
import eggtalk.eggtalk.service.UserService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class MessageController {
    private final ChatService chatService;
    private final SimpMessageSendingOperations sendingOperations;
    private final TokenProvider tokenProvider;
    private final UserService userService;

    @MessageMapping("/chat/message")
    public void enter(ChatMessage message, @Header(name = "Authorization") String token) {
        String username = userService.getUserInfoByUserId(tokenProvider.getUserPk(token)).getUsername();
        
        LocalDateTime now = LocalDateTime.now();

        message.setSender(username);
        message.setCreatedDate(now);
        if (message.getMessageType().equals(0)) {
            chatService.enterRoom(username, message.getRoomId());
            message.setMessage(username+"님이 입장하였습니다.");
        }
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoomId(),message);
        chatService.createMessage(message);
    }


    
}