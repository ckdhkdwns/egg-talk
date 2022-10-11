package eggtalk.eggtalk.entity;

import lombok.*;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    @Column(name = "message_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer messageId;

    @JsonIgnore
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "displayname", length = 50)
    private String displayname;

    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "message_type")
    private Integer messageType;
    
    @Column(name = "content", length = 1000)
    private String content;

    @Column(name = "created_date")
    private LocalDateTime createdDate;


}