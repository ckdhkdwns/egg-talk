package eggtalk.eggtalk.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import eggtalk.eggtalk.dto.MessageDto;
import eggtalk.eggtalk.dto.RoomDto;
import eggtalk.eggtalk.dto.UserRoomDto;
import eggtalk.eggtalk.entity.Message;
import eggtalk.eggtalk.entity.Room;
import eggtalk.eggtalk.entity.User;
import eggtalk.eggtalk.entity.UserRoom;
import eggtalk.eggtalk.exception.InvalidUserException;
import eggtalk.eggtalk.repository.MessageRepository;
import eggtalk.eggtalk.repository.RoomRepository;
import eggtalk.eggtalk.repository.UserRepository;
import eggtalk.eggtalk.repository.UserRoomRepository;
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
        // 채팅방 최근 생성 순으로 반환
        List<Room> rooms = roomRepository.findAll();
        Collections.reverse(rooms);

        return rooms;
    }

    /** 채팅방 하나 찾기 */
    public RoomDto findById(Integer roomId) {
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

                
        System.out.println(userRoom.getClass());
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

            List<Room> chatRooms = new ArrayList<>();
            for (int i = 0; i < userRooms.size(); i++) {
                Optional<Room> room = roomRepository.findById(userRooms.get(i).getRoomId());
                if(room.isPresent()) {
                    chatRooms.add(room.get());
                } else {
                    //Pass
                }
            }
            return chatRooms;
        } else {
            throw new InvalidUserException("유저가 일치하지 않습니다.");
        }

    }

    /** 방 입장하기 */
    public UserRoomDto enterRoom(String username, Integer roomId) {
        User user = userRepository.findByUsername(username);
        List<UserRoom> userRooms = userRoomRepository.findAllByUserId(user.getUserId());
        for(int i=0;i<userRooms.size();i++) {
            if(userRooms.get(i).getRoomId().equals(roomId)){
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
    public void leaveRoom(String username, Integer roomId) {
        Integer userId = userRepository.findByUsername(username).getUserId();
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