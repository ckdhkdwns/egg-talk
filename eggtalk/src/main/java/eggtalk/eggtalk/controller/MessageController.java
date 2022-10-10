package eggtalk.eggtalk.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.Header;

import eggtalk.eggtalk.entity.Message;
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
    public void enter(Message message, @Header(name = "Authorization") String token) {
        Integer userId= tokenProvider.getUserId(token);
        String username = userService.getUserInfoByUserId(userId).getUsername();

        LocalDateTime now = LocalDateTime.now();
        message.setCreatedDate(now);
        message.setUserId(userId);
        message.setUsername(username);

        switch(message.getMessageType()) {
            case 0: 
                if(chatService.findUserRoomById(userId, message.getRoomId()).isEmpty()) {                chatService.enterRoom(username, message.getRoomId());
                    message.setContent(username+"님이 입장하였습니다.");
                } else {
                    return;
                }
                break;
            case 1:
                break;
            case 2:
                chatService.leaveRoom(username, message.getRoomId());
                message.setContent(username+"님이 나갔습니다.");
                break;
        }
            
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoomId(),message);
        chatService.createMessage(message);
    }
}