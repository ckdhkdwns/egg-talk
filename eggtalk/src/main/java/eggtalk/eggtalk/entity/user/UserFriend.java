package eggtalk.eggtalk.entity.user;

import lombok.*;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "user_friend")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserFriend.class)
public class UserFriend implements Serializable {    

    @Id
    @Column(name = "user_id") 
    private Integer userId;

    @Id
    @Column(name = "friend_id") 
    private Integer friendId;
}