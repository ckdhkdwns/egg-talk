package eggtalk.eggtalk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import eggtalk.eggtalk.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{
    
}
