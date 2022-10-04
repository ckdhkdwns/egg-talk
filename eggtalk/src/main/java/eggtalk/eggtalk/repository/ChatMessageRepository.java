package eggtalk.eggtalk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import eggtalk.eggtalk.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{
    List<ChatMessage> findAllByRoomId(Long roomId);
}
