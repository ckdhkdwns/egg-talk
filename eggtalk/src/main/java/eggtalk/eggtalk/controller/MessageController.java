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


    @MessageMapping("/message")
    public void enter(Message message, @Header(name = "Authorization") String token) {
        Integer userId= tokenProvider.getUserId(token);
        String displayname = userService.getUserInfoByUserId(userId).getDisplayname();

        LocalDateTime now = LocalDateTime.now();
        message.setCreatedDate(now);
        message.setUserId(userId);
        message.setDisplayname(displayname);

        switch(message.getMessageType()) {
            case 0: 
                if(chatService.findUserRoomById(userId, message.getRoomId()).isEmpty()) {
                    chatService.enterRoom(userId, message.getRoomId());
                    message.setContent(displayname + "님이 입장하였습니다.");
                } else { return; }
                break;
            case 1:
                break;
            case 2:
                chatService.leaveRoom(userId, message.getRoomId());
                message.setContent(displayname+"님이 나갔습니다.");
                break;
        }
            
        sendingOperations.convertAndSend("/sub/chat/room/"+message.getRoomId(),message);
        chatService.createMessage(message);
    }
}