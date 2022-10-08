package eggtalk.eggtalk.dto;

import eggtalk.eggtalk.entity.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {

    @NotNull
    @Size(min = 1, max  = 50)
    private Integer messageType;

    @NotNull
    @Size(min = 1, max = 100)
    private Long roomId;

    @NotNull
    @Size(min = 1, max = 50)
    private String sender;
    
    @NotNull
    @Size(min = 1, max = 1000)
    private String message;

    @NotNull
    @Size(min = 1, max = 20)
    private LocalDateTime createdDate;

   public static ChatMessageDto from(ChatMessage chatMessage) {
      if(chatMessage == null) return null;

      return ChatMessageDto.builder()
              .messageType(chatMessage.getMessageType())
              .roomId(chatMessage.getRoomId())
              .sender(chatMessage.getSender())
              .message(chatMessage.getMessage())
              .createdDate(chatMessage.getCreatedDate())
              .build();
   }
}
