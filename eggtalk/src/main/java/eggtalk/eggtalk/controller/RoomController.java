package eggtalk.eggtalk.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import eggtalk.eggtalk.dto.RoomDto;
import eggtalk.eggtalk.entity.Message;
import eggtalk.eggtalk.entity.Room;
import eggtalk.eggtalk.entity.User;
import eggtalk.eggtalk.exception.NotFoundMemberException;
import eggtalk.eggtalk.service.ChatService;
import eggtalk.eggtalk.service.UserService;

@Controller
@RequestMapping("/rooms")
public class RoomController {
    private final ChatService chatService;
    private final UserService userService;

    public RoomController(ChatService chatService, UserService userService){
        this.chatService = chatService;
        this.userService = userService;
    }
    
    /** 모든 채팅방 목록 가져오기 */
    @GetMapping("")
    @ResponseBody
    public List<Room> findAllRoom() {
        return chatService.findAllRoom();
    }

    /** 채팅방 생성 */
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Room> createRoom(@RequestBody RoomDto roomDto) {
        String username = userService.getMyUserWithAuthorities().getUsername();
        return ResponseEntity.ok(chatService.createRoom(username, roomDto.getRoomName())) ;
    }

    /** 채팅방 내의 메세지 가져오기 */
    @GetMapping("/{roomId}/messages")
    @ResponseBody
    public ResponseEntity<List<Message>> getMessagesInRoom(@PathVariable Integer roomId) {
        return ResponseEntity.ok(chatService.findMessageByRoomId(roomId));
    }
    
    /** 방에 입장해 있는 유저들을 찾음 */
    @GetMapping("/{roomId}/users")
    @ResponseBody
    public ResponseEntity<List<User>> getUsersInRoom(@PathVariable Integer roomId) {
        return ResponseEntity.ok(chatService.findUsersByRoomId(roomId));
    }

    //임시 채팅페이지
    @GetMapping("/page/room/enter/{roomId}")
    public String enterRoomPage(Model model, @PathVariable Integer roomId) {
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