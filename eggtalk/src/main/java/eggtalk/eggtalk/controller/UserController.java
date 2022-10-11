package eggtalk.eggtalk.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import eggtalk.eggtalk.dto.user.UserDto;
import eggtalk.eggtalk.entity.chat.Room;
import eggtalk.eggtalk.exception.DuplicateMemberException;
import eggtalk.eggtalk.exception.InvalidPasswordException;
import eggtalk.eggtalk.exception.InvalidUserException;
import eggtalk.eggtalk.service.ChatService;
import eggtalk.eggtalk.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor

public class UserController {
    private final UserService userService;
    private final ChatService chatService;

    /** 유저 정보 불러오기 */
    @GetMapping("")
    public ResponseEntity<UserDto> getUsers(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    /** 유저 정보 등록하기 */
    @PostMapping("")
    public ResponseEntity<UserDto> insertUser(
            @Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    /** 특정 유저 정보 불러오기 */
    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUser(
            @PathVariable String username,
            HttpServletRequest request) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
    }

    /** 유저 정보 수정하기 (Update) */
    @PutMapping("/{username}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable String username,
            @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUserInfo(username, userDto));
    }

    /** 유저가 가지고 있는 방 목록 가져오기 */
    @GetMapping("/{username}/rooms")
    public List<Room> getUserRooms(@PathVariable String username) {
        return chatService.findRoomByUsername(username);
    }

    // 아이디 중복 예외처리 - 409
    @ExceptionHandler(DuplicateMemberException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(DuplicateMemberException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
    }

    // 비밀번호 유효성 예외처리 - 400
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(InvalidPasswordException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

    // 유저정보가 유효하지 않음 - 400
    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(InvalidUserException exception) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exception.getMessage());
    }

}
