package eggtalk.eggtalk.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import eggtalk.eggtalk.dto.UserDto;
import eggtalk.eggtalk.exception.DuplicateMemberException;
import eggtalk.eggtalk.exception.InvalidPasswordException;
import eggtalk.eggtalk.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    //유저 정보 불러오기 (Select)
    @GetMapping("/user")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }
    //유저 정보 등록하기 (Insert)
    @PostMapping("/user")
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }
    //유저 정보 수정하기 (Update)
    @PutMapping("/user")
    public ResponseEntity<UserDto> updateUserInfo(
        @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUserInfo(userDto));
    }


    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(userId));
    }
    
    //아이디 중복 예외처리 - 409
    @ExceptionHandler(DuplicateMemberException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(DuplicateMemberException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
    }
    //비밀번호 유효성 예외처리 - 400
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<String> handleNoSuchElementFoundException(InvalidPasswordException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
