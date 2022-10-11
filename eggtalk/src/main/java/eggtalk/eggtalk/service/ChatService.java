package eggtalk.eggtalk.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import eggtalk.eggtalk.dto.chat.MessageDto;
import eggtalk.eggtalk.dto.chat.RoomDto;
import eggtalk.eggtalk.dto.user.UserRoomDto;
import eggtalk.eggtalk.entity.chat.Room;
import eggtalk.eggtalk.entity.chat.Message;
import eggtalk.eggtalk.entity.user.User;
import eggtalk.eggtalk.entity.user.UserRoom;
import eggtalk.eggtalk.exception.InvalidUserException;
import eggtalk.eggtalk.repository.chat.MessageRepository;
import eggtalk.eggtalk.repository.chat.RoomRepository;
import eggtalk.eggtalk.repository.user.UserRepository;
import eggtalk.eggtalk.repository.user.UserRoomRepository;
import eggtalk.eggtalk.util.SecurityUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

    public final RoomRepository roomRepository;
    public final MessageRepository messageRepository;
    public final UserRoomRepository userRoomRepository;
    public final UserRepository userRepository;
    
    /** 모든 채팅방 찾기 */
    public List<Room> findAllRoom() {
        List<Room> rooms = roomRepository.findAll();
        Collections.reverse(rooms); // 채팅방 최근 생성 순으로 반환

        return rooms;
    }

    /** 채팅방 하나 찾기 */
    public RoomDto findOneByRoomId(Integer roomId) {
        return RoomDto.from(roomRepository.findById(roomId).get());
    }

    /** 채팅방 만들기 */
    public Room createRoom(String username, String roomName) {
        Room room = Room.builder()
            .roomName(roomName)
            .build();

        Integer roomId = roomRepository.save(room).getRoomId();
        UserRoom userRoom = UserRoom.builder()
                .userId(userRepository.findByUsername(username).getUserId())
                .roomId(roomId)
                .build();

        userRoomRepository.save(userRoom);

        return room;
    }

    /** 메세지 저장 */
    public MessageDto createMessage(Message message) {
        return MessageDto.from(messageRepository.save(message));
    }

    /** 방 아이디로 메세지 찾기 */
    public List<Message> findMessageByRoomId(Integer roomId) {
        return messageRepository.findAllByRoomId(roomId);
    }

    /** 유저 이름으로 방 찾기 */
    public List<Room> findRoomByUsername(String username) {
        if (SecurityUtil.getCurrentUsername().get().equals(username)) {
            List<UserRoom> userRooms = userRoomRepository.findAllByUserId(userRepository.findByUsername(username).getUserId());

            List<Room> chatRooms =  userRooms.stream()
            .map(userRoom -> roomRepository.findById(userRoom.getRoomId()).orElse(null))
            .collect(Collectors.toList());

            return chatRooms;
        } else {
            throw new InvalidUserException("유저가 일치하지 않습니다.");
        }

    }

    /** 방 입장하기 */
    public UserRoomDto enterRoom(Integer userId, Integer roomId) {
        User user = userRepository.findByUserId(userId);
        List<UserRoom> userRooms = userRoomRepository.findAllByUserId(user.getUserId());
        for(UserRoom userRoom : userRooms) {
            if(userRoom.getRoomId().equals(roomId)){
                return null;
            }
        }
        return UserRoomDto.from(userRoomRepository.save(
                UserRoom.builder()
                        .userId(user.getUserId())
                        .roomId(roomId)
                        .build()));
    }

    /** 방 나가기 */
    public void leaveRoom(Integer userId, Integer roomId) {
        List<UserRoom> userRooms = userRoomRepository.findAllByUserId(userId);
        for (UserRoom userRoom : userRooms) {
            if (userRoom.getRoomId().equals(roomId)) {
                userRoomRepository.delete(userRoom);
                break;
            }
        };
    }

    /** user id와 room id를 통해 하나의 UserRoom을 찾음 */
    public Optional<UserRoom> findUserRoomById(Integer userId, Integer roomId) {
        return userRoomRepository.findByUserIdAndRoomId(userId, roomId);
    }

    /** 방에 입장해 있는 유저들을 찾음 */
    public List<User> findUsersByRoomId(Integer roomId) {
        List<Integer> userIdList = userRoomRepository.findAllByRoomId(roomId).stream()
            .map(userRoom -> userRoom.getUserId())
            .collect(Collectors.toList());

        List<User> userList = userIdList.stream()
            .map(userId -> userRepository.findByUserId(userId))
            .collect(Collectors.toList());
            
        return userList;
    }
}