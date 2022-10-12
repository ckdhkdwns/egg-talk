package eggtalk.eggtalk.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eggtalk.eggtalk.dto.FriendRequestDto;
import eggtalk.eggtalk.dto.user.UserDto;
import eggtalk.eggtalk.dto.user.UserFriendDto;
import eggtalk.eggtalk.entity.FriendRequest;
import eggtalk.eggtalk.entity.user.UserFriend;
import eggtalk.eggtalk.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {
    private final UserService userService;

    /** 친구 목록 가져오기 */
    @GetMapping("")
    public ResponseEntity<List<UserFriendDto>> getFriends() {
        return ResponseEntity.ok(userService.getFriends());
    }

    /** 친구 요청하기 */
    @PostMapping("/requests")    
    public ResponseEntity<FriendRequestDto> requestFriend(@RequestBody FriendRequestDto friendRequestDto) {
        return ResponseEntity.ok(userService.requestFriend(friendRequestDto));
    }


    /** 친구 요청 목록 가져오기 */
    @GetMapping("/requests")
    public ResponseEntity<List<FriendRequestDto>> getRequests() {
        return ResponseEntity.ok(userService.getFriendRequests());
    }

    
    /** 친구 요청 수락하기 */
    @PostMapping("")
    public ResponseEntity<UserFriendDto> acceptRequest(@RequestBody FriendRequestDto friendRequestDto) {
        return ResponseEntity.ok(userService.acceptRequest(friendRequestDto));
    }    
}
