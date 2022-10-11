package eggtalk.eggtalk.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import eggtalk.eggtalk.entity.user.UserFriend;

public interface UserFriendRepository extends JpaRepository<UserFriend, Integer> {
    List<UserFriend> findAllByUserId(Integer userId);
}
