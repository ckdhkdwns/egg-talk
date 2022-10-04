package eggtalk.eggtalk.dto;

import eggtalk.eggtalk.entity.ChatMessage;
import lombok.*;

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

    
   public static ChatMessageDto from(ChatMessage chatMessage) {
      if(chatMessage == null) return null;

      return ChatMessageDto.builder()
              .messageType(chatMessage.getMessageType())
              .roomId(chatMessage.getRoomId())
              .sender(chatMessage.getSender())
              .message(chatMessage.getMessage())
              .build();
   }
}
