package eggtalk.eggtalk.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {
    List<FriendRequest> findAllByUserId(Integer userId);
}
