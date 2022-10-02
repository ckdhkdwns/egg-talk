package eggtalk.eggtalk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import eggtalk.eggtalk.entity.ChatRoom;


public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    
}
