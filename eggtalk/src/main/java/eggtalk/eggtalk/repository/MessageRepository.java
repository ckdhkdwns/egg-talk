package eggtalk.eggtalk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import eggtalk.eggtalk.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{
    List<Message> findAllByRoomId(Integer roomId);
}
