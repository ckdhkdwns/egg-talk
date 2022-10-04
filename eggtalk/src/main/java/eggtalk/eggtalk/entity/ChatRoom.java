package eggtalk.eggtalk.entity;

import lombok.*;

import java.util.Set;

import javax.persistence.*;



@Entity
@Table(name = "chat_room")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom extends BaseTime {

    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(name = "creator_id", length = 100)
    private String creatorId;

    @Column(name = "room_name", length = 100)
    private String roomName;


}