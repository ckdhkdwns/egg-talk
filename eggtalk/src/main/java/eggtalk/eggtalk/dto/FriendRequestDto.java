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
   private String targetUsername;

   @NotNull
   private String requestedUsername;
}