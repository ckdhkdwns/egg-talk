package eggtalk.eggtalk.service;

import java.util.Collections;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import eggtalk.eggtalk.dto.UserDto;
import eggtalk.eggtalk.entity.Authority;
import eggtalk.eggtalk.entity.User;
import eggtalk.eggtalk.exception.DuplicateMemberException;
import eggtalk.eggtalk.exception.InvalidPasswordException;
import eggtalk.eggtalk.exception.InvalidUserException;
import eggtalk.eggtalk.exception.NotFoundMemberException;
import eggtalk.eggtalk.repository.UserRepository;
import eggtalk.eggtalk.util.SecurityUtil;
import eggtalk.eggtalk.validation.PasswordValidator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;

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

    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String username) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByUsername(username).orElse(null));
    }

    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByUsername)
                        .orElseThrow(() -> new NotFoundMemberException("유저를 찾을 수 없습니다.")));
    }

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

}