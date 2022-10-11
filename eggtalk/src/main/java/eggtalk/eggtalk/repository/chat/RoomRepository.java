package eggtalk.eggtalk.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.chat.Room;


public interface RoomRepository extends JpaRepository<Room, Integer> {
}
