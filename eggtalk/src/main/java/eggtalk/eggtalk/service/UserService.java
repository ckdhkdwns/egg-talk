package eggtalk.eggtalk.service;

import java.util.Collections;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import eggtalk.eggtalk.dto.FriendRequestDto;
import eggtalk.eggtalk.dto.user.UserDto;
import eggtalk.eggtalk.dto.user.UserFriendDto;
import eggtalk.eggtalk.entity.FriendRequest;
import eggtalk.eggtalk.entity.auth.Authority;
import eggtalk.eggtalk.entity.user.User;
import eggtalk.eggtalk.exception.DuplicateMemberException;
import eggtalk.eggtalk.exception.InvalidPasswordException;
import eggtalk.eggtalk.exception.InvalidUserException;
import eggtalk.eggtalk.exception.NotFoundMemberException;
import eggtalk.eggtalk.repository.user.FriendRequestRepository;
import eggtalk.eggtalk.repository.user.UserFriendRepository;
import eggtalk.eggtalk.repository.user.UserRepository;
import eggtalk.eggtalk.util.SecurityUtil;
import eggtalk.eggtalk.validation.PasswordValidator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;
    private final UserFriendRepository userFriendRepository;

    /** 유저 아이디로 유저 정보 가져오기 */
    @Transactional
    public UserDto getUserInfoByUserId(Integer userId) {
        return UserDto.from(userRepository.findByUserId(userId));
    }

    /** 유저 이름으로 유저 정보 가져오기 */
    @Transactional
    public UserDto getUserInfoByUsername(String username) {
        return UserDto.from(userRepository.findByUsername(username));
    }

    /** 가입하기 */
    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        if (passwordValidator.isValidPassword(userDto.getPassword())) {
            throw new InvalidPasswordException("유효하지 않은 비밀번호입니다.");
        }

        Authority authority = Authority.builder()
        .authorityName("ROLE_USER")
        .build();
        
        User user = User.builder()
                .password(passwordEncoder.encode(userDto.getPassword()))
                .username(userDto.getUsername())
                .displayname(userDto.getDisplayname())
                .gender(userDto.getGender())
                .authorities(Collections.singleton(authority))
                .email(userDto.getEmail())
                .build();

        return UserDto.from(userRepository.save(user));
    }

    /** 특정 유저의 정보 가져오기 */
    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String username) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByUsername(username).orElse(null));
    }

    /** 현재 유저의 정보 가져오기 */
    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByUsername)
                        .orElseThrow(() -> new NotFoundMemberException("유저를 찾을 수 없습니다.")));
    }

    /** 사용자 정보 업데이트 */
    @Transactional
    public UserDto updateUserInfo(String username, UserDto updateUserDto) {
        if (SecurityUtil.getCurrentUsername().get().equals(username)) {
            User user = userRepository.findByUsername(username);
            user.setDisplayname(updateUserDto.getDisplayname());
            user.setPassword(passwordEncoder.encode(updateUserDto.getPassword()));
            user.setEmail(updateUserDto.getEmail());
            
            return UserDto.from(userRepository.save(user));
        } else {
            throw new InvalidUserException("유저가 일치하지 않습니다.");
        }

    }


    /** 친구 요청 */
    @Transactional
    public FriendRequestDto requestFriend(Integer targetUserId) {
        Integer currentUserId = getCurrentUserId();
        
        return FriendRequestDto.from(friendRequestRepository.save(
            FriendRequest.builder()
                .userId(targetUserId)
                .requestedUserId(currentUserId)
                .build()
            ));
    }

    /** 받은 친구 요청들 가져오기 */
    @Transactional
    public List<FriendRequest> getFriendRequests() {
        Integer currentUserId = getCurrentUserId();
        return friendRequestRepository.findAllByUserId(currentUserId);
    }


    /** 친구 요청 수락하기 */
    @Transactional
    public UserFriendDto acceptRequest(Integer requestedUserId) {
        friendRequestRepository.findById(requestedUserId);
        friendRequestRepository.delete(null);
        return null;
    }

    /** 친구 목록 가져오기 */


    /** 친구 끊기 */
    private Integer getCurrentUserId() {
        return userRepository.findByUsername(SecurityUtil.getCurrentUsername()
            .orElseThrow(() -> new NotFoundMemberException("유저를 찾을 수 없습니다.")))
            .getUserId();
    }
}