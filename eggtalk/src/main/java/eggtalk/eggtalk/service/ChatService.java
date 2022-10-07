package eggtalk.eggtalk.service;

import java.util.*;
import org.springframework.stereotype.Service;

import eggtalk.eggtalk.dto.ChatMessageDto;
import eggtalk.eggtalk.dto.ChatRoomDto;
import eggtalk.eggtalk.dto.UserRoomDto;
import eggtalk.eggtalk.entity.ChatMessage;
import eggtalk.eggtalk.entity.ChatRoom;
import eggtalk.eggtalk.entity.UserRoom;
import eggtalk.eggtalk.exception.InvalidUserException;
import eggtalk.eggtalk.repository.ChatMessageRepository;
import eggtalk.eggtalk.repository.ChatRoomRepository;
import eggtalk.eggtalk.repository.UserRoomRepository;
import eggtalk.eggtalk.util.SecurityUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

    public final ChatRoomRepository chatRoomRepository;
    public final ChatMessageRepository chatMessageRepository;
    public final UserRoomRepository userRoomRepository;

    // 채팅방 불러오기
    public List<ChatRoom> findAllRoom() {
        // 채팅방 최근 생성 순으로 반환
        List<ChatRoom> rooms = chatRoomRepository.findAll();
        Collections.reverse(rooms);

        return rooms;
    }

    // 채팅방 하나 불러오기
    public ChatRoomDto findById(Long roomId) {
        return ChatRoomDto.from(chatRoomRepository.findById(roomId).get());
    }

    // 채팅방 생성
    public ChatRoomDto createRoom(String creatorId, String roomName) {
        ChatRoom chatRoom = ChatRoom.builder()
                .creatorId(creatorId)
                .roomName(roomName)
                .build();

        Long roomId = chatRoomRepository.save(chatRoom).getRoomId();

        UserRoom userRoom = UserRoom.builder()
                .userId(creatorId)
                .roomName(roomName)
                .roomId(roomId)
                .build();

        userRoomRepository.save(userRoom);

        return ChatRoomDto.builder()
                .creatorId(creatorId)
                .roomName(roomName)
                .build();
    }

    // 채팅 메세지 저장
    public ChatMessageDto createMessage(ChatMessage chatMessage) {
        return ChatMessageDto.from(chatMessageRepository.save(chatMessage));
    }

    /** 방 아이디로 메세지 찾기 */
    public List<ChatMessage> findMessageByRoomId(Long roomId) {
        return chatMessageRepository.findAllByRoomId(roomId);
    }

    // 유저 아이디로 방 찾기
    public List<ChatRoom> findRoomIdByUserId(String userId) {
        if (SecurityUtil.getCurrentUserId().get().equals(userId)) {
            List<UserRoom> userRooms = userRoomRepository.findAllByUserId(userId);
            List<ChatRoom> chatRooms = new ArrayList<>();
            for (int i = 0; i < userRooms.size(); i++) {
                chatRooms.add(chatRoomRepository.findById(userRooms.get(i).getRoomId()).get());
            }
            return chatRooms;
        } else {
            throw new InvalidUserException("유저가 일치하지 않습니다.");
        }

    }

    // 방에 입장할 때 user room 추가
    public UserRoomDto enterRoom(String userId, Long roomId) {
        return UserRoomDto.from(userRoomRepository.save(
                UserRoom.builder()
                        .userId(userId)
                        .roomId(roomId)
                        .roomName(chatRoomRepository.findById(roomId).get().getRoomName())
                        .build()));
    }
}