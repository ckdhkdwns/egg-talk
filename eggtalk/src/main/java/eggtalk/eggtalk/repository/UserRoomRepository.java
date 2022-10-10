package eggtalk.eggtalk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.UserRoom;

public interface UserRoomRepository extends JpaRepository<UserRoom, Integer> {
    List<UserRoom> findAllByUserId(Integer userId);
    List<UserRoom> findAllByRoomId(Integer roomId);
    Optional<UserRoom> findByUserIdAndRoomId(Integer userId, Integer roomId);
}
