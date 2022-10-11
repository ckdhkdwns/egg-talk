package eggtalk.eggtalk.repository.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.chat.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{
    List<Message> findAllByRoomId(Integer roomId);
}
