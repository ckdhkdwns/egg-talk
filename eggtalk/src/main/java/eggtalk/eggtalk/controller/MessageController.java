package eggtalk.eggtalk.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.Header;

import eggtalk.eggtalk.entity.ChatMessage;
import eggtalk.eggtalk.jwt.TokenProvider;
import eggtalk.eggtalk.service.ChatService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class MessageController {
    private final ChatService chatService;
    private final SimpMessageSendingOperations sendingOperations;
    private final TokenProvider tokenProvider;

    @MessageMapping("/chat/message")
    public void enter(ChatMessage message, @Header(name = "Authorization") String token) {
        String username = tokenProvider.getUserPk(token);
        message.setSender(username);

        if (message.getMessageType().equals(0)) {
            message.setMessage(username+"님이 입장하였습니다.");
        }
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoomId(),message);
        chatService.createMessage(message);
    }
}