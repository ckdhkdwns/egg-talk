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
import eggtalk.eggtalk.exception.NotFoundMemberException;
import eggtalk.eggtalk.service.ChatService;
import eggtalk.eggtalk.service.UserService;

@Controller
@RequestMapping("/rooms")
public class ChatRoomController {
    private final ChatService chatService;
    private final UserService userService;

    public ChatRoomController(ChatService chatService, UserService userService){
        this.chatService = chatService;
        this.userService = userService;
    }

    
    /** 모든 채팅방 목록 가져오기 */
    @GetMapping("")
    @ResponseBody
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }


    /** 채팅방 생성 */
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<ChatRoomDto> createRoom(@RequestBody ChatRoomDto chatRoomDto) {
        String creatorId = userService.getMyUserWithAuthorities().getUserId();
        return ResponseEntity.ok(chatService.createRoom(creatorId, chatRoomDto.getRoomName())) ;
    }

    /** 채팅방 내의 메세지 가져오기 */
    @GetMapping("/{roomId}/messages")
    @ResponseBody
    public List<ChatMessage> enterRoom(@PathVariable Long roomId) {
        return chatService.findMessageByRoomId(roomId);
    }

    //임시 채팅페이지
    @GetMapping("/page/room/enter/{roomId}")
    public String enterRoomPage(Model model, @PathVariable Long roomId) {
        return "roomdetail";
    }
    // 임시 채팅페이지2
    @GetMapping("/chattest")
    public String chatTest(Model model) {
        return "chattest";
    }
    /** Exception - 로그인되어있지 않음 */
    @ExceptionHandler(NotFoundMemberException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(NotFoundMemberException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
    }
    
}