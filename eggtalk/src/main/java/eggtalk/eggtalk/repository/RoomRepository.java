package eggtalk.eggtalk.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import eggtalk.eggtalk.entity.Room;


public interface RoomRepository extends JpaRepository<Room, Integer> {
}
