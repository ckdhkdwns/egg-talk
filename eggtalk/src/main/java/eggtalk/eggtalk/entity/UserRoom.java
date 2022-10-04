package eggtalk.eggtalk.entity;

import lombok.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user_room")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRoom {

    @Id
    @Column(name = "id")
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id")
    private String userId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "room_name")
    private String roomName;
}