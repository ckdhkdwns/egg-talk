package eggtalk.eggtalk.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import eggtalk.eggtalk.dto.ChatRoomDto;
import eggtalk.eggtalk.entity.ChatMessage;
import eggtalk.eggtalk.entity.ChatRoom;
import eggtalk.eggtalk.entity.User;
import eggtalk.eggtalk.exception.NotFoundMemberException;
import eggtalk.eggtalk.service.ChatService;
import eggtalk.eggtalk.service.UserService;

@Controller
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;
    private final UserService userService;

    public ChatRoomController(ChatService chatService, UserService userService){
        this.chatService = chatService;
        this.userService = userService;
    }

    
    // 모든 채팅방 목록 반환
    @GetMapping("/room")
    @ResponseBody
    public List<ChatRoom> room() {
        try {
            String userId = userService.getMyUserWithAuthorities().getUserId();
            return chatService.findRoomIdByUserId(userId);
        } catch(Exception e) {
            return chatService.findAllRoom();
        }
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ResponseEntity<ChatRoomDto> createRoom(@RequestBody ChatRoomDto chatRoomDto) {
        String creatorId = userService.getMyUserWithAuthorities().getUserId();
        return ResponseEntity.ok(chatService.createRoom(creatorId, chatRoomDto.getRoomName())) ;
    }

    // 채팅방 입장시 메세지들 리턴
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public List<ChatMessage> enterRoom(@PathVariable Long roomId) {
        return chatService.findMessageByRoomId(roomId);
    }


    //임시 채팅페이지
    @GetMapping("/page/room/enter/{roomId}")
    public String enterRoomPage(Model model, @PathVariable Long roomId) {
        return "roomdetail";
    }

    /** Exception - 로그인되어있지 않음 */
    @ExceptionHandler(NotFoundMemberException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(NotFoundMemberException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
    }
    
}