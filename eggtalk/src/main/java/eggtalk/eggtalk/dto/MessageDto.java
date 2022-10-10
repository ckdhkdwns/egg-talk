package eggtalk.eggtalk.dto;

import eggtalk.eggtalk.entity.Message;
import lombok.*;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {

   @NotNull
   private Integer userId;

   @NotNull
   @Size(min=5, max=50)
   private String username;

   @NotNull
   private Integer roomId;

   @NotNull
   @Size(min=1, max=1)
   private Integer messageType;

   @NotNull
   @Size(min=1, max=1000)
   private String content;

   @NotNull
   private LocalDateTime createdDate;

   public static MessageDto from(Message message) {
      if(message == null) return null;

      return MessageDto.builder()
         .userId(message.getUserId())
         .username(message.getUsername())
         .roomId(message.getRoomId())
         .content(message.getContent())
         .messageType(message.getMessageType())
         .createdDate(message.getCreatedDate())
         .build();
   }
}
