package eggtalk.eggtalk.entity;

import lombok.*;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "chat_message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage extends BaseTime {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message_type", length = 1)
    private Integer messageType;

    @Column(name = "room_id", length = 100)
    private Long roomId;
    
    @Column(name = "sender", length = 50)
    private String sender;
    
    @Column(name = "message", length = 1000)
    private String message;

    @Column(name = "created_date", length = 20)
    private LocalDateTime createdDate;

}