package eggtalk.eggtalk.entity;

import lombok.*;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "friend_request")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FriendRequest.class)
public class FriendRequest implements Serializable{
    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "requested_user_id")
    private Integer requestedUserId;
}
