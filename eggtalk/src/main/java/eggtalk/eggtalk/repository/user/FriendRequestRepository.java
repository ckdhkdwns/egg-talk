package eggtalk.eggtalk.repository.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {
    Optional<List<FriendRequest>> findAllByUserId(Integer userId);
    
}
