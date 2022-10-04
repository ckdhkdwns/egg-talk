package eggtalk.eggtalk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import eggtalk.eggtalk.entity.UserRoom;

public interface UserRoomRepository extends JpaRepository<UserRoom, String> {
    List<UserRoom> findAllByUserId(String userId);
}
