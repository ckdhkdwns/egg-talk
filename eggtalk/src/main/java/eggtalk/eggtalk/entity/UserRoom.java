package eggtalk.eggtalk.entity;

import lombok.*;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "user_room")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserRoom.class)
public class UserRoom implements Serializable {    

    @Id
    @Column(name = "user_id") 
    private Integer userId;

    @Id
    @Column(name = "room_id") 
    private Integer roomId;
}