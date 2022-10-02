package eggtalk.eggtalk.service;

import java.util.*;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import eggtalk.eggtalk.dto.ChatRoomDto;
import eggtalk.eggtalk.entity.ChatRoom;
import eggtalk.eggtalk.repository.ChatRoomRepository;
import eggtalk.eggtalk.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatService {

    public final ChatRoomRepository chatRoomRepository;

    public ChatService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }
    /*
    @PostConstruct
    //의존관게 주입완료되면 실행되는 코드
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }
    */

    //채팅방 불러오기
    public List<ChatRoom> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoom> rooms = chatRoomRepository.findAll();
        Collections.reverse(rooms);

        return rooms;
    }

    //채팅방 하나 불러오기
    public ChatRoomDto findById(Long roomId) {
        return ChatRoomDto.from(chatRoomRepository.findById(roomId).get());
    }

    //채팅방 생성
    public ChatRoomDto createRoom(String name) {
        ChatRoom chatRoom = ChatRoom.builder()
            .roomName(name)
            .build();

        
        return ChatRoomDto.from(chatRoomRepository.save(chatRoom));
    }
}