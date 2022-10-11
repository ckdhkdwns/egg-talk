package eggtalk.eggtalk.entity.chat;

import lombok.*;

import javax.persistence.*;

import eggtalk.eggtalk.entity.BaseTime;

@Entity
@Table(name = "room")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room extends BaseTime {

    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @Column(name = "room_name", length = 100)
    private String roomName;

}