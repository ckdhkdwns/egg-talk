package eggtalk.eggtalk.dto;

import lombok.*;
import javax.validation.constraints.NotNull;

import eggtalk.eggtalk.entity.FriendRequest;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendRequestDto {
    @NotNull
   private Integer userId;

   @NotNull
   private Integer requestedUserId;
   public static FriendRequestDto from(FriendRequest friendRequest) {
    if(friendRequest == null) return null;

    return FriendRequestDto.builder()
       .userId(friendRequest.getUserId())
       .requestedUserId(friendRequest.getRequestedUserId())
       .build();
 }
}